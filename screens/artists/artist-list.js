import React from 'react-native';
import colors from '../../colors';
import ArtistRow from './artist-row';

const {
  ListView,
  StyleSheet,
} = React;

class ArtistList extends React.Component {
  constructor() {
    super();

    this.state = {
      loaded: false,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id })
    };

    this.renderArtist = this.renderArtist.bind(this);
  }

  renderArtist(artist){
    return <ArtistRow
      artist={artist}
      onPress={this.props.onArtistPressed}
    />;
  }

  render() {

    const dataSource = this.state.dataSource.cloneWithRows(this.props.artists);

    return (
      <ListView
        style={[styles.artists, styles.bottomBarMargin]}
        dataSource={dataSource}
        renderRow={this.renderArtist}
        onEndReached={this.props.fetchNextArtists}
      />
    );
  }
}

const styles = StyleSheet.create({
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

export default ArtistList;
