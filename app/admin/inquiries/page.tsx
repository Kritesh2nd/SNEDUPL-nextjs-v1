"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSite } from "@/context/SiteContext";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Trash2, Mail, MailOpen, Search } from "lucide-react";
import { deleteInquirie, getInquirie, readInquirie } from "./action";
import Pagination from "@/components/ui/Pagination";
import { Inquiry, ResponseDto } from "@/types";
const PER_PAGE = 10;

interface ApiMeta {
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}

export default function AdminInquiriesPage() {
  const { inquiries, setInquiries } = useSite();

  const [search, setSearch] = useState("");
  const [filterRead, setFilterRead] = useState<"all" | "unread" | "read">(
    "all",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState<ApiMeta | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selected, setSelected] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // ─── Fetch ──────────────────────────────────────────────────────────────────
  const getTotalPages = (limit: number, totalItems: number): number => {
    return Math.ceil(totalItems / limit);
  };
  const fetchData = useCallback(
    async (page: number, searchTerm: string, readFilter: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const query = new URLSearchParams();
        query.set("page", String(page));
        query.set("limit", String(PER_PAGE));
        if (searchTerm.trim()) query.set("search", searchTerm.trim());
        if (readFilter !== "all")
          query.set("read", readFilter === "read" ? "true" : "false");

        const res = await getInquirie(query.toString());
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);

        const json: ResponseDto<Inquiry> = await res.json();
        // const
        setInquiries(json.data);
        const meta: ApiMeta = {
          total: json.metadata.totalItems,
          totalPages: getTotalPages(
            json.metadata.limit ?? 0,
            json.metadata.totalItems,
          ),
          page: json.metadata.page ?? 0,
          limit: json.metadata.limit ?? 0,
        };
        setMeta(meta);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [setInquiries],
  );

  useEffect(() => {
    fetchData(currentPage, search, filterRead);
  }, [currentPage, search, filterRead, fetchData]);

  // ─── Handlers ───────────────────────────────────────────────────────────────

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleFilterRead = (value: "all" | "unread" | "read") => {
    setFilterRead(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpen = async (index: number) => {
    setSelected(index);
    const inq = inquiries[index];
    if (!inq.read && inq.id) {
      try {
        const res = await readInquirie(String(inq.id));
        if (res.ok) {
          // optimistically mark read in local state — no refetch needed
          setInquiries(
            inquiries.map((q, i) => (i === index ? { ...q, read: true } : q)),
          );
        }
      } catch {
        // non-critical, silently ignore
      }
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    setActionLoading(true);
    try {
      const res = await deleteInquirie(deleteConfirm);
      if (!res.ok) throw new Error("Delete failed");
      // refetch so list + counts + pagination stay accurate
      await fetchData(currentPage, search, filterRead);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setActionLoading(false);
      setDeleteConfirm(null);
      setSelected(null);
    }
  };

  const unreadCount = inquiries.filter((q) => !q.read).length;

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl text-white">Inquiries</h1>
          <p className="text-white/40 text-sm mt-1">
            {meta ? meta.total : inquiries.length} total
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
      <div className="flex">
        <div className="relative  min-w-50 w-125">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
          />
          <input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by name or subject…"
            className="w-full pl-9 pr-4 py-2 text-sm text-white rounded-sm outline-none"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          />
        </div>
        <div></div>
        <div className="flex gap-1 hidden">
          {(["all", "unread", "read"] as const).map((f) => (
            <button
              key={f}
              onClick={() => handleFilterRead(f)}
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
      {/* Error */}
      {error && <p className="text-sm text-red-400">{error}</p>}
      {/* List */}
      <div className="space-y-2">
        {isLoading
          ? Array.from({ length: PER_PAGE }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl px-4 py-4 animate-pulse"
                style={{
                  background: "rgba(10,26,13,0.6)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  height: 64,
                }}
              />
            ))
          : inquiries.map((inq, i) => (
              <div
                key={inq.id ?? i}
                onClick={() => handleOpen(i)}
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
                    {inq.createdAt
                      ? new Date(inq.createdAt).toLocaleDateString()
                      : new Date().toLocaleDateString()}
                  </p>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirm(String(inq.id));
                    }}
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
              </div>
            ))}

        {!isLoading && inquiries.length === 0 && (
          <div className="text-center py-16 text-white/25">
            <Mail size={32} className="mx-auto mb-3 opacity-25" />
            <p className="text-sm">No inquiries found</p>
          </div>
        )}
      </div>
      {/* Pagination */}
      pagination code {meta?.page ?? 0}
      {meta && meta.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={meta.totalPages}
          totalItems={meta.total}
          perPage={PER_PAGE}
          onPageChange={handlePageChange}
          isLoading={isLoading}
        />
      )}
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
              {new Date(
                inquiries[selected].createdAt ?? new Date(),
              ).toLocaleString()}
            </p>
            <div className="flex gap-3 pt-2">
              <Button
                variant="danger"
                onClick={() =>
                  setDeleteConfirm(String(inquiries[selected!].id))
                }
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
      {/* Delete confirm modal */}
      <Modal
        open={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Inquiry"
        maxWidth="max-w-sm"
      >
        <div className="text-center space-y-4">
          <p className="text-white/55 text-sm">
            Are you sure you want to delete this inquiry? This cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button
              variant="danger"
              loading={actionLoading}
              onClick={handleDelete}
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
