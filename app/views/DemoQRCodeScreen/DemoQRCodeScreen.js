import React from 'react';
import {View, Text, Image, StatusBar, TouchableHighlight, SafeAreaView} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default class DemoQRCodeScreen extends React.Component {

    constructor(props) {
        super(props);

		this.props.navigation.setOptions({
            title: 'QR Code',
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
            code: 'Hello World!'
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

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
                <SafeAreaView style={{flex: 1}}>

                    <View style={{flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{flexDirection: 'column', padding: 24, borderWidth: 0.5, borderColor: '#d3d3d3'}}>
                            <QRCode value={this.state.code} size={250} bgColor={'black'} fgColor={'white'}/>
                        </View>
                        <View style={{height: 12}}/>
                        <Text style={{fontSize: 15, fontWeight: 'bold',
                            color: '#434343', textAlign: 'center'}}>{this.state.code}</Text>
                    </View>

                </SafeAreaView>
            </View>
        );
    }
}

