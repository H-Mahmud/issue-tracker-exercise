import { Button } from '@radix-ui/themes';

const IssueDeleteButton = ({ issueId }: { issueId: number }) => {
  return <Button color='red'>Delete issue</Button>;
};

export default IssueDeleteButton;
