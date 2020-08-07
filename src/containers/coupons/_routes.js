import React from 'react';
import {CouponDashboard} from "./CouponDashboard";
import {CouponList} from "./CouponList";
import {CouponGroupList} from "./CouponGroupList";
import {CRow, CCol, CCard, CCardHeader, CCardBody} from "@coreui/react";

const CouponHistory = () => {
  return <div>쿠폰 사용 이력</div>;
};

const CouponGroupDetail = (props) => {
  const {id} = props.match.params

  return (
    <>
      <div>쿠폰그룹 상세</div>
      <pre>{id}</pre>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </>
  )
}

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
    path: '/coupons/history',
    name: '사용 이력',
    exact: true,
    component: CouponHistory,
  },
];
