import Pagination from './components/Pagination';

type Props = {
  searchParams: {
    page: string;
  };
};
export default function Home({ searchParams }: Props) {
  return (
    <Pagination
      itemCount={119}
      currentPage={parseInt(searchParams.page) || 1}
      pageSize={10}
    />
  );
}
