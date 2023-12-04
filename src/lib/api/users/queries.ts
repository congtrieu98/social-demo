import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";

export const getUsers = async () => {
    const { session } = await getUserAuth();
    //@ts-ignore
    const u = await db.user.findMany({ 
        where: { id: { not: session?.user.id } },
        // @ts-ignore
        include: { follows: true, followers: true } 
    });
    return { users: u };
};