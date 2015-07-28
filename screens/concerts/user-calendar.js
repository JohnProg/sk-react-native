import React from 'react-native';
import CalendarEntries from './calendar-entries';
import colors from '../../colors';
const {
    View,
    ActivityIndicatorIOS,
} = React;

const propTypes = {
  paginator: React.PropTypes.object.isRequired,
};

class UserCalendar extends React.Component {
  constructor(){
    super();
    this.state = {
      userCalendarEntries: [],
      isLoading: true,
    };
    this.fetchMoreUserCalendarEntries = this.fetchMoreUserCalendarEntries.bind(this);
    this.setEntries = this.setEntries.bind(this);
  }

  componentWillMount(){
    this.fetchMoreUserCalendarEntries();
  }

  componentWillReceiveProps(nextProps){
    if (this.props.paginator !== nextProps.paginator) {
      this.setState({
        userCalendarEntries: [],
        isLoading: true
      });
      nextProps.paginator.fetchNext().then(this.setEntries);
    }
  }

  setEntries(userCalendarEntries){
    this.setState({
      userCalendarEntries,
      isLoading: false,
    });
  }

  fetchMoreUserCalendarEntries(){
    this.props.paginator.fetchNext().then(this.setEntries);
  }

  renderLoading(){
    return (
      <View style={styles.centering}>
        <ActivityIndicatorIOS color={colors.light} size="large"/>
      </View>
    );
  }

  render() {
    if (this.state.isLoading) {
      return this.renderLoading();
    }
    return <CalendarEntries
      entries={this.state.userCalendarEntries}
      onEndReached={this.fetchMoreUserCalendarEntries}
    />;
  }
}

UserCalendar.propTypes = propTypes;
export default UserCalendar;

const styles = {
  centering: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.dark,
  },
};
