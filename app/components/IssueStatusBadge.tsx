import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';

type IssueStatus = Record<
  Status,
  { label: String; color: 'red' | 'violet' | 'green' }
>;

const issueStatus: IssueStatus = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'violet' },
  CLOSED: { label: 'Closed', color: 'green' },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={issueStatus[status].color}>{issueStatus[status].label}</Badge>
  );
};

export default IssueStatusBadge;
