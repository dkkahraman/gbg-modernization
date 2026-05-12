import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const mockCreateInquiry = vi.fn().mockResolvedValue(1);
const mockGetInquiries = vi.fn().mockResolvedValue([]);
const mockGetActiveJobPostings = vi.fn().mockResolvedValue([]);
const mockGetAllJobPostings = vi.fn().mockResolvedValue([]);
const mockCreateJobPosting = vi.fn().mockResolvedValue(1);
const mockNotifyOwner = vi.fn().mockResolvedValue(true);

// Mock the database and notification modules
vi.mock("./db", () => ({
  createInquiry: (...args: unknown[]) => mockCreateInquiry(...args),
  getInquiries: (...args: unknown[]) => mockGetInquiries(...args),
  getActiveJobPostings: (...args: unknown[]) => mockGetActiveJobPostings(...args),
  getAllJobPostings: (...args: unknown[]) => mockGetAllJobPostings(...args),
  createJobPosting: (...args: unknown[]) => mockCreateJobPosting(...args),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: (...args: unknown[]) => mockNotifyOwner(...args),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAuthContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "test-user",
      email: "test@example.com",
      name: "Test User",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("inquiry.submit", () => {
  it("successfully submits a contact inquiry", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.inquiry.submit({
      firstName: "Max",
      lastName: "Mustermann",
      email: "max@example.com",
      phone: "+49 69 123456",
      company: "Test GmbH",
      subject: "Pensionsgutachten",
      message: "Ich benötige ein Pensionsgutachten für unseren Jahresabschluss.",
      type: "quote",
    });

    expect(result).toEqual({ success: true, id: 1 });
  });

  it("calls notifyOwner with correct title for quote inquiry", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await caller.inquiry.submit({
      firstName: "Max",
      lastName: "Mustermann",
      email: "max@example.com",
      subject: "Pensionsgutachten",
      message: "Ich benötige ein Pensionsgutachten für unseren Jahresabschluss.",
      type: "quote",
    });

    expect(mockNotifyOwner).toHaveBeenCalledTimes(1);
    expect(mockNotifyOwner).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Neue Angebotsanfrage von Max Mustermann",
      })
    );
  });

  it("calls notifyOwner with correct title for contact inquiry", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await caller.inquiry.submit({
      firstName: "Anna",
      lastName: "Schmidt",
      email: "anna@example.com",
      subject: "Allgemeine Frage",
      message: "Ich habe eine allgemeine Frage zu Ihren Dienstleistungen.",
      type: "contact",
    });

    expect(mockNotifyOwner).toHaveBeenCalledTimes(1);
    expect(mockNotifyOwner).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Neue Kontaktanfrage von Anna Schmidt",
      })
    );
  });

  it("includes message content in notification", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await caller.inquiry.submit({
      firstName: "Max",
      lastName: "Mustermann",
      email: "max@example.com",
      subject: "Testbetreff",
      message: "Dies ist meine Testnachricht an GBG Consulting.",
      type: "contact",
    });

    expect(mockNotifyOwner).toHaveBeenCalledWith(
      expect.objectContaining({
        content: expect.stringContaining("Dies ist meine Testnachricht an GBG Consulting."),
      })
    );
  });

  it("still saves inquiry even if notification fails", async () => {
    mockNotifyOwner.mockRejectedValueOnce(new Error("Notification service down"));
    
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.inquiry.submit({
      firstName: "Max",
      lastName: "Mustermann",
      email: "max@example.com",
      subject: "Test",
      message: "Dies ist eine Testnachricht mit genug Zeichen.",
      type: "contact",
    });

    expect(result).toEqual({ success: true, id: 1 });
    expect(mockCreateInquiry).toHaveBeenCalledTimes(1);
  });

  it("validates required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.inquiry.submit({
        firstName: "",
        lastName: "Mustermann",
        email: "max@example.com",
        subject: "Test",
        message: "Dies ist eine Testnachricht mit genug Zeichen.",
        type: "contact",
      })
    ).rejects.toThrow();
  });

  it("validates email format", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.inquiry.submit({
        firstName: "Max",
        lastName: "Mustermann",
        email: "invalid-email",
        subject: "Test",
        message: "Dies ist eine Testnachricht mit genug Zeichen.",
        type: "contact",
      })
    ).rejects.toThrow();
  });

  it("validates message minimum length", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.inquiry.submit({
        firstName: "Max",
        lastName: "Mustermann",
        email: "max@example.com",
        subject: "Test",
        message: "Kurz",
        type: "contact",
      })
    ).rejects.toThrow();
  });
});

describe("inquiry.list", () => {
  it("requires authentication", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.inquiry.list()).rejects.toThrow();
  });

  it("returns inquiries for authenticated users", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.inquiry.list();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("jobs.listActive", () => {
  it("returns active job postings without auth", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.jobs.listActive();
    expect(Array.isArray(result)).toBe(true);
  });
});
