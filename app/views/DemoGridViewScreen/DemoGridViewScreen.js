import React from 'react';
import {View, Image, StatusBar, TouchableHighlight, FlatList, SafeAreaView, Text} from 'react-native';
import FastImage from 'react-native-fast-image'
import DemoMovieListVM from '../../viewmodels/DemoMovieListVM';
import { formatCurrency } from '../../viewmodels/ApiX';

export default class DemoGridViewScreen extends React.Component {

    constructor(props) {
        super(props);

		this.props.navigation.setOptions({
            title: 'GridView',
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
            list: [],
        };
    }

    componentDidMount() {
		this.unsubFocus = this.props.navigation.addListener('focus', () => {
			this.componentDidFocus()
		});
		this.unsubBlur = this.props.navigation.addListener('blur', () => {
			this.componentDidBlur()
		});
		
        DemoMovieListVM.request().then(response => {
			if (response.statusCode == 200) {
				this.setState({isLoading: false, list: response.data});
			} else {
				this.setState({isLoading: false});
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
                    <FlatList
                        keyExtractor={(item, index) => index}
                        data={this.state.list}
                        style={{padding: 8}}
                        numColumns={2}
                        ItemSeparatorComponent={() => (
                            <View style={{ backgroundColor: 'white', height: 8 }} />
                            )}
                        renderItem={({ item, index }) => (
                            <View style={[{ backgroundColor: 'white', flex: 1 }, index%2==0 ? { marginRight: 4 } : { marginLeft: 4 } ]}>
                                <TouchableHighlight style={{flex: 1, borderRadius: 12}} underlayColor='#cdcdcd' onPress={() => this.props.navigation.push('DemoImageScreen', {image_url: item.poster})}>
                                    <View style={{padding: 0
                                        , flexDirection: 'column', alignItems: 'center'}}>
                                        <FastImage style={{width: '100%', aspectRatio: 1.0, backgroundColor: '#E5E5E5', borderRadius: 8}}
                                                    resizeMode={'cover'} source={{uri: item.poster}}/>
                                        <View style={{height: 8}}/>
                                        <Text numberOfLines={2} style={{fontSize: 17, fontWeight: 'bold', color: '#434343', textAlign: 'center'}} >{item.title}</Text>
                                        <View style={{height: 2}}/>
                                        <Text numberOfLines={1} style={{fontSize: 12, fontWeight: 'normal', color: '#434343', textAlign: 'center'}} >Rp {formatCurrency(item.revenue)}</Text>
                                        <View style={{height: 8}}/>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        )}
                    />
                </SafeAreaView>
            </View>
        );
    }
}

