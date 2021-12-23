import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import { tokenConfigHeader } from './auth';

// Action Creators and Reducers
const slice = createSlice({
  name: 'assets',
  initialState: {
    list: [],
    meta: [],
    loading: false,
  },
  reducers: {
    assetsRequested: (assets, action) => {
      assets.loading = true;
    },

    assetsReceived: (assets, action) => {
      assets.list = action.payload.data;
      assets.meta = action.payload.meta;
      assets.loading = false;
    },

    assetsRequestFailed: (assets, action) => {
      assets.loading = false;
    },

    // action => action handler
    assetAdded: (assets, action) => {
      assets.list.push(action.payload);
    },

    assetUpdated: (assets, action) => {
      const index = assets.list.findIndex(
        (asset) => asset.id === action.payload.id
      );
      assets.list[index] = action.payload;
    },

    assetDeleted: (assets, action) => {
      assets.list = assets.list.filter(
        (asset) => asset.id !== action.payload.id
      );
    },
  },
});

export const {
  assetsRequested,
  assetsReceived,
  assetsRequestFailed,

  assetAdded,
  assetUpdated,
  assetDeleted,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = '/asset';

/**
 * Call backend, fetch assets list
 * Dispatch assetsReceived (save to state) on success
 * Dispatch assetsRequestFailed on failure
 * @returns
 */
export const loadAssets = (limit, page) => (dispatch, getState) => {
  // console.log(limit, page);
  return dispatch(
    apiCallBegan({
      url,
      params: {
        limit,
        page,
        sortBy: 'updatedAt:desc',
      },
      onStart: assetsRequested.type,
      onSuccess: assetsReceived.type,
      onError: assetsRequestFailed.type,
    })
  );
};

export const addAsset = (asset) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url,
      method: 'POST',
      data: asset,
      headers: {
        ...tokenConfigHeader(getState),
        'Content-Type': 'multipart/form-data',
      },
      onSuccess: assetAdded.type,
    })
  );
};

export const updateAsset = (assetId, updateBody) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: url + '/' + assetId,
      method: 'PATCH',
      data: updateBody,
      headers: { ...tokenConfigHeader(getState) },
      onSuccess: assetUpdated.type,
    })
  );
};

export const deleteAsset = (assetId) => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: url + '/' + assetId,
      method: 'DELETE',
      headers: { ...tokenConfigHeader(getState) },
      onSuccess: assetDeleted.type,
    })
  );
};

// Selectors w/ memoization
export const getAssets = createSelector(
  (state) => state.entities.assets,
  (assets) => assets.list
);
