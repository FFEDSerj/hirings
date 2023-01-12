import { Fragment, useState } from 'react';
import {
  BriefcaseIcon,
  CalendarIcon,
  FireIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from '@heroicons/react/20/solid';
import { Menu, Transition } from '@headlessui/react';
import { classNames } from '../utils/classNames';
import { type Mode } from '@prisma/client';
import Link from 'next/link';
import DeleteHiringModal from './DeleteHiringModal';
import { useProfileData } from '../context/ProfileContext';

type ProfileHiringProps = {
  title: string;
  id: string;
  createdAt: Date;
  position: string;
  salary: number;
  mode: Mode;
  description: string | null;
};

const ProfileHiring: React.FC<ProfileHiringProps> = ({
  id,
  title,
  salary,
  position,
  mode,
  createdAt,
  description,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { setUpdateMutationAction, focus } = useProfileData();

  const toggleModalOpen = () => setIsOpenModal(!isOpenModal);

  const onHiringEdit = () => {
    setUpdateMutationAction({
      id,
      title,
      position,
      salary,
      mode,
      description: description ?? '',
    });
    focus();
  };

  return (
    <li className="w-full items-end justify-between gap-2 self-start rounded border border-gray-200 p-4 hover:bg-gray-100 sm:flex">
      <div className="mb-4 flex min-w-0 flex-1 flex-col gap-4 sm:mb-0">
        <h2 className="text-2xl font-bold leading-8 text-gray-900 sm:truncate sm:tracking-tight">
          {position}
        </h2>
        <div className="mt-1 flex flex-col gap-3 sm:mt-0 sm:flex-row sm:flex-wrap">
          <div className="flex items-center text-sm text-gray-500">
            <BriefcaseIcon
              className=" h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {title}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPinIcon
              className=" h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {mode}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <CurrencyDollarIcon
              className=" h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            ${salary}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon
              className=" h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {createdAt.toDateString()}
          </div>
        </div>
      </div>
      <div className="flex gap-x-3">
        <span>
          <button
            type="button"
            onClick={onHiringEdit}
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
          <Link
            href={`/hiring/${id}`}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <LinkIcon
              className="-ml-1 mr-2 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
            View
          </Link>
        </span>

        <span className="hidden sm:block">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={toggleModalOpen}
          >
            <FireIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Delete
          </button>
        </span>

        {/* Dropdown */}
        <Menu as="div" className="relative sm:hidden">
          <Menu.Button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            More
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={`/hiring/${id}`}
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700'
                    )}
                  >
                    View
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    className={classNames(
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700'
                    )}
                    onClick={toggleModalOpen}
                  >
                    Delete
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <DeleteHiringModal
        open={isOpenModal}
        setOpen={toggleModalOpen}
        hiringId={id}
      />
    </li>
  );
};

export default ProfileHiring;
