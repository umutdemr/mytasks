"use client";

import { useMemo, useState } from "react";
import { useTodoStore } from "@/lib/store/todoStore";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const LABELS = {
  daily: "Günlük",
  weekly: "Haftalık",
  monthly: "Aylık",
};

export default function StatsPage() {
  const { todos } = useTodoStore();
  const [view, setView] = useState<"daily" | "weekly" | "monthly">("daily");

  const tasks = useMemo(() => todos.filter((t) => t.groupType === view), [todos, view]);
  const completedCount = tasks.filter((t) => t.completed).length;
  const successRate = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  const chartData = useMemo(() => {
    const grouped: Record<string, number> = {};

    tasks.forEach((todo) => {
      const date = new Date(todo.createdAt).toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
      });
      grouped[date] = (grouped[date] || 0) + 1;
    });

    return Object.entries(grouped).map(([date, count]) => ({ date, count }));
  }, [tasks]);

  return (
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
      <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
        {Object.keys(LABELS).map((key) => {
          const type = key as typeof view;
          return (
            <button
              key={type}
              onClick={() => setView(type)}
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-xl text-sm border transition whitespace-nowrap ${
                view === type ? "bg-indigo-500 text-white shadow-md" : "bg-white/50 border-gray-300 text-gray-700 hover:border-indigo-500"
              }`}
            >
              {LABELS[type]}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Toplam Görev" value={tasks.length} />
        <StatCard label="Tamamlanan" value={completedCount} valueClass="text-green-600" />
        <StatCard label="Başarı Oranı" value={`${successRate}%`} />
      </div>

      <div className="glass-card p-4 sm:p-5">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{LABELS[view]} Görev Grafiği</h2>

        {chartData.length ? (
          <ResponsiveContainer width="100%" height={240}> 
            <BarChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
              <XAxis dataKey="date" fontSize={12} />
              <YAxis allowDecimals={false} fontSize={12} />
              <Tooltip />
              <Bar dataKey="count" fill="#6A5AF9" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-sm">Grafik verisi bulunmuyor...</p>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  valueClass = "",
}: {
  label: string;
  value: string | number;
  valueClass?: string;
}) {
  return (
    <div className="glass-card p-3 sm:p-4 text-center">
      <p className="text-xs sm:text-sm text-gray-500">{label}</p>
      <h2 className={`text-xl sm:text-2xl font-bold ${valueClass}`}>{value}</h2>
    </div>
  );
}