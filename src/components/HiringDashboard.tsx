import React from 'react';
import { trpc } from '../utils/trpc';
import Hiring from './Hiring';

const HiringDashboard = () => {
  const { data: hirings } = trpc.hiring.getHirings.useQuery();
  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Hiring Dashboard
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
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Created</th>
                    <th className="px-4 py-2">Updated</th>
                    <th className="px-4 py-2">Viewed times</th>
                    <th className="px-4 py-2">
                      <span className="sr-only">See Details</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm font-normal text-gray-700">
                  {hirings?.map(hiring => (
                    <Hiring key={hiring.id} hiring={hiring} />
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

export default HiringDashboard;
