import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Location } from 'react-router-dom'

interface LocationState {
  location: Location | null
}

const initialState: LocationState = {
  location: null,
}

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    changeLocation: (state, { payload }: PayloadAction<Location>) => {
      state.location = payload
    },
  },
})

export const locationActions = locationSlice.actions
export default locationSlice
