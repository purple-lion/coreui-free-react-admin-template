import React, {useEffect, useState} from "react";
import config from "../../config";
import axios from "axios";
import {CCard, CCardBody, CCardHeader, CCol, CRow} from "@coreui/react";
import * as R from 'ramda'
import BootstrapTable from 'react-bootstrap-table-next';
import {Link} from "react-router-dom";

export const CouponGroupList = () => {
  const [couponGroupList, setCouponGroupList] = useState({
    loading: true,
    data: []
  });

  const ENDPOINT = `${config.API_BASE}/admin/coupons/coupon-groups`;
  const getCouponGroupList = async () => {
    try {
      const res = await axios.get(ENDPOINT);
      setCouponGroupList(
        {
          loading: false,
          data: res.data.data
        }
      );
    } catch (e) {
      console.log(e);
      setCouponGroupList({error: true});
    }
  };

  const columns = [{
    dataField: 'id',
    text: '#',
    headerStyle: {
      width: '4em'
    },
    formatter: (cell, row, rowIndex, formatExtraData) => {
      const { id, } = row
      return (
        <div>
          <Link to={`/coupons/coupon-groups/${id}`}>{id}</Link>
        </div>
      )
    }
  }, {
    dataField: 'name',
    text: '쿠폰그룹 이름',
    formatter: (cell, row, rowIndex, formatExtraData) => {
      const { id, name } = row
      return (
       <div>
         <Link to={`/coupons/coupon-groups/${id}`}>{name}</Link>
       </div>
      )
    }

  }, {
    dataField: 'created_at',
    text: '생성일',
    headerStyle: {
      width: '16em'
    }
  }];


  const {
    loading, data
  } = couponGroupList

  useEffect(() => {
    getCouponGroupList()
  }, [])

  console.log('data', data)

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>쿠폰그룹 목록</CCardHeader>
            <CCardBody>
              {
                loading ? (
                  <div>loading</div>
                ) : R.isEmpty(data) ? (
                  <div>No CouponGroups</div>
                ) : (
                  <>
                    {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
                    <BootstrapTable keyField='id' data={data} columns={columns}/>
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
