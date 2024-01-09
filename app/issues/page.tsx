import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import { Flex } from '@radix-ui/themes';
import { Suspense } from 'react';
import Pagination from '../components/Pagination';
import IssueActions from './IssueActions';
import IssueTableSkeleton from './IssueTableSkeleton';
import IssuesTable, { columnNames, issueQuery } from './IssuesTable';

export type Props = {
  searchParams: issueQuery;
};

export default async function IssuePage({ searchParams }: Props) {
  // status by issue select
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = {
    status,
  };

  // orderBy issue sort
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined;

  // Issue count & select query
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 2;
  const issueCount = await prisma.issue.count({ where });

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return (
    <Flex gap='3' direction='column'>
      <IssueActions />
      <Suspense fallback={<IssueTableSkeleton />}>
        <IssuesTable searchParams={searchParams} issues={issues} />
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={issueCount}
        />
      </Suspense>
    </Flex>
  );
}

export const dynamic = 'force-dynamic';
