import { type Prisma } from '@prisma/client';
import Link from 'next/link';
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

  return (
    <tr className="border-b border-gray-200 py-10 hover:bg-gray-100">
      <td className="px-4 py-4 font-medium">{name}</td>
      {ceo && <td className="px-4 py-4">{ceo}</td>}
      {staff && <td className="px-4 py-4">{staff}</td>}
      {budget && <td className="px-4 py-4">{budget}</td>}
      <td className="px-4 py-4">
        <Link
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          href={`/company/${id}`}
        >
          {`See ${vacancyNumber.hirings} vacancies`}
        </Link>
      </td>
    </tr>
  );
};

export default Company;
