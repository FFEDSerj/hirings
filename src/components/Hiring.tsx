import Link from 'next/link';
import React from 'react';
import { trpc } from '../utils/trpc';
import { type Hiring as HiringType } from '@prisma/client';
import { classNames } from '../utils/classNames';

type HiringInfo = Pick<
  HiringType,
  'id' | 'title' | 'createdAt' | 'updatedAt' | 'numberOfViews'
>;

type HiringProps = {
  hiring: HiringInfo;
};

export const tdDefaultStyles =
  'flex justify-between border-b border-gray-300 p-4 text-end before:font-bold before:content-[attr(data-title)] sm:table-cell sm:border-none sm:text-start sm:before:content-none';

const toShortLocaleDate = (date: Date) =>
  new Date(date).toLocaleDateString('en-US', { dateStyle: 'short' });

const Hiring: React.FC<HiringProps> = ({ hiring }) => {
  const { id, title, createdAt, updatedAt, numberOfViews } = hiring;
  const created = toShortLocaleDate(createdAt);
  const updated = toShortLocaleDate(updatedAt);

  const updateViews = trpc.hiring.updateViews.useMutation().mutateAsync;

  return (
    <tr className="mb-3 block rounded border border-gray-200 shadow shadow-stone-300 sm:mb-0 sm:table-row sm:border-none sm:py-10 sm:shadow-none sm:hover:bg-gray-100">
      <td
        data-title="Title"
        className={classNames(tdDefaultStyles, 'font-medium')}
      >
        {title}
      </td>
      <td data-title="Created" className={classNames(tdDefaultStyles)}>
        <time dateTime={created}>{created}</time>
      </td>
      <td data-title="Updated" className={classNames(tdDefaultStyles)}>
        <time dateTime={updated}>{updated}</time>
      </td>
      <td data-title="Views" className={classNames(tdDefaultStyles)}>
        {numberOfViews}
      </td>
      <td
        data-title=""
        className="flex justify-center p-4 before:font-bold before:content-[attr(data-title)] sm:table-cell sm:text-start sm:before:content-none"
      >
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
