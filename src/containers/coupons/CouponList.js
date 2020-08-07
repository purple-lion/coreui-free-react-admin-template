import React, {useEffect, useState} from "react";
import config from "../../config";
import axios from "axios";

export const CouponList = () => {
    const [sampleData, setSampleData] = useState({});
    const ENDPOINT = `${config.API_BASE}/admin/coupons/coupons`;
    const getCouponList = async () => {
        setSampleData({hello: 'hello'});
        try {
            const res = await axios.get(ENDPOINT);
            setSampleData(res.data);
        } catch (e) {
            console.log(e);
            setSampleData({error: true});
        }
    };

    useEffect(() => {
        getCouponList()
    }, [])

    return (
        <>
            <h3>쿠폰 목록</h3>
            <pre>{JSON.stringify(sampleData, null, 2)}</pre>
        </>
    );
};
