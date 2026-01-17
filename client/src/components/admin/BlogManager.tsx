import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BlogManager() {
  const qc = useQueryClient();
  const { data: posts = [], isLoading } = useQuery<any[]>({ queryKey: ["/api/blog"] });
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");

  const create = useMutation(async (body: any) => {
    const res = await apiRequest("POST", "/api/blog", body);
    return res.json();
  }, { onSuccess: () => qc.invalidateQueries(["/api/blog"]) });

  const remove = useMutation(async (id: number) => {
    const res = await apiRequest("DELETE", `/api/blog/${id}`);
    return res.json();
  }, { onSuccess: () => qc.invalidateQueries(["/api/blog"]) });

  const handleCreate = async (e:any) => {
    e.preventDefault();
    if (!title || !excerpt) return;
    await create.mutateAsync({ title, excerpt, content: excerpt, author: "Geraldin" });
    setTitle(""); setExcerpt("");
  };

  return (
    <div>
      <h2 className="font-semibold mb-4">Blog Posts</h2>
      <form className="flex gap-2 mb-4" onSubmit={handleCreate}>
        <Input placeholder="Title" value={title} onChange={(e:any)=>setTitle(e.target.value)} />
        <Input placeholder="Excerpt" value={excerpt} onChange={(e:any)=>setExcerpt(e.target.value)} />
        <Button type="submit">Create</Button>
      </form>

      {isLoading ? <div>Loading...</div> : (
        <div className="space-y-2">
          {posts.map((p:any)=> (
            <div key={p.id} className="flex items-center justify-between p-2 border rounded">
              <div>
                <div className="font-medium">{p.title}</div>
                <div className="text-sm text-muted-foreground">{p.excerpt}</div>
              </div>
              <div>
                <Button variant="destructive" onClick={()=>remove.mutate(Number(p.id))}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
