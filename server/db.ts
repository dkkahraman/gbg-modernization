import { eq, desc, and, like, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, inquiries, InsertInquiry, jobPostings, InsertJobPosting, articles, InsertArticle } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============ INQUIRY HELPERS ============

export async function createInquiry(inquiry: InsertInquiry) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(inquiries).values(inquiry);
  return result[0].insertId;
}

export async function getInquiries() {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
}

export async function getInquiryById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(inquiries).where(eq(inquiries.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ============ JOB POSTING HELPERS ============

export async function getActiveJobPostings() {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(jobPostings)
    .where(eq(jobPostings.isActive, true))
    .orderBy(desc(jobPostings.createdAt));
}

export async function getAllJobPostings() {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(jobPostings).orderBy(desc(jobPostings.createdAt));
}

export async function createJobPosting(posting: InsertJobPosting) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(jobPostings).values(posting);
  return result[0].insertId;
}

// ============ ARTICLE HELPERS ============

export async function getPublishedArticles(category?: string, search?: string) {
  const db = await getDb();
  if (!db) return [];

  const conditions = [eq(articles.isPublished, true)];
  if (category && category !== "alle") {
    conditions.push(eq(articles.category, category as any));
  }
  if (search) {
    conditions.push(
      or(
        like(articles.title, `%${search}%`),
        like(articles.excerpt, `%${search}%`)
      )!
    );
  }

  return db.select().from(articles)
    .where(and(...conditions))
    .orderBy(desc(articles.publishedAt));
}

export async function getArticleBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(articles)
    .where(and(eq(articles.slug, slug), eq(articles.isPublished, true)))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllArticles() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(articles).orderBy(desc(articles.createdAt));
}

export async function createArticle(article: InsertArticle) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(articles).values(article);
  return result[0].insertId;
}

export async function updateArticle(id: number, data: Partial<InsertArticle>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(articles).set(data).where(eq(articles.id, id));
}

export async function deleteArticle(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(articles).where(eq(articles.id, id));
}
