import React  from 'react';
import {
    StatusBar, View, TouchableHighlight, SafeAreaView, Text, Image, FlatList, ActivityIndicator
} from 'react-native';
import FastImage from 'react-native-fast-image'
import DemoMovieListVM from '../../viewmodels/DemoMovieListVM';
import { formatCurrency } from '../../viewmodels/ApiX';

export default class DemoListViewScreen extends React.Component {

    constructor(props) {
        super(props);

		this.props.navigation.setOptions({
            title: 'ListView',
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
			isLoading: true,
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
		if (this.state.isLoading) {
            return (
                <View style={{flex: 1, backgroundColor: 'white'}}>
                    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <StatusBar barStyle={'dark-content'} backgroundColor={'white'} networkActivityIndicatorVisible={true}/>
                        <ActivityIndicator size='large' color='#434343'/>
                    </SafeAreaView>
                </View>
            );
        }

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
				<StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
				<SafeAreaView style={{flex: 1}}>
					<FlatList
						data={this.state.list}
						showsVerticalScrollIndicator={true}
						ItemSeparatorComponent={() => {
							return (<View style={{left: 8, height: 0.5, backgroundColor: '#d3d3d3'}}/>);
						}}
						renderItem={({item}) =>
							<TouchableHighlight underlayColor={'#cdcdcd'} onPress={() => this.props.navigation.push('DemoImageScreen', {image_url: item.poster})}>
								<View style={{paddingTop: 8, paddingBottom: 8, paddingLeft: 16, paddingRight: 16
									, flexDirection: 'row', alignItems: 'center'}}>
									<FastImage style={{width: 92, height: 92, backgroundColor: '#E5E5E5', borderRadius: 8}}
												resizeMode={'cover'} source={{uri: item.poster}}/>
									<View style={{width: 8}}/>
									<View style={{flex: 1, flexDirection: 'column', padding: 0}}>
										<Text numberOfLines={2} style={{fontSize: 20, fontWeight: 'bold', color: '#434343'}} >{item.title}</Text>
										<View style={{height: 2}}/>
										<Text numberOfLines={1} style={{fontSize: 15, fontWeight: 'normal', color: '#434343'}} >Rp {formatCurrency(item.revenue)}</Text>
									</View>
								</View>
							</TouchableHighlight>
						}
						keyExtractor={item => item.name}
					/>
				</SafeAreaView>
			</View>
        );
    }
}
