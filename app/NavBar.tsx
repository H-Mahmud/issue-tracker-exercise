'use client';
import { Avatar, Box, Container, DropdownMenu, Flex } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconContext } from 'react-icons';
import { AiFillBug } from 'react-icons/ai';

const NavBar = () => {
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issue', href: '/issues' },
  ];

  const currentPath = usePathname();
  const { status, data } = useSession();

  return (
    <nav className='border-b '>
      <Container>
        <Flex justify='between' align='center' className='h-20 px-5'>
          <Flex>
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
            <ul className='flex items-center space-x-6'>
              {links.map((link, index) => {
                return (
                  <li key={index}>
                    <Link
                      className={classNames({
                        'text-zinc-95000': currentPath === link.href,
                        'text-zinc-600 hover:text-zinc-700':
                          currentPath !== link.href,
                        'transition-colors': true,
                      })}
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Flex>
          <Box>
            {status === 'authenticated' && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={data.user?.image!}
                    fallback='?'
                    size='3'
                    radius='full'
                    className='cursor-pointer'
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>{data.user?.email}</DropdownMenu.Label>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item color='red' onClick={() => signOut()}>
                    Logout
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === 'unauthenticated' && (
              <Link href='/api/auth/signin'>Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
