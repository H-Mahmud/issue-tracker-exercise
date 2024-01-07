import { IssueStatusBadge } from '@/app/components';
import prisma from '@/prisma/client';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { BsPencilSquare } from 'react-icons/bs';

type Props = {
  params: { id: string };
};

export default async function IssueDetailsPage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='5'>
      <Flex direction='column' gap='3'>
        <Heading>{issue.title}</Heading>
        <Flex gap='3'>
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAT.toDateString()}</Text>
        </Flex>
        <Card>
          <ReactMarkdown className='prose'>{issue.description}</ReactMarkdown>
          <Text as='p' color='gray' className='pt-2'>
            <b>Last Update: </b>
            {issue.updatedAt.toDateString()}
          </Text>
        </Card>
      </Flex>
      <Box>
        <Button>
          <BsPencilSquare />
          <Link href={`/issues/${params.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
}
