import {
  FETCH_PAINTINGS_SUCCESS,
  FETCH_PAINTINGS_ERROR,
  ADD_PAINTING_SUCCESS,
  POST_PAINTING_IMAGE_SUCCESS,
  FETCH_PAINTING_START,
  CLEAR_PAINTING_STORE
} from 'constants/index';

export const INITIAL_STATE = { paintings: [], error: null, isFetching: false, isSuccess: false };

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_PAINTINGS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isFetching: false
      };
    case FETCH_PAINTINGS_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isFetching: false
      };
    case ADD_PAINTING_SUCCESS:
      return {
        ...state,
        ...state.connectors,
        isFetching: false,
        isSuccess: true
      };
    case POST_PAINTING_IMAGE_SUCCESS:
      return {
        ...state,
        ...state.connectors,
        isFetching: false
      };
    case FETCH_PAINTING_START:
      return {
        ...state,
        isFetching: true
      };
    case CLEAR_PAINTING_STORE:
      return {
        paintings: [],
        error: null,
        isFetching: false,
        isSuccess: false
      };
    default:
      return state;
  }
}
