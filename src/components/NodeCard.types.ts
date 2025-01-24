import { IconType } from 'react-icons'
import { AppNodeData } from '../nodes'

export interface NodeCardProps<T extends AppNodeData> {
  title: string
  Icon: IconType
  iconBg: string
  options?: { dataKey: keyof T; list: [string, string][] }
  children?: React.ReactNode
} 