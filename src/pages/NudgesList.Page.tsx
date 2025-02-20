import { FC, memo } from 'react'
import { connect } from 'react-redux'
import { nudgeFlowsErrorSelector, nudgeFlowsLoadingSelector, nudgeFlowsSelector } from '../store/selectors/flow.selector'
import { AppState } from '../store/store'
import { Flow } from '../models/Flow.model'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { Link } from 'react-router-dom'
import { ROUTE_NUDGE_FLOW } from '../constants'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { IoMdAlarm } from 'react-icons/io'

interface NudgesListPageProps {
  nudgeFlowsLoading: boolean
  nudgeFlowsError: string | null
  nudgeFlows: Flow[]
}

const NudgesListPage: FC<NudgesListPageProps> = ({ nudgeFlowsLoading, nudgeFlowsError, nudgeFlows }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-500">Nudge Flows</h1>

      {nudgeFlowsLoading && <Loading />}
      {nudgeFlowsError && <Error message={nudgeFlowsError} />}

      <div className="flex flex-wrap gap-6">
        {nudgeFlows.map((nudgeFlow) => (
          <article
            key={nudgeFlow.id}
            className="group bg-gradient-to-br from-white to-gray-50/90 backdrop-blur-sm rounded-lg border border-gray-100 hover:border-blue-100 hover:shadow-sm transition-all duration-200 w-64"
          >
            <div className="flex items-center justify-between p-3">
              <Link
                to={ROUTE_NUDGE_FLOW(nudgeFlow.id)}
                className="flex-1 text-gray-700 group-hover:text-blue-600 transition-colors duration-200 flex items-center gap-2"
              >
                <IoMdAlarm className="h-4 w-4" />
                <h3 className="font-medium truncate">{nudgeFlow.name}</h3>
              </Link>
              <HiOutlineArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  nudgeFlowsLoading: nudgeFlowsLoadingSelector(state),
  nudgeFlowsError: nudgeFlowsErrorSelector(state),
  nudgeFlows: nudgeFlowsSelector(state),
})

export default memo(connect(mapStateToProps)(NudgesListPage))
