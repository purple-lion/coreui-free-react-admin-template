import React from 'react';
import { TheContent, TheFooter, TheSidebar } from './index';
import Header from './common/Header';
import globalpNavigation from './_gnav';
import { routes } from './users/_routes';

const TheLayout = (props) => {
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <Header
          navigation={globalpNavigation}
          routes={routes}
          dashboardPath="/dashboard"
        />

        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
