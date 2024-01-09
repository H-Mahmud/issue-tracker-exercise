import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

type Props = {
  open: number;
  inProgress: number;
  closed: number;
};
const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const summaries: { label: string; count: Number; status: Status }[] = [
    { label: 'Open issues', count: open, status: 'OPEN' },
    { label: 'In-progress issues', count: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed issues', count: closed, status: 'CLOSED' },
  ];
  return (
    <Flex gap='5'>
      {summaries.map((summary) => (
        <Card key={summary.status}>
          <Flex direction='column' gap='2'>
            <Link
              className='font-medium text-sm'
              href={`/issues?status=${summary.status}`}
            >
              {summary.label}
            </Link>
            <Text size='5' className='font-bold'>
              {summary.count.toString()}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
