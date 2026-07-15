import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { Newspaper, Calendar, Megaphone, Image as ImageIcon, Users, LogOut, Trophy, BarChart3 } from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  const navigationCards = [
    { name: "Manage News", href: "/admin/news", icon: Newspaper, desc: "Add or edit college news articles" },
    { name: "Manage Achievements", href: "/admin/achievements", icon: Trophy, desc: "Celebrate and update student/faculty achievements" },
    { name: "Manage Events", href: "/admin/events", icon: Calendar, desc: "Schedule upcoming campus events" },
    { name: "Announcements", href: "/admin/announcements", icon: Megaphone, desc: "Post critical alerts and notices" },
    { name: "Gallery Builder", href: "/admin/gallery", icon: ImageIcon, desc: "Create visual layout blocks" },
    { name: "Faculty Roster", href: "/admin/faculty", icon: Users, desc: "Update staff and department info" },
    { name: "Stats Manager", href: "/admin/stats", icon: BarChart3, desc: "Update homepage counters & yearly graduate records" },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-black">App Hub</h1>
          <p className="text-gray-600">Welcome back, <span className="font-bold text-blue-700">{session?.user?.name || session?.user?.email || "Admin"}</span>.</p>
        </div>
        
        {/* Mobile Sign Out Button */}
        <div className="md:hidden">
          <a
            href="/api/auth/signout"
            className="flex items-center gap-2 px-4 py-2.5 bg-black text-white rounded-xl hover:bg-blue-700 font-bold w-max shadow-md transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {navigationCards.map((card) => (
          <Link 
            key={card.name} 
            href={card.href}
            className="group block p-6 rounded-2xl bg-white border-2 border-gray-200 transition-all duration-300 hover:border-blue-700 hover:shadow-xl hover:shadow-blue-900/10 hover:-translate-y-1"
          >
            <div className="bg-gray-50 w-14 h-14 rounded-xl flex items-center justify-center mb-4 border border-gray-200 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform group-hover:bg-blue-50 group-hover:border-blue-200">
              <card.icon className="w-7 h-7 text-black group-hover:text-blue-700 transition-colors" />
            </div>
            <h2 className="text-xl font-bold mb-1 text-black group-hover:text-blue-700 transition-colors">{card.name}</h2>
            <p className="text-gray-500 text-sm font-medium">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
