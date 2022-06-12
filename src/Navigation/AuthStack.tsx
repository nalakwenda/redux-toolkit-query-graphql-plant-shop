import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import { AuthStackParamList } from '../Types/navigation';


const AuthStack = () =>
{
    const AuthStack = createNativeStackNavigator<AuthStackParamList>();

    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen name="Register" component={Register} />

        </AuthStack.Navigator>
    )
}

export default AuthStack