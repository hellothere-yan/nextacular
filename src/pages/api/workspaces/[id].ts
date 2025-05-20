// pages/api/works/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/prisma/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId } = getAuth(req);
  const { id } = req.query;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // 检查作品是否属于当前用户

    const work = await prisma.works.findUnique({
        where: { id: id as string },
      })
  
      if (!work || work.user_id !== userId) {
        return res.status(404).json({ message: 'Work not found or unauthorized' })
      }


    // 删除作品
    await prisma.works.delete({
      where: { id: id as string },
    });

    return res.status(200).json({ message: 'Work deleted successfully' });
  } catch (error) {
    console.error('Error deleting work:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}