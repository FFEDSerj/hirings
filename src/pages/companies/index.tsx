import Head from 'next/head';
import React from 'react';
import Company from '../../components/Company';
import DashboardBody from '../../components/DashboardBody';
import DashboardHeader from '../../components/DashboardHeader';
import { trpc } from '../../utils/trpc';

const Companies = () => {
  const { data: companies } = trpc.company.getCompanies.useQuery();
  return (
    <>
      <Head>
        <title>Companies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardHeader title="Companies List" />
      <DashboardBody tableKey="companies">
        {companies?.map(company => (
          <Company key={company.id} company={company} />
        ))}
      </DashboardBody>
    </>
  );
};

export default Companies;
