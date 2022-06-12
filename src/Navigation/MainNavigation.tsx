import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { useAppSelector } from '../Redux/hooks';
import { authDetails } from '../Redux/slices/AuthSlice';
import AuthStack from './AuthStack';
import DrawerStack from './DrawerStack';

type Props = {}
const nala = false;
const MainNavigation = (props: Props) =>
{
  const { token } = useAppSelector(authDetails)
  return (
    <NavigationContainer> 
      {token ? <DrawerStack /> : <AuthStack />}
    </NavigationContainer>
  );

}

export default MainNavigation


