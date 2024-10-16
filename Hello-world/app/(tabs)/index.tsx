import React, { Component } from 'react';
import { Text, View } from 'react-native';

export class index extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f8',
        // borderColor:'blue',
        // borderWidth:10
      }}>
        <Text style={{
          fontSize: 48,
          fontWeight: 'bold',
          color: '#3b3b98', 
          textShadowColor: '#d1d8e0', 
          textShadowOffset: { width: 3, height: 4 }, // Shadow offset
          textShadowRadius: 1, // Shadow blur radius
          letterSpacing: 1.5, 
        }}> 
          Hello World 
        </Text>
      </View>
    );
  }
}

export default index;
