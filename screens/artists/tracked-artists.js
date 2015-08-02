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

  setArtists = (artists) => {
    this.setState({
      loaded: true,
      artists,
    });
  }

  setPaginator(username){
    const paginator = new TrackedArtistPaginator(username);
    this.setState({
      paginator
    });
    paginator.fetchNext().then(this.setArtists);
  }

  componentWillMount(){
    this.setPaginator(this.props.username);
  }
  componentWillReceiveProps(nextProps){
    const {username} = nextProps;

    if (username !== this.props.username) {
      this.setPaginator(username);
    }
  }

  fetchNextArtists = () => {
    this.state.paginator.fetchNext().then(this.setArtists);
  }

  goToArtistDetails = (artist) => {
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
