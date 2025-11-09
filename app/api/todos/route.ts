import { NextResponse } from "next/server";
import prismadb from "@/lib/db";

export async function GET() {
  const todos = await prismadb.todo.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(
    todos.map((todo) => ({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      createdAt: todo.createdAt,
      date: todo.date,
      groupType: todo.groupType,
    }))
  );
}

export async function POST(req: Request) {
  const { title, date, groupType } = await req.json();

  const todo = await prismadb.todo.create({
    data: { title, date, groupType },
  });

  return NextResponse.json({
    id: todo.id,
    title: todo.title,
    completed: todo.completed,
    createdAt: todo.createdAt,
    date: todo.date,
    groupType: todo.groupType,
  });
}
