"use server";
import db from "@/db/drizzle";
import { getUserProgress } from "@/db/quires";
import { userProgress } from "@/db/schema";
import { auth, currentUser, getAuth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const upsertUserprogress = async () => {

    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
        throw new Error("Unauthorized");
    }

    console.log("kuy");

    const existingUserProgress = await getUserProgress();
    if (existingUserProgress) {
        await db.update(userProgress).set({
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "/mascot.svg",
        })
        revalidatePath("/task");
        return;
    }

    await db.insert(userProgress).values({
        userId: userId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/mascot.svg",
    })

    revalidatePath("/task");
    

}