import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as HiIcons from 'react-icons/hi';

export const SidebarData = [
  {
    title: 'Register',
    path: '/register',
    icon: <></>,
    cName: 'nav-text',
  },
  {
    title: 'Login',
    path: '/login',
    icon: <></>,
    cName: 'nav-text',
  },
  {
    title: 'Newsfeed',
    path: '/',
    icon: <FaIcons.FaRegNewspaper />,
    cName: 'nav-text',
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <HiIcons.HiUser />,
    cName: 'nav-text',
  },
  {
    title: 'FriendsLists',
    path: '/friendsLists',
    icon: <HiIcons.HiUsers />,
    cName: 'nav-text',
  },
  {
    title: 'Chat',
    path: '/chat',
    icon: <FaIcons.FaRocketchat />,
    cName: 'nav-text',
  },
  {
    title: 'Birthday',
    path: '/birthday',
    icon: <FaIcons.FaBirthdayCake />,
    cName: 'nav-text',
  },
];
