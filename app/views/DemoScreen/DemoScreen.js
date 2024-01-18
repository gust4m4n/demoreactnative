import React from 'react';
import {
    StatusBar, View, TouchableHighlight, SafeAreaView,
    ScrollView, Text
} from 'react-native';
import ApiX from '../../viewmodels/ApiX';
import Toast from 'react-native-simple-toast';
import DemoDialogInfo from '../DemoDialogInfo/DemoDialogInfo';
import DemoDialogQuestion from '../DemoDialogQuestion/DemoDialogQuestion';
import DemoDialogSelect from '../DemoDialogSelect/DemoDialogSelect';
import DemoDialogForgotPassword from '../DemoDialogForgotPassword/DemoDialogForgotPassword';

export default class DemoScreen extends React.Component {

	constructor(props) {
        super(props);

		this.props.navigation.setOptions({
			headerShown: true,
            title: 'DemoReactNative',
            headerStyle: {
                backgroundColor: 'white',
            },
            headerTintColor: 'black',
            headerTitleStyle: {
                fontWeight: 'normal',				
            },
		});

        this.state = {
			dialogInfoVisible: false,
            dialogInfoTitle: '',
            dialogInfoMessage: '',

			dialogQuestionVisible: false,
            dialogQuestionTitle: '',
            dialogQuestionMessage: '',

			dialogSelectVisible: false,
            dialogSelectList: ['Russia', 'Canada', 'United States', 'China', 'Brazil', 'Australia', 'India',
                'Argentina', 'Kazakhstan', 'Algeria', 'Congo', 'Greenland', 'Saudi Arabia', 'Mexico',
                'Indonesia', 'Sudan', 'Libya', 'Iran', 'Peru'],
            dialogSelectIndex: 0,

			dialogForgotPasswordVisible: false,
			dialogTncVisible: false,
			dialogTncHtml: '',
        };
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

	showDialogInfo(visible, title, message) {
		this.setState({
			dialogInfoVisible: visible,
			dialogInfoTitle: title,
			dialogInfoMessage: message
		});
	}

	showDialogQuestion(visible, title, message) {
		this.setState({
			dialogQuestionVisible: visible,
			dialogQuestionTitle: title,
			dialogQuestionMessage: message
		});
	}

	showDialogSelect(visible) {
		this.setState({dialogSelectIndex: this.state.dialogSelectIndex, dialogSelectVisible: visible})
	}

	showDialogForgotPassword(visible) {
		this.setState({dialogForgotPasswordVisible: visible});
	}

	submitDialogForgotPassowrd(email) {        
		this.setState({dialogForgotPasswordVisible: false});
	}

	showDialogTnc(visible) {
		this.setState({dialogTncVisible: visible});
		ApiX.get('https://www.epicgames.com/site/en-US/tos', {}).then(response => {
			if (response.statusCode === 200) {
				this.setState({dialogTncHtml: response.data});
			}
		})
	}

	render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
                <SafeAreaView style={{flex: 1}}>
                
                    <ScrollView style={{flex: 1}}>
                        <View style={{padding: 16}}>

						<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 4, justifyContent: 'center'}}>
								<TouchableHighlight style={{flex: 1, borderRadius: 8}} underlayColor='#434343' onPress={() => this.props.navigation.push('DemoRegisterScreen')}>
									<View style={{justifyContent: 'center', alignItems: 'center',
										backgroundColor: '#10b9b1', height: 48, borderRadius: 8}}>
										<Text style={{fontSize: 15, fontWeight: 'bold', color: '#ffffff'}}>Register</Text>
									</View>
								</TouchableHighlight>
								<View style={{width: 8}}/>
								<TouchableHighlight style={{flex: 1, borderRadius: 8}} underlayColor='#434343' onPress={() => this.props.navigation.push('DemoLoginScreen')}>
									<View style={{justifyContent: 'center', alignItems: 'center',
										backgroundColor: '#10b9b1', height: 48, borderRadius: 8}}>
										<Text style={{fontSize: 15, fontWeight: 'bold', color: '#ffffff'}}>Login</Text>
									</View>
								</TouchableHighlight>
							</View>		

							<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 4, justifyContent: 'center'}}>
								<TouchableHighlight style={{flex: 1, borderRadius: 8}} underlayColor='#434343' onPress={() => this.props.navigation.push('DemoGridViewScreen')}>
									<View style={{justifyContent: 'center', alignItems: 'center',
										backgroundColor: '#20bf6b', height: 48, borderRadius: 8}}>
										<Text style={{fontSize: 15, fontWeight: 'bold', color: '#ffffff'}}>GridView</Text>
									</View>
								</TouchableHighlight>
								<View style={{width: 8}}/>
								<TouchableHighlight style={{flex: 1, borderRadius: 8}} underlayColor='#434343' onPress={() => this.props.navigation.push('DemoListViewScreen')}>
									<View style={{justifyContent: 'center', alignItems: 'center',
										backgroundColor: '#20bf6b', height: 48, borderRadius: 8}}>
										<Text style={{fontSize: 15, fontWeight: 'bold', color: '#ffffff'}}>ListView</Text>
									</View>
								</TouchableHighlight>
							</View>

							<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 4, justifyContent: 'center'}}>
								<TouchableHighlight style={{flex: 1, borderRadius: 8}} underlayColor='#434343' onPress={() => this.props.navigation.push('DemoQRCodeScreen')}>
									<View style={{justifyContent: 'center', alignItems: 'center',
										backgroundColor: '#8854d0', height: 48, borderRadius: 8}}>
										<Text style={{fontSize: 15, fontWeight: 'bold', color: '#ffffff'}}>QR Code</Text>
									</View>
								</TouchableHighlight>
								<View style={{width: 8}}/>
								<TouchableHighlight style={{flex: 1, borderRadius: 8}} underlayColor='#434343' onPress={() => this.props.navigation.push('DemoQRScanScreen')}>
									<View style={{justifyContent: 'center', alignItems: 'center',
										backgroundColor: '#8854d0', height: 48, borderRadius: 8}}>
										<Text style={{fontSize: 15, fontWeight: 'bold', color: '#ffffff'}}>QR Scan</Text>
									</View>
								</TouchableHighlight>
							</View>

							<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 4, justifyContent: 'center'}}>
								<TouchableHighlight style={{flex: 1, borderRadius: 8}} underlayColor='#434343' onPress={() => this.props.navigation.push('DemoHtmlScreen')}>
									<View style={{justifyContent: 'center', alignItems: 'center',
										backgroundColor: '#3867d6', height: 48, borderRadius: 8}}>
										<Text style={{fontSize: 15, fontWeight: 'bold', color: '#ffffff'}}>HTML</Text>
									</View>
								</TouchableHighlight>
								<View style={{width: 8}}/>
								<TouchableHighlight style={{flex: 1, borderRadius: 8}} underlayColor='#434343' onPress={() => this.props.navigation.push('DemoWebViewScreen')}>
									<View style={{justifyContent: 'center', alignItems: 'center',
										backgroundColor: '#3867d6', height: 48, borderRadius: 8}}>
										<Text style={{fontSize: 15, fontWeight: 'bold', color: '#ffffff'}}>WebView</Text>
									</View>
								</TouchableHighlight>
							</View>							

							<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 4, justifyContent: 'center'}}>
								<TouchableHighlight style={{flex: 1, borderRadius: 8}} underlayColor='#434343'  onPress={() => this.props.navigation.push('DemoImageScreen', {image_url: 'https://asset.kompas.com/crops/O52aCLMlx3l08Jva3xH8owemjG4=/160x0:1024x576/750x500/data/photo/2022/02/10/62048cd578da1.jpg'})}>
									<View style={{justifyContent: 'center', alignItems: 'center',
										backgroundColor: '#2d98da', height: 48, borderRadius: 8}}>
										<Text style={{fontSize: 15, fontWeight: 'bold', color: '#ffffff'}}>Image</Text>
									</View>
								</TouchableHighlight>
								<View style={{width: 8}}/>
								<TouchableHighlight style={{flex: 1, borderRadius: 8}} underlayColor='#434343' onPress={() => this.props.navigation.push('DemoSettingsScreen')}>
									<View style={{justifyContent: 'center', alignItems: 'center',
										backgroundColor: '#2d98da', height: 48, borderRadius: 8}}>
										<Text style={{fontSize: 15, fontWeight: 'bold', color: '#ffffff'}}>Settings</Text>
									</View>
								</TouchableHighlight>
							</View>							

							<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 4, justifyContent: 'center'}}>
								<TouchableHighlight style={{flex: 1, borderRadius: 8}} underlayColor='#434343' onPress={() => this.props.navigation.push('DemoTabBarScreen')}>
									<View style={{justifyContent: 'center', alignItems: 'center',
										backgroundColor: '#f7b731', height: 48, borderRadius: 8}}>
										<Text style={{fontSize: 15, fontWeight: 'bold', color: '#ffffff'}}>TabBar</Text>
									</View>
								</TouchableHighlight>
								<View style={{width: 8}}/>
								<TouchableHighlight style={{flex: 1, borderRadius: 8}} underlayColor='#434343'  onPress={() => Toast.show('Hello world!')}>
									<View style={{justifyContent: 'center', alignItems: 'center',
										backgroundColor: '#f7b731', height: 48, borderRadius: 8}}>
										<Text style={{fontSize: 15, fontWeight: 'bold', color: '#ffffff'}}>Toast</Text>
									</View>
								</TouchableHighlight>
							</View>		

							<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 4, justifyContent: 'center'}}>
								<TouchableHighlight style={{flex: 1, borderRadius: 8}} underlayColor='#434343' onPress={() => this.showDialogInfo(true, 'React Native', 'React Native is an open-source UI software framework created by Facebook, Inc.')}>
									<View style={{justifyContent: 'center', alignItems: 'center',
										backgroundColor: '#eb3b5a', height: 48, borderRadius: 8}}>
										<Text style={{fontSize: 15, fontWeight: 'bold', color: '#ffffff'}}>Dialog Info</Text>
									</View>
								</TouchableHighlight>
								<View style={{width: 8}}/>
								<TouchableHighlight style={{flex: 1, borderRadius: 8}} underlayColor='#434343' onPress={() => this.showDialogQuestion(true, 'React Native', 'React Native is an open-source UI software framework created by Facebook, Inc.')}>
									<View style={{justifyContent: 'center', alignItems: 'center',
										backgroundColor: '#eb3b5a', height: 48, borderRadius: 8}}>
										<Text style={{fontSize: 15, fontWeight: 'bold', color: '#ffffff'}}>Dialog Question</Text>
									</View>
								</TouchableHighlight>
							</View>	

							<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 4, justifyContent: 'center'}}>
								<TouchableHighlight style={{flex: 1, borderRadius: 8}} underlayColor='#434343' onPress={() => this.setState({selectionIndex: this.state.selectedIndex, dialogSelectVisible: true})}>
									<View style={{justifyContent: 'center', alignItems: 'center',
										backgroundColor: '#eb3b5a', height: 48, borderRadius: 8}}>
										<Text style={{fontSize: 15, fontWeight: 'bold', color: '#ffffff'}}>Dialog Select</Text>
									</View>
								</TouchableHighlight>
								<View style={{width: 8}}/>
								<TouchableHighlight style={{flex: 1, borderRadius: 8}} underlayColor='#434343' onPress={() => this.showDialogForgotPassword(true)}>
									<View style={{justifyContent: 'center', alignItems: 'center',
										backgroundColor: '#eb3b5a', height: 48, borderRadius: 8}}>
										<Text style={{fontSize: 15, fontWeight: 'bold', color: '#ffffff'}}>Dialog Forgot Password</Text>
									</View>
								</TouchableHighlight>
							</View>			

                        </View>
                    </ScrollView>

					<DemoDialogInfo visible={this.state.dialogInfoVisible}
						title={this.state.dialogInfoTitle}
						message={this.state.dialogInfoMessage}
						onOK={()=> this.showDialogInfo(false)}/>

					<DemoDialogQuestion visible={this.state.dialogQuestionVisible}
						title={this.state.dialogQuestionTitle}
						message={this.state.dialogQuestionMessage}
						onOK={()=> this.showDialogQuestion(false)}
						onCancel={()=> this.showDialogQuestion(false)}/>

					<DemoDialogSelect visible={this.state.dialogSelectVisible}
						title={'Select'}
						list={this.state.dialogSelectList}
						selectionIndex={this.state.dialogSelectIndex}
						onCancel={()=> this.showDialogSelect(false)}
						onOK={(selectionIndex)=> this.setState({dialogSelectVisible: false, dialogSelectIndex: selectionIndex})}
					/>

					<DemoDialogForgotPassword
						visible={this.state.dialogForgotPasswordVisible}
						onCancel={()=> this.showDialogForgotPassword(false)}
						onOK={(email)=> this.submitDialogForgotPassowrd(email)}
					/>

                </SafeAreaView>
            </View>
        );
    }
}
