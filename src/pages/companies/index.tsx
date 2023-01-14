import { useSession } from 'next-auth/react';
import Head from 'next/head';
import React from 'react';
import { DashboardBody, DashboardHeader, Company } from '../../components';
import { trpc } from '../../utils/trpc';
import Error from 'next/error';

const Companies = () => {
  const { data: sessionData } = useSession();
  const { data: companies, isLoading } = trpc.company.getCompanies.useQuery();

  if (!sessionData && !isLoading) {
    return (
      <Error
        withDarkMode={false}
        title="You should be signed in to see Companies dashboard"
        statusCode={404}
      />
    );
  }
  return (
    <>
      <Head>
        <title>Companies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardHeader title="Companies List" />
      <DashboardBody isLoading={isLoading} tableKey="companies">
        {companies?.map(company => (
          <Company key={company.id} company={company} />
        ))}
      </DashboardBody>
    </>
  );
};

export default Companies;
