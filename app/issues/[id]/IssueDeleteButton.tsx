'use client';

import { AlertDialog, Button, Flex } from '@radix-ui/themes';

const IssueDeleteButton = ({ issueId }: { issueId: number }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red'>Delete issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Delete Confirmation</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? This action cannot be
          undone!
        </AlertDialog.Description>
        <Flex mt='3' gap='3'>
          <AlertDialog.Cancel>
            <Button variant='soft' color='gray'>
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <Button color='red'>Delete Issue</Button>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default IssueDeleteButton;
