import React, {useEffect, useState} from "react"
import CIcon from '@coreui/icons-react'
import {inject, observer} from 'mobx-react'
import config from '../../config'
import session from '../../lib/Session'
import axios from 'axios'


const UserDashboard = inject('store')(observer(
  (props) => {
    const {store} = props
    const [sampleData, setSampleData] = useState({})
    //
    const ENDPOINT = `${config.API_BASE}/api/sample/`;
    const getSampleApi  = async () => {
      setSampleData({hello: "hello"})
      try {
        const res = await axios.get(ENDPOINT)
        setSampleData(res.data)
      } catch (e) {
        console.log(e)
        setSampleData({"error": true})
      }
    }

    const accessToken = session.getAccessToken()
    //
    useEffect(() => {getSampleApi()}, [])

    return (
      <>
        <div>회원 dashboard</div>
        <pre>{JSON.stringify(store.profile, null, 2)}</pre>
        <div>SAMPLE </div>
        <pre>{JSON.stringify(sampleData, null, 2)}</pre>
        <pre>http {ENDPOINT} authorization:"Bearer {accessToken}"</pre>
      </>
    )
  }
))

const UserList = () => {
  return (
    <div>users list</div>
  )
}

const UserListFoo = () => {
  return <div>user list (foo)</div>
}
const UserListBar = () => {
  return <div>user list (bar)</div>
}

export const routes = [
  {
    path: '/users',
    name: "회원",
    exact: true,
    component: UserDashboard,
  },
  {
    path: '/users/list',
    name: "목록",
    exact: true,
    component: UserList,
  },
  {
    path: '/users/foo',
    name: "목록 (foo)",
    exact: true,
    component: UserListFoo,
  },
  {
    path: '/users/bar',
    name: "목록 (bar)",
    component: UserListBar,
  },
]
