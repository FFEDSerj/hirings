import { type Prisma } from '@prisma/client';
import { useRouter } from 'next/router';
import React from 'react';
import { classNames } from '../utils/classNames';
import { tdDefaultStyles } from './Hiring';

type CompanyProps = {
  company: {
    id: number;
    _count: Prisma.CompanyCountOutputType;
    name: string;
    budget: string | null;
    staff: number | null;
    ceo: string | null;
  };
};

const Company: React.FC<CompanyProps> = ({ company }) => {
  const { id, name, staff, ceo, budget, _count: vacancyNumber } = company;
  const router = useRouter();

  const replace = () => {
    router.push(
      {
        pathname: '/',
        query: { companyId: id },
      },
      `/?filteredBy=${name}&companyId=${id}`
    );
  };

  return (
    <tr className="mb-3 block rounded border border-gray-200 shadow shadow-stone-300 sm:mb-0 sm:table-row sm:border-none sm:py-10 sm:shadow-none sm:hover:bg-gray-100">
      <td
        data-title="Name"
        className={classNames(tdDefaultStyles, 'font-medium')}
      >
        {name}
      </td>
      {ceo && (
        <td data-title="Ceo" className={classNames(tdDefaultStyles)}>
          {ceo}
        </td>
      )}
      {staff && (
        <td data-title="Staff" className={classNames(tdDefaultStyles)}>
          {staff}
        </td>
      )}
      {budget && (
        <td data-title="Budget" className={classNames(tdDefaultStyles)}>
          {budget}
        </td>
      )}
      <td
        data-title=""
        className="flex justify-center p-4 before:font-bold before:content-[attr(data-title)] sm:table-cell sm:text-start sm:before:content-none"
      >
        <button
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          type="button"
          onClick={replace}
        >
          {`See ${vacancyNumber.hirings} vacancies`}
        </button>
      </td>
    </tr>
  );
};

export default Company;
