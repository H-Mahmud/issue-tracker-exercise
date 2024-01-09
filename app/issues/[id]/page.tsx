import authOptions from '@/app/api/auth/[...nextauth]/authOptions';
import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import IssueDeleteButton from './IssueDeleteButton';
import IssueDetails from './IssueDetails';
import IssueEditButton from './IssueEditButton';
import AssigneeSelect from './AssigneeSelect';
import { Metadata } from 'next';

type Props = {
  params: { id: string };
};

export default async function IssueDetailsPage({ params: { id } }: Props) {
  const session = await getServerSession(authOptions);

  const issueId = parseInt(id);
  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });
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
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  const metadata: Metadata = {
    title: issue?.title,
    description: issue?.description,
  };
  return metadata;
}
