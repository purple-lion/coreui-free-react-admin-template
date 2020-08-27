export const navigation = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/users',
    icon: 'cil-speedometer',
    badge: {
      color: 'info',
      text: '준비중',
    },
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['회원 관리'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: '회원 목록',
    to: '/users/list',
    icon: 'cil-list',
    badge: {
      color: 'info',
      text: '준비중',
    },
  },
];
