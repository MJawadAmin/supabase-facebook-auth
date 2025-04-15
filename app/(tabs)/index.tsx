import React, { Component } from 'react'
import { Text, View , Touchable} from 'react-native'
import FacebookAuthButton from '../src/components/AuthFacebook'

export class index extends Component {
  render() {
    return (
      <View>
        <FacebookAuthButton/>
      </View>
    )
  }
}

export default index
