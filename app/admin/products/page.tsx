"use client";
import React, { useState } from "react";
import { useSite } from "@/context/SiteContext";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Input, Textarea, Select } from "@/components/ui/Input";
import ImageUpload from "@/components/ui/ImageUpload";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import type { Product, ProductCategory } from "@/types";
import { PRODUCT_CATEGORY_LABELS } from "@/lib/constants";

const CAT_OPTIONS = Object.entries(PRODUCT_CATEGORY_LABELS).map(([value, label]) => ({ value, label }));

interface FormState {
  name: string; category: string; tagline: string; description: string;
  alcoholPercent: number | null; origin: string; tasteNotesRaw: string;
  image: string; featured: boolean; isUpcoming: boolean;
}
const EMPTY: FormState = {
  name:"", category:"SOJU", tagline:"", description:"",
  alcoholPercent: 40, origin:"Nepal", tasteNotesRaw:"",
  image:"", featured:false, isUpcoming:false,
};

export default function AdminProductsPage() {
  const { siteContent, addProduct, updateProduct, deleteProduct } = useSite();
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number|null>(null);
  const [form, setForm] = useState<FormState>({ ...EMPTY });
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number|null>(null);
  const [errors, setErrors] = useState<Record<string,string>>({});

  const products = siteContent.products.filter(p => {
    const ms = p.name.toLowerCase().includes(search.toLowerCase());
    const mc = catFilter === "ALL" || p.category === catFilter;
    return ms && mc;
  });

  const openAdd = () => { setForm({ ...EMPTY }); setEditIndex(null); setErrors({}); setModalOpen(true); };
  const openEdit = (idx: number) => {
    const p = siteContent.products[idx];
    setForm({ name:p.name, category:p.category, tagline:p.tagline, description:p.description,
      alcoholPercent:p.alcoholPercent, origin:p.origin, tasteNotesRaw:p.tasteNotes.map(n=>n.label).join(", "),
      image:p.image, featured:p.featured, isUpcoming:p.isUpcoming });
    setEditIndex(idx); setErrors({}); setModalOpen(true);
  };

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.tagline.trim()) e.tagline = "Tagline is required";
    if (!form.description.trim()) e.description = "Description is required";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const product: Product = {
      name:form.name, category:form.category as ProductCategory, tagline:form.tagline,
      description:form.description, alcoholPercent:form.alcoholPercent,
      origin:form.origin, image:form.image, featured:form.featured, isUpcoming:form.isUpcoming,
      tasteNotes: form.tasteNotesRaw.split(",").map(s => ({ label:s.trim() })).filter(n => n.label),
    };
    if (editIndex !== null) { updateProduct(editIndex, product); console.log("Updated product:", product); }
    else { addProduct(product); console.log("Added product:", product); }
    setLoading(false); setModalOpen(false);
  };

  const handleDelete = async (idx: number) => {
    setLoading(true); await new Promise(r => setTimeout(r, 400));
    deleteProduct(idx); console.log("Deleted product at index:", idx);
    setLoading(false); setDeleteConfirm(null);
  };

  const set = (k: keyof FormState, v: unknown) => {
    setForm(p => ({ ...p, [k]:v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]:"" }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl text-white">Products</h1>
          <p className="text-white/40 text-sm mt-1">{siteContent.products.length} total products</p>
        </div>
        <Button variant="primary" onClick={openAdd}><Plus size={14} /> Add Product</Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2 text-sm text-white rounded-sm outline-none"
            style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)" }} />
        </div>
        <select value={catFilter} onChange={e=>setCatFilter(e.target.value)}
          className="bg-[#0a1a0d] border border-white/10 rounded-sm px-3 py-2 text-sm text-white outline-none focus:border-[var(--g500)]">
          <option value="ALL">All Categories</option>
          {CAT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ border:"1px solid rgba(74,222,128,0.1)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background:"#0a1a0d", borderBottom:"1px solid rgba(74,222,128,0.08)" }}>
              {["Image","Name","Category","ABV","Featured","Actions"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] text-white/40 uppercase tracking-widest font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              const ri = siteContent.products.findIndex(p => p.name===product.name && p.category===product.category);
              return (
                <tr key={`${product.name}-${ri}`} style={{ borderBottom:"1px solid rgba(255,255,255,0.04)" }}
                  className="hover:bg-[rgba(74,222,128,0.03)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center"
                      style={{ background:"rgba(34,197,94,0.08)", border:"1px solid rgba(74,222,128,0.15)" }}>
                      {product.image
                        // eslint-disable-next-line @next/next/no-img-element
                        ? <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        : <span className="text-[10px]" style={{ color:"var(--g500)" }}>{product.name[0]}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-white text-xs font-medium">{product.name}</p>
                    <p className="text-white/30 text-[10px] mt-0.5 line-clamp-1">{product.tagline}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[9px] px-2 py-0.5 rounded-full tag-green">{PRODUCT_CATEGORY_LABELS[product.category]}</span>
                  </td>
                  <td className="px-4 py-3 text-white/45 text-xs">{product.alcoholPercent ? `${product.alcoholPercent}%` : "–"}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] ${product.featured ? "text-[var(--g400)]" : "text-white/25"}`}>{product.featured ? "✓ Yes" : "No"}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(ri)}><Pencil size={12} /></Button>
                      <Button variant="danger" size="sm" onClick={() => setDeleteConfirm(ri)}><Trash2 size={12} /></Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {products.length === 0 && <p className="text-center text-white/30 text-sm py-8">No products found</p>}
      </div>

      {/* Add/Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editIndex !== null ? "Edit Product" : "Add Product"} maxWidth="max-w-2xl">
        <div className="space-y-4">
          {/* Image upload */}
          <ImageUpload label="Product Image" value={form.image} onChange={v => set("image", v)} previewSize="md" />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Product Name" value={form.name} onChange={e => set("name",e.target.value)} error={errors.name} placeholder="e.g. SAN SOJU" />
            <Select label="Category" value={form.category} onChange={e => set("category",e.target.value)} options={CAT_OPTIONS} />
          </div>
          <Input label="Tagline" value={form.tagline} onChange={e => set("tagline",e.target.value)} error={errors.tagline} placeholder="Short catchy line" />
          <Textarea label="Description" value={form.description} onChange={e => set("description",e.target.value)} error={errors.description} rows={3} />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Alcohol %" type="number" value={form.alcoholPercent ?? ""} onChange={e => set("alcoholPercent", parseFloat(e.target.value)||null)} placeholder="e.g. 25" />
            <Input label="Origin" value={form.origin} onChange={e => set("origin",e.target.value)} />
          </div>
          <Input label="Taste Notes (comma-separated)" value={form.tasteNotesRaw} onChange={e => set("tasteNotesRaw",e.target.value)} placeholder="Smooth, Crisp, Clean" helpText="Separate each note with a comma" />
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={e => set("featured",e.target.checked)} className="accent-[var(--g600)]" />
              <span className="text-xs text-white/55">Featured Product</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isUpcoming} onChange={e => set("isUpcoming",e.target.checked)} className="accent-[var(--g600)]" />
              <span className="text-xs text-white/55">Upcoming Product</span>
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="primary" loading={loading} onClick={handleSave} className="flex-1">{editIndex !== null ? "Save Changes" : "Add Product"}</Button>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>

      <Modal open={deleteConfirm !== null} onClose={() => setDeleteConfirm(null)} title="Delete Product" maxWidth="max-w-sm">
        <div className="text-center space-y-4">
          <p className="text-white/55 text-sm">Delete <span className="text-white">{deleteConfirm !== null ? siteContent.products[deleteConfirm]?.name : ""}</span>? This cannot be undone.</p>
          <div className="flex gap-3">
            <Button variant="danger" loading={loading} onClick={() => deleteConfirm !== null && handleDelete(deleteConfirm)} className="flex-1">Delete</Button>
            <Button variant="ghost" onClick={() => setDeleteConfirm(null)} className="flex-1">Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
