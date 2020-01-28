import {
	SET_SCREAM,
	LIKE_SCREAM,
	UNLIKE_SCREAM,
	LOADING_DATA,
	SET_SCREAMS,
	DELETE_SCREAM
} from "../types";

const initialState = {
	screams: [],
	scream: {},
	loading: false
};

export default function(state = initialState, actions) {
	switch (actions.type) {
		case LOADING_DATA:
			return {
				...state,
				loading: true
			};
		case SET_SCREAMS:
			return {
				...state,
				screams: actions.payload,
				loading: false
			};
		case LIKE_SCREAM:
		case UNLIKE_SCREAM:
			let index = state.screams.findIndex(
				scream => scream._id === actions.payload._id
			);
			state.screams[index] = actions.payload;
			return {
				...state
			};
		case DELETE_SCREAM:
			let i = state.screams.findIndex(scream => scream._id === actions.payload);
			state.screams.splice(i, 1);
			return {
				...state
			};
		default:
			return state;
	}
}
