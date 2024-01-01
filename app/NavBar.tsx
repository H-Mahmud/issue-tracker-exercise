'use client';
import { AiFillBug } from 'react-icons/ai';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issue', href: '/issue' },
  ];

  const currentPath = usePathname();

  return (
    <nav className='h-20 px-6 border-b flex items-center justify-between'>
      <Link href='/' className='fill-gray-700'>
        <IconContext.Provider
          value={{
            size: '2em',
            className: 'fill-gray-700 hover:fill-gray-900',
          }}
        >
          <AiFillBug />
        </IconContext.Provider>
      </Link>
      <ul className='flex items-center space-x-6'>
        {links.map((link, index) => {
          return (
            <Link
              key={index}
              className={classNames({
                'text-zinc-95000': currentPath === link.href,
                'text-zinc-600 hover:text-zinc-700': currentPath !== link.href,
                'transition-colors': true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
