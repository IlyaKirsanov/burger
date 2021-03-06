import React from 'react'
import Modal from '../../components/UI/Modal/Modal'
import ReactAux from '../ReactAux/ReactAux'

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends React.Component {
		state = {
			error: null,

		}

		componentWillMount() {
			this.reqInterceptor = axios.interceptors.request.use(request => {
				this.setState({ error: null })
				return request
			})
			this.respInterceptor = axios.interceptors.response.use(response => response, error => {
				this.setState({ error: error })
				
			})
		}

		componentWillUnmount(){
			
			axios.interceptors.request.eject(this.reqInterceptor)
			axios.interceptors.response.eject(this.respInterceptor)
			
		}

		errorConfirmedHandler= ()=> {
			this.setState({ error: null })
		}

		render() {
			return (
				<ReactAux>
					<Modal
						modalClosed={this.errorConfirmedHandler}
						show={this.state.error}>
						{this.state.error ? this.state.error.message :null}
					</Modal>
					<WrappedComponent {...this.props} />
				</ReactAux>
			)
		}

	}
}

export default withErrorHandler