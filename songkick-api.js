import qs from 'query-string';
const API_KEY = 'zdTK61Q0aF7ecOmt';
const ROOT_URL = 'http://api.songkick.com/api/3.0/';
import objAssign from 'object-assign';

class Paginator {

  constructor(fetchPage, extractPayload, checkHasMore, baseParams){
    this.fetchPage = fetchPage;
    this.extractPayload = extractPayload;
    this.checkHasMore = checkHasMore;
    this.baseParams = baseParams;
    this.pageIndex = 1;
    this.hasMore = true;
    this.data = [];
    this.isLoading = false;
  }

  fetchNext(extraParams){
    if (!this.hasMore || this.isLoading) {
      return Promise.resolve(this.data);
    }

    const requestParams = objAssign({}, this.baseParams, extraParams);

    this.isLoading = true;
    var requestResult;

    return this.fetchPage(this.pageIndex++, requestParams)
      .then(function(result){
        requestResult = result;
        return result;
      })
      .then(this.extractPayload)
      .then(function(extractedPayload){
        if (extractedPayload) { // don't update data if there is nothing new
          this.data = [].concat(this.data, extractedPayload);
        }
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
  constructor(username){
    super(function fetchTrackArtistsPage(pageIndex){
      return api.getTrackedArtists(username, pageIndex);
    }, function extractTrackedArtists(requestData){
      return requestData.resultsPage.results.artist;
    }, checkHasMoreInResultsPage);
  }
}

class UserCalendarPaginator extends Paginator {
  constructor(baseParams){
    super(function fetchUserCalendarEntriesPage(pageIndex, params){
      return api.getUserCalendar(params.username, pageIndex, params.reason);
    }, function extractCalendarEntries(requestData){
      return requestData.resultsPage.results.calendarEntry;
    }, checkHasMoreInResultsPage, baseParams);
  }
}

class UserEventsPaginator extends Paginator {
  constructor(baseParams){
    super(function fetchUserEventEntriesPage(pageIndex, params){
      return api.getUserEvents(params.username, pageIndex, params.attendance);
    }, function extractEventEntries(requestData){
      return requestData.resultsPage.results.event;
    }, checkHasMoreInResultsPage, baseParams);
  }
}

function request(path, additionalQueryArgs) {
    const queryArgs = Object.assign({}, additionalQueryArgs, {
        apikey: API_KEY
    });
    const url = `${ROOT_URL}${path}?${qs.stringify(queryArgs)}`;

    return fetch(url).then(function(response){
      if (response.status === 404) {
        throw new Error('Not found');
      }
      return response;
    }).then(function(response){
        return response.json();
    });
}

const api = {
  TrackedArtistPaginator,
  UserCalendarPaginator,
  UserEventsPaginator,
  assertUserExists(username){
    // use the artist API as a username test :/
    return api.getTrackedArtists(username)
      .then(() => username)
      .catch(function(){
        throw new Error('User does not exist');
      });
  },
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
  getUserCalendar(username, page = 1, reason = 'tracked_artist') {
      return request(`users/${username}/calendar.json`, {
        page,
        reason,
      });
  },
  getUserEvents(username, page = 1, attendance = 'all') {
      return request(`users/${username}/events.json`, {
        page,
        attendance,
      });
  }
};

export default api;
