import Head from 'next/head';
import React from 'react';
import Company from '../../components/Company';
import Navigation from '../../components/Navigation';
import { trpc } from '../../utils/trpc';

const Companies = () => {
  const { data: companies } = trpc.company.getCompanies.useQuery();
  return (
    <>
      <Head>
        <title>Companies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Navigation activeLink='Companies'/> */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Companies List
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="min-h-96 rounded-lg border-4 border-dashed border-gray-200 p-3">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="overflow-hidden rounded-lg bg-blue-100 text-left text-sm font-medium text-gray-700">
                    <th className="px-4 py-2">Company name</th>
                    <th className="px-4 py-2">CEO</th>
                    <th className="px-4 py-2">Staff</th>
                    <th className="px-4 py-2">Budget</th>
                    <th className="px-4 py-2">
                      <span className="sr-only">See Company Vacancies</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm font-normal text-gray-700">
                  {companies?.map(company => (
                    <Company key={company.id} company={company} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Companies;
