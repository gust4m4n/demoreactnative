import React from 'react';
import {View, Image, StatusBar, TouchableHighlight, SafeAreaView} from 'react-native';
import WebView from 'react-native-webview'

export default class DemoWebViewScreen extends React.Component {
    constructor(props) {
        super(props);

		this.props.navigation.setOptions({
            title: 'WebView',
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
            web_url: 'https://reactnative.dev/',
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
    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
                <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
                    <WebView
                        originWhitelist={['*']}
                        scalesPageToFit={false}
                        injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                        source={{uri: this.state.web_url}}
                    />
                </SafeAreaView>
            </View>
        );
    }
}
