"use server";
import { z } from "zod";
import { todoSchema } from "./todo-schema";
import { uuid } from 'uuidv4';
import { auth, currentUser } from "@clerk/nextjs/server";
import { todo } from "@/db/schema";
import db from "@/db/drizzle";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";


export const addTask = async (values: z.infer<typeof todoSchema>) => {

    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
        throw new Error("Unauthorized");
    }

    const id = uuid();

    try {

        await db.insert(todo).values({
            id: id,
            userId: userId,
            text: values.text,
            status: "pending"
        })
        revalidatePath("/task");
        return { success: "success" };
    } catch (error) {
        return { error: error }
    }

}


export const deleteTask = async (id: string) => {

    try {
        await db.delete(todo).where(eq(todo.id, id));
        revalidatePath("/task");
        return { success: "success" }
    } catch (error) {
        return { error: error }
    }


}


export const markTask = async (id: string, func: typeof todo.$inferSelect["status"]) => {


    try {
        await db.update(todo)
        .set({status: func})
        .where(eq(todo.id, id));
        revalidatePath("/task");
        return { success: "success" }
    } catch (error) {
        return { error: error }
    }
}

