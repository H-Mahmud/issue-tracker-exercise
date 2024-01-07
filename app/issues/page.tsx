import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import IssuesTable from './new/IssuesTable';

export default async function IssuePage() {
  return (
    <section>
      <div className='mb-4'>
        <Button>
          <Link href='/issues/new'>New Issue</Link>
        </Button>
      </div>
      <IssuesTable />
    </section>
  );
}
