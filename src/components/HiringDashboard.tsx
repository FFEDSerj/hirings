import { useRouter } from 'next/router';
import React from 'react';
import { trpc } from '../utils/trpc';
import { DashboardBody, DashboardHeader, Hiring } from './index';

type HiringDashboardProps = {
  isFiltered?: boolean;
};

const HiringDashboard = ({ isFiltered }: HiringDashboardProps) => {
  const { query, asPath } = useRouter();
  const companyId = Number(query.companyId) || undefined;
  const companyName = decodeURI(asPath.split('=')[1]?.split('&')[0] ?? '');

  const { data: hirings, isLoading } = isFiltered
    ? trpc.hiring.getHiringsByCompanyId.useQuery({ companyId })
    : trpc.hiring.getHirings.useQuery();

  return (
    <>
      <DashboardHeader
        title={`${isFiltered ? companyName : ''} Hiring Dashboard`}
      />
      <DashboardBody isLoading={isLoading} tableKey="hirings">
        {hirings?.map(hiring => (
          <Hiring key={hiring.id} hiring={hiring} />
        ))}
      </DashboardBody>
    </>
  );
};

export default HiringDashboard;
