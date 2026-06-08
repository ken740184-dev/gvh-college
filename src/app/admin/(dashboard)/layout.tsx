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
    <div className="min-h-screen bg-gray-50 text-gray-900 flex pt-[88px]">
      {/* Sidebar Navigation - Hidden on Mobile */}
      <aside className="hidden md:flex w-64 border-r border-gray-200 bg-white flex-col fixed h-[calc(100vh-88px)] z-20">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            GVH CMS
          </h2>
          <p className="text-xs text-gray-500 mt-1 truncate">Logged in as {session.user?.email}</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <a
            href="/api/auth/signout"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-0 md:ml-64 p-4 md:p-8 overflow-x-hidden">
        <MobileHeader />
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
