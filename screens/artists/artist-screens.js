import React from 'react-native';
import { TrackedArtistPaginator } from '../../songkick-api';
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
      artists: []
    };

    this.goToArtistDetails = this.goToArtistDetails.bind(this);
    this.renderArtist = this.renderArtist.bind(this);
    this.fetchNextArtists = this.fetchNextArtists.bind(this);
    this.setArtists = this.setArtists.bind(this);

    this.paginator = new TrackedArtistPaginator();
  }
  componentWillMount(){
    this.fetchNextArtists();
  }
  fetchNextArtists() {
    const {username} = this.props;
    this.paginator.fetchNext({username}).then(this.setArtists);
  }
  setArtists(artists){
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(artists),
      loaded: true,
      artists,
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
