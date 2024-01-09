'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';

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
  return (
    <Select.Root>
      <Select.Trigger placeholder='Filter by Status...' />
      <Select.Content>
        {issueStatus.map((status) => (
          <Select.Item key={status.value} value={status.value || 'all'}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
