import { IssueStatusBadge } from '@/app/components';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

type Props = {
  params: { id: string };
};

export default async function IssueDetailsPage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();

  return (
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
  );
}
