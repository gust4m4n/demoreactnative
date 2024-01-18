import React from 'react';
import {
    Text, View, Image, StatusBar, SafeAreaView, ScrollView, ActivityIndicator,
    KeyboardAvoidingView, AsyncStorage, TouchableHighlight, TextInput, Platform
} from 'react-native';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import md5 from 'react-native-md5';
import {isIphoneXorAbove} from '../..//viewmodels/ApiX';
import DemoDialogInfo from '../../../app/views/DemoDialogInfo/DemoDialogInfo';
import DemoDialogForgotPassword from '../../../app/views/DemoDialogForgotPassword/DemoDialogForgotPassword';
//import {GoogleSignin} from '@react-native-community/google-signin';
//import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'

export default class DemoLoginScreen extends React.Component{

	constructor(props) {
        super(props);

		this.props.navigation.setOptions({
			headerShown: false,
            title: 'Login',
            headerStyle: {
                backgroundColor: 'white',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
                fontWeight: 'normal',				
            },
			headerLeft: () => (
                <TouchableHighlight underlayColor={'transparent'} onPress={() => this.props.navigation.goBack()}>
                    <Image style={{width: 44, height: 44, tintColor: 'black'}} source={require('../../images/ic_demo_back.png')}/>
                </TouchableHighlight>
            ),
		});

        this.state = {
            isLoading: false,
            email: 'someone@example.com',
            password: 'password',
            password_mask: true,

            dialogForgotPasswordVisible: false,

            infoModalVisible: false,
            infoModalTitle: '',
            infoModalMessage: '',
        }
    }

    componentDidMount() {
		this.unsubFocus = this.props.navigation.addListener('focus', () => {
			this.componentDidFocus()
		});
		this.unsubBlur = this.props.navigation.addListener('blur', () => {
			this.componentDidBlur()
		});

		//GoogleSignin.configure();
    }

    componentWillUnmount() {
		this.unsubFocus();
		this.unsubBlur();
    }

    componentDidFocus() {
    }

	componentDidBlur() {
    }

    btnLoginClicked() {
        if (this.state.email === '') {
            this.refs.email.focus();
            return;
        }
        if (this.state.password === '') {
            this.refs.password.focus();
            return;
        }

        this.emailLogin();
    };

    submitForgotPassword(email) {        
        this.setState({isLoading: true})
        axios.post('http://45.32.103.6/api/auth/reset_password',
            {
                'email': email,
            },
            {
                headers: {
                    'Authorization': 'Bearer xxx',
                }
            }
        ).then(res => {
            this.setState({isLoading: false})
            if (res.data.status === 6000) {
                this.setState({
                    dialogForgotPasswordVisible: false,
                    infoModalVisible: true,
                    infoModalTitle: 'Forgot Password',
                    infoModalMessage: res.data.message,
                });
            }
            else {
                Toast.show(res.data.message);
            }
        }).catch(error => {
            this.setState({isLoading: false})
        });
    }

    emailLogin() {
        this.setState({isLoading: true});
        axios.post('http://45.32.103.6/api/auth/login',
            {
                'email': this.state.email,
                'password': md5.hex_md5(this.state.password),
            },
            {
                headers: {
                    'Authorization': 'Bearer xxx',
                }
            }
        ).then(res => {
            this.setState({isLoading: false});
            Toast.show(res.data.message);
            if (res.data.status === 6000) {
                AsyncStorage.setItem('token', res.data.result.token, () => {
                    let user = {
                        name: res.data.result.user.name,
                        email: res.data.result.user.email,
                        image_url: 'https://padangkita.com/wp-content/uploads/2019/03/Lina-Kartika-Padangkita.com_.jpg',
                    }
                    AsyncStorage.setItem('user', JSON.stringify(user), () => {
                        this.props.navigation.push('DemoTabBarScreen');
                    });
                });
            }
        }).catch(error => {
            this.setState({isLoading: false});
        });
    }

    render(){
        if (this.state.isLoading) {
            return (
                <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
                    <ActivityIndicator size='large' color='#434343'/>
                </SafeAreaView>
            );
        }

        return (
            <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
                <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
                <KeyboardAvoidingView behavior= {(Platform.OS === 'ios') ? 'padding' : null} style={{flex: 1}} keyboardVerticalOffset={isIphoneXorAbove() ? 0 : 0} enabled>
                    <ScrollView style={{flex: 1}} keyboardShouldPersistTaps={true}>
                        <View style={{padding: 16}}>

                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={require('../../images/ic_demo_login.png')}
                                       style={{width: 200, height: 200}} resizeMode={'contain'}/>
                            </View>

                            <View>
                                <Text style={{fontSize: 13, fontWeight: 'bold', color: '#434343'}}>Email</Text>
                                <View style={{height: 4}}/>
                                <View style={{borderWidth: 1, borderColor: '#a9a9a9', borderRadius: 8}}>
                                    <TextInput style = {{paddingLeft: 8, paddingRight: 8, height: 42, color: '#434343'}}
                                               ref='email'
                                               underlineColorAndroid = 'transparent'
                                               placeholder = 'Type your email'
                                               placeholderTextColor = '#c7c7cd'
                                               autoCapitalize = 'none'
                                               clearButtonMode = 'while-editing'
                                               value={this.state.email}
                                               onChangeText = {(text) => this.setState({email: text})}/>
                                </View>
                            </View>

                            <View style={{height: 12}}/>

                            <View>
                                <Text style={{fontSize: 13, fontWeight: 'bold', color: '#434343'}}>Password</Text>
                                <View style={{height: 4}}/>
                                <View style={{borderWidth: 1, borderColor: '#a9a9a9', borderRadius: 8,
                                    flexDirection: 'row', alignItems: 'center'}}>
                                    <TextInput style = {{flex: 1, paddingLeft: 8, paddingRight: 8, height: 42, color: '#434343'}}
                                               ref='password'
                                               underlineColorAndroid = 'transparent'
                                               placeholder = 'Type your password'
                                               placeholderTextColor = '#c7c7cd'
                                               autoCapitalize = 'none'
                                               clearButtonMode = 'while-editing'
                                               secureTextEntry = {this.state.password_mask}
                                               value={this.state.password}
                                               onChangeText = {(text) => this.setState({password: text})}/>

                                    <TouchableHighlight underlayColor='transparent' onPress={() => this.setState({password_mask: !this.state.password_mask})}>
                                        <View style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}}>
                                            <Image source={
                                                this.state.password_mask === true ? (
                                                    require('../../images/ic_demo_password_on.png')
                                                ) : require('../../images/ic_demo_password_off.png')}
                                                style={{width: 20, height: 20}} resizeMode={'contain'} tintColor={
                                                    this.state.password_mask === true ? ('#a9a9a9') : ('#434343')}/>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>

                            <View style={{height: 12}}/>

                            <View style={{flexDirection: 'row'}}>
                                <View style={{flex: 1, height: 42, alignItems: 'flex-end'}}>
                                    <TouchableHighlight underlayColor='transparent' onPress={() => this.setState({dialogForgotPasswordVisible: true})}>
                                        <Text style={{fontSize: 15, fontWeight: 'bold', color: '#434343'}}>Forgot password?</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>

                            <TouchableHighlight style={{borderRadius: 8}} underlayColor='#434343' onPress={()=>this.btnLoginClicked()}>
                                <View style={{justifyContent: 'center', alignItems: 'center',
                                    backgroundColor: '#eb3b5a', borderRadius: 8, height: 42}}>
                                    <Text style={{fontSize: 15, fontWeight: 'bold', color: '#ffffff'}}>Sign In</Text>
                                </View>
                            </TouchableHighlight>

                            <View style={{height: 6}}/>

                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 15, fontWeight: 'normal', color: '#434343'}}>Don't have an account?</Text>
                                <View style={{width: 8}}/>
                                <TouchableHighlight underlayColor='transparent' onPress={() => this.props.navigation.push('RegisterScreen')}>
                                    <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', height: 42}}>
                                        <Text style={{fontSize: 15, fontWeight: 'bold', color: '#434343'}}>Sign up now!</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>

                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

                <DemoDialogForgotPassword
                    visible={this.state.dialogForgotPasswordVisible}
                    onCancel={()=> this.setState({dialogForgotPasswordVisible: false})}
                    onOK={(email)=> this.submitForgotPassword(email)}
                />

                <DemoDialogInfo visible={this.state.infoModalVisible}
                    title={this.state.infoModalTitle}
                    message={this.state.infoModalMessage}
                    onOK={()=> this.setState({infoModalVisible: false})}/>

            </SafeAreaView>
        );
    }
};
