import React from 'react-native';
import colors from './colors';
import ConcertScreen from './screens/concerts/concert-screens';
import ArtistScreen from './screens/artists/artist-screens';
import { TabBarIOS } from 'react-native-icons';
import Settings from './settings';
import LoginScreen from './screens/settings/login-screen';
import FullpageLoader from './screens/common/fullpage-loader';

const {
  AppRegistry,
  StatusBarIOS,
} = React;

class Songkick extends React.Component {
  constructor() {
    super();
    StatusBarIOS.setStyle('light-content');
    this.state = {
      selectedTab: 'concerts',
      username: null,
      fetchingSettings: true,
    };
  }

  componentWillMount(){
    Settings.getUsername().then(this.setUsername);
  }

  render() {
    if (this.state.fetchingSettings) {
      return this.renderLoading();
    }

    if (!this.state.username) {
      return this.renderSettings();
    }

    return (
      <TabBarIOS tintColor={colors.pink} barTintColor={colors.darker} translucent={false}>
        <TabBarIOS.Item title="Concerts" iconName="foundation|music"
                        selected={this.state.selectedTab === 'concerts'}
                        onPress={() => { this.setState({ selectedTab: 'concerts', }); }}>
          <ConcertScreen username={this.state.username}/>
        </TabBarIOS.Item>

        <TabBarIOS.Item title="Artists" iconName="foundation|microphone"
                        selected={this.state.selectedTab === 'artists'}
                        onPress={() => { this.setState({ selectedTab: 'artists', }); }}>
          <ArtistScreen username={this.state.username}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item title="Settings" iconName="fontawesome|cog"
                        selected={this.state.selectedTab === 'settings'}
                        onPress={() => { this.setState({ selectedTab: 'settings', }); }}>
          {this.renderSettings()}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }

  renderLoading(){
    return <FullpageLoader/>;
  }

  renderSettings = () => {
    return <LoginScreen username={this.state.username} onLogin={this.setUsername}/>;
  }

  setUsername = (username) => {
    this.setState({
      fetchingSettings: false,
      username,
      selectedTab: 'concerts',
    });
  }
}

AppRegistry.registerComponent('songkick', () => Songkick);
