import { Button, Flex } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { Suspense } from 'react';
import authOptions from '../api/auth/[...nextauth]/authOptions';
import IssueTableSkeleton from './IssueTableSkeleton';
import IssuesTable from './IssuesTable';
import IssueStatusFilter from './IssueStatusFilter';
import { Status } from '@prisma/client';
import prisma from '@/prisma/client';

type Props = {
  searchParams: { status: Status };
};
export default async function IssuePage({ searchParams }: Props) {
  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
  });

  const session = await getServerSession(authOptions);

  return (
    <section>
      <Flex justify='between' mb='3'>
        {session && (
          <div className='mb-4'>
            <Button>
              <Link href='/issues/new'>New Issue</Link>
            </Button>
          </div>
        )}
        <IssueStatusFilter />
      </Flex>
      <Suspense fallback={<IssueTableSkeleton />}>
        <IssuesTable issues={issues} />
      </Suspense>
    </section>
  );
}

export const dynamic = 'force-dynamic';
