import React from 'react-native';
import colors from '../../colors';
import UserCalendar from './user-calendar';
import RadioButtons from 'react-native-radio-buttons';
import {UserCalendarPaginator} from '../../songkick-api';
import EventDetails from '../events/event-details';

const {
  View,
} = React;

class UserCalendars extends React.Component {
  static propTypes = {
    username: React.PropTypes.string.isRequired
  };

  constructor(){
    super();
  }

  generateCalendars(username){
    const calendars = [
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

    this.setState({
      calendars,
      calendar: calendars[0],
    });
  }

  componentWillReceiveProps(nextProps){
    const {username} = nextProps;
    if (username !== this.props.username) {
      this.generateCalendars(nextProps.username);
    }
  }

  componentWillMount() {
    this.generateCalendars(this.props.username);
  }

  setCalendar = (calendar) => {
    this.setState({
      calendar
    });
  }

  onEntrySelected = (entry) => {
    const {navigator} = this.props;
    const {event} = entry;
    if (navigator) {
      const title = event.type === 'Festival' ? event.displayName : event.performance[0].artist.displayName;

      navigator.push({
        title,
        backButtonTitle: ' ',
        component: EventDetails,
        passProps: {
          navigator,
          event,
        },
      });
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <RadioButtons
          options={this.state.calendars}
          onSelection={this.setCalendar}
          selectedOption={this.state.calendar}
          renderOption={RadioButtons.getTextOptionRenderer(styles.radioBase, [styles.radioBase, styles.radioSelected], (calendar) => calendar.label)}
          renderContainer={RadioButtons.getViewContainerRenderer(styles.radioContainer)}
        />
        <UserCalendar paginator={this.state.calendar.paginator} onEntrySelected={this.onEntrySelected}/>
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
    padding: 10,
    textAlign: 'center',
    color: colors.light
  },
  radioSelected: {
    color: colors.pink,
  }
};

export default UserCalendars;
