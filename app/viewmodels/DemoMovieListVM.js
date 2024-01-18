import ApiX from './ApiX';
import DemoMovieModel from '../models/DemoMovieModel'

class DemoMovieListResponse {
	statusCode = 0
	statusMessage = ''
	data = []
}

class DemoMovieListVM {

    static async request() {
		const res = await ApiX.get('/DemoMovieList.json', {}, true, require('../contracts/DemoMovieListContract.json'));

		var list = []
		res.data.result.forEach(item => {
			var movie = new DemoMovieModel();
			movie.id = item.id
			movie.poster = item.poster
			movie.revenue = item.revenue
			movie.title = item.title
			list.push(movie)
		});

		var response = new DemoMovieListResponse()
		response.statusCode = res.statusCode
		response.statusMessage = res.statusMessage
		response.data = list

		return response;
	}

}

export default DemoMovieListVM;