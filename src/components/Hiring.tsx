import Link from 'next/link';
import React from 'react';
import { trpc } from '../utils/trpc';
import { type Hiring as HiringType } from '@prisma/client';

type HiringInfo = Pick<
  HiringType,
  'id' | 'title' | 'createdAt' | 'updatedAt' | 'numberOfViews'
>;

type HiringProps = {
  hiring: HiringInfo;
};

const toShortLocaleDate = (date: Date) =>
  new Date(date).toLocaleDateString('en-US', { dateStyle: 'short' });

const Hiring: React.FC<HiringProps> = ({ hiring }) => {
  const { id, title, createdAt, updatedAt, numberOfViews } = hiring;
  const created = toShortLocaleDate(createdAt);
  const updated = toShortLocaleDate(updatedAt);

  const updateViews = trpc.hiring.updateViews.useMutation().mutateAsync;

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
          onClick={() => updateViews({ hiringId: id })}
        >
          See Details
        </Link>
      </td>
    </tr>
  );
};

export default Hiring;
