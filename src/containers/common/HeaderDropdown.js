import React from "react"
import {TheHeaderDropdown} from "../index";
import {inject, observer} from "mobx-react"
import {withRouter} from "react-router-dom"
import session from "../../lib/Session"

const HeaderDropdown = inject("store")(observer(
  (props) => {
    const handleLogout = () => {
      session.logout()
      props.history.push("/login")
    }
    return (
      <TheHeaderDropdown handleLogout={handleLogout}/>
    )
  }))

export default withRouter(HeaderDropdown)
