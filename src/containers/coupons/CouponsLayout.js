import React from "react"
import {TheFooter,} from '../index'
import {navigation} from "./_nav"
import {routes} from "./_routes"
import {Content, Header, Sidebar} from "../common"
import globalNavigation from "../_gnav"

const CouponsLayout = () => {
  return (
    <div className="c-app c-default-layout">
      <Sidebar navigation={navigation}/>
      <div className="c-wrapper">
        <Header
          navigation={globalNavigation}
          routes={routes}
          dashboardPath="/coupons"/>
        <div className="c-body">
          <Content routes={routes}/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default CouponsLayout
