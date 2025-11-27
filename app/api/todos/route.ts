import { NextResponse } from "next/server";
import prismadb from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get("start");
  const endDate = searchParams.get("end");
  const completed = searchParams.get("completed"); 
  const groupType = searchParams.get("groupType");
  const where: any = {};

  if (startDate && endDate) {
    const start = new Date(`${startDate}T00:00:00.000Z`);
    const end = new Date(`${endDate}T23:59:59.999Z`);
    where.createdAt = { gte: start, lte: end };
  }

    if (completed !== null) {
    where.completed = completed === "true";
  }
  
  if (groupType) {
    where.groupType = groupType;
  }

  const todos = await prismadb.todo.findMany({
    where,
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
