import React from 'react';
import {Text, View, Image, StatusBar, SafeAreaView, ScrollView, ActivityIndicator,
    KeyboardAvoidingView, TouchableHighlight, TextInput, Platform} from 'react-native';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import md5 from 'react-native-md5';
import {isIphoneXorAbove} from '../../viewmodels/ApiX'

export default class DemoRegisterScreen extends React.Component{

    constructor(props) {
        super(props);

		this.props.navigation.setOptions({
            title: 'Register',
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
            name: '',
            email: '',
            phone: '',
            gender: 'M',
            address: '',
            password: '',
            password_mask: true,
            password_confirmation: '',
            password_confirmation_mask: true,
            pin: '',
            pin_mask: true,
            pin_confirmation: '',
            pin_confirmation_mask: true,
            acceptTnc: false,
        }
    }

    componentDidMount() {
		this.unsubFocus = this.props.navigation.addListener('focus', () => {
			this.componentDidFocus()
		});
		this.unsubBlur = this.props.navigation.addListener('blur', () => {
			this.componentDidBlur()
		});
    }

    componentWillUnmount() {
		this.unsubFocus();
		this.unsubBlur();
    }

    componentDidFocus() {
    }

	componentDidBlur() {
    }

    btnSubmitClicked() {
        if (this.state.name === '') {
            this.refs.name.focus();
            return;
        }
        if (this.state.email === '') {
            this.refs.email.focus();
            return;
        }
        if (this.state.phone === '') {
            this.refs.phone.focus();
            return;
        }
        if (this.state.address === '') {
            this.refs.address.focus();
            return;
        }
        if (this.state.password === '') {
            this.refs.password.focus();
            return;
        }
        if (this.state.password_confirmation === '') {
            this.refs.password_confirmation.focus();
            return;
        }
        if (this.state.pin === '') {
            this.refs.pin.focus();
            return;
        }
        if (this.state.pin_confirmation === '') {
            this.refs.pin_confirmation.focus();
            return;
        }

        if (this.state.password !== this.state.password_confirmation) {
            Toast.show('Your password and confirmation password do not match.');
            return;
        }
        if (this.state.pin !== this.state.pin_confirmation) {
            Toast.show('Your PIN and confirmation PIN do not match.');
            return;
        }

        this.setState({isLoading: true});
        axios.post('http://45.32.103.6/api/auth/register',
            {
                'name': this.state.name,
                'email': this.state.email,
                'password': md5.hex_md5(this.state.password),
            },
            {
                headers: {
                }
            }
        ).then(res => {
            this.setState({isLoading: false});
            Toast.show(res.data.message);
            if (res.data.status === 6000) {
                this.props.navigation.push('LoginScreen');
            }
        }).catch(error => {
            this.setState({isLoading: false});
        });
    };

    render(){
        if (this.state.isLoading) {
            return (
                <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <StatusBar barStyle={'light-content'} backgroundColor={'#3F6EAD'}/>
                    <ActivityIndicator size='large' color='#434343'/>
                </SafeAreaView>
            );
        }

        return (
            <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
				<StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
                <KeyboardAvoidingView behavior= {(Platform.OS === 'ios') ? 'padding' : null} style={{flex: 1}} keyboardVerticalOffset={isIphoneXorAbove() ? 88 : 64} enabled>
                    <ScrollView style={{flex: 1}} keyboardShouldPersistTaps={true}>
                        <View style={{padding: 16}}>

                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={require('../../images/ic_demo_register.png')}
                                       style={{width: 150, height: 100}} resizeMode={'contain'}/>
                            </View>

                            <View>
                                <Text style={{fontSize: 13, fontWeight: 'bold', color: '#434343'}}>Name</Text>
                                <View style={{height: 4}}/>
                                <View style={{borderWidth: 1, borderColor: '#a9a9a9',
                                    borderRadius: 8}}>
                                    <TextInput style = {{paddingLeft: 8, paddingRight: 8, height: 42}}
                                               ref='name'
                                               underlineColorAndroid = 'transparent'
                                               placeholder = 'Type your name'
                                               placeholderTextColor = '#c7c7cd'
                                               autoCapitalize = 'words'
                                               clearButtonMode = 'while-editing'
                                               value={this.state.name}
                                               onChangeText = {(text) => this.setState({name: text})}/>
                                </View>
                            </View>

                            <View style={{height: 8}}/>

                            <View>
                                <Text style={{fontSize: 13, fontWeight: 'bold', color: '#434343'}}>Email</Text>
                                <View style={{height: 4}}/>
                                <View style={{borderWidth: 1, borderColor: '#a9a9a9',
                                    borderRadius: 8}}>
                                    <TextInput style = {{paddingLeft: 8, paddingRight: 8, height: 42}}
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

                            <View style={{height: 8}}/>

                            <View>
                                <Text style={{fontSize: 13, fontWeight: 'bold', color: '#434343'}}>Phone</Text>
                                <View style={{height: 4}}/>
                                <View style={{borderWidth: 1, borderColor: '#a9a9a9',
                                    borderRadius: 8}}>
                                    <TextInput style = {{paddingLeft: 8, paddingRight: 8, height: 42}}
                                               ref='phone'
                                               underlineColorAndroid = 'transparent'
                                               placeholder = 'Type your phone number'
                                               placeholderTextColor = '#c7c7cd'
                                               autoCapitalize = 'none'
                                               clearButtonMode = 'while-editing'
                                               keyboardType= 'phone-pad'
                                               value={this.state.phone}
                                               onChangeText = {(text) => this.setState({phone: text})}/>
                                </View>
                            </View>

                            <View style={{height: 8}}/>

                            <View>
                                <Text style={{fontSize: 13, fontWeight: 'bold', color: '#434343'}}>Gender</Text>
                                <View style={{height: 4}}/>
                                <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 8}}>

                                    <TouchableHighlight underlayColor={'transparent'} onPress={() => this.setState({gender: 'M'})}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <View style={{width: 22, height: 22, borderWidth: 2, borderColor: '#454545', borderRadius: (Platform.OS === 'ios') ? 11 : 22,
                                                justifyContent: 'center', alignItems: 'center'}}>
                                                    {
                                                        this.state.gender === 'M' ? (
                                                            <View style={{width: 12, height: 12, backgroundColor: '#454545', borderRadius: (Platform.OS === 'ios') ? 6 : 12}}/>
                                                        ) : null
                                                    }
                                            </View>
                                            <View style={{width: 6}}/>
                                            <Text style={{fontSize: 13, fontWeight: 'normal', color: '#434343'}}>Male</Text>
                                        </View>
                                    </TouchableHighlight>

                                    <View style={{width: 12}}/>

                                    <TouchableHighlight underlayColor={'transparent'} onPress={() => this.setState({gender: 'F'})}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <View style={{width: 22, height: 22, borderWidth: 2, borderColor: '#454545', borderRadius: (Platform.OS === 'ios') ? 11 : 22,
                                                justifyContent: 'center', alignItems: 'center'}}>
                                                    {
                                                        this.state.gender === 'F' ? (
                                                            <View style={{width: 12, height: 12, backgroundColor: '#454545', borderRadius: (Platform.OS === 'ios') ? 6 : 12}}/>
                                                        ) : null
                                                    }
                                            </View>
                                            <View style={{width: 6}}/>
                                            <Text style={{fontSize: 13, fontWeight: 'normal', color: '#434343'}}>Female</Text>
                                        </View>
                                    </TouchableHighlight>

                                </View>
                            </View>

                            <View style={{height: 8}}/>

                            <View>
                                <Text style={{fontSize: 13, fontWeight: 'bold', color: '#434343'}}>Address</Text>
                                <View style={{height: 4}}/>
                                <View style={{borderWidth: 1, borderColor: '#a9a9a9', borderRadius: 8}}>
                                        <TextInput style = {{paddingLeft: 8, paddingRight: 8, height: 120, textAlignVertical: 'top'}}
                                                underlineColorAndroid = 'transparent'
                                                placeholder = 'Type your address'
                                                placeholderTextColor = '#c7c7cd'
                                                autoCapitalize = 'words'
                                                maxLength={200}
                                                clearButtonMode = 'while-editing'
                                                value={this.state.address}
                                                multiline={true}
                                                ref='address'
                                                onChangeText = {(text) => this.setState({address:text})}/>

                                </View>
                            </View>

                            <View style={{height: 8}}/>

                            <View>
                                <Text style={{fontSize: 13, fontWeight: 'bold', color: '#434343'}}>Password</Text>
                                <View style={{height: 4}}/>
                                <View style={{borderWidth: 1, borderColor: '#a9a9a9',borderRadius: 8,
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
                                    <TouchableHighlight underlayColor={'transparent'} onPress={() => this.setState({password_mask: !this.state.password_mask})}>
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

                            <View style={{height: 8}}/>

                            <View>
                                <Text style={{fontSize: 13, fontWeight: 'bold', color: '#434343'}}>Confirm Password</Text>
                                <View style={{height: 4}}/>
                                <View style={{borderWidth: 1, borderColor: '#a9a9a9', borderRadius: 8,
                                    flexDirection: 'row', alignItems: 'center'}}>
                                    <TextInput style = {{flex: 1, paddingLeft: 8, paddingRight: 8, height: 42}}
                                               ref='password_confirmation'
                                               underlineColorAndroid = 'transparent'
                                               placeholder = 'Confirm your password'
                                               placeholderTextColor = '#c7c7cd'
                                               autoCapitalize = 'none'
                                               clearButtonMode = 'while-editing'
                                               secureTextEntry = {this.state.password_confirmation_mask}
                                               value={this.state.password_confirmation}
                                               onChangeText = {(text) => this.setState({password_confirmation: text})}/>
                                    <TouchableHighlight underlayColor={'transparent'} onPress={() => this.setState({password_confirmation_mask: !this.state.password_confirmation_mask})}>
                                        <View style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}}>
                                            <Image source={
                                                this.state.password_confirmation_mask === true ? (
                                                    require('../../images/ic_demo_password_on.png')
                                                ) : require('../../images/ic_demo_password_off.png')}
                                                style={{width: 20, height: 20}} resizeMode={'contain'} tintColor={
                                                    this.state.password_confirmation_mask === true ? ('#a9a9a9') : ('#434343')}/>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>

                            <View style={{height: 8}}/>

                            <View>
                                <Text style={{fontSize: 13, fontWeight: 'bold', color: '#434343'}}>PIN</Text>
                                <View style={{height: 4}}/>
                                <View style={{borderWidth: 1, borderColor: '#a9a9a9', borderRadius: 8,
                                    flexDirection: 'row', alignItems: 'center'}}>
                                    <TextInput style = {{flex: 1, paddingLeft: 8, paddingRight: 8, height: 42}}
                                               ref='pin'
                                               underlineColorAndroid = 'transparent'
                                               placeholder = 'Type your PIN'
                                               placeholderTextColor = '#c7c7cd'
                                               autoCapitalize = 'none'
                                               clearButtonMode = 'while-editing'
                                               secureTextEntry = {this.state.pin_mask}
                                               keyboardType= 'number-pad'
                                               value={this.state.pin}
                                               onChangeText = {(text) => this.setState({pin: text})}/>
                                    <TouchableHighlight underlayColor={'transparent'} onPress={() => this.setState({pin_mask: !this.state.pin_mask})}>
                                        <View style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}}>
                                            <Image source={
                                                this.state.pin_mask === true ? (
                                                    require('../../images/ic_demo_password_on.png')
                                                ) : require('../../images/ic_demo_password_off.png')}
                                                style={{width: 20, height: 20}} resizeMode={'contain'} tintColor={
                                                    this.state.pin_mask === true ? ('#a9a9a9') : ('#434343')}/>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>

                            <View style={{height: 8}}/>

                            <View>
                                <Text style={{fontSize: 13, fontWeight: 'bold', color: '#434343'}}>Confirm PIN</Text>
                                <View style={{height: 4}}/>
                                <View style={{borderWidth: 1, borderColor: '#a9a9a9', borderRadius: 8,
                                    flexDirection: 'row', alignItems: 'center'}}>
                                    <TextInput style = {{flex: 1, paddingLeft: 8, paddingRight: 8, height: 42}}
                                               ref='pin_confirmation'
                                               underlineColorAndroid = 'transparent'
                                               placeholder = 'Confirm your PIN'
                                               placeholderTextColor = '#c7c7cd'
                                               autoCapitalize = 'none'
                                               clearButtonMode = 'while-editing'
                                               secureTextEntry = {this.state.pin_confirmation_mask}
                                               keyboardType= 'number-pad'
                                               value={this.state.pin_confirmation}
                                               onChangeText = {(text) => this.setState({pin_confirmation: text})}/>
                                    <TouchableHighlight underlayColor={'transparent'} onPress={() => this.setState({pin_confirmation_mask: !this.state.pin_confirmation_mask})}>
                                        <View style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}}>
                                            <Image source={
                                                this.state.pin_confirmation_mask === true ? (
                                                    require('../../images/ic_demo_password_on.png')
                                                ) : require('../../images/ic_demo_password_off.png')}
                                                style={{width: 20, height: 20}} resizeMode={'contain'} tintColor={
                                                    this.state.pin_confirmation_mask === true ? ('#a9a9a9') : ('#434343')}/>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>

                            <View style={{height: 8}}/>

                            <TouchableHighlight underlayColor={'transparent'} onPress={() => this.setState({acceptTnc: !this.state.acceptTnc})}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={{width: 22, height: 22, borderWidth: 2, borderColor: '#454545', borderRadius: (Platform.OS === 'ios') ? 3 : 5,
                                        justifyContent: 'center', alignItems: 'center'}}>
                                            {
                                                this.state.acceptTnc === true ? (
                                                    <Image style={{width: 16, height: 16}} source={require('../../images/ic_demo_checkmark.png')}/>
                                                ) : null
                                            }
                                    </View>
                                    <View style={{width: 6}}/>
                                    <View style={{flex: 1}}>
                                        <Text style={{fontSize: 13, fontWeight: 'normal', color: '#434343'}}>By clicking Sign Up, you agree to our Terms and that you have read our Data Use Policy.</Text>
                                    </View>
                                </View>
                            </TouchableHighlight>

                            <View style={{height: 20}}/>

                            <TouchableHighlight style={{borderRadius: 8}} underlayColor='#434343' onPress={()=>this.btnSubmitClicked()}>
                                <View style={{justifyContent: 'center', alignItems: 'center',
                                    backgroundColor: '#eb3b5a', borderRadius: 8, height: 42}}>
                                    <Text style={{fontSize: 15, fontWeight: 'bold', color: '#ffffff'}}>Sign Up</Text>
                                </View>
                            </TouchableHighlight>

                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
};
