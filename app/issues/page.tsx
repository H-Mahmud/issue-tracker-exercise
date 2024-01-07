import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import IssuesTable from './new/IssuesTable';
import { Suspense } from 'react';
import IssueTableSkeleton from './new/IssueTableSkeleton';

export default async function IssuePage() {
  return (
    <section>
      <div className='mb-4'>
        <Button>
          <Link href='/issues/new'>New Issue</Link>
        </Button>
      </div>
      <Suspense fallback={<IssueTableSkeleton />}>
        <IssuesTable />
      </Suspense>
    </section>
  );
}
