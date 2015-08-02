import { AsyncStorage } from 'react-native';

const PREFIX = 'settings.';

function getSetting(key) {
  return AsyncStorage.getItem(PREFIX + key);
}

function setSetting(key, value) {
  return AsyncStorage.setItem(PREFIX + key, value)
    .then(() => value);
}

class Settings {
  static getUsername() {
    return getSetting('username');
  }
  static setUsername(newUsername) {
    return setSetting('username', newUsername);
  }
}

export default Settings;
