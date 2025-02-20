import { FC, memo } from 'react'
import { connect } from 'react-redux'
import { nudgeFlowsErrorSelector, nudgeFlowsLoadingSelector, nudgeFlowsSelector } from '../store/selectors/flow.selector'
import { AppState } from '../store/store'
import { Flow } from '../models/Flow.model'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { Link } from 'react-router-dom'
import { ROUTE_NUDGE_FLOW } from '../constants'

interface NudgesListPageProps {
  nudgeFlowsLoading: boolean
  nudgeFlowsError: string | null
  nudgeFlows: Flow[]
}

const NudgesListPage: FC<NudgesListPageProps> = ({ nudgeFlowsLoading, nudgeFlowsError, nudgeFlows }) => {
  return (
    <div>
      {nudgeFlowsLoading && <Loading />}
      {nudgeFlowsError && <Error message={nudgeFlowsError} />}

      {nudgeFlows.map((nudgeFlow) => (
        <Link to={ROUTE_NUDGE_FLOW(nudgeFlow.id)} key={nudgeFlow.id}>
          <h2>{nudgeFlow.name}</h2>
        </Link>
      ))}
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  nudgeFlowsLoading: nudgeFlowsLoadingSelector(state),
  nudgeFlowsError: nudgeFlowsErrorSelector(state),
  nudgeFlows: nudgeFlowsSelector(state),
})

export default memo(connect(mapStateToProps)(NudgesListPage))
