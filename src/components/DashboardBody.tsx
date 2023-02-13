import React from 'react';
import { LoadingSpinner, SrOnly } from './index';

const tableHeaders = {
  companies: [
    'Company name',
    'CEO',
    'Staff',
    'Budget',
    { srOnly: 'See Company Vacancies' },
  ],
  hirings: ['Title', 'Created', 'Updated', 'Views', { srOnly: 'See Details' }],
};

type DashboardBodyProps = {
  tableKey: keyof typeof tableHeaders;
  isLoading: boolean;
  children: React.ReactNode;
};

const DashboardBody: React.FC<DashboardBodyProps> = ({
  tableKey,
  children,
  isLoading,
}) => {
  const headers = tableHeaders[tableKey];
  return (
    <main>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="min-h-96 sm:rounded-lg sm:border-4 sm:border-dashed sm:border-gray-200 sm:p-3">
            {isLoading ? (
              <LoadingSpinner
                width={80}
                height={80}
                className="flex h-full min-w-full items-center justify-center p-5 text-center"
              />
            ) : (
              <table className="block w-auto table-auto border-collapse sm:table sm:w-full">
                <thead className="invisible absolute h-0 w-0 sm:visible sm:static sm:table-header-group sm:h-auto sm:w-auto">
                  <tr className="invisible absolute h-0 w-0 overflow-hidden rounded-lg bg-blue-100 text-left text-sm font-medium text-gray-700 sm:visible sm:static sm:table-row sm:h-auto sm:w-auto">
                    {headers.map((h, i) => (
                      <th key={i} className="px-4 py-2">
                        {typeof h === 'string' ? h : <SrOnly text={h.srOnly} />}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="block text-sm font-normal text-gray-700 sm:table-row-group">
                  {children}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardBody;
