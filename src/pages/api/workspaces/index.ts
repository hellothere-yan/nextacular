import prisma from '@/prisma/index';
import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { title, description } = req.body;

    const newWork = await prisma.works.create({
      data: {
        user_id: userId,
        title,
        description,
      },
    });

    return res.status(201).json(newWork);
  } catch (error) {
    console.error('Error adding work:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
