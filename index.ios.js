/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var api = require('./songkick-api');

api.getTrackedArtists('arnaud-rinquin').then(function(data){
  console.log(data);
});

var songkick = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Songkick
        </Text>
        <Text style={styles.instructions}>
          I am 3 minutes into trying React Native
        </Text>
        <Text style={styles.instructions}>
          And I already go live reaload and chrome debugging
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F80046',
  },
  welcome: {
    fontSize: 70,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 5,
    color: 'white',
  },
});

AppRegistry.registerComponent('songkick', () => songkick);
