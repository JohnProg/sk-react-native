import React from 'react-native';
import { UserCalendarPaginator } from '../../songkick-api';
import CalendarEntries from './calendar-entries';
import colors from '../../colors';
const {
    View,
    ActivityIndicatorIOS,
} = React;

const propTypes = {
  username: React.PropTypes.string.isRequired
};

class UserCalendar extends React.Component {
  constructor(){
    super();
    this.state = {
      userCalendarEntries: [],
      isLoading: true,
    };

    this.paginator = new UserCalendarPaginator();
    this.fetchMoreUserCalendarEntries = this.fetchMoreUserCalendarEntries.bind(this);
  }

  componentWillMount(){
    this.fetchMoreUserCalendarEntries();
  }

  fetchMoreUserCalendarEntries(){
    const {username} = this.props;
    this.paginator.fetchNext({username}).then(function(userCalendarEntries){
      this.setState({
        userCalendarEntries,
        isLoading: false,
      });
    }.bind(this));
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
