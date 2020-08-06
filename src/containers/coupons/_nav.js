export const navigation = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/coupons',
    icon: 'cil-speedometer',
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['쿠폰 관리'],
  },
  {
    _tag: 'CSidebarNavItem',
    name: '쿠폰 생성',
    to: '/coupons/create',
    icon: 'cil-pencil',
  },
  {
    _tag: 'CSidebarNavItem',
    name: '쿠폰 목록',
    to: '/coupons/list',
    icon: 'cil-list',
  },
  {
    _tag: 'CSidebarNavItem',
    name: '쿠폰 사용 이력',
    to: '/coupons/history',
    icon: 'cil-list',
  },
];
