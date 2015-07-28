import qs from 'query-string';
const API_KEY = 'zdTK61Q0aF7ecOmt';
const ROOT_URL = 'http://api.songkick.com/api/3.0/';

function request(path, additionalQueryArgs) {
    const queryArgs = Object.assign({}, additionalQueryArgs, {
        apikey: API_KEY
    });
    const url = `${ROOT_URL}${path}?${qs.stringify(queryArgs)}`;

    return fetch(url).then(function(response){
        return response.json();
    });
}

export default {
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
