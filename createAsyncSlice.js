import { createSlice } from '@reduxjs/toolkit';

/**
 * Cria um slice com uma função assíncrona
 * @param {Object} config
 * @param {String} config.name
 * @param {Object} config.initialState
 * @param {Object} config.reducers
 * @param {Function} config.fetchConfig
 */
const createAsyncSlice = (config) => {
  const slice = createSlice({
    ...config,
    name: config.name,
    initialState: {
      error: null,
      loading: false,
      data: null,
      page: null,
      limit: null,
      ...config.initialState,
    },
    reducers: {
      fetchFinished(state) {
        state.loading = false;
      },
      fetchStarted(state) {
        state.loading = true;
      },
      fetchSuccess: {
        reducer(state, action) {
          state.loading = false;
          state.data = action.payload;
          state.error = null;
        },
        prepare(payload) {
          return {
            payload: payload?.data ? payload.data : payload,
            meta: {
              localStorage: config?.localStorage,
            },
          };
        },
      },
      fetchFail(state, action) {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      },
      ...config.reducers,
    },
  });

  const { fetchStarted, fetchSuccess, fetchFail } = slice.actions;

  const asyncAction = (payload) => async (dispatch) => {
    try {
      dispatch(fetchStarted());

      const { url, options } = config.fetchConfig(payload);
      const response = await fetch(url, {
        mode: 'cors',
        cache: 'default',
        ...options,
        headers: {
          ...options.headers,
        },
      });

      const data = await response.json();

      return dispatch(fetchSuccess(data));
    } catch (error) {
      return dispatch(fetchFail(error.message));
    }
  };

  const firebaseAction = (payload) => async (dispatch) => {};

  return { ...slice, asyncAction, firebaseAction };
};

export default createAsyncSlice;
