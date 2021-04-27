import {
  CAT_BREEDS_LIST_REQUEST,
  CAT_BREEDS_LIST_SUCCESS,
  CAT_BREEDS_LIST_ERROR,
  CAT_BREEDS_LIST_RESET,
  CAT_BREEDS_IMAGES_REQUEST,
  CAT_BREEDS_IMAGES_SUCCESS,
  CAT_BREEDS_IMAGES_LOAD_MORE,
  CAT_BREEDS_IMAGES_ERROR,
  CAT_BREEDS_IMAGES_RESET,
  CAT_BREEDS_DETAIL_SUCCESS,
  CAT_BREEDS_DETAIL_ERROR,
  CAT_BREEDS_DETAIL_RESET,
} from '../../constants/actionTypes'

export const catsReducer = (state, action) => {
  switch (action.type) {
    case CAT_BREEDS_LIST_REQUEST:
    case CAT_BREEDS_IMAGES_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CAT_BREEDS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        breeds: action.payload,
      }
    case CAT_BREEDS_IMAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        imageList: action.payload.data,
        totalCount: Number(action.payload.totalCount),
      }
    case CAT_BREEDS_IMAGES_LOAD_MORE:
      return {
        ...state,
        imageList: [...state.imageList, ...action.payload],
      }
    case CAT_BREEDS_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        detail: {
          ...action.payload,
        },
      }
    case CAT_BREEDS_LIST_ERROR:
    case CAT_BREEDS_IMAGES_ERROR:
    case CAT_BREEDS_DETAIL_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case CAT_BREEDS_LIST_RESET:
      return {
        ...state,
        breeds: [],
      }
    case CAT_BREEDS_IMAGES_RESET:
      return {
        ...state,
        imageList: [],
      }
    case CAT_BREEDS_DETAIL_RESET:
      return {
        ...state,
        detail: [],
      }

    default:
      return state
  }
}
