import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, TextInput, Image, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import tw from 'twrnc';
import { object, string } from "yup";
import { BackgroundImage, TopImage } from '../Assets/Images/images';
import { GRAY } from '../colors';
import ResusableTextInput from '../Components/ResusableTextInput';
import ReusableButton from '../Components/ReusableButton';
import { api } from '../queries/login.generated';
import { useAppSelector } from '../Redux/hooks';
import { authDetails, login } from '../Redux/slices/AuthSlice';
import { AuthStackParamList } from '../Types/navigation';

type AuthNavProp = StackNavigationProp<AuthStackParamList, 'Register'>;
type Props = {}

const Login = (props: Props) =>
{
    const [authenticateUser, { isLoading, isError, error, isSuccess, data }] = api.endpoints.authenticateUser.useMutation()
    const [message, setMessage] = useState<string>('')
    const navigation = useNavigation<AuthNavProp>();

    return (

        <SafeAreaView style={[tw``]}>
            {/* <ScrollView> */}
            <View >
                <ImageBackground source={BackgroundImage} resizeMode="cover" style={tw.style(`h-full justify-center`)}>


                    <View style={tw.style(``)}>
                        <Formik

                            initialValues={{ email: '', password: '' }}
                            validationSchema={object({
                                email: string()
                                    // .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Please input a valid email')
                                    .required("Please valid phone email"),
                                password: string()
                                    .required("Please enter valid password")
                            })}
                            onSubmit={values =>
                            {
                                authenticateUser(values)
                                if (isSuccess && data && data.tokenCreate?.token !== null) {
                                    if (data.tokenCreate?.token !== null && data.tokenCreate?.token !== undefined) {
                                        login(data.tokenCreate?.token)
                                    }

                                } else {
                                    setMessage('Wrong password or email');
                                }

                                if (!isSuccess) {
                                    setMessage('An error occured. Please try again.');
                                }
                            }}
                        >

                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, dirty }) => (

                                <View style={tw.style(`p-4 `)}>
                                    <View style={tw.style(`justify-center items-center mb-5`)}>
                                        <Text style={tw.style(`text-green-600  text-4xl`)}>Welcome Back </Text>
                                        <Text style={tw.style(` mt-3 text-sm`, { color: GRAY })}>Log into your account </Text>
                                    </View>
                                    <View style={tw`mt-2 mb-2`}>
                                        <ResusableTextInput id='email' placeHolder="Email" onChangeText={handleChange('email')}

                                            onBlur={handleBlur('username')}

                                            value={values.email} />
                                        <Text style={tw.style(`text-red-700`)}> {errors.email && touched.email && errors.email}</Text>
                                    </View>
                                    <View style={[tw`mt-2 mb-2`]}>
                                        <ResusableTextInput id='password' placeHolder="Password" onChangeText={handleChange('password')}

                                            onBlur={handleBlur('password')}

                                            value={values.password} />
                                        <Text style={tw.style(`text-red-700`)}> {errors.password && touched.password && errors.password}</Text>
                                    </View>

                                    <ReusableButton onPress={handleSubmit} text="Submit" />
                                    <View style={tw.style(`items-center justify-center flex-row mt-2`)}><Text style={tw.style(``, { color: GRAY })}>Dont have an account? </Text>
                                        <TouchableOpacity onPress={() =>
                                        {
                                            navigation.navigate('Register');
                                        }}><Text style={tw.style(`text-green-600`)}>Register</Text></TouchableOpacity></View>
                                </View>

                            )}

                        </Formik>

                    </View>
                </ImageBackground>
            </View>
            {/* </View> */}
            {/* </ScrollView> */}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({


});
export default Login