import {
	SET_SCREAM,
	LIKE_SCREAM,
	UNLIKE_SCREAM,
	LOADING_DATA,
	SET_SCREAMS,
	DELETE_SCREAM,
	POST_SCREAM,
	SUBMIT_COMMENT
} from "../types";

const initialState = {
	screams: [],
	scream: {
		scream: {},
		comments: []
	},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case LOADING_DATA:
			return {
				...state,
				loading: true
			};
		case SET_SCREAMS:
			return {
				...state,
				screams: action.payload,
				loading: false
			};
		case SET_SCREAM:
			return {
				...state,
				scream: action.payload
			};
		case LIKE_SCREAM:
		case UNLIKE_SCREAM:
			let index = state.screams.findIndex(
				scream => scream._id === action.payload._id
			);
			state.screams[index] = action.payload;
			if (state.scream.scream._id === action.payload._id) {
				state.scream.scream = action.payload;
			}
			return {
				...state
			};
		case DELETE_SCREAM:
			let i = state.screams.findIndex(scream => scream._id === action.payload);
			state.screams.splice(i, 1);
			return {
				...state
			};
		case POST_SCREAM:
			return {
				...state,
				screams: [action.payload, ...state.screams]
			};
		case SUBMIT_COMMENT:
			return {
				...state,
				scream: {
					scream: { ...state.scream.scream },
					comments: [action.payload, ...state.scream.comments]
				}
			};
		default:
			return state;
	}
}
