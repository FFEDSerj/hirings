import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Navigation from '../../components/Navigation';
import { trpc } from '../../utils/trpc';

const HiringDetails = () => {
  const { data: sessionData } = useSession();
  const { asPath } = useRouter();
  const hiringId = asPath.split('/').at(-1);

  const { data: hiringDetails } = trpc.hiring.getHiringDetails.useQuery({
    hiringId,
  });
  return (
    <>
      {sessionData && hiringDetails ? (
        <>
          <Navigation session={sessionData} />
          <main className="mx-auto max-w-7xl overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Hiring Details
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                More information for specific hiring.
              </p>
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
                  <dt className="text-sm font-medium text-gray-500">Company</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <Link
                      href={`company/${hiringDetails.company.id}`}
                      className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
                    >
                      {hiringDetails.company.name}
                    </Link>
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
        </>
      ) : null}
    </>
  );
};

export default HiringDetails;
