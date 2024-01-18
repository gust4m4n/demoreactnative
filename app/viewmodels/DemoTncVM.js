import ApiX from './ApiX';

class DemoTncResponse {
	statusCode = 0
	statusMessage = ''
	html = ''
}

class DemoTncVM {

    static async request() {
		const res = await ApiX.get('/DemoTnc.json', {}, true, require('../contracts/DemoTncContract.json'));

		var response = new DemoTncResponse()
		response.statusCode = res.statusCode
		response.statusMessage = res.statusMessage
		response.html = res.data.result
		return response;
	}

}

export default DemoTncVM;