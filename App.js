/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation'
import Youtube from 'react-native-youtube'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import YouTubeVideo from './YouTubeVideo'

const apiKey = 'AIzaSyDQxObh9ZF4oCOXwzwYie_8m6BYiCXQQtI'
const channelId = 'UCQzdMyuz0Lf4zo4uGcEujFw'
const results = 30


class App extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      data: []
    }
  }
  componentDidMount(){
    fetch(`https://www.googleapis.com/youtube/v3/search/?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${results}`)
    .then(res => res.json())
    .then(res => {
      const videoId = []
      res.items.forEach(item => {
        videoId.push(item)
      })
      this.setState({
        data: videoId
      })
    })
    .catch(error => {
      console.log(error)
    })
  }
  render() {
    const {navigate} = this.props.navigation
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.body}>
          {this.state.data.map((item, i) => 
          <TouchableHighlight
            key={item.id.videoId}
            onPress={() => navigate('YouTubeVideo', {youtubeId: item.id.videoId})}>
            <View style={styles.vids}>
            <Image
              source={{uri: item.snippet.thumbnails.medium.url}}
              style={{width: 320, height: 180}}/>
            <View style={styles.vidItems}>
             <Image
              source={require('./images/NightKing.png')}
              style={{width: 40, height: 40, borderRadius: 20, marginRight: 5}}/>
            <Text style={styles.vidText}>{item.snippet.title}</Text>
            <Icon name="more-vert" size={20} color='#555' />
            </View>
            </View>
            </TouchableHighlight>
          )}
      </View>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 30
  },
  vids: {
    paddingBottom: 30,
    width: 320,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderBottomWidth: 0.6,
    borderColor: '#aaa'
  },
  vidItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10
  },
  vidText: {
    padding: 20,
    color: '#000'
  }
});

export default screens = StackNavigator({
  Home: { screen: App },
  YouTubeVideo: { screen: YouTubeVideo }
})