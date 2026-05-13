"use client";
import React, { useEffect, useState } from "react";
import { useSite } from "@/context/SiteContext";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Input, Textarea, Select } from "@/components/ui/Input";
import ImageUpload from "@/components/ui/ImageUpload";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import type { LeadershipProfile } from "@/types";
import { deleteLeader, patchLeader, postLeader } from "./action";
import toast from "react-hot-toast";
import { getBaseUrl } from "@/lib/utils";

const BOARD_OPTIONS = [
  { value: "Board of Directors", label: "Board of Directors" },
  { value: "Management", label: "Management" },
];
const EMPTY: LeadershipProfile = {
  name: "",
  position: "",
  bio: "",
  image: "",
  boardType: "Board of Directors",
  displayOrder: 1,
  showOnSite: true,
};

export default function AdminLeadershipPage() {
  const { siteContent, fetchLeadershipContent } = useSite();
  const [selectedId, setSelectedId] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState<LeadershipProfile>({ ...EMPTY });
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [image, setImage] = useState<File | null>(null);
  const [tab, setTab] = useState<"Board of Directors" | "Management">(
    "Board of Directors",
  );

  const visible = siteContent.leadership
    .map((l, i) => ({ ...l, _index: i }))
    .filter((l) => l.boardType === tab)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const openAdd = () => {
    setForm({ ...EMPTY });
    setEditIndex(null);
    setErrors({});
    setModalOpen(true);
  };
  const openEdit = (idx: number) => {
    setForm({ ...siteContent.leadership[idx] });
    setEditIndex(idx);
    setErrors({});
    setModalOpen(true);
    console.log("idx", idx);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name required";
    if (!form.position.trim()) e.position = "Position required";
    if (!form.bio.trim()) e.bio = "Bio required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setLoading(true);
    const action =
      editIndex != null
        ? patchLeader(form, image, selectedId)
        : postLeader(form, image);
    const res = await action;

    if (res.ok) {
      const toastMessage =
        editIndex == null
          ? "Leader Added Successfully"
          : "Leader Updated Successfully";
      fetchLeadershipContent();
      toast.success(toastMessage);
    }
    if (!res.ok) {
      const toastMessage =
        editIndex == null ? "Leader Failed to Add" : "Leader Failed to Update";
      toast.error(toastMessage);
    }

    setLoading(false);
    setModalOpen(false);
  };

  const handleDelete = async () => {
    setLoading(true);

    const res = await deleteLeader(selectedId);
    if (res.ok) {
      const toastMessage = "Leader Data Deleted Successfully";
      fetchLeadershipContent();
      toast.success(toastMessage);
    }
    if (!res.ok) {
      const toastMessage = "Leader Data Failed to Delete";
      toast.error(toastMessage);
    }
    setLoading(false);
    setDeleteConfirm(null);
  };

  // const toggleVisibility = (idx: number) =>
  //   updateLeader(idx, {
  //     ...siteContent.leadership[idx],
  //     showOnSite: !siteContent.leadership[idx].showOnSite,
  //   });
  // const changeOrder = (idx: number, dir: "up" | "down") => {
  //   const l = siteContent.leadership[idx];
  //   updateLeader(idx, {
  //     ...l,
  //     displayOrder: l.displayOrder + (dir === "up" ? -1 : 1),
  //   });
  // };
  const setF = (k: keyof LeadershipProfile, v: unknown) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (errors[k as string]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  useEffect(() => {
    console.log("selectedId", selectedId);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl text-white">Leadership</h1>
          <p className="text-white/40 text-sm mt-1">
            {siteContent.leadership.length} profiles total
          </p>
        </div>
        <Button variant="primary" onClick={openAdd}>
          <Plus size={14} /> Add Profile
        </Button>
      </div>

      <div className="flex gap-2">
        {(["Board of Directors", "Management"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-[11px] tracking-[0.12em] uppercase px-5 py-2 rounded-full transition-all font-semibold ${tab === t ? "text-black" : "text-white/45 border border-white/10 hover:border-white/25"}`}
            style={
              tab === t
                ? {
                    background: "var(--g400)",
                    boxShadow: "0 0 15px rgba(74,222,128,0.25)",
                  }
                : {}
            }
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((leader) => (
          <div
            key={leader.name}
            className="rounded-xl p-5 space-y-3 transition-opacity"
            style={{
              background: "#0a1a0d",
              border: "1px solid rgba(74,222,128,0.1)",
              opacity: leader.showOnSite ? 1 : 0.5,
            }}
          >
            <div className="flex items-start justify-between">
              <div
                className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(22,163,74,0.25), rgba(37,99,235,0.25))",
                  border: "1.5px solid rgba(74,222,128,0.25)",
                }}
              >
                {leader.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={getBaseUrl() + leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span
                    className="font-display text-xl"
                    style={{ color: "var(--g400)" }}
                  >
                    {leader.name[0]}
                  </span>
                )}
              </div>
              <div className="flex gap-0.5">
                <button
                  // onClick={() => changeOrder(leader._index, "up")}
                  className="p-1 text-white/25 hover:text-white/60 transition-colors"
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  // onClick={() => changeOrder(leader._index, "down")}
                  className="p-1 text-white/25 hover:text-white/60 transition-colors"
                >
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm text-white font-medium">{leader.name}</p>
              <p
                className="text-[10px] tracking-wider uppercase mt-0.5"
                style={{ color: "var(--g500)" }}
              >
                {leader.position}
              </p>
              <p className="text-xs text-white/40 mt-2 line-clamp-2 leading-relaxed">
                {leader.bio}
              </p>
            </div>
            <div className="flex gap-2 pt-1 items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  openEdit(leader._index);
                  setSelectedId(leader.id ?? "");
                }}
              >
                <Pencil size={12} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                // onClick={() => {
                //   toggleVisibility(leader._index);
                //   setSelectedId(leader.id ?? "");
                // }}
              >
                {leader.showOnSite ? (
                  <Eye size={12} style={{ color: "var(--g400)" }} />
                ) : (
                  <EyeOff size={12} />
                )}
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  setDeleteConfirm(leader._index);
                  setSelectedId(leader.id ?? "");
                }}
              >
                <Trash2 size={12} />
              </Button>
              <span className="ml-auto text-[9px] text-white/20">
                Order: {leader.displayOrder}
              </span>
            </div>
          </div>
        ))}
        {visible.length === 0 && (
          <p className="col-span-3 text-white/30 text-sm text-center py-10">
            No profiles in this category
          </p>
        )}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editIndex !== null ? "Edit Profile" : "Add Profile"}
        maxWidth="max-w-lg"
      >
        <div className="space-y-4">
          <ImageUpload
            label="Profile Photo"
            value={form.image}
            onChange={(v) => setF("image", v)}
            previewSize="sm"
            circular
            setImage={setImage}
          />
          <Input
            label="Full Name"
            value={form.name}
            onChange={(e) => setF("name", e.target.value)}
            error={errors.name}
          />
          <Input
            label="Position / Title"
            value={form.position}
            onChange={(e) => setF("position", e.target.value)}
            error={errors.position}
          />
          <Select
            label="Board Type"
            value={form.boardType}
            onChange={(e) =>
              setF(
                "boardType",
                e.target.value as LeadershipProfile["boardType"],
              )
            }
            options={BOARD_OPTIONS}
          />
          <Textarea
            label="Bio"
            value={form.bio}
            onChange={(e) => setF("bio", e.target.value)}
            error={errors.bio}
            rows={4}
          />
          <Input
            label="Display Order"
            type="number"
            value={form.displayOrder}
            onChange={(e) =>
              setF("displayOrder", parseInt(e.target.value) || 1)
            }
          />
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.showOnSite}
              onChange={(e) => setF("showOnSite", e.target.checked)}
              className="accent-[var(--g600)]"
            />
            <span className="text-xs text-white/55">Show on website</span>
          </label>
          <div className="flex gap-3 pt-2">
            <Button
              variant="primary"
              loading={loading}
              onClick={handleSave}
              className="flex-1"
            >
              {editIndex !== null ? "Save Changes" : "Add Profile"}
            </Button>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Profile"
        maxWidth="max-w-sm"
      >
        <div className="text-center space-y-4">
          <p className="text-white/55 text-sm">
            Delete{" "}
            <span className="text-white">
              {deleteConfirm !== null
                ? siteContent.leadership[deleteConfirm]?.name
                : ""}
            </span>
            ?
          </p>
          <div className="flex gap-3">
            <Button
              variant="danger"
              loading={loading}
              onClick={() => deleteConfirm !== null && handleDelete}
              className="flex-1"
            >
              Delete
            </Button>
            <Button
              variant="ghost"
              onClick={() => setDeleteConfirm(null)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
