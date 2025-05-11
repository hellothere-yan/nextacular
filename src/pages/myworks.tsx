// src/pages/myworks.tsx

import { GetServerSideProps } from 'next';
import { getAuth } from "@clerk/nextjs/server"; // ✅ 使用这个
import prisma from "@/prisma/index";
import React from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { userId } = getAuth(context.req); // ✅ 正确用法

    if (!userId) {
        return {
            redirect: {
                destination: "/sign-in",
                permanent: false,
            },
        };
    }

    const works = await prisma.works.findMany({
        where: { user_id: userId },
        orderBy: { created_at: "desc" },
    });

    return {
        props: {
            works,
        },
    };
};

export default function MyWorksPage({ works }: { works: any[] }) {
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">我的作品</h1>
            {works.length === 0 ? (
                <p>你还没有作品。</p>
            ) : (
                <ul className="space-y-2">
                    {works.map((work) => (
                        <li key={work.id} className="border p-3 rounded">
                            <h2 className="font-semibold">{work.title}</h2>
                            <p>{work.description}</p>
                            <small>{new Date(work.created_at).toLocaleString()}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
