import { IssueStatusBadge } from '@/app/components';
import { Issue } from '@prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
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
    </>
  );
};

export default IssueDetails;
