import React, {useEffect, useState} from "react";
import config from "../../config";
import axios from "axios";
import {CCard, CCardBody, CCardHeader, CCol, CRow} from "@coreui/react";
import * as R from "ramda";
import BootstrapTable from "react-bootstrap-table-next";
import {Link} from "react-router-dom";

export const UserList = () => {
  const [couponList, setCouponList] = useState({
    loading: true,
    data: [],
  });
  const ENDPOINT = `${config.API_BASE}/admin/users`;
  const getCouponList = async () => {
    try {
      const res = await axios.get(ENDPOINT);
      setCouponList({
        loading: false,
        data: res.data.data
      });
    } catch (e) {
      console.log(e);
      setCouponList({error: true});
    }
  };

  const columns = [{
    dataField: 'id',
    text: '#',
    headerStyle: {
      width: '4em'
    },
    formatter: (cell, row, rowIndex, formatExtraData) => {
      const { id } = row
      return (
        <div>
          <Link to={`/users/${id}`}>{id}</Link>
        </div>
      )
    }
  }, {
    dataField: 'name',
    text: '쿠폰그룹',
    formatter: (cell, row, rowIndex, formatExtraData) => {
      // const { id, name } = row
      const { coupon_group: { id: couponGroupId, name: couponGroupName }, } = row
      return (
        <div>
          <Link to={`/coupons/coupon-groups/${couponGroupId}`}>{couponGroupName}</Link>
        </div>
      )
    },
    headerStyle: {
      width: '16em'
    },
  },{
    dataField: 'code',
    text: '쿠폰 코드',
  }, {
    dataField: 'created_at',
    text: '생성일',
    headerStyle: {
      width: '16em'
    }
  }];


  const { loading, data } = couponList

  useEffect(() => {
    getCouponList()
  }, [])

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>쿠폰 목록</CCardHeader>
            <CCardBody>
              {
                loading ? (
                  <div>loading</div>
                ) : R.isEmpty(data) ? (
                  <div>No Coupons</div>
                ) : (
                  <>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                    {/*<BootstrapTable keyField='id' data={data} columns={columns}/>*/}
                  </>
                )
              }
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};
