import Link from 'next/link';
import React from 'react';
import { useActiveRoute } from '../hooks/useActiveRoute';
import { classNames } from '../utils/classNames';

const NavBarLinks = () => {
  const navigation = useActiveRoute();
  return (
    <div className="hidden md:block">
      <div className="flex items-baseline space-x-4">
        {navigation.map(({ id, name, href, current }) => (
          <Link
            key={id}
            href={href}
            className={classNames(
              current
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'rounded-md px-3 py-2 text-sm font-medium'
            )}
            aria-current={current ? 'page' : undefined}
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavBarLinks;
