import React from 'react'
import ReactAux from '../ReactAux/ReactAux'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'

class Layout extends React.Component {

	state = {
		showSideDrawer: false
	}

	sideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false })
	}

	sideDrawerToggleHandler = () => {
		this.setState(prevState => {
			return { showSideDrawer: !prevState.showSideDrawer }
		})
	}

	render() {
		return (
			<ReactAux>
				<Toolbar 
					isAuth={this.props.isAuthenticated}
				drawerToggleClicked={this.sideDrawerToggleHandler}/>
				<SideDrawer 
					isAuth={this.props.isAuthenticated}
				open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
				<main className={classes.Content} >
					{this.props.children}
				</main>
			</ReactAux>
		)
	}
};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	}
}



export default connect(mapStateToProps)(Layout);