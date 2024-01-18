import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {LogBox} from 'react-native'

import DemoScreen from '../views/DemoScreen/DemoScreen';
import DemoQRCodeScreen from '../views/DemoQRCodeScreen/DemoQRCodeScreen';
import DemoQRScanScreen from '../views/DemoQRScanScreen/DemoQRScanScreen';
import DemoWebViewScreen from '../views/DemoWebViewScreen/DemoWebViewScreen';
import DemoGridViewScreen from '../views/DemoGridViewScreen/DemoGridViewScreen';
import DemoImageScreen from '../views/DemoImageScreen/DemoImageScreen';
import DemoHtmlScreen from '../views/DemoHtmlScreen/DemoHtmlScreen';
import DemoListViewScreen from '../views/DemoListViewScreen/DemoListViewScreen';
import DemoSettingsScreen from '../views/DemoSettingsScreen/DemoSettingsScreen';
import DemoRegisterScreen from '../views/DemoRegisterScreen/DemoRegisterScreen';
import DemoLoginScreen from '../views/DemoLoginScreen/DemoLoginScreen';
import DemoTabBarScreen from '../views/DemoTabBarScreen/DemoTabBarScreen';
import ApiX from '../viewmodels/ApiX';

LogBox.ignoreAllLogs(true)
ApiX.setupLogger()

export default function App() {
	const Stack = createStackNavigator();
	return (
	  	<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='DemoScreen' component={DemoScreen}/>
				<Stack.Screen name='DemoGridViewScreen' component={DemoGridViewScreen}/>
				<Stack.Screen name='DemoListViewScreen' component={DemoListViewScreen}/>
				<Stack.Screen name='DemoQRCodeScreen' component={DemoQRCodeScreen}/>
				<Stack.Screen name='DemoQRScanScreen' component={DemoQRScanScreen}/>
				<Stack.Screen name='DemoWebViewScreen' component={DemoWebViewScreen}/>
				<Stack.Screen name='DemoSettingsScreen' component={DemoSettingsScreen}/>
				<Stack.Screen name='DemoRegisterScreen' component={DemoRegisterScreen}/>
				<Stack.Screen name='DemoLoginScreen' component={DemoLoginScreen}/>
				<Stack.Screen name='DemoTabBarScreen' component={DemoTabBarScreen}/>
				<Stack.Screen name='DemoImageScreen' component={DemoImageScreen}/>
				<Stack.Screen name='DemoHtmlScreen' component={DemoHtmlScreen}/>
			</Stack.Navigator>
	  	</NavigationContainer>
	);
};



