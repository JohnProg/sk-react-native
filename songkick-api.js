const qs = require('query-string'),
      API_KEY = 'zdTK61Q0aF7ecOmt',
      ROOT_URL = 'http://api.songkick.com/api/3.0/';

function request(path, additionalQueryArgs) {
    const queryArgs = Object.assign({}, additionalQueryArgs, {
        apikey: API_KEY
    });
    const url = `${ROOT_URL}${path}?${qs.stringify(queryArgs)}`;

    return fetch(url).then(function(response){
        return response.json();
    });
}

module.exports = {
    getTrackedArtists(username, pageIndex = 1) {
        return request(`users/${username}/artists/tracked.json`, {
            page: pageIndex
        });
    },
    getTrackedMetros(username) {
        return request('users/' + username + '/metro_areas/tracked.json')
    }
}
