import React from 'react';
import {View, Image, StatusBar, TouchableHighlight, SafeAreaView} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Toast from 'react-native-simple-toast';

export default class DemoQRScanScreen extends React.Component {

    constructor(props) {
        super(props);

		this.props.navigation.setOptions({
            title: 'QR Scan',
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

    onSuccess = (e) => {
        Toast.show('QR Code: ' + e.data);
        this.props.navigation.goBack();
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
                <SafeAreaView style={{flex: 1}}>
                
                    <QRCodeScanner
                        onRead={this.onSuccess}
                        showMarker={true}
                        vibrate={false}
                    />
                </SafeAreaView>
            </View>
        );
    }
}
