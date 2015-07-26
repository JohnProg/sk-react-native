import React from 'react-native';
import colors from '../../colors.js';
import moment from 'moment';

const {
  Text,
  View,
  MapView,
  StyleSheet,
} = React;

class EventDetails extends React.Component {
  formatDate(date) {
    return moment(date).format('dddd DD MMM YYYY');
  }

  render() {
    const {event, artist} = this.props;
    return (
      <View>
          <View style={styles.header}>
            <Text style={styles.textHeader}>{this.formatDate(event.start.date)}</Text>
            <Text style={styles.textHeader}>{event.venue.displayName}</Text>
          </View>
          <MapView
            style={styles.map}
            annotations={[{
              longitude: event.location.lng,
              latitude: event.location.lat,
              title: event.venue.displayName,
            }]}
            region={{
              longitude: event.location.lng,
              latitude: event.location.lat,
              longitudeDelta: 0.01,
              latitudeDelta: 0.01,
            }}
          />
      </View>
    );
  }
}
var styles = StyleSheet.create({
  map: {
    height: 150,
  },
  header: {
    height: 40,
    backgroundColor: colors.darker,
  },
  textHeader: {
    fontSize: 15,
    textAlign: 'center',
    color: colors.light,
  },
});
export default EventDetails
