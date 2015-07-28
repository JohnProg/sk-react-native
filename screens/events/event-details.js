import React from 'react-native';
import colors from '../../colors.js';
import moment from 'moment';

const {
  Text,
  View,
  MapView,
  StyleSheet,
} = React;

const propTypes = {
  event: React.PropTypes.object.isRequired,
};

class EventDetails extends React.Component {

  render() {
    const {event} = this.props;
    return (
      <View>
          <View style={styles.header}>
            <Text style={styles.textHeader}>{this.formatDate(event.start.date)}</Text>
            <Text style={styles.textHeader}>{event.venue.displayName}</Text>
          </View>
          {this.renderMap()}
      </View>
    );
  }

  renderMap(){
    const {event} = this.props;
    if (event.location.lat && event.location.lng) {
      return <MapView
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
      />;
    }
  }

  formatDate(date) {
    return moment(date).format('dddd DD MMM YYYY');
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

EventDetails.propTypes = propTypes;
export default EventDetails;
