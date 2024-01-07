import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Loading() {
  return (
    <section className='max-w-xl space-y-4 flex flex-col'>
      <Skeleton height='2rem' />
      <Skeleton height='10rem' />
      <Skeleton width='6rem' height='2rem' />
    </section>
  );
}
