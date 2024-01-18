import React from 'react';
import {Image, StatusBar, TouchableHighlight, SafeAreaView, View} from 'react-native';
import WebView from 'react-native-webview'
import DemoTncVM from '../../viewmodels/DemoTncVM';

export default class DemoHtmlScreen extends React.Component {

    constructor(props) {
        super(props);

		this.props.navigation.setOptions({
            title: 'HTML',
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
            html: '',
        }
    }

	componentDidMount() {
		this.unsubFocus = this.props.navigation.addListener('focus', () => {
			this.componentDidFocus()
		});
		this.unsubBlur = this.props.navigation.addListener('blur', () => {
			this.componentDidBlur()
		});

		DemoTncVM.request().then(response => {
			if (response.statusCode == 200) {
				this.setState({html: response.html});
			}
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
					<WebView
						originWhitelist={['*']}
						source={{html: '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="padding: 16; margin: 0;"><p>' + this.state.html + '</p></body></html>'}}
					/>
				</SafeAreaView>
			</View>
        );
    }
}
