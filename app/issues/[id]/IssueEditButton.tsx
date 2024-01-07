import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import { BsPencilSquare } from 'react-icons/bs';

const IssueEditButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <BsPencilSquare />
      <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
    </Button>
  );
};

export default IssueEditButton;
