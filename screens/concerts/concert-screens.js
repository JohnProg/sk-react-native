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
  render() {
    return (
      <NavigatorIOS
        style={styles.navigatorios}
        initialRoute={{
          component: UserCalendars,
          title: 'Your concerts',
          passProps: {
            username: this.props.username
          }
        }}
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
