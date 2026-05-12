import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { bilmogRouter } from "./bilmog";
import { z } from "zod";
import { createInquiry, getInquiries, getActiveJobPostings, getAllJobPostings, createJobPosting, getPublishedArticles, getArticleBySlug, getAllArticles, createArticle, updateArticle, deleteArticle } from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,
  bilmog: bilmogRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  inquiry: router({
    submit: publicProcedure
      .input(z.object({
        firstName: z.string().min(1, "Vorname ist erforderlich").max(100),
        lastName: z.string().min(1, "Nachname ist erforderlich").max(100),
        email: z.string().email("Ungültige E-Mail-Adresse").max(320),
        phone: z.string().max(50).optional(),
        company: z.string().max(200).optional(),
        subject: z.string().min(1, "Betreff ist erforderlich").max(300),
        message: z.string().min(10, "Nachricht muss mindestens 10 Zeichen enthalten").max(5000),
        type: z.enum(["contact", "quote"]).default("contact"),
      }))
      .mutation(async ({ input }) => {
        const id = await createInquiry(input);

        // Send notification to owner
        const notificationTitle = input.type === "quote"
          ? `Neue Angebotsanfrage von ${input.firstName} ${input.lastName}`
          : `Neue Kontaktanfrage von ${input.firstName} ${input.lastName}`;
        
        const notificationContent = [
          `**Betreff:** ${input.subject}`,
          `**Name:** ${input.firstName} ${input.lastName}`,
          `**E-Mail:** ${input.email}`,
          input.phone ? `**Telefon:** ${input.phone}` : null,
          input.company ? `**Unternehmen:** ${input.company}` : null,
          `\n**Nachricht:**\n${input.message}`,
        ].filter(Boolean).join("\n");

        try {
          await notifyOwner({
            title: notificationTitle,
            content: notificationContent,
          });
        } catch (error) {
          console.warn("[Inquiry] Notification failed, but inquiry was saved:", error);
        }

        return { success: true, id };
      }),

    list: protectedProcedure.query(async () => {
      return getInquiries();
    }),
  }),

  jobs: router({
    listActive: publicProcedure.query(async () => {
      return getActiveJobPostings();
    }),

    listAll: protectedProcedure.query(async () => {
      return getAllJobPostings();
    }),

    create: protectedProcedure
      .input(z.object({
        title: z.string().min(1).max(200),
        description: z.string().min(1),
        location: z.string().max(100).optional(),
        type: z.enum(["full_time", "part_time", "internship"]).default("full_time"),
      }))
      .mutation(async ({ input }) => {
        const id = await createJobPosting(input);
        return { success: true, id };
      }),
  }),

  articles: router({
    listPublished: publicProcedure
      .input(z.object({
        category: z.string().optional(),
        search: z.string().optional(),
      }).optional())
      .query(async ({ input }) => {
        return getPublishedArticles(input?.category, input?.search);
      }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        return getArticleBySlug(input.slug);
      }),

    listAll: protectedProcedure.query(async () => {
      return getAllArticles();
    }),

    create: protectedProcedure
      .input(z.object({
        title: z.string().min(1).max(300),
        slug: z.string().min(1).max(300),
        excerpt: z.string().min(1),
        content: z.string().min(1),
        category: z.enum(["bilmog", "pensionsgutachten", "bav", "recht", "aktuelles"]).default("aktuelles"),
        author: z.string().min(1).max(200),
        isPublished: z.boolean().default(false),
        publishedAt: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        const id = await createArticle(input);
        return { success: true, id };
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().min(1).max(300).optional(),
        slug: z.string().min(1).max(300).optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        category: z.enum(["bilmog", "pensionsgutachten", "bav", "recht", "aktuelles"]).optional(),
        author: z.string().max(200).optional(),
        isPublished: z.boolean().optional(),
        publishedAt: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateArticle(id, data);
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteArticle(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
