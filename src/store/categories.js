import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import { tokenConfigHeader } from './auth';

// Action Creators and Reducers
const slice = createSlice({
  name: 'categories',
  initialState: {
    list: [],
    meta: [],
    loading: false,
  },
  reducers: {
    categoriesRequested: (categories, action) => {
      categories.loading = true;
    },

    categoriesReceived: (categories, action) => {
      categories.list = action.payload.data;
      categories.meta = action.payload.meta;
      categories.loading = false;
    },

    categoriesRequestFailed: (categories, action) => {
      categories.loading = false;
    },

    // action => action handler
    categoryAdded: (categories, action) => {
      categories.list.push(action.payload);
    },

    categoryUpdated: (categories, action) => {
      const index = categories.list.findIndex(
        (category) => category.id === action.payload.id
      );
      categories.list[index] = action.payload;
    },

    categoryDeleted: (categories, action) => {
      categories.list = categories.list.filter(
        (category) => category.id !== action.payload.id
      );
    },
  },
});

export const {
  categoriesRequested,
  categoriesReceived,
  categoriesRequestFailed,

  categoryAdded,
  categoryUpdated,
  categoryDeleted,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = '/category';

/**
 * Call backend, fetch categories list
 * Dispatch categoriesReceived (save to state) on success
 * Dispatch categoriesRequestFailed on failure
 * @returns
 */
 export const loadCategories = (limit, page) => (dispatch, getState) => {
  // console.log(limit, page);
  return dispatch(
    apiCallBegan({
      url,
      params: {
        limit,
        page,
        sortBy: 'updatedAt:desc',
      },
      onStart: categoriesRequested.type,
      onSuccess: categoriesReceived.type,
      onError: categoriesRequestFailed.type,
    })
  );
};

export const addCategory = (category) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url,
      method: 'POST',
      data: category,
      headers: { ...tokenConfigHeader(getState) },
      onSuccess: categoryAdded.type,
    })
  );
};

export const updateCategory =
  (categoryId, updateBody) => (dispatch, getState) => {
    return dispatch(
      apiCallBegan({
        url: url + '/' + categoryId,
        method: 'PATCH',
        data: updateBody,
        headers: { ...tokenConfigHeader(getState) },
        onSuccess: categoryUpdated.type,
      })
    );
  };

export const deleteCategory = (categoryId) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: url + '/' + categoryId,
      method: 'DELETE',
      headers: { ...tokenConfigHeader(getState) },
      onSuccess: categoryDeleted.type,
    })
  );
};


// Selectors w/ memoization 
export const getCategories = createSelector(
  (state) => state.entities.categories,
  (categories) => categories.list
);