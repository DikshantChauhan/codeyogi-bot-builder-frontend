import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Flow } from '../../models/Flow.model'
import { createFlowAPI, updateFlowAPI } from '../../api/api'
import { getLocalFlow, setLocalFlow } from '../../utils'

interface FlowState {
  flowsById: { [id: string]: Flow }
  flowsLoading: { [flowId: string]: boolean }
  flowsError: { [flowId: string]: string | null }
  selectedFlowId: string | null
  nudgeFlowsIds: string[]

  flowAddLoading: boolean
  flowAddError: string | null

  flowUpdateLoading: boolean
  flowUpdateError: string | null

  nudgeFlowsLoading: boolean
  nudgeFlowsError: string | null
}

const initialState: FlowState = {
  flowsById: Object.keys(localStorage)
    .filter((key) => key.startsWith('flow_'))
    .reduce((acc, key) => {
      const flow = getLocalFlow({ localFlowId: key })
      if (flow) {
        acc[flow.id] = flow
      }
      return acc
    }, {} as { [id: string]: Flow }),
  flowsLoading: {},
  flowsError: {},
  selectedFlowId: null,
  nudgeFlowsIds: [],

  flowAddLoading: false,
  flowAddError: null,

  flowUpdateLoading: false,
  flowUpdateError: null,

  nudgeFlowsLoading: false,
  nudgeFlowsError: null,
}

const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    setSelectedFlowId: (state, action: PayloadAction<string>) => {
      state.selectedFlowId = action.payload
    },
    setFlow: (state, action: PayloadAction<{ flow: Flow; loading?: boolean; error?: string | null }>) => {
      const { flow, loading, error } = action.payload
      const flowId = flow.id

      state.flowsById[flowId] = flow as any
      state.flowsLoading[flowId] = loading ?? state.flowsLoading[flowId]
      state.flowsError[flowId] = error ?? state.flowsError[flowId]
      setLocalFlow(flow)
    },
    setFlowLoading: (state, action: PayloadAction<{ flowId: string; loading: boolean }>) => {
      const { flowId, loading } = action.payload
      state.flowsLoading[flowId] = loading
    },
    setFlowError: (state, action: PayloadAction<{ flowId: string; error: string | null }>) => {
      const { flowId, error } = action.payload
      state.flowsError[flowId] = error
    },
    setNudgeFlowsIds: (state, action: PayloadAction<string[]>) => {
      state.nudgeFlowsIds = [...new Set([...action.payload, ...state.nudgeFlowsIds])]
    },
    setFlowAddLoading: (state, action: PayloadAction<boolean>) => {
      state.flowAddLoading = action.payload
    },
    setFlowAddError: (state, action: PayloadAction<string | null>) => {
      state.flowAddError = action.payload
    },
    flowAddTry: (_, __: PayloadAction<Parameters<typeof createFlowAPI>[0]>) => undefined,

    flowUpdateTry: (_, __: PayloadAction<Parameters<typeof updateFlowAPI>[0]>) => undefined,
    setFlowUpdateLoading: (state, action: PayloadAction<boolean>) => {
      state.flowUpdateLoading = action.payload
    },
    setFlowUpdateError: (state, action: PayloadAction<string | null>) => {
      state.flowUpdateError = action.payload
    },

    setNudgeFlowsLoading: (state, action: PayloadAction<boolean>) => {
      state.nudgeFlowsLoading = action.payload
    },
    setNudgeFlowsError: (state, action: PayloadAction<string | null>) => {
      state.nudgeFlowsError = action.payload
    },
  },
})

export const flowActions = flowSlice.actions
export default flowSlice
