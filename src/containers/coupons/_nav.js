export const navigation = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/coupons',
    icon: 'cil-speedometer',
    badge: {
      color: 'info',
      text: '준비중',
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
    badge: {
      color: 'info',
      text: '준비중',
    },
  },
  {
    _tag: 'CSidebarNavItem',
    name: '쿠폰 그룹 목록',
    to: '/coupons/coupon-groups/list',
    icon: 'cil-list',
  },
  {
    _tag: 'CSidebarNavItem',
    name: '쿠폰 코드 목록',
    to: '/coupons/coupons/list',
    icon: 'cil-list',
  },
  {
    _tag: 'CSidebarNavItem',
    name: '사용자에게 등록된 쿠폰코드',
    to: '/coupons/user-coupons/list',
    icon: 'cil-list',
  },
];
