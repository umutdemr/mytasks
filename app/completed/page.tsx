"use client";

import { useEffect, useMemo, useState } from "react";
import { useTodoStore } from "@/lib/store/todoStore";
import { CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"; 

const Modal = ({ open, onClose, children }: any) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl animate-fadeIn">
        {children}
        <button
          onClick={onClose}
          className="w-full mt-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
        >
          Kapat
        </button>
      </div>
    </div>
  );
};

export default function CompletedPage() {
  const { todos, fetchTodos, toggleTodo, filterGroup, setFilterGroup } =
    useTodoStore();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.completed && todo.groupType === filterGroup),
    [todos, filterGroup]
  );

  const stats = useMemo(() => {
    const totalInGroup = todos.filter((t) => t.groupType === filterGroup).length;
    const completed = completedTodos.length;
    const percent = totalInGroup ? Math.round((completed / totalInGroup) * 100) : 0;
    return { totalInGroup, completed, percent };
  }, [todos, filterGroup, completedTodos]);

  const chartData = useMemo(() => {
    const grouped: Record<string, number> = {};
    completedTodos.forEach((todo) => {
      const day = new Date(todo.createdAt).toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
      });
      grouped[day] = (grouped[day] || 0) + 1;
    });

    return Object.entries(grouped).map(([date, count]) => ({ date, count }));
  }, [completedTodos]);

  return (
    <div className="p-4 sm:p-6 fade-in space-y-6"> 
      <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center">
        Tamamlanan Görevler
      </h1>
      <div className="flex justify-center gap-2 sm:gap-3 mb-6 flex-wrap">
        {["daily", "weekly", "monthly"].map((g) => (
          <button
            key={g}
            className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm border transition whitespace-nowrap ${
              filterGroup === g ? "bg-[#6A5AF9] text-white shadow-md" : "bg-white border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => setFilterGroup(g as typeof filterGroup)}
          >
            {g === "daily" && "Günlük"}
            {g === "weekly" && "Haftalık"}
            {g === "monthly" && "Aylık"}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 sm:mb-10">
        <StatCard label="Bu Kategoride Toplam" value={stats.totalInGroup} />
        <StatCard label="Tamamlanan" value={stats.completed} valueClass="text-green-600" />
        <StatCard label="Başarı Oranı" value={`${stats.percent}%`} />
      </div>
      <div className="glass-card p-4 sm:p-5 flex flex-col md:flex-row justify-between items-start gap-4 md:gap-8 mb-8 sm:mb-10">
        <div className="w-full md:w-3/5"> 
          <h2 className="text-md sm:text-lg font-semibold mb-3">
             {filterGroup === "daily" && "Günlük Tamamlama Grafiği"}
             {filterGroup === "weekly" && "Haftalık Tamamlama Grafiği"}
             {filterGroup === "monthly" && "Aylık Tamamlama Grafiği"}          
          </h2>
          
          {chartData.length ? (
            <div className="w-full h-[200px] sm:h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <XAxis dataKey="date" fontSize={10} />
                        <YAxis allowDecimals={false} fontSize={10} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#6A5AF9" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Henüz tamamlama verisi yok...</p>
          )}
        </div>
        <div className="w-full md:w-auto md:mt-8">
            <button
                onClick={() => setShowModal(true)}
                className="w-full md:w-auto px-4 py-2 text-sm rounded-lg bg-[#6A5AF9] text-white shadow hover:opacity-90 transition font-medium"
            >
                Tamamlananları Göster
            </button>
        </div>
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <h3 className="text-lg font-bold mb-4 text-center">Tamamlanan Görevler</h3>
        <ul className="space-y-3">
          {completedTodos.map((todo) => (
            <li
              key={todo.id}
              className="task-card p-3 rounded-lg flex justify-between items-center bg-gray-50 border border-gray-100"
            >
              <span className="line-through text-gray-500 text-sm">{todo.title}</span>
              <button onClick={() => toggleTodo(todo.id, false)} className="p-1 rounded-full hover:bg-red-50 transition">
                <CheckCircle size={18} className="text-green-500" />
              </button>
            </li>
          ))}
        </ul>
      </Modal>
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