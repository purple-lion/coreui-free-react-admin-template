import {CButton, CCol, CForm, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText, CRow} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import React, {useState} from "react";

export const LoginForm = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {handleLogin} = props

  return (
    <CForm>
      <h1>Login</h1>
      <p className="text-muted">Sign In to your account</p>
      <CInputGroup className="mb-3">
        <CInputGroupPrepend>
          <CInputGroupText>
            <CIcon name="cil-user"/>
          </CInputGroupText>
        </CInputGroupPrepend>
        <CInput type="text" placeholder="Username"
                onChange={e => {
                  setEmail(e.target.value)
                }}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    return handleLogin(email, password)
                  }
                }}
                autoComplete="username"/>
      </CInputGroup>
      <CInputGroup className="mb-4">
        <CInputGroupPrepend>
          <CInputGroupText>
            <CIcon name="cil-lock-locked"/>
          </CInputGroupText>
        </CInputGroupPrepend>
        <CInput type="password" placeholder="Password"
                onChange={
                  e => {
                    setPassword(e.target.value)
                  }
                }
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    return handleLogin(email, password)
                  }
                }}
                autoComplete="current-password"/>
      </CInputGroup>
      <CRow>
        <CCol xs="6">
          <CButton color="primary" className="px-4" onClick={() => handleLogin(email, password)}>Login</CButton>
        </CCol>
        <CCol xs="6" className="text-right">
          <CButton color="link" className="px-0">Forgot password?</CButton>
        </CCol>
      </CRow>
    </CForm>
  )
}

