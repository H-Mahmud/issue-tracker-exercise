import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';

import dynamic from 'next/dynamic';
type Props = {
  params: {
    id: string;
  };
};

const IssueForm = dynamic(() => import('../../_components/IssueForm'), {
  ssr: false,
});

export default async function IssueEditPage({ params: { id } }: Props) {
  const issueId = parseInt(id);

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });
  if (!issue) notFound();

  return <IssueForm issue={issue} />;
}
