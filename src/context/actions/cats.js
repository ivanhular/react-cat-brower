import axios from 'axios'
import {
  CAT_BREEDS_LIST_REQUEST,
  CAT_BREEDS_LIST_SUCCESS,
  CAT_BREEDS_LIST_ERROR,
  CAT_BREEDS_IMAGES_REQUEST,
  CAT_BREEDS_IMAGES_SUCCESS,
  CAT_BREEDS_IMAGES_LOAD_MORE,
  CAT_BREEDS_IMAGES_ERROR,
  CAT_BREEDS_DETAIL_SUCCESS,
  CAT_BREEDS_DETAIL_ERROR,
} from '../../constants/actionTypes'

export const catBreedList = () => async (dispatch) => {
  try {
    dispatch({ type: CAT_BREEDS_LIST_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_CAT_APIKEY,
      },
    }

    const { data } = await axios.get(
      'https://api.thecatapi.com/v1/breeds',
      config
    )

    dispatch({ type: CAT_BREEDS_LIST_SUCCESS, payload: data })
  } catch (error) {
    const message = error?.response.data?.message

    dispatch({
      type: CAT_BREEDS_LIST_ERROR,
      payload: message,
    })
  }
}

export const catBreedImages = (id) => async (dispatch, page) => {
  try {
    dispatch({ type: CAT_BREEDS_IMAGES_REQUEST })

    if (!window.navigator.onLine) {
      throw Error('No Internet Connection')
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_CAT_APIKEY,
      },
      params: {
        page,
        limit: 10,
        breed_id: id,
        // size: 'thumb',
      },
    }

    const { data, headers } = await axios.get(
      'https://api.thecatapi.com/v1/images/search',
      config
    )

    dispatch({
      type: CAT_BREEDS_IMAGES_SUCCESS,
      payload: { data, totalCount: headers['pagination-count'] },
    })
  } catch (error) {
    const message = error?.response ? error.response.data.message : error
    dispatch({
      type: CAT_BREEDS_IMAGES_ERROR,
      payload: message,
    })
  }
}

export const loadMoreImages = () => async (
  dispatch,
  { id, imageList, page }
) => {
  try {
    if (!window.navigator.onLine) {
      throw Error('No Internet Connection')
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_CAT_APIKEY,
      },
      params: {
        page,
        limit: 10,
        breed_id: id,
        // size: 'thumb',
      },
    }

    const { data } = await axios.get(
      'https://api.thecatapi.com/v1/images/search',
      config
    )

    const appendData = data.filter(
      (newItem) =>
        imageList.findIndex((prevData) => prevData.id === newItem.id) === -1
    )

    dispatch({ type: CAT_BREEDS_IMAGES_LOAD_MORE, payload: appendData })
  } catch (error) {
    const message = error?.response ? error.response.data.message : error
    dispatch({
      type: CAT_BREEDS_IMAGES_ERROR,
      payload: message,
    })
  }
}

export const catBreedDetail = (id) => async (dispatch) => {
  try {
    if (!window.navigator.onLine) {
      throw Error('No Internet Connection')
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_CAT_APIKEY,
      },
    }

    const { data } = await axios.get(
      `https://api.thecatapi.com/v1/images/${id}`,
      config
    )

    dispatch({ type: CAT_BREEDS_DETAIL_SUCCESS, payload: data })
  } catch (error) {
    const message = error?.response ? error.response.data.message : error
    dispatch({
      type: CAT_BREEDS_DETAIL_ERROR,
      payload: message,
    })
  }
}
