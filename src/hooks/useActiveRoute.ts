import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const navigation = [
  { id: 1, name: 'Dashboard', href: '/', current: true },
  { id: 2, name: 'Companies', href: '/companies', current: false },
];

export const useActiveRoute = () => {
  const [navLinks, setNavLinks] = useState(navigation);
  const { route } = useRouter();

  useEffect(() => {
    setNavLinks(prev =>
      prev.map(item =>
        item.href === route
          ? { ...item, current: true }
          : { ...item, current: false }
      )
    );
  }, [route]);

  return navLinks;
};
