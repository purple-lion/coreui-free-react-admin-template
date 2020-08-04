import React from "react"
import {TheFooter,} from '../index'
import {navigation} from "./_nav"
import {routes} from "./_routes"
import {Content, Header, Sidebar} from "../common"
import globalpNavigation from "../_gnav"


const UsersLayout = () => {
  return (
    <div className="c-app c-default-layout">
      <Sidebar navigation={navigation}/>
      <div className="c-wrapper">
        <Header
          navigation={globalpNavigation}
          routes={routes}
          dashboardPath="/users"/>
        <div className="c-body">
          <Content routes={routes}/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default UsersLayout
