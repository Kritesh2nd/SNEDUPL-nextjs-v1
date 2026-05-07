"use client";
import React, { useState } from "react";
import { useSite } from "@/context/SiteContext";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Trash2, Mail, MailOpen, Search } from "lucide-react";

export default function AdminInquiriesPage() {
  const { inquiries, markInquiryRead, deleteInquiry } = useSite();
  const [selected, setSelected] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [filterRead, setFilterRead] = useState<"all" | "unread" | "read">(
    "all",
  );
  const [loading, setLoading] = useState(false);

  const filtered = inquiries
    .map((q, i) => ({ ...q, _index: i }))
    .filter((q) => {
      const ms =
        q.name.toLowerCase().includes(search.toLowerCase()) ||
        q.subject.toLowerCase().includes(search.toLowerCase());
      const mr =
        filterRead === "all" ||
        (filterRead === "unread" && !q.read) ||
        (filterRead === "read" && q.read);
      return ms && mr;
    });

  const handleOpen = (i: number) => {
    setSelected(i);
    if (!inquiries[i].read) markInquiryRead(i);
  };

  const handleDelete = async (idx: number) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    deleteInquiry(idx);
    console.log("Deleted inquiry at index:", idx);
    setLoading(false);
    setDeleteConfirm(null);
    setSelected(null);
  };

  const unreadCount = inquiries.filter((q) => !q.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl text-white">Inquiries</h1>
          <p className="text-white/40 text-sm mt-1">
            {inquiries.length} total
            {unreadCount > 0 && (
              <span
                className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold text-black"
                style={{ background: "var(--g400)" }}
              >
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or subject…"
            className="w-full pl-9 pr-4 py-2 text-sm text-white rounded-sm outline-none"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          />
        </div>
        <div className="flex gap-1">
          {(["all", "unread", "read"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilterRead(f)}
              className={`text-xs px-3 py-2 rounded-sm capitalize transition-all font-medium ${
                filterRead === f
                  ? "text-black"
                  : "text-white/40 border border-white/10 hover:border-white/25"
              }`}
              style={filterRead === f ? { background: "var(--g400)" } : {}}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-2">
        {filtered.map((inq) => (
          <div
            key={inq._index}
            onClick={() => handleOpen(inq._index)}
            className="rounded-xl px-4 py-4 flex items-center gap-4 cursor-pointer transition-all hover:scale-[1.005]"
            style={{
              background: inq.read ? "rgba(10,26,13,0.6)" : "#0a1a0d",
              border: `1px solid ${inq.read ? "rgba(255,255,255,0.05)" : "rgba(74,222,128,0.2)"}`,
            }}
          >
            <div className="flex-shrink-0">
              {inq.read ? (
                <MailOpen size={16} className="text-white/25" />
              ) : (
                <Mail size={16} style={{ color: "var(--g400)" }} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p
                  className={`text-sm truncate ${inq.read ? "text-white/55" : "text-white font-medium"}`}
                >
                  {inq.name}
                </p>
                {!inq.read && (
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 pulse-glow"
                    style={{ background: "var(--g400)" }}
                  />
                )}
              </div>
              <p className="text-xs text-white/35 truncate mt-0.5">
                {inq.subject}
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
              <p className="text-xs text-white/20">
                {new Date(inq.createdAt).toLocaleDateString()}
              </p>
              <Button
                variant="danger"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteConfirm(inq._index);
                }}
              >
                <Trash2 size={12} />
              </Button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-white/25">
            <Mail size={32} className="mx-auto mb-3 opacity-25" />
            <p className="text-sm">No inquiries found</p>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected !== null && inquiries[selected] && (
        <Modal
          open={selected !== null}
          onClose={() => setSelected(null)}
          title="Inquiry Details"
          maxWidth="max-w-lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="glass rounded-lg p-3">
                <p className="text-[10px] text-white/35 uppercase tracking-wider">
                  From
                </p>
                <p className="text-sm text-white mt-1">
                  {inquiries[selected].name}
                </p>
              </div>
              <div className="glass rounded-lg p-3">
                <p className="text-[10px] text-white/35 uppercase tracking-wider">
                  Email
                </p>
                <p className="text-xs text-white mt-1 break-all">
                  {inquiries[selected].email}
                </p>
              </div>
            </div>
            {inquiries[selected].phone && (
              <div className="glass rounded-lg p-3">
                <p className="text-[10px] text-white/35 uppercase tracking-wider">
                  Phone
                </p>
                <p className="text-sm text-white mt-1">
                  {inquiries[selected].phone}
                </p>
              </div>
            )}
            <div className="glass rounded-lg p-3">
              <p className="text-[10px] text-white/35 uppercase tracking-wider mb-1">
                Subject
              </p>
              <p className="text-sm text-white">
                {inquiries[selected].subject}
              </p>
            </div>
            <div className="glass-green rounded-lg p-4">
              <p className="text-[10px] text-white/35 uppercase tracking-wider mb-2">
                Message
              </p>
              <p className="text-sm text-white/65 leading-relaxed">
                {inquiries[selected].message}
              </p>
            </div>
            <p className="text-xs text-white/20">
              Received:{" "}
              {new Date(inquiries[selected].createdAt).toLocaleString()}
            </p>
            <div className="flex gap-3 pt-2">
              <Button
                variant="danger"
                onClick={() => {
                  setDeleteConfirm(selected);
                }}
                className="flex-1"
              >
                <Trash2 size={12} /> Delete
              </Button>
              <Button
                variant="ghost"
                onClick={() => setSelected(null)}
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete confirm */}
      <Modal
        open={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Inquiry"
        maxWidth="max-w-sm"
      >
        <div className="text-center space-y-4">
          <p className="text-white/55 text-sm">
            Delete inquiry from{" "}
            <span className="text-white">
              {deleteConfirm !== null ? inquiries[deleteConfirm]?.name : ""}
            </span>
            ?
          </p>
          <div className="flex gap-3">
            <Button
              variant="danger"
              loading={loading}
              onClick={() =>
                deleteConfirm !== null && handleDelete(deleteConfirm)
              }
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
