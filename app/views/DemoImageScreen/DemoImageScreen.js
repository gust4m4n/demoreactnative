import React from 'react';
import {View, StatusBar, TouchableHighlight, SafeAreaView, Image} from 'react-native';
import FastImage from 'react-native-fast-image'

export default class DemoImageScreen extends React.Component {

    constructor(props) {
        super(props);

		this.props.navigation.setOptions({
            title: 'Image',
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
            image_url: this.props.route.params.image_url,
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
                <SafeAreaView style={{flex: 1}}>                
                    <FastImage style={{width: '100%', height: '100%', backgroundColor: 'black'}} source={{uri: this.state.image_url}} resizeMode={'contain'}/>
                </SafeAreaView>
            </View>
        )
    }
}

