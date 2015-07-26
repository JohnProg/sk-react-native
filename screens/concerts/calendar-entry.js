import React from 'react-native';
import api from '../../songkick-api';
import colors from '../../colors';

const {
  Text,
  View,
  Image,
} = React;

class CalendarEntry extends React.Component {

  render() {
    const {event} = this.props.entry;
    const {artist} = event.performance[0];
    return (
      // <TouchableHighlight underlayColor={colors.pink} activeOpacity={0.5} onPress={this.eventDetails.bind(this)}>
        <View style={styles.container}>
          <Image
            style={styles.thumbnail}
            source={ {uri: `https://images.sk-static.com/images/media/profile_images/artists/${artist.id}/large_avatar`} }
          />
          {this.renderEventNameAndLocation.bind(this)(event)}
        </View>
      // </TouchableHighlight>
    )
  }

  renderEventNameAndLocation(event) {
    const name = this.removeDateFromEventName(event.displayName);
    const {city} = event.location;
    return (
      <View style={styles.eventName}>
        <Text style={styles.eventText}>{name}</Text>
        <Text style={styles.eventLocation}>{city}</Text>
      </View>
    );
  }

  removeDateFromEventName(name) {
    const index = name.indexOf(' (');
    if(index !== -1){
      return name.substring(0, index);
    } else {
      return name;
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
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.light,
  },
  eventLocation: {
    fontSize: 10,
    color: '#dedede',
  },
}

export default CalendarEntry
