import React from 'react'
import { inject , observer} from "mobx-react"
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import {
  TheHeaderDropdown,
}  from '../index'

const TheHeader = inject("store")(observer((props) => {
  const {
    store,
    routes,
    dashboardPath,
    navigation,
    settingsPath
  } = props
  const sidebarShow = store.sidebarShow

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    store.setSidebarShow(val)
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    store.setSidebarShow(val)
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo"/>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        {
          navigation.map((el, idx) => {
            return (
              <CHeaderNavItem
                key={idx}
                className="px-3">
                <CHeaderNavLink to={el.path}>{el.name}</CHeaderNavLink>
              </CHeaderNavItem>
            )
          })
        }
        {/*
        // <CHeaderNavItem className="px-3" >
        //   <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        // </CHeaderNavItem>
        // <CHeaderNavItem  className="px-3">
        //   <CHeaderNavLink to="/users">회원</CHeaderNavLink>
        // </CHeaderNavItem>
        // <CHeaderNavItem  className="px-3">
        //   <CHeaderNavLink to="/courses">강의</CHeaderNavLink>
        // </CHeaderNavItem>
        // <CHeaderNavItem  className="px-3">
        //   <CHeaderNavLink to="/coupons">쿠폰</CHeaderNavLink>
        // </CHeaderNavItem>
        */}

      </CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdown/>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
          <div className="d-md-down-none mfe-2 c-subheader-nav">
            {
              dashboardPath && (
                <CLink
                  className="c-subheader-nav-link"
                  aria-current="page"
                  to={dashboardPath}
                >
                  <CIcon name="cil-graph" alt="Dashboard" />&nbsp;Dashboard
                </CLink>
              )
            }
            {
              settingsPath && (
                <CLink
                  className="c-subheader-nav-link"
                  to={settingsPath}
                >
                  <CIcon name="cil-settings" alt="Settings" />&nbsp;Settings
                </CLink>
              )
            }
          </div>
      </CSubheader>
    </CHeader>
  )
}))

export default TheHeader
