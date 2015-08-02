import React from 'react-native';
import colors from '../../colors';
import UserCalendars from './user-calendars';

const {
  NavigatorIOS,
} = React;

class ConcertScreen extends React.Component {
  static propTypes = {
    username: React.PropTypes.string.isRequired
  };

  componentWillReceiveProps(nextProps) {
    const {username} = nextProps;
    if (username !== this.props.username) {
      this.refs.navigator.replace(this.makeConcertRoute(username));
    }
  }

  makeConcertRoute(username){
    return {
      component: UserCalendars,
      title: 'Your concerts',
      passProps: {
        username: username
      }
    };
  }

  render() {
    return (
      <NavigatorIOS
        ref="navigator"
        style={styles.navigatorios}
        initialRoute={this.makeConcertRoute(this.props.username)}
        tintColor={colors.light}
        barTintColor={colors.darker}
        titleTextColor={colors.light}
        translucent={false}
       />
    );
  }
}

const styles = {
  navigatorios: {
    flex: 1
  }
};

export default ConcertScreen;
