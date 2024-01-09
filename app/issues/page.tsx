import { Issue, Status } from '@prisma/client';
import { Flex } from '@radix-ui/themes';
import { Suspense } from 'react';
import IssueActions from './IssueActions';
import IssueTableSkeleton from './IssueTableSkeleton';
import IssuesTable from './IssuesTable';

export type Props = {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
};

export default async function IssuePage(props: Props) {
  return (
    <Flex gap='3' direction='column'>
      <IssueActions />
      <Suspense fallback={<IssueTableSkeleton />}>
        <IssuesTable {...props} />
      </Suspense>
    </Flex>
  );
}

export const dynamic = 'force-dynamic';
