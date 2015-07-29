import React from 'react-native';
import TrackedArtists from './tracked-artists';
import colors from '../../colors';

const {
  StyleSheet,
  NavigatorIOS,
} = React;

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
        component: TrackedArtists,
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

var styles = StyleSheet.create({
  navigatorios: {
    flex: 1,
  },
});

export default ArtistScreen;
