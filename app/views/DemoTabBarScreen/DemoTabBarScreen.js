import React  from 'react';
import {StatusBar, View, SafeAreaView, Image, ActivityIndicator} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

export default class DemoTabBarScreen extends React.Component {

    constructor(props) {
        super(props);

		this.props.navigation.setOptions({
			headerShown: false,
            title: 'Demo TabBar',
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
            selectedTab: 'home',

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
                <StatusBar barStyle={'dark-content'} backgroundColor={'white'} networkActivityIndicatorVisible={false}/>

                <SafeAreaView style={{flex: 1}}>

                    <TabNavigator>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'home'}
                            title='Home'
                            selectedTitleStyle={{color: '#eb3b5a'}}
                            renderIcon={() => <Image style={{tintColor: '#434343', width: 23, height: 23}} source={require('../../images/ic_demo_tabbar_home.png')} resizeMode={'contain'}/>}
                            renderSelectedIcon={() => <Image style={{tintColor: '#eb3b5a', width: 23, height: 23}} source={require('../../images/ic_demo_tabbar_home.png')} resizeMode={'contain'}/>}
                            onPress={() => this.setState({ selectedTab: 'home' })}>
    				        <View style={{flex: 1, backgroundColor: 'red'}}>
							</View>
	                        </TabNavigator.Item>


                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'profile'}
                            title='Profile'
                            selectedTitleStyle={{color: '#eb3b5a'}}
                            renderIcon={() => <Image style={{tintColor: '#434343', width: 23, height: 23}} source={require('../../images/ic_demo_tabbar_profile.png')} resizeMode={'contain'}/>}
                            renderSelectedIcon={() => <Image style={{tintColor: '#eb3b5a', width: 23, height: 23}} source={require('../../images/ic_demo_tabbar_profile.png')} resizeMode={'contain'}/>}
                            onPress={() => this.setState({ selectedTab: 'profile' })}>
    				        <View style={{flex: 1, backgroundColor: 'green'}}>
							</View>
                        </TabNavigator.Item>

                    </TabNavigator>

                </SafeAreaView>

            </View>
        );
    }
}
