import React, { Component } from 'react';
import {
    StatusBar, View, TouchableHighlight, SafeAreaView,
    ScrollView, Text, Switch, Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DemoDialogSelect from '../../../app/views/DemoDialogSelect/DemoDialogSelect';

export default class DemoSettingsScreen extends React.Component {

    constructor(props) {
        super(props);

		this.props.navigation.setOptions({
            title: 'Settings',
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
            safeSearchEnabled: false,
            privateResultsEnabled: false,
            searchActivityEnabled: false,

            dialogSelectVisible: false,
            list: ['Russia', 'Canada', 'United States', 'China', 'Brazil', 'Australia', 'India',
                'Argentina', 'Kazakhstan', 'Algeria', 'Congo', 'Greenland', 'Saudi Arabia', 'Mexico',
                'Indonesia', 'Sudan', 'Libya', 'Iran', 'Peru'],
            selectionIndex: 2,

        };
        this.props.navigation.setParams({ headerRightHandler: this.headerRightHandler });
    }

    componentDidMount() {
		this.unsubFocus = this.props.navigation.addListener('focus', () => {
			this.componentDidFocus()
		});
		this.unsubBlur = this.props.navigation.addListener('blur', () => {
			this.componentDidBlur()
		});

        AsyncStorage.getItem('safeSearchEnabled', (error, result) => {
            if (result) {
                this.setState({safeSearchEnabled: JSON.parse(result)});
            }
        });        
        AsyncStorage.getItem('privateResultsEnabled', (error, result) => {
            if (result) {
                this.setState({privateResultsEnabled: JSON.parse(result)});
            }
        });        
        AsyncStorage.getItem('searchActivityEnabled', (error, result) => {
            if (result) {
                this.setState({searchActivityEnabled: JSON.parse(result)});
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

    headerRightHandler = () => {
        this.props.navigation.push('DemoQRScanScreen');
    };

    onSwitchValueChange(key, value) {
        if (key === 'safeSearchEnabled') {
            this.setState({safeSearchEnabled: value});
        }
        else
        if (key === 'privateResultsEnabled') {
            this.setState({privateResultsEnabled: value});
        }
        else
        if (key === 'searchActivityEnabled') {
            this.setState({searchActivityEnabled: value});
        }
        AsyncStorage.setItem(key, JSON.stringify(value), () => {
        });
    }

    doneSelecting(index) {        
        this.setState({dialogSelectVisible: false})
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
				<StatusBar barStyle={'dark-content'} backgroundColor={'white'}/>
				<SafeAreaView style={{flex: 1}}>

                    <ScrollView style={{flex: 1}}>
                        <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'transparent'}}>

                            <View style={{padding: 12, flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                                    <Text style={{fontSize: 15, fontWeight: 'bold', color: '#434343'}}>SafeSearch</Text>
                                    <Text style={{fontSize: 15, fontWeight: 'normal', color: '#434343'}}>SafeSearch can help you block inappropriate or explicit images from your Google Search results.</Text>
                                </View>
                                <View style={{width: 8}}/>
                                <Switch
                                    value={this.state.safeSearchEnabled}
                                    onValueChange={(value) => this.onSwitchValueChange('safeSearchEnabled', value)}/>
                            </View>
                            
                            <View style={{width: '100%', height: 1, backgroundColor: '#d3d3d3'}}/>

                            <View style={{padding: 12, flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                                    <Text style={{fontSize: 15, fontWeight: 'bold', color: '#434343'}}>Private Results</Text>
                                    <Text style={{fontSize: 15, fontWeight: 'normal', color: '#434343'}}>Private results help find more relevant content for you, including content and connections that only you can see.</Text>
                                </View>
                                <View style={{width: 8}}/>
                                <Switch
                                    value={this.state.privateResultsEnabled}                                          
                                    onValueChange={(value) => this.onSwitchValueChange('privateResultsEnabled', value)}/>
                            </View>
                            
                            <View style={{width: '100%', height: 1, backgroundColor: '#d3d3d3'}}/>

                            <View style={{padding: 12, flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                                    <Text style={{fontSize: 15, fontWeight: 'bold', color: '#434343'}}>Search Activity</Text>
                                    <Text style={{fontSize: 15, fontWeight: 'normal', color: '#434343'}}>Search activity helps give you more relevant results and recommendations by using the things that you search for, results that you click and more.</Text>
                                </View>

                                <View style={{width: 8}}/>
                                <Switch
                                    value={this.state.searchActivityEnabled}
                                    onValueChange={(value) => this.onSwitchValueChange('searchActivityEnabled', value)}/>
                            </View>
                            
                            <View style={{width: '100%', height: 1, backgroundColor: '#d3d3d3'}}/>

                            <View style={{width: '100%', padding: 12, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <TouchableHighlight underlayColor='#434343' onPress={() => this.props.navigation.push('DemoQRCodeScreen')}>
                                    <Text style={{fontSize: 15, fontWeight: 'bold', color: '#434343', alignItems: 'center'}}>My QR Code</Text>
                                </TouchableHighlight>
                            </View>

                            <View style={{width: '100%', height: 1, backgroundColor: '#d3d3d3'}}/>

                            <View style={{padding: 12, flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                                    <Text style={{fontSize: 15, fontWeight: 'bold', color: '#434343'}}>Localization</Text>
                                    <Text style={{fontSize: 15, fontWeight: 'normal', color: '#434343'}}>Default language</Text>
                                </View>

                                <View style={{width: 8}}/>
                                <TouchableHighlight underlayColor='#434343' onPress={() => this.setState({selectionIndex: this.state.selectedIndex, dialogSelectVisible: true})}>
                                    <Text style={{fontSize: 15, fontWeight: 'bold', color: '#434343', alignItems: 'center'}}>Indonesia</Text>
                                </TouchableHighlight>
                            </View>

                            <View style={{width: '100%', height: 1, backgroundColor: '#d3d3d3'}}/>

                        </View>
                    </ScrollView>

                    <DemoDialogSelect visible={this.state.dialogSelectVisible}
                        title={'Select'}
                        list={this.state.list}
                        selectionIndex={this.state.selectionIndex}
                        onCancel={()=> this.setState({dialogSelectVisible: false})}
                        onOK={(selectionIndex)=> this.doneSelecting(selectionIndex)}
                    />

                </SafeAreaView>
            </View>
        );
    }
}
