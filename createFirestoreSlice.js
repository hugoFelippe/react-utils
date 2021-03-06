import { createSlice } from '@reduxjs/toolkit';

/**
 * Cria um slice com uma função assíncrona
 * @param {Object} config
 * @param {String} config.name
 * @param {Object} config.initialState
 * @param {Object} config.reducers
 * @param {Function} config.fetchConfig
 */
const createFirestoreSlice = (config) => {
  const slice = createSlice({
    name: config.name,
    initialState: {
      loading: false,
      data: null,
      error: null,
      ...config.initialState,
    },
    reducers: {
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

  return { ...slice };
};

export default createFirestoreSlice;
