import Link from 'next/link';
import React from 'react';

type HiringProps = {
  hiring: {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    numberOfViews: number;
  };
};

const toShortLocaleDate = (date: Date) =>
  new Date(date).toLocaleDateString('en-US', { dateStyle: 'short' });

const Hiring: React.FC<HiringProps> = ({ hiring }) => {
  const { id, title, createdAt, updatedAt, numberOfViews } = hiring;
  const created = toShortLocaleDate(createdAt);
  const updated = toShortLocaleDate(updatedAt);
  return (
    <tr className="border-b border-gray-200 py-10 hover:bg-gray-100">
      <td className="px-4 py-4 font-medium">{title}</td>
      <td className="px-4 py-4">{created}</td>
      <td className="px-4 py-4">{updated}</td>
      <td className="px-4 py-4">{numberOfViews}</td>
      <td className="px-4 py-4">
        <Link
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          href={`/hiring/${id}`}
        >
          See Details
        </Link>
      </td>
    </tr>
  );
};

export default Hiring;
