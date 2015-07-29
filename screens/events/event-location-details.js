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
class EventLocationDetails extends React.Component {

  render() {

    const {event} = this.props;

    const {
      start,
      venue,
      location,
    } = event;

    var openingTime;
    openingTime = start.datetime && moment(start.datetime);
    openingTime = openingTime || start.time && moment(start.time, 'HH:mm:ss');
    const formatedOpeningTime = this.formatOpeningTime(openingTime);

    const venueName = event.type === 'Festival' ? event.displayName : venue.displayName;

    return (
      <View style={[styles.container, this.props.style]}>
          <Text style={[styles.baseText, styles.venueName]}>{venueName}</Text>
          <View style={styles.addressAndOpening}>
            <Text style={[styles.baseText, styles.address]}>{location.city}</Text>
            <Text style={[styles.baseText, styles.opening]}>{formatedOpeningTime}</Text>
          </View>
          {this.renderMap()}
      </View>
    );
  }

  renderMap(){
    const {
      location,
      venue,
    } = this.props.event;

    if (location.lat && location.lng) {
      return <MapView
        style={styles.map}
        annotations={[{
          longitude: location.lng,
          latitude: location.lat,
          title: venue.displayName,
        }]}
        region={{
          longitude: location.lng,
          latitude: location.lat,
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
        }}
      />;
    }
  }

  formatOpeningTime(date) {
    if (!date) {
      return '';
    }
    return `Doors: ${moment(date).format('h:mm A')}`;
  }
}
var styles = StyleSheet.create({
  map: {
    height: 150,
  },
  baseText: {
    flex: 1,
    color: colors.lighter,
    padding: 10,
  },
  container: {
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  venueName: {
    color: colors.light,
    fontWeight: 'bold',
  },
  addressAndOpening: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  address: {
  },
  opening: {

  }
});

EventLocationDetails.propTypes = propTypes;
export default EventLocationDetails;
