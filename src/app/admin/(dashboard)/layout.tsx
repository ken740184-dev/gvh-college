import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { LayoutDashboard, Newspaper, Calendar, Megaphone, Image as ImageIcon, Users, LogOut, Trophy } from "lucide-react";
import MobileHeader from "@/components/admin/MobileHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // If no session exists, forcefully redirect them to the login page!
  if (!session) {
    redirect("/admin/login");
  }

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "News", href: "/admin/news", icon: Newspaper },
    { name: "Achievements", href: "/admin/achievements", icon: Trophy },
    { name: "Events", href: "/admin/events", icon: Calendar },
    { name: "Announcements", href: "/admin/announcements", icon: Megaphone },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Faculty", href: "/admin/faculty", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      {/* Sidebar — fixed, full height from top */}
      <aside className="hidden md:flex w-64 border-r border-gray-200 bg-white flex-col fixed inset-y-0 left-0 z-20">
        {/* Sidebar header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-black tracking-tight text-slate-900">GVH</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border border-slate-200 px-1.5 py-0.5">CMS</span>
          </div>
          <p className="text-xs text-gray-400 truncate">{session.user?.email}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-slate-900 hover:bg-gray-100 transition-colors rounded-md"
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <a
            href="/api/auth/signout"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            Sign Out
          </a>
        </div>
      </aside>

      {/* Main content — offset by sidebar width */}
      <main className="flex-1 md:ml-64 min-h-screen overflow-x-hidden">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-sm font-semibold text-slate-900">Admin Dashboard</h1>
            <p className="text-xs text-gray-400 mt-0.5">GVH College CMS</p>
          </div>
          <span className="text-xs text-gray-400 hidden sm:block">{session.user?.email}</span>
        </header>

        <div className="p-4 md:p-8">
          <MobileHeader />
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
