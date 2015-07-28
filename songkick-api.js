import qs from 'query-string';
const API_KEY = 'zdTK61Q0aF7ecOmt';
const ROOT_URL = 'http://api.songkick.com/api/3.0/';

class Paginator {

  constructor(fetchPage, extractPayload, checkHasMore){
    this.fetchPage = fetchPage;
    this.extractPayload = extractPayload;
    this.checkHasMore = checkHasMore;
    this.pageIndex = 1;
    this.hasMore = true;
    this.data = [];
    this.isLoading = false;
  }

  fetchNext(params){
    if (!this.hasMore || this.isLoading) {
      return Promise.resolve(this.data);
    }

    this.isLoading = true;
    var requestResult;

    return this.fetchPage(this.pageIndex++, params)
      .then(function(result){
        requestResult = result;
        return result;
      })
      .then(this.extractPayload)
      .then(function(extractedPayload){
        this.data = [].concat(this.data, extractedPayload);
      }.bind(this))
      .then(function() {
        this.hasMore = this.checkHasMore(this.data, requestResult);
        this.isLoading = false;
        return this.data;
      }.bind(this))
      .catch(function(err){
        console.error(err);
      });
  }
}

function checkHasMoreInResultsPage(extractedData, requestResult) {
  return requestResult.resultsPage.totalEntries > extractedData.length;
}

class TrackedArtistPaginator extends Paginator {
  constructor(){
    super(function fetchTrackArtistsPage(pageIndex, params){
      return api.getTrackedArtists(params.username, pageIndex);
    }, function extractTrackedArtists(requestData){
      return requestData.resultsPage.results.artist;
    }, checkHasMoreInResultsPage);
  }
}

class UserCalendarPaginator extends Paginator {
  constructor(){
    super(function fetchUserCalendarEntriesPage(pageIndex, params){
      return api.getUserCalendar(params.username, pageIndex);
    }, function extractCalendarEntries(requestData){
      return requestData.resultsPage.results.calendarEntry;
    }, checkHasMoreInResultsPage);
  }
}

function request(path, additionalQueryArgs) {
    const queryArgs = Object.assign({}, additionalQueryArgs, {
        apikey: API_KEY
    });
    const url = `${ROOT_URL}${path}?${qs.stringify(queryArgs)}`;

    return fetch(url).then(function(response){
        return response.json();
    });
}

const api = {
  TrackedArtistPaginator,
  UserCalendarPaginator,
  getTrackedArtists(username, pageIndex = 1) {
      return request(`users/${username}/artists/tracked.json`, {
          page: pageIndex
      });
  },
  getTrackedMetros(username) {
      return request(`users/${username}/metro_areas/tracked.json`);
  },
  getArtistCalendar(artistId) {
      return request(`artists/${artistId}/calendar.json`);
  },
  getUserCalendar(username, pageIndex = 1) {
      return request(`users/${username}/calendar.json`, {
        page: pageIndex,
        reason: 'tracked_artist'
      });
  }
};

export default api;
