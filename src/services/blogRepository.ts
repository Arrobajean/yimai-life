import type { BlogPost, BlogCategory } from "../types/blog";
import { blogService } from "./blogService";

/**
 * Abstraccion del almacenamiento del blog (D3=A, demo honesta).
 *
 * Hoy la unica implementacion es `LocalStorageBlogRepository`: los posts
 * viven en `localStorage` del navegador (`yimailife_blog_posts_v1`), sin
 * backend ni autenticacion. Por eso las rutas `/admin/blog*` solo se montan
 * con `VITE_ENABLE_ADMIN_DEMO === 'true'` (ver App.tsx).
 *
 * Si algun dia el blog se conecta a Firebase/Supabase (D3=B), se crea una
 * clase `FirestoreBlogRepository implements BlogRepository` con las mismas
 * firmas y se inyecta aqui, sin tocar las paginas.
 */
export interface BlogRepository {
  getPosts(): BlogPost[];
  getPublishedPosts(): BlogPost[];
  getPostBySlug(slug: string): BlogPost | undefined;
  getPostById(id: string): BlogPost | undefined;
  savePost(post: BlogPost): BlogPost;
  deletePost(id: string): boolean;
  getCategories(): BlogCategory[];
  generateSlug(title: string): string;
}

export class LocalStorageBlogRepository implements BlogRepository {
  getPosts(): BlogPost[] {
    return blogService.getPosts();
  }
  getPublishedPosts(): BlogPost[] {
    return blogService.getPublishedPosts();
  }
  getPostBySlug(slug: string): BlogPost | undefined {
    return blogService.getPostBySlug(slug);
  }
  getPostById(id: string): BlogPost | undefined {
    return blogService.getPostById(id);
  }
  savePost(post: BlogPost): BlogPost {
    return blogService.savePost(post);
  }
  deletePost(id: string): boolean {
    return blogService.deletePost(id);
  }
  getCategories(): BlogCategory[] {
    return blogService.getCategories();
  }
  generateSlug(title: string): string {
    return blogService.generateSlug(title);
  }
}

export const blogRepository: BlogRepository = new LocalStorageBlogRepository();
