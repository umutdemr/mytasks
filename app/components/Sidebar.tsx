"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved) setCollapsed(saved === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", String(collapsed));
  }, [collapsed]);

  const navItems = [
    { label: "Görevlerim", href: "/", icon: <List size={18} /> },
    { label: "Tamamladıklarım", href: "/completed", icon: <CheckCircle size={18} /> },
  ];

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""} hidden md:flex flex-col relative`}>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 z-50 w-7 h-7 flex items-center justify-center 
                   bg-white shadow-md rounded-full hover:bg-gray-100 transition"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      <div className="logo">
        <div className="badge">MT</div>
        {!collapsed && (
          <div>
            <div className="text-lg font-semibold">My Tasks</div>
            <div className="text-xs text-gray-500">Manage your tasks</div>
          </div>
        )}
      </div>

      <nav className="mt-6 flex flex-col space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-link ${pathname === item.href ? "active" : ""}`}
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
