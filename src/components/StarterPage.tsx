import { GiftIcon } from '@heroicons/react/24/outline';
import { signIn } from 'next-auth/react';
import React from 'react';

const StarterPage = () => {
  return (
    <>
      <div className="flex min-h-screen min-w-[320px] flex-col items-center justify-center">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900">
          Please authenticate yourself to see the hiring dashboard
        </h1>
        <button
          type="submit"
          className="group relative flex w-full max-w-[16rem] justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => signIn()}
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <GiftIcon
              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              aria-hidden="true"
            />
          </span>
          Sign In
        </button>
      </div>
    </>
  );
};

export default StarterPage;
