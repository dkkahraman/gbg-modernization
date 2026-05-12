import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module
vi.mock("./db", () => ({
  createInquiry: vi.fn(),
  getInquiries: vi.fn(),
  getActiveJobPostings: vi.fn(),
  getAllJobPostings: vi.fn(),
  createJobPosting: vi.fn(),
  getPublishedArticles: vi.fn(),
  getArticleBySlug: vi.fn(),
  getAllArticles: vi.fn(),
  createArticle: vi.fn(),
  updateArticle: vi.fn(),
  deleteArticle: vi.fn(),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

import { getPublishedArticles, getArticleBySlug, getAllArticles, createArticle, updateArticle, deleteArticle } from "./db";

const mockGetPublishedArticles = vi.mocked(getPublishedArticles);
const mockGetArticleBySlug = vi.mocked(getArticleBySlug);
const mockGetAllArticles = vi.mocked(getAllArticles);
const mockCreateArticle = vi.mocked(createArticle);
const mockUpdateArticle = vi.mocked(updateArticle);
const mockDeleteArticle = vi.mocked(deleteArticle);

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function createAuthContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-user",
      email: "admin@gbg-consulting.de",
      name: "Admin",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

const sampleArticle = {
  id: 1,
  title: "BilMoG-Zinsentwicklung 2026",
  slug: "bilmog-zinsentwicklung-2026",
  excerpt: "Die aktuellen BilMoG-Zinssätze und ihre Auswirkungen.",
  content: "# BilMoG-Zinsentwicklung\n\nDer aktuelle Rechnungszins...",
  category: "bilmog" as const,
  author: "Dr. Max Mustermann",
  isPublished: true,
  publishedAt: new Date("2026-05-01"),
  createdAt: new Date("2026-04-28"),
  updatedAt: new Date("2026-05-01"),
};

describe("articles router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("listPublished", () => {
    it("returns published articles without filters", async () => {
      mockGetPublishedArticles.mockResolvedValue([sampleArticle]);
      const caller = appRouter.createCaller(createPublicContext());

      const result = await caller.articles.listPublished({});

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("BilMoG-Zinsentwicklung 2026");
      expect(mockGetPublishedArticles).toHaveBeenCalledWith(undefined, undefined);
    });

    it("passes category filter to query", async () => {
      mockGetPublishedArticles.mockResolvedValue([]);
      const caller = appRouter.createCaller(createPublicContext());

      await caller.articles.listPublished({ category: "bav" });

      expect(mockGetPublishedArticles).toHaveBeenCalledWith("bav", undefined);
    });

    it("passes search filter to query", async () => {
      mockGetPublishedArticles.mockResolvedValue([]);
      const caller = appRouter.createCaller(createPublicContext());

      await caller.articles.listPublished({ search: "BilMoG" });

      expect(mockGetPublishedArticles).toHaveBeenCalledWith(undefined, "BilMoG");
    });
  });

  describe("getBySlug", () => {
    it("returns article by slug", async () => {
      mockGetArticleBySlug.mockResolvedValue(sampleArticle);
      const caller = appRouter.createCaller(createPublicContext());

      const result = await caller.articles.getBySlug({ slug: "bilmog-zinsentwicklung-2026" });

      expect(result).toBeDefined();
      expect(result?.title).toBe("BilMoG-Zinsentwicklung 2026");
      expect(mockGetArticleBySlug).toHaveBeenCalledWith("bilmog-zinsentwicklung-2026");
    });

    it("returns undefined for non-existent slug", async () => {
      mockGetArticleBySlug.mockResolvedValue(undefined);
      const caller = appRouter.createCaller(createPublicContext());

      const result = await caller.articles.getBySlug({ slug: "non-existent" });

      expect(result).toBeUndefined();
    });
  });

  describe("create (protected)", () => {
    it("creates article when authenticated", async () => {
      mockCreateArticle.mockResolvedValue(1);
      const caller = appRouter.createCaller(createAuthContext());

      const result = await caller.articles.create({
        title: "Neuer Artikel",
        slug: "neuer-artikel",
        excerpt: "Kurzbeschreibung",
        content: "Vollständiger Inhalt des Artikels",
        category: "aktuelles",
        author: "Dr. Mustermann",
        isPublished: true,
      });

      expect(result).toEqual({ success: true, id: 1 });
      expect(mockCreateArticle).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Neuer Artikel",
          slug: "neuer-artikel",
        })
      );
    });

    it("rejects unauthenticated users", async () => {
      const caller = appRouter.createCaller(createPublicContext());

      await expect(
        caller.articles.create({
          title: "Test",
          slug: "test",
          excerpt: "Test",
          content: "Test content",
          category: "aktuelles",
          author: "Test",
        })
      ).rejects.toThrow();
    });
  });

  describe("update (protected)", () => {
    it("updates article when authenticated", async () => {
      mockUpdateArticle.mockResolvedValue(undefined);
      const caller = appRouter.createCaller(createAuthContext());

      const result = await caller.articles.update({
        id: 1,
        title: "Aktualisierter Titel",
      });

      expect(result).toEqual({ success: true });
      expect(mockUpdateArticle).toHaveBeenCalledWith(1, { title: "Aktualisierter Titel" });
    });
  });

  describe("delete (protected)", () => {
    it("deletes article when authenticated", async () => {
      mockDeleteArticle.mockResolvedValue(undefined);
      const caller = appRouter.createCaller(createAuthContext());

      const result = await caller.articles.delete({ id: 1 });

      expect(result).toEqual({ success: true });
      expect(mockDeleteArticle).toHaveBeenCalledWith(1);
    });
  });
});
