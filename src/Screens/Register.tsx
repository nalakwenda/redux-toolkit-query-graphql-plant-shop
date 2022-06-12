import { Formik } from 'formik';
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, TextInput, Image, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import tw from 'twrnc';
import { object, string } from "yup";
import { StackNavigationProp } from '@react-navigation/stack';
import { BackgroundImage, TopImage } from '../Assets/Images/images';
import { GRAY } from '../colors';
import ResusableTextInput from '../Components/ResusableTextInput';
import ReusableButton from '../Components/ReusableButton';
import { AuthStackParamList } from '../Types/navigation';
import { useNavigation } from '@react-navigation/native';
import { api } from '../queries/register.generated';

type AuthNavProp = StackNavigationProp<AuthStackParamList, 'Register'>;

type Props = {}

const Register = (props: Props) =>
{
    const navigation = useNavigation<AuthNavProp>();
    const [message, setMessage] = useState<string>('')

    const [registerUser, { isLoading, isError, error, isSuccess, data }] =
        api.endpoints.registerUser.useMutation()
   

    return (
        <SafeAreaView style={[tw``]}>
            {/* <ScrollView> */}
            <View >
                <ImageBackground source={BackgroundImage} resizeMode="cover" style={tw.style(` h-full justify-center`)}>
                    <TextInput />

                    <View style={tw.style(``)}>
                        <Formik

                            initialValues={{ password: '', email: '' }}
                            validationSchema={object({
                                email: string()
                                    // .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Please input a valid email')
                                    .required("Please valid email"),
                                password: string()
                                    .required("Please enter valid password")
                            })}
                            onSubmit={values =>
                            {
                                registerUser(values)
                                if (isSuccess && data?.accountRegister?.user !== null) {
                                    navigation.navigate('Login')
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
                                        <Text style={tw.style(`text-green-600  text-4xl`)}>Register </Text>
                                        <Text style={tw.style(` mt-3 text-sm`, { color: GRAY })}>Create your account </Text>
                                    </View>

                                    <View style={tw`mt-2 mb-2`}>
                                        <ResusableTextInput id='email' placeHolder=" Enter your email" onChangeText={handleChange('email')}

                                            onBlur={handleBlur('email')}

                                            value={values.email} />
                                        <Text style={tw.style(`text-red-700`)}> {errors.email && touched.email && errors.email}</Text>
                                    </View>


                                    <View style={[tw`mt-2 mb-2`]}>
                                        <ResusableTextInput id='password' placeHolder="Enter  your password" onChangeText={handleChange('password')}

                                            onBlur={handleBlur('password')}

                                            value={values.password} />
                                        <Text style={tw.style(`text-red-700`)}> {errors.password && touched.password && errors.password}</Text>
                                    </View>
                                    <Text style={tw.style(`text-red-700`)}>{message !== '' ? message : null}</Text>
                                    <ReusableButton onPress={handleSubmit} text="Submit" loader={isLoading} disable={!isValid || !dirty} />
                                    
                                    <View style={tw.style(`items-center justify-center flex-row mt-2`)}>
                                        <Text style={tw.style(`ml-1`, { color: GRAY })}>
                                            Dont have an account?
                                        </Text>
                                        <TouchableOpacity onPress={() =>
                                        {
                                            navigation.navigate('Login');
                                        }}>
                                            <Text style={tw.style(`text-green-600`)}>Login</Text>
                                        </TouchableOpacity>
                                    </View>
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
export default Register