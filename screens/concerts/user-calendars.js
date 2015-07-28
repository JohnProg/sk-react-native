import React from 'react-native';
import colors from '../../colors';
import UserCalendar from './user-calendar';
import Radio from '../common/radio';
import {UserCalendarPaginator} from '../../songkick-api';

const {
  View,
} = React;

const propTypes = {
  username: React.PropTypes.string.isRequired
};
class UserCalendars extends React.Component {

  constructor(){
    super();
    this.setCalendar = this.setCalendar.bind(this);
  }

  generateCalendars(username){
    return [
      {
        label: 'Your artists',
        paginator: new UserCalendarPaginator({username})
      },{
        label: 'Your plans',
        paginator: new UserCalendarPaginator({
          username,
          reason: 'attendance'
        })
      }
    ];
  }

  componentWillMount() {
    const {username} = this.props;
    const calendars = this.generateCalendars(username);

    this.setState({
      calendars,
      calendar: calendars[0],
    });
  }

  setCalendar(calendar){
    this.setState({
      calendar
    });
  }

  render() {

    return (
      <View style={styles.container}>
        <Radio
          options={this.state.calendars}
          onSelection={this.setCalendar}
          selectedOption={this.state.calendar}
          renderOption={Radio.getTextOptionRenderer(styles.radioBase, [styles.radioBase, styles.radioSelected], (calendar) => calendar.label)}
          renderContainer={Radio.getViewContainerRenderer(styles.radioContainer)}
        />
        <UserCalendar paginator={this.state.calendar.paginator}/>
      </View>
    );
  }
}

const styles = {
  container: {
    flex:1
  },
  radioContainer: {
    backgroundColor: colors.darker,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  radioBase: {
    flex: 1,
    margin: 10,
    textAlign: 'center',
    color: colors.light
  },
  radioSelected: {
    color: colors.pink,
  }
};

UserCalendars.propTypes = propTypes;
export default UserCalendars;
