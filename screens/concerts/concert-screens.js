import React from 'react-native';
import colors from '../../colors';
import UserCalendar from './user-calendar';

const {
  NavigatorIOS,
} = React;

const propTypes = {
  username: React.PropTypes.string.isRequired
};
class ConcertScreen extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.navigatorios}
        initialRoute={{
          component: UserCalendar,
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

ConcertScreen.propTypes = propTypes;
export default ConcertScreen;
