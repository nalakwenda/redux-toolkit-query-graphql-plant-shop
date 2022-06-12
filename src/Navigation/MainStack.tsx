import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import Home from '../Screens/Home';
import { MainStackParamList } from '../Types/navigation';

type Props = {}
const Stack = createStackNavigator<MainStackParamList>();

const MainStackNavigation = (props: Props) =>
{
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{
        headerShown: false,
      }}
      />
    </Stack.Navigator>
  )
}

export default MainStackNavigation