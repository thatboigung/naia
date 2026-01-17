import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ListingManager() {
  const qc = useQueryClient();
  const { data: categories = [] } = useQuery<any[]>({ queryKey: ["/api/categories"] });
  const { data: products = [], isLoading } = useQuery<any[]>({ queryKey: ["/api/products"] });

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const create = useMutation(async (body: any) => {
    const res = await apiRequest("POST", "/api/products", body);
    return res.json();
  }, { onSuccess: () => qc.invalidateQueries(["/api/products"]) });

  const remove = useMutation(async (id: number) => {
    const res = await apiRequest("DELETE", `/api/products/${id}`);
    return res.json();
  }, { onSuccess: () => qc.invalidateQueries(["/api/products"]) });

  const handleCreate = async (e: any) => {
    e.preventDefault();
    if (!name || !price || !categoryId) return;
    await create.mutateAsync({ name, price: String(price), categoryId });
    setName(""); setPrice(""); setCategoryId(null);
  };

  return (
    <div>
      <h2 className="font-semibold mb-4">Listings</h2>
      <form className="flex gap-2 mb-4" onSubmit={handleCreate}>
        <Input placeholder="Name" value={name} onChange={(e:any)=>setName(e.target.value)} />
        <Input placeholder="Price" value={price} onChange={(e:any)=>setPrice(e.target.value)} />
        <select className="px-3 py-2 rounded border" value={categoryId ?? ""} onChange={(e:any)=>setCategoryId(e.target.value ? Number(e.target.value) : null)}>
          <option value="">Select category</option>
          {categories.map((c:any)=> <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <Button type="submit">Create</Button>
      </form>

      {isLoading ? <div>Loading...</div> : (
        <div className="space-y-2">
          {products.map((p:any)=> (
            <div key={p.id} className="flex items-center justify-between p-2 border rounded">
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-muted-foreground">${p.price}</div>
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
