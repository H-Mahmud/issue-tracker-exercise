import { Issue, Status } from '@prisma/client';
import { Button, Flex } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { Suspense } from 'react';
import authOptions from '../api/auth/[...nextauth]/authOptions';
import IssueStatusFilter from './IssueStatusFilter';
import IssueTableSkeleton from './IssueTableSkeleton';
import IssuesTable from './IssuesTable';

export type Props = {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
};

export default async function IssuePage(props: Props) {
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
        <IssuesTable {...props} />
      </Suspense>
    </section>
  );
}

export const dynamic = 'force-dynamic';
