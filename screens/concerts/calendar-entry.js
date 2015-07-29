import React from 'react-native';
import colors from '../../colors';

const {
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} = React;

class CalendarEntry extends React.Component {
  render() {
    const {event} = this.props.entry;
    const {artist} = event.performance[0];
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={styles.container}>
          <Image
            style={styles.thumbnail}
            source={ {uri: `https://images.sk-static.com/images/media/profile_images/artists/${artist.id}/large_avatar`} }
          />
          {this.renderEventNameAndLocation.bind(this)(event)}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  onPress = () => {
    if (this.props.onPress) {
      this.props.onPress(this.props.entry);
    }
  }

  renderEventNameAndLocation(event) {
    const name = this.extractEventName(event);
    const {city} = event.location;
    const {venue} = event;
    const location = [venue.displayName, city].join(', ');
    return (
      <View style={styles.eventName}>
        <Text style={styles.eventText}>{name}</Text>
        <Text style={styles.eventLocation}>{location}</Text>
      </View>
    );
  }

  extractEventName(event) {
    if (event.type === 'Festival') {
      return event.displayName;
    } else {
      const mainPerformance = event.performance.filter(function(performance){
        return performance.billing === 'headline';
      })[0];
      return mainPerformance.artist.displayName;
    }
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  eventName:{
    width: 275,
  },
  eventText: {
    fontSize: 14,
    color: colors.lighter,
  },
  eventLocation: {
    fontSize: 10,
    color: colors.light,
  },
};

export default CalendarEntry;
