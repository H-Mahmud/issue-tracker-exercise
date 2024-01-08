'use client';
import { Avatar, Box, Container, DropdownMenu, Flex } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconContext } from 'react-icons';
import { AiFillBug } from 'react-icons/ai';

const NavBar = () => {
  return (
    <nav className='border-b '>
      <Container>
        <Flex justify='between' align='center' className='h-20 px-5'>
          <Flex>
            <SiteLogo />
            <NavigationLinks />
          </Flex>
          <UserOptions />
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;

const SiteLogo = () => {
  return (
    <Link href='/' className='fill-gray-700 mr-3'>
      <IconContext.Provider
        value={{
          size: '2em',
          className: 'fill-gray-700 hover:fill-gray-900',
        }}
      >
        <AiFillBug />
      </IconContext.Provider>
    </Link>
  );
};

const NavigationLinks = () => {
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issue', href: '/issues' },
  ];

  const currentPath = usePathname();

  return (
    <ul className='flex items-center space-x-6'>
      {links.map((link, index) => {
        return (
          <li key={index}>
            <Link
              className={classNames({
                'transition-colors nav-link': true,
                '!text-zinc-950': currentPath === link.href,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

const UserOptions = () => {
  const { status, data } = useSession();

  if (status === 'loading') return null;

  if (status === 'unauthenticated')
    return (
      <Link href='/api/auth/signin' className='nav-link'>
        Login
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={data!.user?.image!}
            fallback='?'
            size='3'
            radius='full'
            className='cursor-pointer'
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>{data!.user?.email}</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item color='red' onClick={() => signOut()}>
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
