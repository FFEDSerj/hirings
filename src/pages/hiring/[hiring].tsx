import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';
import { trpc } from '../../utils/trpc';
import { LoadingSpinner } from '../../components';

const HiringDetails = () => {
  const { asPath, back } = useRouter();
  const hiringId = asPath.split('/').at(-1);

  const { data: hiringDetails, isLoading } =
    trpc.hiring.getHiringDetails.useQuery({
      hiringId,
    });

  if (isLoading) {
    return (
      <LoadingSpinner className="flex min-h-[200px] items-center justify-center" />
    );
  }

  return (
    <>
      <Head>
        <title>{hiringDetails?.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {hiringDetails ? (
        <main className="mx-auto max-w-7xl overflow-hidden bg-white pb-5 shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Hiring Details
            </h3>
            <p className="mt-1 mb-4 max-w-2xl text-sm text-gray-500">
              More information for specific hiring.
            </p>
            <button
              className="p-1 font-medium text-blue-600 hover:underline dark:text-blue-500"
              type="button"
              onClick={back}
            >
              Go back
            </button>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Title</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {hiringDetails.title}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Application for
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {hiringDetails.position}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Working mode
                </dt>
                <dd className="mt-1 text-sm lowercase text-gray-900 sm:col-span-2 sm:mt-0">
                  {hiringDetails.mode}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Company</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {hiringDetails.company.name}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {hiringDetails.company.email}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Salary expectation
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  ${hiringDetails.salary}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Description
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {hiringDetails.description}
                </dd>
              </div>
            </dl>
          </div>
        </main>
      ) : null}
    </>
  );
};

export default HiringDetails;
