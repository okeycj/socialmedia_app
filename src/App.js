import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";
import AuthRoute from "./util/AuthRoute";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
// component
import Navbar from "./component/layout/Navbar";
// Page
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user.js";
import axios from "axios";

const theme = createMuiTheme({
	palette: {
		primary: {
			light: "#33c9dc",
			main: "#00bcd4",
			dark: "#008394",
			contrastText: "#fff"
		},
		secondary: {
			light: "#ff6333",
			main: "#ff3d00",
			dark: "#b22a00",
			contrastText: "#fff"
		}
	},
	others: {
		typography: {
			useNextVariants: true
		},
		invisibleSeparator: {
			border: "none",
			margin: 4
		},
		visibleSeparator: {
			width: "100%",
			borderBottom: "1px solid rgba(0,0,0,0.1)"
		}
	}
});

let authenticated;
const token = localStorage.auth_token;
if (token) {
	const decodeToken = jwtDecode(token);
	store.dispatch({ type: SET_AUTHENTICATED });
	axios.defaults.headers.common["auth_token"] = token;
	store.dispatch(getUserData());
}

class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<Provider store={store}>
					<Router>
						<Navbar />
						<div className="container">
							<Switch>
								<Route exact path="/" component={home} />
								<AuthRoute exact path="/login" component={login} />
								<AuthRoute exact path="/signup" component={signup} />
								<Route exact path="/user/:handle" component={user} />
							</Switch>
						</div>
					</Router>
				</Provider>
			</MuiThemeProvider>
		);
	}
}

export default App;
