import React from 'react-native';

import api from '../../songkick-api';
import colors from '../../colors';

import EventDetails from '../events/event-details';
import EventRow from '../events/event-row';
import ArtistBlurredBackground from './artist-blurred-background';

const {
  ActivityIndicatorIOS,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} = React;

class ArtistDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      loaded: false,
      page: 1,
      events: [],
      hasMore: true
    };

    this.showEventDetails = this.showEventDetails.bind(this);
    this.renderEvent = this.renderEvent.bind(this);
  }

  componentWillUnmount(){
    this.props.setCurrentArtistId(false);
  }

  componentWillMount(){
    this.props.setCurrentArtistId(this.props.artist.id);
    this.fetchEvents();
  }

  fetchEvents() {
    if (!this.state.hasMore || this.state.loadingMore) {
      return;
    }

    this.setState({
      loadingMore: true
    });

    api.getArtistCalendar(this.props.artist.id).then((data) => {
      const newEvents = data.resultsPage.results.event;

      if (!newEvents) {
        this.setState({
          loaded: true,
          hasMore: false,
          events: []
        });
        return;
      }

      const events = this.state.events.concat(newEvents);
      const totalEntries = data.resultsPage.totalEntries;
      const hasMore = events.length < totalEntries;

      this.setState({
        loaded: true,
        loadingMore: false,
        page: ++this.state.page,
        events,
        hasMore,
      });

      if (hasMore) {
        this.fetchEvents();
      }
    });
  }

  showEventDetails(event){
    const title = event.type === 'Festival' ? event.displayName : this.props.artist.displayName;
    this.props.navigator.push({
      title: title,
      component: EventDetails,
      backButtonTitle: ' ',
      passProps: {
        event
      }
    });
  }

  renderEvent(event){
    return <EventRow
      event={event}
      artist={this.props.artist}
      key={event.id}
      onPress={this.showEventDetails}
    />;
  }

  renderLoading(){
    return (
      <View style={styles.centering} >
        <ActivityIndicatorIOS color={colors.pink} size="large"/>
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoading();
    }

    const {artist} = this.props;
    var msg;

    if (this.state.events && !this.state.events.length) {
      msg = (
        <View style={styles.centering}>
          <Text style={styles.noEventMsg}>No upcoming events</Text>
        </View>
      );
    }

    return (
      <ArtistBlurredBackground artistId={artist.id}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.img}
              source={{uri: `https://images.sk-static.com/images/media/profile_images/artists/${artist.id}/huge_avatar`}}
            />
          </View>
          {msg}
          {this.state.events.map(this.renderEvent)}
        </ScrollView>
      </ArtistBlurredBackground>
    );
  }
}

export default ArtistDetails;

var styles = StyleSheet.create({
  artistBgImg: {
    flex: 1,
    resizeMode: 'cover',
  },
  artistDetails: {
    flex: 1,
  },
  imgContainer: {
    height: 200,
  },
  img: {
    height: 200,
    resizeMode: 'cover',
  },
  bottomBarMargin:{
    marginBottom: 110,
  },
  centering: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  noEventMsg: {
    color: colors.light,
    fontWeight: 'bold',
    marginTop: 100,
  },
});
