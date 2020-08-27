import React from 'react';
import {CourseList} from './CourseList'
import {SubscriptionList} from "./SubscriptionList";

const CourseDashboard = () => {
  return <div>강의 dashboard</div>;
};
// const CourseList = () => {
//   return <div>강의 목록</div>;
// };

export const routes = [
  {
    path: '/courses',
    name: '강의',
    exact: true,
    component: CourseDashboard,
  },
  {
    path: '/courses/list',
    name: '목록',
    exact: true,
    component: CourseList,
  },
  {
    path: '/courses/subscriptions/list',
    name: '사용자 수강 목록',
    exact: true,
    component: SubscriptionList,
  },
];
