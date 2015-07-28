import React from 'react-native';
import colors from '../../colors';

const {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

class ArtistRow extends React.Component {
  renderOnTourLabel(artist){
    if (!artist.onTourUntil) {
      return;
    }
    return (
      <View style={[styles.thumbnail, styles.onTourMask]}>
        <Text style={styles.onTourLabel}>ON TOUR</Text>
      </View>
    );
  }

  onPress(){
    this.props.onPress(this.props.artist);
  }

  render() {
    const {artist} = this.props;
    return (
      <TouchableHighlight underlayColor={colors.pink} activeOpacity={0.5} onPress={this.onPress.bind(this)}>
        <View style={styles.container}>
          <Image
            style={styles.thumbnail}
            source={ {uri: `https://images.sk-static.com/images/media/profile_images/artists/${artist.id}/large_avatar`} }
          />
          {this.renderOnTourLabel(artist)}
          <Text style={styles.artistText}>{artist.displayName}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}


export default ArtistRow;

var styles = StyleSheet.create({
  thumbnail: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  onTourLabel: {
    backgroundColor: colors.pink,
    transform: [
      {rotate: '-45deg'},
      {translateX: -15},
      // {translateY: },
    ],
    color: colors.lighter,
    textAlign: 'center',
    fontSize: 6,
    fontWeight: '900',
  },
  onTourMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  artistText: {
    flex: 1,
    fontSize: 16,
    color: colors.light
  },
});
