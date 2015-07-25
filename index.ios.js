const React = require('react-native');
const {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  ListView,
  Text,
  View,
  Image,
  ActivityIndicatorIOS,
} = React;

const api = require('./songkick-api');

class Songkick extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.navigatorios}
        initialRoute={{
          component: Artists,
          title: 'My tracked artists'
        }}
        tintColor="#7ed3f4"
        barTintColor="#f80046"
        titleTextColor="#ffffff"
       />
    );
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

    this.fetchNextArtists();
  }

  fetchNextArtists() {
    if (!this.state.hasMore || this.state.loadingMore) return;

    this.setState({
      loadingMore: true
    });

    api.getTrackedArtists('arnaud-rinquin', this.state.page).then((data) => {
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
    return <Artist artist={artist}/>
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
        renderRow={this.renderArtist}
        onEndReached={this.fetchNextArtists.bind(this)}
      />
    );
  }
}

class Artist extends React.Component {
  render() {
    const {artist} = this.props
    return (
      <View style={styles.artist}>
        <Image
          style={styles.thumbnail}
          source={ {uri: `https://images.sk-static.com/images/media/profile_images/artists/${artist.id}/large_avatar`} }
        />
        <Text style={styles.artistText}>{artist.displayName}</Text>
      </View>
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
  artists: {
    backgroundColor: '#F5FCFF',
  },
  artist: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  artistText: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 20
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
