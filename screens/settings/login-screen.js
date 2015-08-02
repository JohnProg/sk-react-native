import React from 'react-native';
import LoginForm from './login-form';
import { assertUserExists } from '../../songkick-api';
import { setUsername } from '../../settings';

const {
  PropTypes,
} = React;

class LoginScreen extends React.Component {

  static propTypes = {
    username: PropTypes.string,
    onLogin: PropTypes.func.isRequired,
  }

  render() {
    return (
      <LoginForm
        username={this.props.username}
        onLogin={this.onLogin}
        assertUserExists={assertUserExists}
      />);
  }

  onLogin = (username) => {
    setUsername(username).then(this.props.onLogin);
  }
}

export default LoginScreen;
