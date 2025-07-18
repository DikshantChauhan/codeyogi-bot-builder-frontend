import { createSelector } from 'reselect'
import { flowsSelector } from './app.selector'
import { selectedNormalizedCampaignSelector } from './campaign.selector'
import { AppState } from '../store'
import { AppNodeKeys } from '../../models/Node.model'
import { DELAY_NODE_KEY } from '../../nodes/customs/delay/type'
import { WHATSAPP_MESSAGE_NODE_KEY } from '../../nodes/customs/whatsappMessage/type'
import { IF_ELSE_NODE_KEY } from '../../nodes/customs/ifElse/type'
import { START_NODE_KEY } from '../../nodes/customs/start/type'
import { END_NODE_KEY } from '../../nodes/customs/end/type'

export const flowsByIdsSelector = createSelector([flowsSelector], (flows) => flows.flowsById)

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
      return [DELAY_NODE_KEY, WHATSAPP_MESSAGE_NODE_KEY, IF_ELSE_NODE_KEY, START_NODE_KEY, END_NODE_KEY]
    }
    return [...(selectedCampaign?.allowed_nodes || [])]
  }
)

const nudgeFlowsIdsSelector = createSelector([flowsSelector], (flows) => flows.nudgeFlowsIds)

export const nudgeFlowsSelector = createSelector([flowsByIdsSelector, nudgeFlowsIdsSelector], (flowsByIds, nudgeFlowsIds) =>
  nudgeFlowsIds.map((id) => flowsByIds[id])
)

export const flowUpdateLoadingSeletor = createSelector(flowsSelector, (state) => state.flowUpdateLoading)

export const nudgeFlowsLoadingSelector = createSelector(flowsSelector, (state) => state.nudgeFlowsLoading)

export const nudgeFlowsErrorSelector = createSelector(flowsSelector, (state) => state.nudgeFlowsError)

export const flowDeleteLoadingSelector = createSelector(flowsSelector, (state) => state.flowDeleteLoading)
