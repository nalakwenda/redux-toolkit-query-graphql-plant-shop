import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';
import { GRAY, GREEN } from '../colors';
import MainStackNavigation from './MainStack';
import Notifications from './Notifications';

type Props = {}
const Tab = createBottomTabNavigator();
const BottomTabNavigation = (props: Props) =>
{
  const style= tw.style(`p-5`)
  return (
    <Tab.Navigator
      // tabBarOptions={{
      //   showLabel: false,
      //   style:{tw.style(``)}
      // }}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          borderRadius: 10, bottom: 10, margin: 20, shadowColor: 'rgba (0, 0, 0, 0.25)', elevation: 20,
          },
        tabBarActiveTintColor: GREEN,
        tabBarInactiveTintColor: GRAY,
      }}>
      <Tab.Screen name="Homei" component={MainStackNavigation} options={{
       
          // headerShown: false,
      

        tabBarIcon: ({ color }) =>
        {
          return <Icon name="home" size={30} color={color} />;
        }
      }} />
      <Tab.Screen name="Notifications" component={Notifications} options={{
        tabBarBadge: 3,
        tabBarIcon: ({ color }) =>
        {
          return <Icon name="shopping-cart" size={30} color={color}/>;
        }  }} 
       />
      </Tab.Navigator>
  )
}

export default  BottomTabNavigation