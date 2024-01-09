import { Button, Flex } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { Suspense } from 'react';
import authOptions from '../api/auth/[...nextauth]/authOptions';
import IssueTableSkeleton from './IssueTableSkeleton';
import IssuesTable from './IssuesTable';
import IssueStatusFilter from './IssueStatusFilter';

export default async function IssuePage() {
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
        <IssuesTable />
      </Suspense>
    </section>
  );
}

export const dynamic = 'force-dynamic';
