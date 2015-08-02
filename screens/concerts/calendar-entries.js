import React from 'react-native';
import colors from '../../colors';
import CalendarEntry from './calendar-entry';
import moment from 'moment';

const {
  ListView,
  Text,
  View,
} = React;

class CalendarEntries extends React.Component {
  static propTypes = {
    entries: React.PropTypes.array.isRequired,
    onEndReached: React.PropTypes.func,
    onEntrySelected: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      dataSource: new ListView.DataSource({
          getSectionData          : (dataBlob, sectionID) => dataBlob[sectionID],
          getRowData              : (dataBlob, sectionID, rowID) => dataBlob[sectionID + ':' + rowID],
          rowHasChanged           : (row1, row2) => row1 !== row2,
          sectionHeaderHasChanged : (s1, s2) => s1 !== s2
      }),
    };
  }

  entriesToDataSource(entries) {
    const entriesByDate = entries.reduce(function(result, entry){
      const date = entry.event.start.date;
      result[date] = result[date] || [];
      result[date].push(entry);

      return result;
    }, {});

    const sectionIDs = [];
    const rowIDs = [];
    const dataBlob = {};

    Object.keys(entriesByDate).forEach(function(date, index){
      dataBlob[date] = date;
      sectionIDs.push(date);
      rowIDs[index] = [];
      const entriesForDate = entriesByDate[date];

      entriesForDate.forEach(function(entry){
        const entryKey = `${date}:${entry.event.id}`;
        rowIDs[index].push(entry.event.id);
        dataBlob[entryKey] = entry;
      });
    });

    return this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
  }

  onPress = (calendarEntry) => {
    this.props.onEntrySelected(calendarEntry);
  }

  renderCalendarEntries = (calendarEntry) => {
    return <CalendarEntry entry={calendarEntry} onPress={this.onPress}/>;
  }

  renderSectionHeader(date){
    const formatted = moment(date).format('dddd D MMMM YYYY');
    return <Text style={styles.dateSection}>{formatted}</Text>;
  }

  renderEmpty(){
    return (<View style={styles.emptyView}>
      <Text style={styles.emptyText}>There is nothing to show here :(</Text>
    </View>);
  }

  render() {
    if (!this.props.entries.length) {
      return this.renderEmpty();
    }

    const dataSource = this.entriesToDataSource(this.props.entries);
    return <ListView
      style= {{backgroundColor: colors.dark, marginBottom: 110}}
      dataSource={dataSource}
      renderRow={this.renderCalendarEntries}
      renderSectionHeader = {this.renderSectionHeader}
      onEndReached={this.props.onEndReached}
    />;
  }
}

const styles = {
  dateSection: {
    color: colors.lighter,
    fontWeight: 'bold',
    marginLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.dark,
    paddingBottom: 108,
  },
  emptyText: {
    color: colors.light,
  }
};

export default CalendarEntries;
