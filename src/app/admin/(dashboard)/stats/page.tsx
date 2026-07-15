"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  Save,
  Loader2,
  AlertCircle,
  Plus,
  Trash2,
  Users,
  BookOpen,
  GraduationCap,
  Clock,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

interface YearlyGraduate {
  year: string;
  count: number;
  note: string;
  addedAt: string;
}

interface StatsData {
  yearsOfExcellence: number;
  totalStudents: number;
  faculty: number;
  programs: number;
  studentsBase: number;
  yearlyGraduates: YearlyGraduate[];
}

const DEFAULTS: StatsData = {
  yearsOfExcellence: 25,
  totalStudents: 5000,
  faculty: 150,
  programs: 20,
  studentsBase: 5000,
  yearlyGraduates: [],
};

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white border border-gray-200 p-5 shadow-sm">
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3 ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="text-3xl font-bold text-gray-900 tabular-nums">{value.toLocaleString()}+</div>
      <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mt-1">{label}</div>
    </div>
  );
}

export default function AdminStatsPage() {
  const [stats, setStats] = useState<StatsData>(DEFAULTS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingBase, setIsSavingBase] = useState(false);
  const [isAddingGrad, setIsAddingGrad] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; content: string } | null>(null);

  // Edit fields – base stats
  const [editYears, setEditYears] = useState("");
  const [editFaculty, setEditFaculty] = useState("");
  const [editPrograms, setEditPrograms] = useState("");
  const [editStudentsBase, setEditStudentsBase] = useState("");

  // New graduate entry
  const [gradYear, setGradYear] = useState(String(new Date().getFullYear()));
  const [gradCount, setGradCount] = useState("");
  const [gradNote, setGradNote] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/stats");
      const json = await res.json();
      if (json.success) {
        const s = json.stats;
        setStats(s);
        setEditYears(String(s.yearsOfExcellence ?? 25));
        setEditFaculty(String(s.faculty ?? 150));
        setEditPrograms(String(s.programs ?? 20));
        setEditStudentsBase(String(s.studentsBase ?? 5000));
      }
    } catch {
      showMsg("error", "Failed to load stats.");
    } finally {
      setIsLoading(false);
    }
  };

  const showMsg = (type: "success" | "error", content: string) => {
    setMessage({ type, content });
    setTimeout(() => setMessage(null), 4000);
  };

  // ── Save base stats ──────────────────────────────────────────────────────
  const handleSaveBase = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingBase(true);
    try {
      const res = await fetch("/api/stats", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          yearsOfExcellence: Number(editYears),
          faculty: Number(editFaculty),
          programs: Number(editPrograms),
          studentsBase: Number(editStudentsBase),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStats(json.stats);
        showMsg("success", "Stats updated successfully! Homepage will reflect the new values.");
      } else {
        showMsg("error", json.error || "Failed to save.");
      }
    } catch {
      showMsg("error", "Network error. Please try again.");
    } finally {
      setIsSavingBase(false);
    }
  };

  // ── Add yearly graduates ─────────────────────────────────────────────────
  const handleAddGraduates = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradYear || !gradCount || Number(gradCount) <= 0) {
      showMsg("error", "Please enter a valid year and student count.");
      return;
    }
    setIsAddingGrad(true);
    try {
      const res = await fetch("/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year: gradYear,
          count: Number(gradCount),
          note: gradNote,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStats(json.stats);
        setGradCount("");
        setGradNote("");
        showMsg(
          "success",
          `Added ${Number(gradCount).toLocaleString()} graduates for ${gradYear}. New total: ${json.stats.totalStudents.toLocaleString()}+`
        );
      } else {
        showMsg("error", json.error || "Failed to add graduates.");
      }
    } catch {
      showMsg("error", "Network error. Please try again.");
    } finally {
      setIsAddingGrad(false);
    }
  };

  // ── Delete a yearly entry ────────────────────────────────────────────────
  const handleDeleteEntry = async (index: number) => {
    if (!confirm("Remove this entry? The total will be recalculated.")) return;
    try {
      const res = await fetch("/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete_graduate", count: index }),
      });
      const json = await res.json();
      if (json.success) {
        setStats(json.stats);
        showMsg("success", "Entry removed and total recalculated.");
      } else {
        showMsg("error", json.error || "Failed to remove.");
      }
    } catch {
      showMsg("error", "Network error.");
    }
  };

  const yearlyTotal = stats.yearlyGraduates.reduce((s, g) => s + g.count, 0);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2.5">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            Stats Manager
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage the homepage Quick Stats counter — years, students, faculty, and programs.
          </p>
        </div>
        <button
          onClick={fetchStats}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-blue-600 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {/* Status message */}
      {message && (
        <div
          className={`p-4 flex items-center gap-3 border text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300 ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border-green-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          <AlertCircle className="w-5 h-5 shrink-0" />
          {message.content}
        </div>
      )}

      {/* Live Preview Cards */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5" /> Current Live Values
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Clock} label="Years of Excellence" value={stats.yearsOfExcellence} color="bg-indigo-600" />
          <StatCard icon={GraduationCap} label="Total Students" value={stats.totalStudents} color="bg-blue-600" />
          <StatCard icon={Users} label="Faculty Members" value={stats.faculty} color="bg-emerald-600" />
          <StatCard icon={BookOpen} label="Programs Offered" value={stats.programs} color="bg-amber-500" />
        </div>
      </div>

      {/* Base Stats Edit Form */}
      <div className="bg-white border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-800">Edit Base Numbers</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Set direct values for Years, Faculty, and Programs. For Students, set the <strong>base number</strong> — graduates from each year will be added on top.
          </p>
        </div>
        <form onSubmit={handleSaveBase} className="p-6 space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-600 mb-1.5">
                Years of Excellence
              </label>
              <input
                type="number"
                min={0}
                value={editYears}
                onChange={(e) => setEditYears(e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-lg font-bold text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-600 mb-1.5">
                Students Base
              </label>
              <input
                type="number"
                min={0}
                value={editStudentsBase}
                onChange={(e) => setEditStudentsBase(e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-lg font-bold text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
              <p className="text-[10px] text-gray-400 mt-1">
                Base + yearly = {(Number(editStudentsBase) + yearlyTotal).toLocaleString()}
              </p>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-600 mb-1.5">
                Faculty Members
              </label>
              <input
                type="number"
                min={0}
                value={editFaculty}
                onChange={(e) => setEditFaculty(e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-lg font-bold text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-600 mb-1.5">
                Programs Offered
              </label>
              <input
                type="number"
                min={0}
                value={editPrograms}
                onChange={(e) => setEditPrograms(e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-lg font-bold text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSavingBase}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 flex items-center gap-2 text-sm disabled:opacity-50 transition-colors"
            >
              {isSavingBase ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isSavingBase ? "Saving..." : "Save Base Stats"}
            </button>
          </div>
        </form>
      </div>

      {/* Yearly Graduates Section */}
      <div className="bg-white border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            Add Yearly Graduates
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Enter how many students passed/graduated each year. Each entry automatically adds to the total student count.
          </p>
        </div>

        <form onSubmit={handleAddGraduates} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-600 mb-1.5">
                Academic Year *
              </label>
              <input
                type="text"
                value={gradYear}
                onChange={(e) => setGradYear(e.target.value)}
                placeholder="e.g. 2024 or 2023-24"
                className="w-full border border-gray-200 px-3 py-2.5 text-sm font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-600 mb-1.5">
                Students Graduated *
              </label>
              <input
                type="number"
                min={1}
                value={gradCount}
                onChange={(e) => setGradCount(e.target.value)}
                placeholder="e.g. 320"
                className="w-full border border-gray-200 px-3 py-2.5 text-sm font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-600 mb-1.5">
                Note (optional)
              </label>
              <input
                type="text"
                value={gradNote}
                onChange={(e) => setGradNote(e.target.value)}
                placeholder="e.g. B.Com + B.A combined"
                className="w-full border border-gray-200 px-3 py-2.5 text-sm font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {gradCount && Number(gradCount) > 0 && (
            <div className="bg-blue-50 border border-blue-100 px-4 py-3 text-sm text-blue-700 font-medium">
              After adding: Total students will become{" "}
              <strong>{(stats.totalStudents + Number(gradCount)).toLocaleString()}+</strong>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isAddingGrad}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 flex items-center gap-2 text-sm disabled:opacity-50 transition-colors"
            >
              {isAddingGrad ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {isAddingGrad ? "Adding..." : "Add to Total"}
            </button>
          </div>
        </form>

        {/* Graduate History Table */}
        {stats.yearlyGraduates.length > 0 && (
          <div className="border-t border-gray-100">
            <div className="px-6 py-3 bg-gray-50 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Yearly Graduate Log ({stats.yearlyGraduates.length} entries)
              </span>
              <span className="text-xs font-bold text-blue-600">
                Yearly total: +{yearlyTotal.toLocaleString()} students
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">#</th>
                    <th className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Year</th>
                    <th className="text-right px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Graduates</th>
                    <th className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Note</th>
                    <th className="text-right px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Running Total</th>
                    <th className="text-center px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.yearlyGraduates.map((entry, idx) => {
                    const runningTotal =
                      stats.studentsBase +
                      stats.yearlyGraduates.slice(0, idx + 1).reduce((s, g) => s + g.count, 0);
                    return (
                      <tr key={idx} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                        <td className="px-6 py-3 text-gray-400 font-mono text-xs">{idx + 1}</td>
                        <td className="px-6 py-3 font-bold text-gray-800">{entry.year}</td>
                        <td className="px-6 py-3 text-right font-bold text-emerald-700">
                          +{entry.count.toLocaleString()}
                        </td>
                        <td className="px-6 py-3 text-gray-500 text-xs">{entry.note || "—"}</td>
                        <td className="px-6 py-3 text-right font-bold text-blue-700">
                          {runningTotal.toLocaleString()}+
                        </td>
                        <td className="px-6 py-3 text-center">
                          <button
                            onClick={() => handleDeleteEntry(idx)}
                            className="text-red-400 hover:text-red-600 transition-colors p-1"
                            title="Remove entry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {/* Totals row */}
                  <tr className="bg-gray-50 font-bold">
                    <td colSpan={2} className="px-6 py-3 text-xs uppercase tracking-wider text-gray-500">
                      Total from yearly log
                    </td>
                    <td className="px-6 py-3 text-right text-emerald-700">+{yearlyTotal.toLocaleString()}</td>
                    <td />
                    <td className="px-6 py-3 text-right text-blue-700">{stats.totalStudents.toLocaleString()}+</td>
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {stats.yearlyGraduates.length === 0 && (
          <div className="px-6 pb-6 pt-2 text-center text-sm text-gray-400">
            No yearly graduate records yet. Add your first entry above.
          </div>
        )}
      </div>
    </div>
  );
}
