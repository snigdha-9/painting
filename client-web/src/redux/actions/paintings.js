import {
  FETCH_PAINTINGS_SUCCESS,
  FETCH_PAINTINGS_ERROR,
  ADD_PAINTING_SUCCESS,
  FETCH_PAINTING_START,
  POST_PAINTING_IMAGE_SUCCESS,
  CLEAR_PAINTING_STORE
} from 'constants/index';
import * as paintingService from 'services/paintings';

export const fetchPaintings = () => async dispatch => {
  return paintingService
    .getPaintings()
    .then(paintings => dispatch({ type: FETCH_PAINTINGS_SUCCESS, payload: { paintings } }))
    .catch(err => dispatch({ type: FETCH_PAINTINGS_ERROR, payload: { error: err?.response?.data?.message } }));
};

export const clearStore = () => async dispatch => {
  return dispatch({ type: CLEAR_PAINTING_STORE });
};

export const addPainting =
  ({ name, description, ...data }) =>
  async dispatch => {
    dispatch({ type: FETCH_PAINTING_START });

    try {
      const image = await paintingService.addImage(data.image);
      console.log(image);
      console.log(data);
      const painting = paintingService.addPainting({ name, description, url: image.url });
      dispatch({ type: ADD_PAINTING_SUCCESS, payload: { painting } });
    } catch (error) {
      dispatch({ type: FETCH_PAINTINGS_ERROR, payload: { error: error?.response?.data?.message } });
    }
  };

export const addPaintingImage = data => async dispatch => {
  dispatch({ type: FETCH_PAINTING_START });

  return paintingService
    .addImage(data)
    .then(painting => dispatch({ type: POST_PAINTING_IMAGE_SUCCESS, payload: { painting } }))
    .catch(err => dispatch({ type: FETCH_PAINTINGS_ERROR, payload: { error: err?.response?.data?.message } }));
};
