import React from 'react-native';
import api from '../../songkick-api';
import colors from '../../colors';

const {
  StyleSheet,
  NavigatorIOS,
  ListView,
  View,
  ActivityIndicatorIOS,
} = React;

import ArtistRow from './artist-row';
import ArtistDetails from './artist-details';

class ArtistScreen extends React.Component {

  constructor(){
    super();
    this.state = {
      currentArtistID: null
    };
  }

  setCurrentArtistId(currentArtistID) {
    this.setState({
      currentArtistID
    });
  }

  render() {
    return <NavigatorIOS
      style={styles.navigatorios}
      initialRoute={{
        component: Artists,
        title: 'Your artists',
        passProps: {
          username: this.props.username,
          setCurrentArtistId: this.setCurrentArtistId.bind(this),
        }
      }}
      tintColor={colors.light}
      barTintColor={colors.darker}
      titleTextColor={colors.light}
      translucent={false}
     />;
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
    };

    this.goToArtistDetails = this.goToArtistDetails.bind(this);
    this.renderArtist = this.renderArtist.bind(this);
    this.fetchNextArtists = this.fetchNextArtists.bind(this);
  }
  componentWillMount(){
    this.fetchNextArtists();
  }
  fetchNextArtists() {
    if (!this.state.hasMore || this.state.loadingMore) {
      return;
    }

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
    });
  }

  goToArtistDetails(artist) {
    this.props.setCurrentArtistId(artist.id);

    const {
      navigator,
      setCurrentArtistId,
    } = this.props;

    this.props.navigator.push({
      title: artist.displayName,
      backButtonTitle: ' ',
      component: ArtistDetails,
      passProps: {
        navigator,
        setCurrentArtistId,
        artist,
      },
    });
  }

  renderArtist(artist){
    return <ArtistRow
      artist={artist}
      onPress={this.goToArtistDetails}
    />;
  }

  renderLoading(){
    return (
      <View style={[styles.centering, styles.bottomBarMargin, {
        backgroundColor: colors.dark
      }]} >
        <ActivityIndicatorIOS color={colors.light} size="large"/>
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoading();
    }

    return (
      <ListView
        style={[styles.artists, styles.bottomBarMargin]}
        dataSource={this.state.dataSource}
        renderRow={this.renderArtist}
        onEndReached={this.fetchNextArtists}
      />
    );
  }
}

var styles = StyleSheet.create({
  artists: {
    backgroundColor: colors.dark,
  },
  bottomBarMargin:{
    marginBottom: 110,
  },
  navigatorios: {
    flex: 1,
  },
  centering: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default ArtistScreen;
