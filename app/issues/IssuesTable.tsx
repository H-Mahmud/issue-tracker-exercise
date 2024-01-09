import { Issue, Status } from '@prisma/client';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import NextLink from 'next/link';
import { IssueStatusBadge, Link } from '../components';

export type issueQuery = {
  status: Status;
  orderBy: keyof Issue;
  page: string;
};
type Props = {
  searchParams: issueQuery;
  issues: Issue[];
};
const IssuesTable = async ({ searchParams, issues }: Props) => {
  return (
    <>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                  {column.value === searchParams.orderBy && (
                    <CaretDownIcon className='inline' height='24' width='24' />
                  )}
                </NextLink>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => {
            return (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`issues/${issue.id}`}>{issue.title}</Link>
                  <div className='block md:hidden'>
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  {issue.createdAT.toDateString()}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </>
  );
};

type Columns = { label: string; value: keyof Issue; className?: string };
const columns: Columns[] = [
  { label: 'Title', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAT', className: 'hidden md:table-cell' },
];
export const columnNames = columns.map((column) => column.value);

export default IssuesTable;
