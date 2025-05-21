import { GetServerSideProps } from 'next';
import { getAuth } from "@clerk/nextjs/server"; 
import prisma from "@/prisma/index";
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
interface Work {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  created_at: string; // 存储为 ISO 字符串
}
//自动调用，不需要手动调用
export const getServerSideProps: GetServerSideProps<{ works: Work[] }> = async (context) => {
    const { userId } = getAuth(context.req); 

    if (!userId) {
        return {
            redirect: {
                destination: "/auth/login?redirect_url=/api/myworks",
                permanent: false,
            },
        };
    }

    const works = await prisma.works.findMany({
        where: { user_id: userId },
        orderBy: { created_at: "desc" },
    });

    // 使用map函数遍历works数组的每一个成员，然后返回新数组给serializedWorks。只不过吧created_at给序列化了。
    const serializedWorks = works.map(work => ({
        ...work,
        created_at: work.created_at.toISOString()
    }));

    return {
        props: {
            //返回的参数传入给下面的MyWorksPage组件，作为props  //works: Work[]
            works: serializedWorks,
        },
    };
};

export default function MyWorksPage({ works: initialWorks }: { works: Work[] }) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    };
    const [works, setWorks] = useState<Work[]>(initialWorks);
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const handleAddWork = () => {
        // 跳转到首页并滚动到Feature部分
        router.push('/#feature');
    };
    const handleDelete = async (workId: string) => {
        const confirmed = window.confirm('确定要删除这个作品吗？此操作无法撤销。');
        if (!confirmed) return;
        setIsDeleting(workId);
        try {
            const response = await fetch(`/api/workspaces/${workId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete work');
            }

            // 更新本地状态,filter过滤里面不等于当前workId的
            setWorks(works.filter(work => work.id !== workId));
        } catch (error) {
            console.error('Error deleting work:', error);
            alert('Failed to delete work');
        } finally {
            setIsDeleting(null);
        }
    };
    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">我的作品</h1>
                <button 
                    onClick={handleAddWork}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                >
                    添加新作品
                </button>
            </div>
            
            {works.length === 0 ? (
                <div className="bg-white p-6 rounded-lg shadow">
                    <p className="text-gray-600">你还没有作品。</p>
                    <Link href="/#feature" className="mt-4 inline-block text-blue-500 hover:text-blue-600">
                        创建第一个作品 →
                    </Link>
                </div>
            ) : (
                <ul className="space-y-4">
                    {works.map((work) => (
                        <li key={work.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                            <h2 className="font-semibold text-lg">{work.title}</h2>
                            {work.description && (
                                <p className="text-gray-600 mt-2">{work.description}</p>
                            )}
                            <div className="mt-3 flex justify-between items-center">
                                <small className="text-gray-500">
                                    {formatDate(work.created_at)}
                                </small>
                                <button 
                                    onClick={() => handleDelete(work.id)}
                                    disabled={isDeleting === work.id}
                                className="text-sm text-red-500 hover:text-red-700">
                                    {isDeleting === work.id ? '删除中...' : '删除'}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}