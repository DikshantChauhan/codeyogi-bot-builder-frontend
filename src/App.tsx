import { Routes, Route, useLocation, Location } from 'react-router-dom'
import CampaignsListPage from './pages/CampaignsList.Page'
import CampaignDetailPage from './pages/CampaignDetail.Page'
import FlowPage from './pages/Flow.Page'
import { ROUTE_CAMPAIGNS_LIST, ROUTE_CAMPAIGN_DETAILS, ROUTE_LEVEL_FLOW, ROUTE_NUDGES_LIST, ROUTE_NUDGE_FLOW } from './constants'
import { memo, useEffect } from 'react'
import { locationActions } from './store/slices/location.slice'
import { connect } from 'react-redux'
import NudgesListPage from './pages/NudgesList.Page'

interface AppProps {
  changeLocation: (location: Location) => void
}

function App({ changeLocation }: AppProps) {
  const location = useLocation()

  useEffect(() => {
    changeLocation(location)
  }, [location, changeLocation])

  return (
    <div className="min-h-screen w-full bg-background">
      <Routes>
        <Route index path={ROUTE_CAMPAIGNS_LIST} element={<CampaignsListPage />} />
        <Route path={ROUTE_CAMPAIGN_DETAILS()} element={<CampaignDetailPage />} />
        <Route path={ROUTE_LEVEL_FLOW()} element={<FlowPage />} />
        <Route path={ROUTE_NUDGES_LIST} element={<NudgesListPage />} />
        <Route path={ROUTE_NUDGE_FLOW()} element={<FlowPage />} />
      </Routes>
    </div>
  )
}

const mapDispatchToProps = {
  changeLocation: locationActions.changeLocation,
}

export default memo(connect(null, mapDispatchToProps)(App))
