import React from 'react-native';
import {BlurView} from 'react-native-blur';
const {
  Image,
  StyleSheet,
  View,
} = React;

class ArtistBlurredBackground extends React.Component {
  render() {
    const {artistId} = this.props;
    const uri = `https://images.sk-static.com/images/media/profile_images/artists/${artistId}/huge_avatar`;

    return (
      <View style={[styles.backgroundView, styles.bottomBarMargin]}>
        <Image style={styles.artistBgImg} source={ {uri: uri} }>
          <BlurView blurType="light" style={{flex: 1, backgroundColor: 'transparent',}}>
            {this.props.children}
          </BlurView>
        </Image>
      </View>
    );
  }
}
export default ArtistBlurredBackground;

var styles = StyleSheet.create({
  artistBgImg: {
    flex: 1,
    resizeMode: 'cover',
  },
  backgroundView: {
    flex: 1,
  },
  bottomBarMargin:{
    marginBottom: 110,
  },
});
