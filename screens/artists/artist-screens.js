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

  setCurrentArtistId = (currentArtistID) => {
    this.setState({
      currentArtistID
    });
  }

  componentWillReceiveProps(nextProps) {
    const {username} = nextProps;
    if (username !== this.props.username) {
      this.refs.navigator.replace(this.makeYourArtistsRoute(username));
    }
  }

  makeYourArtistsRoute(username){
    return {
      component: TrackedArtists,
      title: 'Your artists',
      passProps: {
        username,
        setCurrentArtistId: this.setCurrentArtistId,
      }
    };
  }

  render() {
    return <NavigatorIOS
      ref="navigator"
      style={styles.navigatorios}
      initialRoute={this.makeYourArtistsRoute(this.props.username)}
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
