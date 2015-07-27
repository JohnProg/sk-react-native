import React from 'react-native';
import colors from './colors';
import ConcertScreen from './screens/concerts/concert-screens';
import ArtistScreen from './screens/artists/artist-screens';

const {
  AppRegistry,
  StatusBarIOS,
} = React;

const {
  TabBarIOS,
} = require('react-native-icons');

class Songkick extends React.Component {
  constructor() {
    super();

    StatusBarIOS.setStyle('light-content');

    this.state = {
      selectedTab: 'concerts',
      username: 'arnaud-rinquin',
    };
  }

  render() {
    return (
      <TabBarIOS tintColor={colors.pink} barTintColor={colors.darker} translucent={false}>
        <TabBarIOS.Item title="Concerts" iconName='foundation|music'
                        selected={this.state.selectedTab === 'concerts'}
                        onPress={() => { this.setState({ selectedTab: 'concerts', }); }}>
          <ConcertScreen username={this.state.username}/>
        </TabBarIOS.Item>

        <TabBarIOS.Item title="Artists" iconName='foundation|microphone'
                        selected={this.state.selectedTab === 'artists'}
                        onPress={() => { this.setState({ selectedTab: 'artists', }); }}>
          <ArtistScreen username={this.state.username}/>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

AppRegistry.registerComponent('songkick', () => Songkick);
