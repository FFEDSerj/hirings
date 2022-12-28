import React from 'react';
import SrOnly from './SrOnly';

const tableHeaders = {
  companies: [
    'Company name',
    'CEO',
    'Staff',
    'Budget',
    { srOnly: 'See Company Vacancies' },
  ],
  hirings: [
    'Title',
    'Created',
    'Updated',
    'Viewed Times',
    { srOnly: 'See Details' },
  ],
};

type DashboardBodyProps = {
  tableKey: keyof typeof tableHeaders;
  children: React.ReactNode;
};

const DashboardBody: React.FC<DashboardBodyProps> = ({
  tableKey,
  children,
}) => {
  const headers = tableHeaders[tableKey];
  return (
    <main>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="min-h-96 rounded-lg border-4 border-dashed border-gray-200 p-3">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="overflow-hidden rounded-lg bg-blue-100 text-left text-sm font-medium text-gray-700">
                  {headers.map((h, i) => (
                    <th key={i} className="px-4 py-2">
                      {typeof h === 'string' ? h : <SrOnly text={h.srOnly} />}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm font-normal text-gray-700">
                {children}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardBody;
