import { withRouter } from 'react-router-dom';

export const redirectToLoginPage = withRouter(({ history }) => {
  history.push('/login');
});
