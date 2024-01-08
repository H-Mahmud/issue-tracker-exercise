import { issuePatchSchema } from '@/app/validations';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import authOptions from '../../auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';

type Props = {
  params: {
    id: string;
  };
};

export async function PATCH(request: NextRequest, { params: { id } }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issueId = parseInt(id);
  const body = await request.json();

  const validation = issuePatchSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const issue = await prisma.issue.findUnique({ where: { id: issueId } });
  if (!issue)
    return NextResponse.json({ error: 'invalid issue' }, { status: 404 });

  const { title, description, assignedUserId } = body;
  if (assignedUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedUserId },
    });
    if (!user) return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }

  const updatedIssue = await prisma.issue.update({
    where: {
      id: issueId,
    },
    data: {
      title,
      description,
      assignedUserId: assignedUserId,
    },
  });
  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issueId = parseInt(id);

  const issue = await prisma.issue.findUnique({ where: { id: issueId } });
  if (!issue)
    return NextResponse.json({ error: 'invalid issue' }, { status: 404 });

  await prisma.issue.delete({
    where: {
      id: issueId,
    },
  });
  return NextResponse.json({});
}
