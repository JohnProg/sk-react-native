import React from 'react-native';
import colors from '../../colors';

const {
  ActivityIndicatorIOS,
  PropTypes,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} = React;

class LoginForm extends React.Component {

  static propTypes = {
    username: PropTypes.string,
    assertUserExists: PropTypes.func,
    onLogin: PropTypes.func.isRequired,
  }

  constructor(){
    super();
    this.state = {
      userNotFound: false,
      loading: false,
    };
  }

  componentWillMount(){
    this.setState({
      username: this.props.username,
    });
  }

  render() {

    var notFoundMessage, loading;

    if (this.state.userNotFound) {
      notFoundMessage = <Text style={styles.errorMsg}>User not found</Text>;
    }
    if (this.state.loading) {
      loading = <ActivityIndicatorIOS color={colors.pink} style={styles.loader}/>;
    }

    const title = "So, what's your username?";
    const doNotHaveHone = "Don't have one?";

    return (<View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {notFoundMessage}
      <View style={{
        flexDirection: 'row',
      }}>
        <TextInput
          style={styles.usernameInput}
          defaultValue={this.props.username}
          value={this.props.username}
          onChangeText={(username) => this.setState({
            username: username.trim(),
            userNotFound: false,
          })}
          placeholder={'Your songkick username'}
          placeholderTextColor={colors.light}
          onSubmitEditing={this.tryLogin}
          returnKeyType={'go'}
        />
        {loading}
        <TouchableWithoutFeedback onPress={this.tryLogin}>
            <Text style={[styles.button, {flex: 0.2}]}>Go!</Text>
        </TouchableWithoutFeedback>
      </View>

      <Text style={styles.title}>{doNotHaveHone}</Text>
      <TouchableWithoutFeedback onPress={this.props.onLogin.bind(null, 'arnaud-rinquin')}>
          <Text style={styles.button}>Just use mine</Text>
      </TouchableWithoutFeedback>

    </View>);
  }

  onFailedLogin = () => {
    this.setState({
      loading: false,
      userNotFound: true,
    });
  }

  onSuccessfulLogin = () => {
    this.setState({
      loading: false,
      userNotFound: false,
    });
    this.props.onLogin(this.state.username);
  }

  tryLogin = () => {
    this.setState({
      loading: true,
      userNotFound: false,
    });

    this.props.assertUserExists(this.state.username)
      .then(this.onSuccessfulLogin)
      .catch(this.onFailedLogin);
  }
}

const styles = {
  usernameInput: {
    flex:1,
    height: 40,
    borderColor: colors.light,
    backgroundColor: colors.dark,
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 3,
    color: 'white',
  },
  button:{
    backgroundColor: colors.pink,
    height: 40,
    borderRadius: 3,
    padding: 5,
    marginLeft: 10,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingTop: 8,
    fontSize: 20,
  },
  errorMsg: {
    color: 'white',
    textAlign: 'center',
  },
  title: {
    fontSize: 50,
    color: colors.pink,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: colors.darker,
  },
  loader: {
    margin: 10,
  },
};

export default LoginForm;
