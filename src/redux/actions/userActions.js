import {
	SET_USER,
	SET_ERRORS,
	CLEAR_ERRORS,
	LOADING_UI,
	SET_UNAUTHENTICATED,
	LOADING_USER
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.post("http://localhost:5000/api/user/login", userData)
		.then(res => {
			localStorage.setItem("auth_token", res.data.token);
			axios.defaults.headers.common["auth_token"] = res.data.token;
			dispatch(getUserData());
			dispatch({ type: CLEAR_ERRORS });
			history.push("/");
		})
		.catch(err => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			});
		});
};

export const signupUser = (newUserData, history) => dispatch => {
	dispatch({ type: LOADING_UI });
	axios
		.post("http://localhost:5000/api/user/register", newUserData)
		.then(res => {
			setAuthenticationHeader(res.data.token);
			dispatch(getUserData());
			dispatch({ type: CLEAR_ERRORS });
			history.push("/");
		})
		.catch(err => {
			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			});
		});
};

const setAuthenticationHeader = token => {
	localStorage.setItem("auth_token", token);
	axios.defaults.headers.common["Authorization"] = token;
};

export const logoutUser = () => dispatch => {
	localStorage.removeItem("auth_token");
	delete axios.defaults.headers.common["auth_token"];
	dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => dispatch => {
	dispatch({ type: LOADING_USER });
	axios
		.get("http://localhost:5000/api/user/authenticatedUser")
		.then(res => {
			dispatch({
				type: SET_USER,
				payload: res.data
			});
		})
		.catch(err => console.log(err));
};

export const uploadImage = formData => dispatch => {
	dispatch({ type: LOADING_USER });
	axios
		.post("http://localhost:5000/api/user/uploadImage", formData)
		.then(() => {
			dispatch(getUserData());
		})
		.catch(err => console.log(err));
};

export const editUserDetails = userDetails => dispatch => {
	dispatch({ type: LOADING_USER });
	axios
		.post("http://localhost:5000/api/user/userDetails", userDetails)
		.then(() => {
			dispatch(getUserData());
		})
		.catch(err => console.log(err));
};
