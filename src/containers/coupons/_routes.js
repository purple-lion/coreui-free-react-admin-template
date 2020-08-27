import React from 'react';
import {CouponDashboard} from "./CouponDashboard";
import CouponList from "./CouponList";
import CouponGroupList from "./CouponGroupList";
import {CCard, CCardBody, CCardHeader, CCol, CRow} from "@coreui/react";
import {CouponGroupDetail} from "./CouponGroupDetail";
import UserCouponList from "./UserCouponList";

const CouponHistory = () => {
  return <div>쿠폰 사용 이력</div>;
};

const CouponGroupCreate = () => {
  return (
    <>
      <CRow><CCol><CCard><CCardHeader>
        쿠폰그룹 생성

      </CCardHeader>
        <CCardBody>
          ...

        </CCardBody>

      </CCard></CCol></CRow>
    </>
  )
}

export const routes = [
  {
    path: '/coupons',
    name: '쿠폰',
    exact: true,
    component: CouponDashboard,
  },
  {
    path: '/coupons/coupon-groups/create',
    name: '쿠폰그룹 생성',
    exact: true,
    component: CouponGroupCreate,
  },
  {
    path: '/coupons/coupon-groups/list',
    name: '쿠폰그룹 목록',
    exact: true,
    component: CouponGroupList,
  },
  {
    path: '/coupons/coupon-groups/:id',
    name: '쿠폰그룹 상세',
    exact: true,
    component: CouponGroupDetail,
  },
  {
    path: '/coupons/coupons/list',
    name: '쿠폰 목록',
    exact: true,
    component: CouponList,
  },
  {
    path: '/coupons/user-coupons/list',
    name: '사용자에게 등록된 쿠폰 목록',
    exact: true,
    component: UserCouponList,
  },
];
