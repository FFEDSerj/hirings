import { FireIcon, PencilIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { EditCompanyModal } from '../../../components';
import { trpc } from '../../../utils/trpc';

const Company = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const { data: company } = trpc.company.getCompanyDetails.useQuery();
  const { back } = useRouter();

  if (!company) {
    return null;
  }

  const { transformedBudget, id, ...companyData } = company;

  return (
    <>
      <Head>
        <title>{session?.user?.name} Company Details</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {company && (
        <main className="mx-auto max-w-5xl overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="flex flex-col items-start gap-3 px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Your company details
            </h3>
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
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {company.name}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">CEO</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {company.ceo}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Company email
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {company.email}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Staff</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {company.staff}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Budget</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {transformedBudget}
                </dd>
              </div>
            </dl>
            <div className="flex justify-end gap-x-3 py-6 px-12">
              <span>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(true)}
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <PencilIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  Edit
                </button>
              </span>

              <span className="hidden sm:block">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <FireIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Delete
                </button>
              </span>
            </div>
          </div>
          <EditCompanyModal
            company={companyData}
            open={isEditModalOpen}
            companyId={id}
            setOpen={() => setIsEditModalOpen(false)}
          />
        </main>
      )}
    </>
  );
};

export default Company;
