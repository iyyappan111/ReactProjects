// store.js
import { configureStore } from '@reduxjs/toolkit';
import { applicationReducer } from './reducers';

const store = configureStore({
  reducer: {
    application: applicationReducer,
    
  },
});

export default store;
