import React from 'react-native';
import colors from '../../colors';

const {
  Text,
  View,
  NavigatorIOS,
} = React;

import CalendarEntries from './calendar-entries';

class ConcertScreen extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.navigatorios}
        initialRoute={{
          component: CalendarEntries,
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
}

export default ConcertScreen
