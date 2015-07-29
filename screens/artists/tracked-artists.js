import React from 'react-native';
import { TrackedArtistPaginator } from '../../songkick-api';
import ArtistDetails from './artist-details';
import ArtistList from './artist-list';
import FullpageLoader from '../common/fullpage-loader';

class TrackedArtists extends React.Component {
  constructor() {
    super();

    this.state = {
      loaded: false,
    };

    this.paginator = new TrackedArtistPaginator();

    this.goToArtistDetails = this.goToArtistDetails.bind(this);
    this.fetchNextArtists = this.fetchNextArtists.bind(this);
    this.setArtists = this.setArtists.bind(this);
  }

  render(){
    if (!this.state.loaded) {
      return <FullpageLoader addBottomPadding={true}/>;
    }
    return <ArtistList
      artists={this.state.artists}
      onArtistPressed={this.goToArtistDetails}
      fetchNextArtists={this.fetchNextArtists}
    />;
  }

  setArtists(artists){
    this.setState({
      loaded: true,
      artists,
    });
  }

  componentWillMount(){
    this.fetchNextArtists();
  }

  fetchNextArtists() {
    const {username} = this.props;
    this.paginator.fetchNext({username}).then(this.setArtists);
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
}

export default TrackedArtists;
