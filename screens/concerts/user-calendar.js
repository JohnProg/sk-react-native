import React from 'react-native';
import CalendarEntries from './calendar-entries';
import FullpageLoader from '../common/fullpage-loader';

class UserCalendar extends React.Component {
  static propTypes = {
    paginator: React.PropTypes.object.isRequired,
  };

  constructor(){
    super();
    this.state = {
      userCalendarEntries: [],
      isLoading: true,
    };
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

  setEntries = (userCalendarEntries) => {
    this.setState({
      userCalendarEntries,
      isLoading: false,
    });
  }

  fetchMoreUserCalendarEntries = () => {
    this.props.paginator.fetchNext().then(this.setEntries);
  }

  render() {
    if (this.state.isLoading) {
      return <FullpageLoader addBottomPadding={true}/>;
    }
    return <CalendarEntries
      entries={this.state.userCalendarEntries}
      onEndReached={this.fetchMoreUserCalendarEntries}
      onEntrySelected={function(entry){
        this.props.onEntrySelected(entry);
      }.bind(this)}
    />;
  }
}
export default UserCalendar;
