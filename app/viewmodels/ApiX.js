import axios from 'axios';
import {Dimensions, Platform} from 'react-native';

export function isIphoneXorAbove() {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
    );
}

export function formatCurrency(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

class ApiXResponse {
	statusCode = 0
	statusMessage = ''
	data = null
}

export default class ApiX {
	static baseUrl = 'http://45.32.103.6/api'

    static async get(endpoint, headers, contract = false, contractFile = null) {
		if (contract == true && contractFile != null) {
			console.log('[ApiX] ' + endpoint + ' contract:\n' + JSON.stringify(contractFile, null, '\t'));
			var response = new ApiXResponse()
			response.statusCode = 200;
			response.data = contractFile;
			return response	
		}

		try {
			const res = await axios.get(ApiX.baseUrl + endpoint, {headers: headers})
			var response = new ApiXResponse()
			response.statusCode = res.status
			response.data = res.data
			response.statusMessage = 'ApiX success.'
			return response
		} catch(error) {
			if (error.response != undefined) {
				var response = new ApiXResponse()
				response.statusCode = error.response.status
				response.data = error.response.data
				response.statusMessage = 'ApiX error.'
				return response
			} else {
				var response = new ApiXResponse()
				response.statusCode = 0
				response.data = null
				response.statusMessage = 'Unknown ApiX error.'
				return response
			}
		}
	}

	static setupLogger() {
		if (__DEV__) {
			axios.interceptors.request.use(request => {
				if (request.data !== undefined) {
					console.log(request.method.toUpperCase() + ' ' + request.url + '\r\n' +
						JSON.stringify(request.data, null, '\t') + '\r\n');
				}
				else {
					console.log(request.method.toUpperCase() + ' ' + request.url + '\r\n');
				}
				return request
			});
			axios.interceptors.response.use(response => {
				if (response.data !== undefined) {
					console.log('RESPONSE ' + response.config.url + '\r\n' +
						JSON.stringify(response.data, null, '\t') + '\r\n');
				}
				else {
					console.log('RESPONSE ' + response.config.url + '\r\n');
				}
				return response
			});
		}
	}
}
