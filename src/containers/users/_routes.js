import React from "react"
import CIcon from '@coreui/icons-react'
import { inject, observer} from 'mobx-react'


const UserDashboard = inject('store')(observer(
  (props) => {
    const { store } = props

  return (
    <>
    <div>회원 dashboard</div>
    <pre>{ JSON.stringify(store.profile, null, 2) }</pre>
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
