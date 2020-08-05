import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

import auth from "../lib/Auth"

const TheLayout = (props) => {
  const handleLogout = async () => {
    await auth.logout()
    props.history.push('/login')

  }

  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader handleLogout={handleLogout}/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
