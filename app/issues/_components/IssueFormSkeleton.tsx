import { Skeleton } from '@/app/components';

const IssueFormSkeleton = () => {
  return (
    <section className='max-w-xl space-y-4 flex flex-col'>
      <Skeleton height='2rem' />
      <Skeleton height='20rem' />
      <Skeleton className='mt-5' width='6rem' height='2rem' />
    </section>
  );
};

export default IssueFormSkeleton;
