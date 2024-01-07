import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import IssueDetails from './IssueDetails';
import IssueEditButton from './IssueEditButton';

type Props = {
  params: { id: string };
};

export default async function IssueDetailsPage({ params: { id } }: Props) {
  const issueId = parseInt(id);
  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='5'>
      <Flex direction='column' gap='3'>
        <IssueDetails issue={issue} />
      </Flex>
      <Box>
        <IssueEditButton issueId={issueId} />
      </Box>
    </Grid>
  );
}
