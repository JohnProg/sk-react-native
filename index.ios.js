const React = require('react-native');
const moment = require('moment');
const {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  ListView,
  Text,
  View,
  Image,
  ActivityIndicatorIOS,
  TouchableHighlight,
} = React;
const {
  TabBarIOS,
} = require('react-native-icons');
const api = require('./songkick-api');

class Songkick extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedTab: 'myArtists',
    };
  }

  render() {
    return (
      <TabBarIOS
        tintColor="#ffffff"
        barTintColor="#f80046">
        <TabBarIOS.Item
          title="Arnaud's"
          iconName='foundation|star'
          selected={this.state.selectedTab === 'myArtists'}
          onPress={() => {
            this.setState({
              selectedTab: 'myArtists',
            });
          }}>

          <ArtistsScreens username='arnaud-rinquin'/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Victor's"
          iconName='foundation|heart'
          selected={this.state.selectedTab === 'vjoArtists'}
          onPress={() => {
            this.setState({
              selectedTab: 'vjoArtists',
            });
          }}>

          <ArtistsScreens username='vjo'/>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

class ArtistsScreens extends React.Component {
  render() {
    return (<NavigatorIOS
      style={styles.navigatorios}
      initialRoute={{
        component: Artists,
        title: 'My tracked artists',
        passProps: {
          username: this.props.username
        }
      }}
      tintColor="#ffffff"
      barTintColor="#f80046"
      titleTextColor="#ffffff"
     />)
  }
}

class Artists extends React.Component {

  constructor() {
    super();

    this.state = {
      loaded: false,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id }),
      page: 1,
      artists: [],
      hasMore: true
    }
  }
  componentWillMount(){
    this.fetchNextArtists();
  }
  fetchNextArtists() {
    if (!this.state.hasMore || this.state.loadingMore) return;

    this.setState({
      loadingMore: true
    });

    api.getTrackedArtists(this.props.username, this.state.page).then((data) => {
      const newArtists = data.resultsPage.results.artist;
      const artists = this.state.artists.concat(newArtists);
      const totalEntries = data.resultsPage.totalEntries;

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(artists),
        loaded: true,
        loadingMore: false,
        page: ++this.state.page,
        artists,
        hasMore: artists.length < totalEntries
      });
    })
  }

  renderArtist(artist){
    return <Artist
      artist={artist}
      navigator={this.props.navigator}
    />
  }

  renderLoading(){
    return (
      <View style={styles.centering} >
        <ActivityIndicatorIOS color="#f80046" size="large"/>
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoading();
    }

    return (
      <ListView
        style={styles.artists}
        dataSource={this.state.dataSource}
        renderRow={this.renderArtist.bind(this)}
        onEndReached={this.fetchNextArtists.bind(this)}
      />
    );
  }
}

class Artist extends React.Component {
  artistDetails() {
    this.props.navigator.push({
      title: this.props.artist.displayName,
      component: ArtistDetails,
      passProps: this.props
    });
  }

  render() {
    const {artist} = this.props
    return (
      <TouchableHighlight underlayColor={'#cbcbcb'} onPress={this.artistDetails.bind(this)}>
        <View style={styles.artist}>
          <Image
            style={styles.thumbnail}
            source={ {uri: `https://images.sk-static.com/images/media/profile_images/artists/${artist.id}/large_avatar`} }
          />
          <Text style={styles.artistText}>{artist.displayName}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

class ArtistDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      loaded: false,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id }),
      page: 1,
      events: [],
      hasMore: true
    }
  }

  componentWillMount(){
    this.fetchEvents();
  }

  fetchEvents() {
    if (!this.state.hasMore || this.state.loadingMore) return;

    this.setState({
      loadingMore: true
    });

    api.getArtistCalendar(this.props.artist.id).then((data) => {
      const newEvents = data.resultsPage.results.event;
      const events = this.state.events.concat(newEvents);
      const totalEntries = data.resultsPage.totalEntries;

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(events),
        loaded: true,
        loadingMore: false,
        page: ++this.state.page,
        events,
        hasMore: events.length < totalEntries
      });
    });
  }

  renderEvent(event){
    return <Event
      event={event}
      navigator={this.props.navigator}
    />
  }

  renderLoading(){
    const {artist} = this.props
    return (
      <View style={styles.centering} >
        <ActivityIndicatorIOS color="#f80046" size="large"/>
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoading();
    }

    const {artist} = this.props
    return (
      <View style={styles.artistDetails}>
        <Image
          style={styles.artistDetailsImg}
          source={ {uri: `https://images.sk-static.com/images/media/profile_images/artists/${artist.id}/huge_avatar`} }
        />
        <ListView
          style={styles.events}
          dataSource={this.state.dataSource}
          renderRow={this.renderEvent.bind(this)}
          onEndReached={this.fetchEvents.bind(this)}
        />
      </View>
    );
  }
}

class Event extends React.Component {
  eventDetails() {
    this.props.navigator.push({
      title: this.props.event.location.city,
      component: EventDetails,
      passProps: this.props
    });
  }

  // Remove date from event name
  removeDate(name) {
    const index = name.indexOf(' (');
    if(index !== -1){
      return name.substring(0, index);
    } else {
      return name;
    }
  }

  renderDate(date) {
    const d = moment(date);
    return (
      <View style={styles.eventDate}>
        <Text style={styles.eventDateDay}>{d.format('DD MMM')}</Text>
        <Text style={styles.eventDateYear}>{d.format('YYYY')}</Text>
      </View>
    );
  }

  renderEventNameAndLocation(event) {
    const name = this.removeDate(event.displayName);
    const {city} = event.location;
    return (
      <View style={styles.eventName}>
        <Text style={styles.eventText}>{name}</Text>
        <Text style={styles.eventLocation}>{city}</Text>
      </View>
    )
  }

  render() {
    const {event} = this.props
    return (
      <TouchableHighlight underlayColor={'#cbcbcb'} onPress={this.eventDetails.bind(this)}>
        <View style={styles.event}>
          {this.renderDate(event.start.date)}
          {this.renderEventNameAndLocation.bind(this)(event)}
        </View>
      </TouchableHighlight>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 80,
    height: 80,
  },
  artistDetailsImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 10,
  },
  artists: {
    backgroundColor: '#F5FCFF',
  },
  artist: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  event:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#cacaca',
    paddingTop: 5,
    paddingBottom: 5,
  },
  eventText: {
    flex: 1,
    fontSize: 15,
    color: '#ffffff',
  },
  eventDate: {
    width: 60,
    paddingLeft: 10,
  },
  eventDateDay: {},
  eventDateYear: {
    fontWeight: 'bold',
  },
  artistText: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 20
  },
  artistDetails: {
    flex: 1,
    paddingTop: 64,
  },
  navigatorios: {
    flex: 1,
    backgroundColor: '#1b1d24'
  },
  centering: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

AppRegistry.registerComponent('songkick', () => Songkick);
