import React from 'react-native';
import api from '../../songkick-api';
import colors from '../../colors';
import CalendarEntry from './calendar-entry';

const {
  Text,
  ListView,
  ActivityIndicatorIOS,
  View,
} = React;

class CalendarEntries extends React.Component {

  constructor() {
    super();

    this.state = {
      loaded: false,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id }),
      page: 1,
      events: [],
      hasMore: true
    }
  }

  componentWillMount(){
    this.fetchNextCalendarEntries();
  }

  fetchNextCalendarEntries() {
    if (!this.state.hasMore || this.state.loadingMore) return;

    this.setState({
      loadingMore: true
    });

    api.getUserCalendar(this.props.username, this.state.page).then((data) => {
      const newCalendarEntries = data.resultsPage.results.calendarEntry;
      const events = this.state.events.concat(newCalendarEntries);
      const totalEntries = data.resultsPage.totalEntries;

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(events),
        loaded: true,
        loadingMore: false,
        page: ++this.state.page,
        events,
        hasMore: events.length < totalEntries
      });
    });
  }

  renderCalendarEntries(calendarEntry){
    return <CalendarEntry entry={calendarEntry}/>;
  }

  renderLoading(){
    return (
      <View style={styles.centering}>
        <ActivityIndicatorIOS color={colors.pink} size="large"/>
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoading();
    }

    return (
      <ListView
        style= {{backgroundColor: colors.dark}}
        dataSource={this.state.dataSource}
        renderRow={this.renderCalendarEntries.bind(this)}
        onEndReached={this.fetchNextCalendarEntries.bind(this)}
      />
    );
  }
}

const styles = {
  centering: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
}

export default CalendarEntries
