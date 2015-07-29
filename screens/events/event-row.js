import React from 'react-native';
import colors from '../../colors';
import moment from 'moment';
import {Icon} from 'react-native-icons';

const {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

const propTypes = {
  event: React.PropTypes.object.isRequired,
  onPress: React.PropTypes.func.isRequired,
};

class EventRow extends React.Component {

  constructor(){
    super();
    this.onPress = this.onPress.bind(this);
    this.renderEventNameAndLocation = this.renderEventNameAndLocation.bind(this);
  }

  onPress() {
    this.props.onPress(this.props.event);
  }

  extractEventName(event) {
    if (event.type === 'Festival') {
      return event.displayName;
    } else {
      return event.venue.displayName;
    }
  }

  renderDate(date) {
    const d = moment(date);
    return (
      <View style={styles.eventDate}>
        <Text style={styles.eventTextTopRow}>{d.format('DD MMM')}</Text>
        <Text style={[styles.eventTextBottomRow, styles.eventDateYear]}>{d.format('YYYY')}</Text>
      </View>
    );
  }

  renderEventNameAndLocation() {
    const {event} = this.props;
    const name = this.extractEventName(event);
    const {city} = event.location;
    return (
      <View style={styles.eventName}>
        <Text style={styles.eventTextTopRow}>{name}</Text>
        <Text style={styles.eventTextBottomRow}>{city}</Text>
      </View>
    );
  }

  render() {
    const {event} = this.props;
    return (
      <TouchableHighlight underlayColor={colors.pink} onPress={this.onPress}>
        <View style={styles.event}>
          {this.renderDate(event.start.date)}
          {this.renderEventNameAndLocation()}
          <Icon name="fontawesome|angle-right" size={20} color="#ffffff" style={styles.arrow} />
        </View>
      </TouchableHighlight>
    );
  }
}

EventRow.propTypes = propTypes;

export default EventRow;

var styles = StyleSheet.create({
  event:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(50,50,50,0.2)',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 1,
  },
  eventTextTopRow: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#ffffff',
  },
  eventTextBottomRow: {
    fontSize: 12,
    color: '#eeeeee',
  },
  eventDate: {
    width: 50,
  },
  eventName:{
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
  },
  eventDateYear: {
    color: colors.lighter,
  },
  arrow: {
    width: 15,
    height: 20,
  },
});
