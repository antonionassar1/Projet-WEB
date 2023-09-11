import {
    SEARCH_ITEM,
    FETCH_ITEMS,
    FETCH_ITEM,
  } from '/ActionTypes';
  
  const initialState = {
    text: '',
    items: [],
    loading: false,
    item: []
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case SEARCH_ITEM:
        return {
          ...state,
          text: action.payload,
          loading: true
        };
      case FETCH_ITEMS:
        return {
          ...state,
          items: action.payload,
          loading: false
        };
      case FETCH_ITEM:
        return {
          ...state,
          item: action.payload,
          loading: false
        };
      case ITEMS_LOADING:
        return {
          ...state,
          loading: false
        };
      default:
        return state;
    }
  }