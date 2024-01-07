import { issueSchema } from '@/app/validations';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

type Props = {
  params: {
    id: string;
  };
};

export async function PATCH(request: NextRequest, { params: { id } }: Props) {
  const issueId = parseInt(id);
  const body = await request.json();

  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const issue = await prisma.issue.findUnique({ where: { id: issueId } });
  if (!issue)
    return NextResponse.json({ error: 'invalid issue' }, { status: 400 });

  const updatedIssue = await prisma.issue.update({
    where: {
      id: issueId,
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(updatedIssue);
}
