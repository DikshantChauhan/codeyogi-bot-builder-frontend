import { FC, memo, useCallback, useState } from 'react'
import { IoMenu } from 'react-icons/io5'
import { CiSaveDown2 } from 'react-icons/ci'
import { Panel } from '@xyflow/react'
import { Link } from 'react-router-dom'
import { BiHome } from 'react-icons/bi'
import { connect } from 'react-redux'
import { flowActions } from '../store/slices/flow.slice'
import { AppState } from '../store/store'
import { selectedFlowSelector } from '../store/selectors/flow.selector'
import { Flow } from '../models/Flow.model'
import { toast } from 'react-toastify'
import { validateFlow } from '../utils'
import { FaLanguage, FaPlus } from 'react-icons/fa'
import FlowVariablePopup from './FlowVariablePopup'
import { selectedNormalizedCampaignSelector } from '../store/selectors/campaign.selector'
import { NormalizedCampaign } from '../models/Campaign.model'
import LangJsonPopup from './langJsonPopup'

type Props = {
  updateFlow: typeof flowActions.flowUpdateTry
  selectedFlow: Flow | null
  setFlow: typeof flowActions.setFlow
  selectedNormalizedCampaign: NormalizedCampaign | null
}

const MenuBar: FC<Props> = ({ updateFlow, selectedFlow, setFlow, selectedNormalizedCampaign }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVariablePopupOpen, setIsVariablePopupOpen] = useState(false)
  const [isLangJsonPopupOpen, setIsLangJsonPopupOpen] = useState(false)

  const handleSave = useCallback(() => {
    if (!selectedFlow) return

    const validationError = validateFlow(selectedFlow.data.nodes, selectedFlow.data.edges)
    if (validationError) {
      toast.error(validationError.error, { autoClose: false })
      setFlow({
        flow: {
          ...selectedFlow,
          data: {
            ...selectedFlow.data,
            nodes: selectedFlow.data.nodes.map((node) => ({ ...node, selected: validationError.cause?.nodeIds?.includes(node.id) || false })),
            edges: selectedFlow.data.edges.map((edge) => ({ ...edge, selected: validationError.cause?.edgeIds?.includes(edge.id) || false })),
          },
        },
      })
    } else {
      updateFlow({
        id: selectedFlow.id,
        data: {
          data: selectedFlow.data,
          name: selectedFlow.name,
          type: selectedFlow.type,
          custom_variable_function: selectedFlow.custom_variable_function,
          language_json: selectedFlow.language_json,
        },
      })
    }

    setIsMenuOpen(false)
  }, [selectedFlow, updateFlow, setFlow])

  const handleVariableFunctionSave = useCallback(
    (value: string) => {
      if (!selectedFlow) return

      toast.success('Variables changes saved to Flow')
      setFlow({
        flow: {
          ...selectedFlow,
          custom_variable_function: value,
        },
      })
    },
    [selectedFlow, setFlow]
  )

  const handleLangJsonSave = useCallback(
    (value: string) => {
      if (!selectedFlow) return

      toast.success('Language changes saved to Flow')
      setFlow({
        flow: {
          ...selectedFlow,
          language_json: value,
        },
      })
    },
    [selectedFlow, setFlow]
  )

  return (
    <div className="rounded-md shadow-lg">
      <div className="relative">
        <Panel className="flex items-center gap-2" position="top-right">
          <div className="relative">
            <button
              className="bg-white p-2 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setIsVariablePopupOpen(!isVariablePopupOpen)}
            >
              <FaPlus className="w-5 h-5 text-gray-600" />
            </button>
            <button
              className="bg-white p-2 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setIsLangJsonPopupOpen(!isLangJsonPopupOpen)}
            >
              <FaLanguage className="w-5 h-5 text-gray-600" />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg z-10 border">
                <Link to="/" className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 min-w-max">
                  <BiHome className="w-5 h-5 mr-3" />
                  <span className="flex-grow">Home</span>
                </Link>
                <button onClick={handleSave} className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <CiSaveDown2 className="w-5 h-5 mr-3" />
                  <span className="flex-grow">Save</span>
                </button>
              </div>
            )}
          </div>
          <button className="bg-white p-2 hover:bg-gray-100 rounded-md transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <IoMenu className="w-5 h-5 text-gray-600" />
          </button>
        </Panel>

        <FlowVariablePopup
          isOpen={isVariablePopupOpen}
          onClose={() => {
            setIsVariablePopupOpen(false)
          }}
          campaignGlobalConstants={selectedNormalizedCampaign?.constants || []}
          variablesFunction={selectedFlow?.custom_variable_function}
          onSave={handleVariableFunctionSave}
        />

        <LangJsonPopup
          isOpen={isLangJsonPopupOpen}
          onClose={() => {
            setIsLangJsonPopupOpen(false)
          }}
          langJson={selectedFlow?.language_json}
          onSubmit={handleLangJsonSave}
          supportedLanguages={selectedNormalizedCampaign?.supported_languages || []}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state: AppState) => ({
  selectedFlow: selectedFlowSelector(state),
  selectedNormalizedCampaign: selectedNormalizedCampaignSelector(state),
})

const mapDispatchToProps = {
  updateFlow: flowActions.flowUpdateTry,
  setFlow: flowActions.setFlow,
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(MenuBar))
