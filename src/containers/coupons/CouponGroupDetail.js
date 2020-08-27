import React, {useEffect, useState} from "react";
import config from '../../config'
import {CCard, CCardBody, CCardHeader, CCol, CRow} from "@coreui/react";
import axios from 'axios'

export const CouponGroupDetail = (props) => {
  const {id} = props.match.params

  const [
    couponGroupDetail, setCouponGroupDetail
  ] = useState({

  })

  const ENDPOINT = `${config.API_BASE}/admin/coupons/coupon-groups/${id}`
  const getCouponGroupDetail = async () => {
    try {
      const res = await axios.get(ENDPOINT)
      setCouponGroupDetail(
        {
          loading: false,
          data: res.data.data
        }
      )
    } catch (e) {
      console.log(e)
      setCouponGroupDetail({error: true})
    }
  }

  useEffect(() => {
    getCouponGroupDetail()
  }, [])

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              쿠폰그룹 상세 ({id})
            </CCardHeader>
            <CCardBody>
              <pre>{JSON.stringify(couponGroupDetail, null, 2)}</pre>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}
