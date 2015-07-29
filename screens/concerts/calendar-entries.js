import React from 'react-native';
import colors from '../../colors';
import CalendarEntry from './calendar-entry';
import moment from 'moment';

const {
  ListView,
  Text,
} = React;

const propTypes = {
  entries: React.PropTypes.array.isRequired,
  onEndReached: React.PropTypes.func,
  onEntrySelected: React.PropTypes.func.isRequired,
};

class CalendarEntries extends React.Component {

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

    this.onPress = this.onPress.bind(this);
    this.renderCalendarEntries = this.renderCalendarEntries.bind(this);
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

  onPress(calendarEntry){
    this.props.onEntrySelected(calendarEntry);
  }

  renderCalendarEntries(calendarEntry){
    return <CalendarEntry entry={calendarEntry} onPress={this.onPress}/>;
  }

  renderSectionHeader(date){
    const formatted = moment(date).format('dddd D MMMM YYYY');
    return <Text style={styles.dateSection}>{formatted}</Text>;
  }

  render() {
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
};

CalendarEntries.propTypes = propTypes;
export default CalendarEntries;
