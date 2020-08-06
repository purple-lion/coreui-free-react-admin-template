import { withRouter } from 'react-router-dom';
import {createBrowserHistory} from 'history';

export const redirectToLoginPage = withRouter(({ history }) => {
  history.push('/login');
});

export const history = createBrowserHistory()
