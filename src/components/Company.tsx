import { type Prisma } from '@prisma/client';
import { useRouter } from 'next/router';
import React from 'react';

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
    <tr className="border-b border-gray-200 py-10 hover:bg-gray-100">
      <td className="px-4 py-4 font-medium">{name}</td>
      {ceo && <td className="px-4 py-4">{ceo}</td>}
      {staff && <td className="px-4 py-4">{staff}</td>}
      {budget && <td className="px-4 py-4">{budget}</td>}
      <td className="px-4 py-4">
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
