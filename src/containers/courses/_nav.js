export const navigation = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/courses',
    exact: true,
    icon: 'cil-speedometer',
    badge: {
      color: 'info',
      text: '준비중',
    },
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['강의 관리'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: '강의 목록',
    to: '/courses/list',
    icon: 'cil-list',
    badge: {
      color: 'info',
      text: '준비중',
    },
  },
  {
    _tag: 'CSidebarNavItem',
    name: '사용자 수강 목록',
    to: '/courses/subscriptions/list',
    icon: 'cil-list',
    badge: {
      color: 'info',
      text: '준비중',
    },
  },
];
