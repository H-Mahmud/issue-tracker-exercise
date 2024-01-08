import { getServerSession } from 'next-auth';
import authOptions from '../auth/[...nextauth]/authOptions';
import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
