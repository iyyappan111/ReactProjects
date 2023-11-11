import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRequest, postRequest, putRequest, deleteRequest } from '../../services/request';
import apis from '../../config/apis';

const createAsyncThunkForEndpoint = (thunkName, endpoint, method) => {
  return createAsyncThunk(
    thunkName,
    async (payload, thunkApi) => {
      try {
        let response;
        switch (method) {
          case 'GET':
            response = await getRequest(endpoint);
            break;
          case 'POST':
            response = await postRequest(endpoint, payload);
            break;
          case 'PUT':
            response = await putRequest(endpoint, payload);
            break;
          case 'DELETE':
            response = await deleteRequest(endpoint, payload);
            break;
          default:
            throw new Error(`Invalid method: ${method}`);
        }
        if (response && response.StatusCode == 200) {
          return thunkApi.fulfillWithValue({ response });
        } else {
          return thunkApi.rejectWithValue({
            message: response.message,
          });
        }
      } catch (err) {
        if (err.message === 'Network Error') {
          return thunkApi.rejectWithValue({
            message: 'Network error occurred.',
            networkError: true,
          });
        } else {
          return thunkApi.rejectWithValue({
            message: 'An error occurred while making the request.',
            networkError: false,
          });
        }
      }
    }
  );
};

export const getDetailsThunk = createAsyncThunkForEndpoint('getDetailsThunk', apis.getDetailsEndpoint, 'GET');
export const addDetailsThunk = createAsyncThunkForEndpoint('addDetailsThunk', apis.addDetailsEndpoint, 'POST');
export const deleteDetailsThunk = createAsyncThunkForEndpoint('deleteDetailsThunk', apis.deleteDetailsEndpoint, 'DELETE');
export const updateDetailsThunk = createAsyncThunkForEndpoint('updateDetailsThunk', apis.updateDetailsEndpoint, 'PUT');
