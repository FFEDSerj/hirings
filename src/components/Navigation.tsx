import React, { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import { classNames } from '../utils/classNames';
import { NavBarLinks } from './index';
import { useActiveRoute } from '../hooks/useActiveRoute';
import Image from 'next/image';
import Logo from '../../public/logo.svg';
import { getBaseUrl } from '../utils/trpc';
import Link from 'next/link';

const userNavigation = [
  { name: 'Your Profile', href: '/profile' },
  {
    name: 'Sign out',
    onClick: () => signOut({ callbackUrl: getBaseUrl(), redirect: true }),
  },
];

const Navigation = () => {
  const { data: session } = useSession();
  const navigation = useActiveRoute();

  return (
    <>
      {session ? (
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid h-16 md:grid-cols-[minmax(min-content,_1fr)_auto] grid-cols-2 grid-flow-col gap-4 items-center">
                  <div className="grid grid-cols-[auto_minmax(min-content,_1fr)] gap-10 grid-flow-col items-center">
                    <div>
                      <Image
                        height={8}
                        width={8}
                        className="h-8 w-8"
                        src={Logo}
                        alt="Your Company"
                      />
                    </div>
                    <NavBarLinks />
                  </div>
                  <div className='justify-self-end'>
                    <div className="flex items-center">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            {session?.user?.image && session?.user?.name && (
                              <Image
                                width={32}
                                height={32}
                                className="h-8 w-8 rounded-full"
                                src={session.user.image}
                                alt={session.user.name}
                              />
                            )}
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map(({ href, name, onClick }) => (
                              <Menu.Item key={name}>
                                {({ active }) => {
                                  if (href) {
                                    return (
                                      <Link
                                        href={href}
                                        className={classNames(
                                          active ? 'bg-gray-100' : '',
                                          'block px-4 py-2 text-sm text-gray-700'
                                        )}
                                      >
                                        {name}
                                      </Link>
                                    );
                                  } else {
                                    return (
                                      <button
                                        className={classNames(
                                          active ? 'bg-gray-100' : '',
                                          'px-4 w-full text-left py-2 text-sm text-gray-700'
                                        )}
                                        type="button"
                                        onClick={
                                          typeof onClick === 'function'
                                            ? onClick
                                            : undefined
                                        }
                                      >
                                        {name}
                                      </button>
                                    );
                                  }
                                }}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {navigation.map(({ id, name, href, current }) => (
                    <Disclosure.Button
                      key={id}
                      as="a"
                      href={href}
                      className={classNames(
                        current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={current ? 'page' : undefined}
                    >
                      {name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ) : null}
    </>
  );
};

export default Navigation;
