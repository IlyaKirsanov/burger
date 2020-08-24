import React from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux/Aux'

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends React.Component {
		state = {
			error: null
		}

		componentWillMount() {
			axios.interceptors.request.use(request => {
				this.setState({ error: null })
				return request
			})
			axios.interceptors.response.use(response => response, error => {
				this.setState({ error: error })
				
			})
		}

		errorConfirmedHandler= ()=> {
			this.setState({ error: null })
		}

		render() {
			return (
				<Aux>
					<Modal
						modalClosed={this.errorConfirmedHandler}
						show={this.state.error}>
						{this.state.error ? this.state.error.message :null}
					</Modal>
					<WrappedComponent {...this.props} />
				</Aux>
			)
		}

	}
}

export default withErrorHandler