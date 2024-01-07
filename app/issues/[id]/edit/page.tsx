import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import IssueForm from '../../_components/IssueForm';

type Props = {
  params: {
    id: string;
  };
};
export default async function IssueEditPage({ params: { id } }: Props) {
  const issueId = parseInt(id);

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });
  if (!issue) notFound();

  return <IssueForm issue={issue} />;
}
