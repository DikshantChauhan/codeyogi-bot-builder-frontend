export const ROUTE_FLOW_EDITOR = (flowName?: string) => `/flow/${flowName || ':flow_name'}`
ROUTE_FLOW_EDITOR.dynamicKey = 'flow_name' as const

export const ROUTE_HOME = '/'
