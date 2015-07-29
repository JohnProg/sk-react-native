import React from 'react-native';
import colors from '../../colors.js';
import moment from 'moment';
import EventLocationDetails from './event-location-details';
import ArtistBlurredBackground from '../artists/artist-blurred-background';

const {
  Text,
  View,
  StyleSheet,
} = React;

class EventDetails extends React.Component {
  static propTypes = {
    event: React.PropTypes.object.isRequired,
  };

  render() {
    const {event} = this.props;
    const artistId = event.performance[0].artist.id;
    const venueName = event.type === 'Festival' ? event.location.city : event.venue.displayName;
    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.textHeader}>{this.formatDate(event.start.date)}</Text>
            <Text style={styles.textHeader}>{venueName}</Text>
          </View>
          <ArtistBlurredBackground artistId={artistId}>
            {this.renderLineUp()}
            <EventLocationDetails event={event} style={styles.locationDetails} />
          </ArtistBlurredBackground>
      </View>
    );
  }

  renderLineUp() {
    const performances = this.props.event.performance;
    var names = performances
      .slice(0, 5)
      .map((p) => p.artist.displayName);

    const extra = performances.length - 5;
    if (extra > 0) {
      names = names.concat(`and ${extra} more`);
    }

    const lineupText = names.join(', ');

    return <Text style={styles.ligneupText}>{lineupText}</Text>;
  }

  formatDate(date) {
    return moment(date).format('dddd DD MMM YYYY');
  }
}
var styles = StyleSheet.create({
  header: {
    height: 40,
    backgroundColor: colors.darker,
  },
  container: {
    flex: 1,
  },
  textHeader: {
    fontSize: 15,
    textAlign: 'center',
    color: colors.light,
  },
  locationDetails: {
    marginTop: 10,
  },
  ligneupText: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    color: '#ffffff',
  }
});

export default EventDetails;
