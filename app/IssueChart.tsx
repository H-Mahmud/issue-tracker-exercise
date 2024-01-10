'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

type Props = {
  open: number;
  inProgress: number;
  closed: number;
};
const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data: { label: string; value: number }[] = [
    { label: 'Open', value: open },
    { label: 'In Progress', value: inProgress },
    { label: 'Closed', value: closed },
  ];
  return (
    <ResponsiveContainer width='100%' className='!h-80'>
      <BarChart width={150} height={40} data={data}>
        <Bar dataKey='value' barSize={60} style={{ fill: 'var(--accent-9)' }} />
        <XAxis dataKey='label' />
        <YAxis />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IssueChart;
