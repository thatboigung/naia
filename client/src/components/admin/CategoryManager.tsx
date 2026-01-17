import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CategoryManager() {
  const qc = useQueryClient();
  const { data: categories = [], isLoading } = useQuery<any[]>({ queryKey: ["/api/categories"] });
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const create = useMutation(async (body: any) => {
    const res = await apiRequest("POST", "/api/categories", body);
    return res.json();
  }, { onSuccess: () => qc.invalidateQueries(["/api/categories"]) });

  const remove = useMutation(async (id: number) => {
    const res = await apiRequest("DELETE", `/api/categories/${id}`);
    return res.json();
  }, { onSuccess: () => qc.invalidateQueries(["/api/categories"]) });

  const handleCreate = async (e: any) => {
    e.preventDefault();
    if (!name || !slug) return;
    await create.mutateAsync({ name, slug });
    setName(""); setSlug("");
  };

  return (
    <div>
      <h2 className="font-semibold mb-4">Categories</h2>
      <form className="flex gap-2 mb-4" onSubmit={handleCreate}>
        <Input placeholder="Name" value={name} onChange={(e:any)=>setName(e.target.value)} />
        <Input placeholder="slug (url-friendly)" value={slug} onChange={(e:any)=>setSlug(e.target.value)} />
        <Button type="submit">Create</Button>
      </form>

      {isLoading ? <div>Loading...</div> : (
        <div className="space-y-2">
          {categories.map((c: any) => (
            <div key={c.id} className="flex items-center justify-between p-2 border rounded">
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-sm text-muted-foreground">{c.slug}</div>
              </div>
              <div>
                <Button variant="destructive" onClick={() => remove.mutate(Number(c.id))}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
