import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react';
import { LoginForm } from '../../../components/LoginForm';
import { LoginErrorModal } from '../../../components/LoginErrorModal';
import session from '../../../lib/Session';

const Login = (props) => {
  const { className } = props;
  let { from } = props.location.state || { from: { pathname: '/users' } };
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [showLoginErrorModal, setShowLoginErrorModal] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      const resp = await session.login(email, password);
      if (resp) {
        setRedirectToReferrer(true);
      }
    } catch (e) {
      console.log(e);
      setShowLoginErrorModal(true);
    }
  };

  const toggleModal = () => {
    setShowLoginErrorModal(!showLoginErrorModal);
  };

  if (redirectToReferrer) return <Redirect to={from} />;

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <LoginForm handleLogin={handleLogin} />
                  <LoginErrorModal
                    open={showLoginErrorModal}
                    toggle={toggleModal}
                    className={className}
                  />
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: '44%' }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
