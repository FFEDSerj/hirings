import { Transition } from '@headlessui/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { AddCompanyForm, AddHiringForm, ProfileHiring } from '../../components';
import { useCompanyData } from '../../context/CompanyContext';
import { ProfileContextProvider } from '../../context/ProfileContext';
import { trpc } from '../../utils/trpc';

const UserProfile = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data: userData } = trpc.auth.getUser.useQuery();
  const { setCompanyData } = useCompanyData();

  useEffect(() => {
    setCompanyData(userData?.company?.id);
  }, [userData?.company?.id, setCompanyData]);

  if (!userData) {
    return null;
  }
  return (
    <ProfileContextProvider>
      <main className="m-auto flex max-w-4xl flex-col items-center gap-y-6 px-4 pt-5">
        <header className="flex w-full flex-col items-center gap-y-5 border-b border-gray-200 pb-6">
          {userData.image && userData.name && (
            <div className="h-48 w-48 overflow-hidden rounded-full">
              <Image
                className="h-full w-full object-cover"
                width={240}
                height={240}
                alt={userData.name}
                src={userData.image}
                priority
              />
            </div>
          )}
          <div className="flex flex-col gap-y-3 text-center">
            <h2 className="text-2xl leading-6 text-gray-900">
              Greetings <span className="font-medium">{userData.name}.</span>{' '}
              This is your profile page.
            </h2>
            <p>
              Your email is:{' '}
              <span className="font-medium">{userData.email}</span>
            </p>
          </div>
        </header>
        {userData.company ? (
          <>
            <div className="text-center">
              <h3 className="text-lg">
                You own{' '}
                <span className="font-medium">{userData.company.name}</span>
              </h3>
              <p className="text-sm">
                Click on brief case icon in navigation bar to see the company
                details.
              </p>
            </div>
            <ul className="flex w-full flex-col gap-4">
              {userData.company.hirings.map(h => (
                <ProfileHiring key={h.id} {...h} />
              ))}
            </ul>
            <AddHiringForm companyId={userData.company.id} />
          </>
        ) : (
          <div className="flex flex-col gap-y-3">
            <h3 className="text-lg  leading-6 text-gray-900">
              Currently you do not own any company =/
            </h3>
            <button
              className="inline-flex w-full justify-center self-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              type="button"
              onClick={() => setIsFormOpen(true)}
            >
              Add company
            </button>
          </div>
        )}
        {isFormOpen && (
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95 h-0"
            enterTo="transform opacity-100 scale-100 h-full"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100 h-full"
            leaveTo="transform opacity-0 scale-95 h-0"
            show
          >
            <AddCompanyForm onCloseForm={() => setIsFormOpen(false)} />
          </Transition>
        )}
      </main>
    </ProfileContextProvider>
  );
};

export default UserProfile;
