import { auth } from "@clerk/nextjs/server";
import db from "./drizzle";
import { userProgress, todo } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const getUserProgress = async () => {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId)
    });

    return data;
}

export const getTask = async () => {

    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    const data = await db.query.todo.findMany({
        where: eq(todo.userId, userId)
    });

    return data;
}

export const getOneTask = async (id: string) => {

    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    try{

        const data = await db.query.todo.findFirst({
            where: eq(todo.id,id),
        })

        return data;
    } catch (error){
        return {error: error}
    }


}