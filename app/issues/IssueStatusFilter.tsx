'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

type IssueStatus = {
  label: string;
  value?: Status;
};
const issueStatus: IssueStatus[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Close', value: 'CLOSED' },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  return (
    <Select.Root
      onValueChange={(value) => {
        const status = value !== 'all' ? `?status=${value}` : '';
        router.push('/issues' + status);
      }}
    >
      <Select.Trigger placeholder='Filter by Status...' />
      <Select.Content>
        {issueStatus.map((status, index) => (
          <Select.Item key={index} value={status.value || 'all'}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
