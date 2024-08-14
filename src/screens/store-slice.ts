import { createSlice } from '@reduxjs/toolkit';
import { DataListResult, GetDetailsBody, GetDetailsResult } from '../types';

type SuccessAnswer = { name: string; imageUri: string; id: string; house: string; attempts: number };

export interface StoreState {
  counter: {
    success: number;
    failed: number;
    total: number;
  };
  list: {
    attempts: number;
    name: string;
    imageUri: string;
    house: string;
    id: string;
    status: 'success' | 'retry';
  }[];
  details: GetDetailsResult;
  randomCharacter: {
    name: string;
    imageUri: string;
    id: string;
    house: string;
  };
  dataList: GetDetailsResult[];
  loading: boolean;
  successFinished: boolean;
}

const initState: StoreState = {
  successFinished: false,
  counter: {
    success: 0,
    failed: 0,
    total: 0,
  },
  list: [],
  dataList: [],
  details: {
    id: '',
    name: '',
    alternate_names: [],
    species: '',
    eyeColour: '',
    hairColour: '',
    wand: {
      wood: '',
      core: '',
      length: 0,
    },
    patronus: '',
    hogwartsStudent: false,
    hogwartsStaff: false,
    actor: '',
    alternate_actors: [],
    alive: false,
    image: '',
    house: '',
    dateOfBirth: '',
    yearOfBirth: 0,
    wizard: false,
    ancestry: '',
    gender: '',
  },
  randomCharacter: {
    name: '',
    imageUri: '',
    house: '',
    id: '',
  },
  loading: false,
};

const storeSlice = createSlice({
  name: 'storeSlice',
  initialState: initState,
  reducers: {
    getDataList: state => {
      state.loading = true;
    },
    getDataListSuccess: (state, action: { payload: DataListResult }) => {
      const randomNumber = Math.floor(Math.random() * action.payload.length);
      state.loading = false;
      state.dataList = action.payload;
      state.randomCharacter = {
        name: action.payload[randomNumber].name,
        imageUri: action.payload[randomNumber].image,
        house: action.payload[randomNumber].house,
        id: action.payload[randomNumber].id,
      };
    },
    getDataListFailed: state => {
      state.loading = false;
    },
    getDetails: (state, _action: { payload: GetDetailsBody }) => {
      state.loading = true;
    },
    getDetailsSuccess: (state, action) => {
      state.loading = false;
      state.details = action.payload;
    },
    getDetailsFailed: state => {
      state.loading = false;
    },
    successAnswer: (state, action: { payload: SuccessAnswer }) => {
      state.counter.success += 1;
      state.counter.total += 1;
      if (state.list.find(item => item.id === action.payload.id)?.id) {
        state.list = state.list.map(item =>
          item.id === action.payload.id
            ? {
                ...item,
                attempts: 1 + action.payload.attempts,
                status: 'success',
              }
            : item,
        );
      } else {
        state.list = [
          ...state.list,
          {
            attempts: 1,
            name: action.payload.name,
            imageUri: action.payload.imageUri,
            house: action.payload.house,
            id: action.payload.id,
            status: 'success',
          },
        ];
      }
      state.dataList = state.dataList.filter(item => item.id !== action.payload.id);
      if (state.dataList.length === 1) {
        state.successFinished = true;
      }
    },
    failedAnswer: (state, action: { payload: SuccessAnswer }) => {
      state.counter.failed += 1;
      state.counter.total += 1;
      if (state.list.find(item => item.id === action.payload.id)?.id) {
        state.list = state.list.map(item =>
          item.id === action.payload.id
            ? {
                ...item,
                attempts: 1 + action.payload.attempts,
                status: 'retry',
              }
            : item,
        );
      } else {
        state.list = [
          ...state.list,
          {
            attempts: 1,
            name: action.payload.name,
            imageUri: action.payload.imageUri,
            house: action.payload.house,
            id: action.payload.id,
            status: 'retry',
          },
        ];
      }
    },

    resetRandomCharacter: state => {
      if (state.dataList.length === 0) {
        return;
      }
      const randomNumber = Math.floor(Math.random() * state.dataList.length);
      state.randomCharacter = {
        name: state.dataList[randomNumber].name,
        imageUri: state.dataList[randomNumber].image,
        house: state.dataList[randomNumber].house,
        id: state.dataList[randomNumber].id,
      };
    },
    updateRandomCharacter: (state, action) => {
      state.randomCharacter = {
        name: action.payload.name,
        imageUri: action.payload.image,
        house: action.payload.house,
        id: action.payload.id,
      };
    },
    clearStore: () => {
      return initState;
    },
  },
});

export const {
  updateRandomCharacter,
  resetRandomCharacter,
  clearStore,
  getDataList,
  getDataListSuccess,
  getDataListFailed,
  getDetails,
  getDetailsSuccess,
  getDetailsFailed,
  successAnswer,
  failedAnswer,
} = storeSlice.actions;

export default storeSlice.reducer;
