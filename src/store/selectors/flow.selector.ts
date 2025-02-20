import { createSelector } from 'reselect'
import { flowsSelector } from './app.selector'
import { selectedNormalizedCampaignSelector } from './campaign.selector'
import { AppState } from '../store'
import { AppNodeKeys } from '../../models/Node.model'

const flowsByIdsSelector = createSelector([flowsSelector], (flows) => flows.flowsById)

const selectedFlowIdSelector = createSelector([flowsSelector], (flows) => flows.selectedFlowId)

export const selectedFlowSelector = createSelector([flowsByIdsSelector, selectedFlowIdSelector], (flowsByIds, selectedFlowId) =>
  selectedFlowId ? flowsByIds[selectedFlowId] : null
)

const flowsLoadingSelector = createSelector([flowsSelector], (flows) => flows.flowsLoading)

const flowsErrorSelector = createSelector([flowsSelector], (flows) => flows.flowsError)

export const selectedFlowLoadingSelector = createSelector([selectedFlowIdSelector, flowsLoadingSelector], (selectedFlowId, flowsLoading) =>
  selectedFlowId ? flowsLoading[selectedFlowId] : false
)

export const selectedFlowErrorSelector = createSelector([selectedFlowIdSelector, flowsErrorSelector], (selectedFlowId, flowsError) =>
  selectedFlowId ? flowsError[selectedFlowId] : null
)

export const selectedFlowAllowedNodesSelector: (state: AppState) => AppNodeKeys[] = createSelector(
  [selectedFlowSelector, selectedNormalizedCampaignSelector],
  (selectedFlow, selectedCampaign) => {
    if (!selectedFlow) return []
    if (selectedFlow.type === 'nudge') {
      return ['delay', 'message', 'if-else']
    }
    return [...(selectedCampaign?.allowed_nodes || [])]
  }
)

const nudgeFlowsIdsSelector = createSelector([flowsSelector], (flows) => flows.nudgeFlowsIds)

export const nudgeFlowsSelector = createSelector([flowsByIdsSelector, nudgeFlowsIdsSelector], (flowsByIds, nudgeFlowsIds) =>
  nudgeFlowsIds.map((id) => flowsByIds[id])
)

export const flowUpdateLoadingSeletor  = createSelector(flowsSelector, (state) => state.flowUpdateLoading)