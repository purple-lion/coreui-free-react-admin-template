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
    name: '쿠폰 그룹 생성',
    to: '/coupons/coupon-groups/create',
    icon: 'cil-pencil',
  },
  {
    _tag: 'CSidebarNavItem',
    name: '쿠폰 그룹 목록',
    to: '/coupons/coupon-groups/list',
    icon: 'cil-list',
  },
  {
    _tag: 'CSidebarNavItem',
    name: '쿠폰 목록',
    to: '/coupons/coupons/list',
    icon: 'cil-list',
  },
  {
    _tag: 'CSidebarNavItem',
    name: '쿠폰 사용 이력',
    to: '/coupons/coupon-history/list',
    icon: 'cil-list',
  },
];
