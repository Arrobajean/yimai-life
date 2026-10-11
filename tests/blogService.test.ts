// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { blogService } from "../src/services/blogService";

beforeEach(() => {
  localStorage.clear();
});

describe("blogService", () => {
  it("CRUD: guarda, lee por slug/id y borra", () => {
    const base = blogService.getPosts();
    expect(Array.isArray(base)).toBe(true);

    const post = {
      ...(base[0] ?? {
        title: "Base",
        slug: "base",
        excerpt: "x",
        content: "<p>hola mundo</p>",
        category: "Salud y Bienestar",
        status: "draft",
      }),
      id: "test-id-1",
      title: "Post de prueba",
      slug: "post-de-prueba",
      status: "published",
    } as never;

    const saved = blogService.savePost(post as never);
    expect(blogService.getPostBySlug("post-de-prueba")?.id).toBe("test-id-1");
    expect(blogService.getPostById("test-id-1")?.title).toBe("Post de prueba");
    expect(blogService.getPublishedPosts().some((p) => p.id === "test-id-1")).toBe(true);

    expect(blogService.deletePost("test-id-1")).toBe(true);
    expect(blogService.getPostById("test-id-1")).toBeUndefined();
  });

  it("slugify: tildes, mayusculas y simbolos", () => {
    expect(blogService.generateSlug("Terapia Láser 808nm ¡Guía!")).toBe(
      "terapia-laser-808nm-guia"
    );
    expect(blogService.generateSlug("  Hola   Mundo  ")).toBe("hola-mundo");
  });

  it("borrador: guarda, lee y limpia", () => {
    blogService.saveDraftAuto({ title: "Borrador 1" });
    const draft = blogService.getDraftAuto();
    expect(draft?.title).toBe("Borrador 1");
    expect(draft?.savedAt).toBeDefined();
    blogService.clearDraftAuto();
    expect(blogService.getDraftAuto()).toBeNull();
  });
});
