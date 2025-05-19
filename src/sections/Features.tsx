// src/sections/Features.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@clerk/nextjs'; // 使用客户端 Clerk hook

interface WorkFormProps {
  userId: string;
}

const Features = () => {
  const { userId } = useAuth(); // 获取客户端用户ID
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setError('请先登录');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/workspaces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          title,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error('添加作品失败');
      }

      router.push('/myworks');
    } catch (err) {
      setError(err instanceof Error ? err.message : '发生未知错误');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div id="feature" className="scroll-target w-full py-10">
        <div className="flex flex-col items-center">
          <h6 className="font-bold text-center text-blue-600 uppercase">
            Features
          </h6>
          <h2 className="text-4xl font-bold text-center">
            <span className="block">A better way to build your SaaS</span>
          </h2>
          <p className="text-center text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
        </div>
        
        {/* 添加作品表单 */}
        <div className="mt-8 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">添加新作品</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                作品标题 *
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                作品描述
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? '提交中...' : '添加作品'}
            </button>
          </form>
        </div>
      </div>
  );
};

export default Features;