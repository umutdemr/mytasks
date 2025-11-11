"use client";

import { useState, useEffect, useMemo } from "react";
import { useTodoStore } from "@/lib/store/todoStore";
import { Check, Pencil, Trash2 } from "lucide-react";

const GROUP_LABELS = {
  daily: "Günlük",
  weekly: "Haftalık",
  monthly: "Aylık",
};

export default function Home() {
  const {
    todos,
    fetchTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    filterGroup,
    setFilterGroup,
  } = useTodoStore();

  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const filteredTodos = useMemo(
    () => todos.filter((t) => t.groupType === filterGroup),
    [todos, filterGroup]
  );

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    const percent = total ? Math.round((completed / total) * 100) : 0;
    return { total, active, completed, percent };
  }, [todos]);

  const handleSaveEdit = () => {
    if (editingId && editValue.trim()) updateTodo(editingId, editValue.trim());
    setEditingId(null);
    setEditValue("");
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    addTodo(input.trim(), new Date().toISOString(), filterGroup);
    setInput("");
  };

  return (
    <main className="p-11 space-y-6 md:ml-24 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-3">Görevlerim</h1>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10">
        <div className="space-y-4">
          <StatCard label="Toplam Görev" value={stats.total} />
          <StatCard label="Devam Eden" value={stats.active} />
          <StatCard label="Tamamlanan" value={stats.completed} />
          <ProgressBar label="Görev Tamamlama Oranı" percent={stats.percent} />
        </div>
        <div className="flex flex-col h-full">
          <div className="sticky top-0 bg-[#F7F7FB] z-20 pb-4">
            
            <div className="flex gap-3 mb-4 font-medium">
              {Object.keys(GROUP_LABELS).map((g) => (
                <button
                  key={g}
                  onClick={() => setFilterGroup(g as keyof typeof GROUP_LABELS)}
                  className={`px-4 py-2 rounded-lg ${
                    filterGroup === g ? "tab-active" : "tab-btn"
                  }`}
                >
                  {GROUP_LABELS[g as keyof typeof GROUP_LABELS]}
                </button>
              ))}
            </div>

            <form onSubmit={handleAddTodo} className="flex gap-3">
              <input
                className="input-main flex-1"
                placeholder={`${GROUP_LABELS[filterGroup].toUpperCase()} görev ekle...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button className="btn-primary px-6">Ekle</button>
            </form>
          </div>

          <div className="task-list-container mt-4">
            {filteredTodos.map((todo) => (
              <TaskRow
                key={todo.id}
                todo={todo}
                editingId={editingId}
                editValue={editValue}
                setEditingId={setEditingId}
                setEditValue={setEditValue}
                handleSaveEdit={handleSaveEdit}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="stats-card">
      <span className="stats-number">{value}</span>
      <span className="stats-label">{label}</span>
    </div>
  );
}

function ProgressBar({ label, percent }: { label: string; percent: number }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5">
      <div className="flex justify-between mb-2 text-sm font-medium text-gray-600">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="h-3 rounded-full transition-all duration-500"
          style={{
            width: `${percent}%`,
            background: "linear-gradient(90deg, #6A5AF9, #B46CF9)",
          }}
        />
      </div>
    </div>
  );
}

function TaskRow({
  todo,
  editingId,
  editValue,
  setEditingId,
  setEditValue,
  handleSaveEdit,
  toggleTodo,
  deleteTodo,
}: any) {
  const id = todo.id ?? todo._id;

  return (
    <div className="task-row">
      {editingId === id ? (
        <input
          className="edit-input"
          value={editValue}
          autoFocus
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSaveEdit}
          onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
        />
      ) : (
        <span
          onClick={() => toggleTodo(id, !todo.completed)}
          className={`task-title ${todo.completed ? "line-through text-gray-400" : ""}`}
        >
          {todo.title}
        </span>
      )}

      <div className="task-actions">
        <button onClick={() => { setEditingId(id); setEditValue(todo.title); }}>
          <Pencil size={18} className="text-[#6A5AF9]" />
        </button>
        <button onClick={() => deleteTodo(id)}>
          <Trash2 size={18} className="text-[#FF6A6A]" />
        </button>
        <button onClick={() => toggleTodo(id, !todo.completed)}>
          <Check size={20} className={todo.completed ? "text-green-400" : "text-gray-400"} />
        </button>
      </div>
    </div>
  );
}
