import authOptions from '@/app/api/auth/[...nextauth]/authOptions';
import prisma from '@/prisma/client';
import { Flex, Grid } from '@radix-ui/themes';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import AssigneeSelect from './AssigneeSelect';
import IssueDeleteButton from './IssueDeleteButton';
import IssueDetails from './IssueDetails';
import IssueEditButton from './IssueEditButton';

type Props = {
  params: { id: string };
};

const getIssue = cache((id: number) =>
  prisma.issue.findUnique({ where: { id } })
);

export default async function IssueDetailsPage({ params: { id } }: Props) {
  const session = await getServerSession(authOptions);

  const issueId = parseInt(id);
  const issue = await getIssue(issueId);
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: '1', md: '5' }} gap='5'>
      <Flex direction='column' gap='3' className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Flex>
      {session && (
        <Flex gap='2' direction='column'>
          <AssigneeSelect issue={issue} />
          <IssueEditButton issueId={issueId} />
          <IssueDeleteButton issueId={issueId} />
        </Flex>
      )}
    </Grid>
  );
}

export async function generateMetadata({ params: { id } }: Props) {
  const issue = await getIssue(parseInt(id));

  const metadata: Metadata = {
    title: issue?.title,
    description: issue?.description,
  };
  return metadata;
}
