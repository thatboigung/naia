import { categories, products, blogPosts, artistProfile } from "./mockData";

type MockResponse = {
  ok: boolean;
  status: number;
  json: () => Promise<any>;
  text: () => Promise<string>;
};

export async function handleMockRequest(method: string, url: string, data?: unknown): Promise<MockResponse> {
  const m = method.toUpperCase();
  const parts = url.replace(/^\/+/, "").split("/"); // e.g. ["api","categories","1"]

  // Simple helpers
  const idFromParts = () => (parts.length >= 3 ? Number(parts[2]) : undefined);
  const jsonOk = (obj: any) => ({ ok: true, status: 200, json: async () => obj, text: async () => JSON.stringify(obj) });
  const notFound = { ok: false, status: 404, json: async () => ({ message: "Not found (mock)" }), text: async () => JSON.stringify({ message: "Not found (mock)" }) };

  if (parts[1] === "categories") {
    const id = idFromParts();
    if (m === "GET") {
      if (id) {
        const found = categories.find((c: any) => c.id === id);
        return found ? jsonOk(found) : notFound;
      }
      return jsonOk(categories);
    }

    if (m === "POST") {
      const body = (data || {}) as any;
      const nextId = (categories.length ? Math.max(...categories.map((c: any) => c.id)) : 0) + 1;
      const newCat = { id: nextId, ...body };
      categories.push(newCat);
      return jsonOk(newCat);
    }

    if ((m === "PUT" || m === "PATCH") && id) {
      const body = (data || {}) as any;
      const idx = categories.findIndex((c: any) => c.id === id);
      if (idx === -1) return notFound;
      categories[idx] = { ...categories[idx], ...body };
      return jsonOk(categories[idx]);
    }

    if (m === "DELETE" && id) {
      const idx = categories.findIndex((c: any) => c.id === id);
      if (idx === -1) return notFound;
      const removed = categories.splice(idx, 1)[0];
      return jsonOk(removed);
    }
  }

  if (parts[1] === "products") {
    const id = idFromParts();
    if (m === "GET") {
      if (id) {
        const found = products.find((p: any) => p.id === id);
        return found ? jsonOk(found) : notFound;
      }
      return jsonOk(products);
    }

    if (m === "POST") {
      const body = (data || {}) as any;
      const nextId = (products.length ? Math.max(...products.map((p: any) => p.id)) : 0) + 1;
      const newProd = { id: nextId, ...body };
      products.push(newProd);
      return jsonOk(newProd);
    }

    if ((m === "PUT" || m === "PATCH") && id) {
      const body = (data || {}) as any;
      const idx = products.findIndex((p: any) => p.id === id);
      if (idx === -1) return notFound;
      products[idx] = { ...products[idx], ...body };
      return jsonOk(products[idx]);
    }

    if (m === "DELETE" && id) {
      const idx = products.findIndex((p: any) => p.id === id);
      if (idx === -1) return notFound;
      const removed = products.splice(idx, 1)[0];
      return jsonOk(removed);
    }
  }

  if (parts[1] === "blog") {
    const id = idFromParts();
    if (m === "GET") {
      if (id) {
        const found = blogPosts.find((b: any) => b.id === id);
        return found ? jsonOk(found) : notFound;
      }
      return jsonOk(blogPosts);
    }

    if (m === "POST") {
      const body = (data || {}) as any;
      const nextId = (blogPosts.length ? Math.max(...blogPosts.map((b: any) => b.id)) : 0) + 1;
      const newPost = { id: nextId, ...body };
      blogPosts.push(newPost);
      return jsonOk(newPost);
    }

    if ((m === "PUT" || m === "PATCH") && id) {
      const body = (data || {}) as any;
      const idx = blogPosts.findIndex((b: any) => b.id === id);
      if (idx === -1) return notFound;
      blogPosts[idx] = { ...blogPosts[idx], ...body };
      return jsonOk(blogPosts[idx]);
    }

    if (m === "DELETE" && id) {
      const idx = blogPosts.findIndex((b: any) => b.id === id);
      if (idx === -1) return notFound;
      const removed = blogPosts.splice(idx, 1)[0];
      return jsonOk(removed);
    }
  }

  if (parts[1] === "artist") {
    if (m === "GET") return jsonOk(artistProfile);
    if (m === "PUT" || m === "PATCH") {
      const body = (data || {}) as any;
      Object.assign(artistProfile, body);
      return jsonOk(artistProfile);
    }
  }

  return notFound;
}
