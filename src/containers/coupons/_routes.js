import React from 'react';

const CouponDashboard = () => {
  return <div>쿠폰 dashboard</div>;
};
const CouponList = () => {
  return <div>쿠폰 목록</div>;
};
const CouponHistory = () => {
  return <div>쿠폰 사용 이력</div>;
};

export const routes = [
  {
    path: '/coupons',
    name: '쿠폰',
    exact: true,
    component: CouponDashboard,
  },
  {
    path: '/coupons/list',
    name: '목록',
    exact: true,
    component: CouponList,
  },
  {
    path: '/coupons/history',
    name: '사용 이력',
    exact: true,
    component: CouponHistory,
  },
];
