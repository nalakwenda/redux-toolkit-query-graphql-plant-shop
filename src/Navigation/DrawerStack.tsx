import React from 'react'
import { createDrawerNavigator } from "@react-navigation/drawer";

import TabNavigation from './TabNavigation';
// import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {}
const Drawer = createDrawerNavigator()

const DrawerStack = (props: Props) => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TabNavigation}
        options={{
          headerShown: true,
        }}

      />
    </Drawer.Navigator>
  )
}

export default DrawerStack