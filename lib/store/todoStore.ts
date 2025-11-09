import { create } from "zustand";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  date: string;
  groupType: "daily" | "weekly" | "monthly";
}

type Group = "daily" | "weekly" | "monthly";

interface TodoStore {
  todos: Todo[];
  filterGroup: Group;
  setFilterGroup: (group: Group) => void;

  fetchTodos: () => Promise<void>;
  addTodo: (title: string, date: string, groupType: Group) => Promise<void>;
  toggleTodo: (id: string, completed: boolean) => Promise<void>;
  updateTodo: (id: string, title: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

const request = async (url: string, method = "GET", body?: any) =>
  await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  }).then((r) => r.json());

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  filterGroup: "daily",

  setFilterGroup: (group) => set({ filterGroup: group }),

  fetchTodos: async () => {
    const todos = await request("/api/todos");
    set({ todos });
  },

  addTodo: async (title, date, groupType) => {
    const newTodo = await request("/api/todos", "POST", { title, date, groupType });
    set({ todos: [newTodo, ...get().todos] });
  },

  toggleTodo: async (id, completed) => {
    const updated = await request(`/api/todos/${id}`, "PATCH", { completed });
    set({ todos: get().todos.map((t) => (t.id === id ? updated : t)) });
  },

  updateTodo: async (id, title) => {
    const updated = await request(`/api/todos/${id}`, "PATCH", { title });
    set({ todos: get().todos.map((t) => (t.id === id ? updated : t)) });
  },

  deleteTodo: async (id) => {
    await request(`/api/todos/${id}`, "DELETE");
    set({ todos: get().todos.filter((t) => t.id !== id) });
  },
}));
