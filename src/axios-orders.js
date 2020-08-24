import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://react-burger-fbefc.firebaseio.com/'
})

export default instance;