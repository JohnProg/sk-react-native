var API_KEY = 'zdTK61Q0aF7ecOmt',
    ROOT_URL = 'http://api.songkick.com/api/3.0/';

function request(path) {
    return fetch(ROOT_URL + path + '?apikey=' + API_KEY).then(function(response){
        return response.json();
    });
}

module.exports = {
    getTrackedArtists(username) {
        return request('users/' + username + '/artists/tracked.json')
    },
    getTrackedMetros(username) {
        return request('users/' + username + '/metro_areas/tracked.json')
    }
}
