/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import IssueList from './IssueList.js';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



export default class App extends React.Component
{
  render()
  {
    return(
    <View style = {{backgroundColor: '#fff'}}>
      <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>Issue Tracker Application</Text>
      <IssueList/>
    </View>);

  }
}
