import { Flow } from '../models/Flow.model'

export interface HistoryOperation {
  type: 'NODE_ADD' | 'NODE_DELETE' | 'NODE_UPDATE' | 'EDGE_ADD' | 'EDGE_DELETE' | 'EDGE_UPDATE' | 'FLOW_UPDATE'
  timestamp: number
  description: string
  data: any
}

export interface HistoryState {
  past: HistoryOperation[]
  present: Flow | null
  future: HistoryOperation[]
  maxHistorySize: number
}

export class HistoryManager {
  private state: HistoryState
  private maxHistorySize: number

  constructor(maxHistorySize: number = 50) {
    this.maxHistorySize = maxHistorySize
    this.state = {
      past: [],
      present: null,
      future: [],
      maxHistorySize,
    }
  }

  // Push a new operation to history
  pushOperation(operation: Omit<HistoryOperation, 'timestamp'>): void {
    // Add current state to past if it exists
    if (this.state.present) {
      this.state.past.push({
        type: 'FLOW_UPDATE',
        timestamp: Date.now(),
        description: 'Flow state',
        data: this.state.present,
      })
    }

    // Clear future when new operation is pushed
    this.state.future = []

    // Limit history size
    if (this.state.past.length > this.maxHistorySize) {
      this.state.past = this.state.past.slice(-this.maxHistorySize)
    }

    // Update present state
    this.state.present = operation.data
  }

  // Undo last operation
  undo(): Flow | null {
    if (this.state.past.length === 0) return null

    const lastOperation = this.state.past.pop()!

    // Move current state to future
    if (this.state.present) {
      this.state.future.unshift({
        type: 'FLOW_UPDATE',
        timestamp: Date.now(),
        description: 'Undo operation',
        data: this.state.present,
      })
    }

    // Update present state
    this.state.present = lastOperation.data

    return this.state.present
  }

  // Redo next operation
  redo(): Flow | null {
    if (this.state.future.length === 0) return null

    const nextOperation = this.state.future.shift()!

    // Move current state to past
    if (this.state.present) {
      this.state.past.push({
        type: 'FLOW_UPDATE',
        timestamp: Date.now(),
        description: 'Redo operation',
        data: this.state.present,
      })
    }

    // Update present state
    this.state.present = nextOperation.data

    return this.state.present
  }

  // Check if undo is available
  canUndo(): boolean {
    return this.state.past.length > 0
  }

  // Check if redo is available
  canRedo(): boolean {
    return this.state.future.length > 0
  }

  // Get current state
  getState(): HistoryState {
    return { ...this.state }
  }

  // Clear all history
  clear(): void {
    this.state = {
      past: [],
      present: null,
      future: [],
      maxHistorySize: this.maxHistorySize,
    }
  }

  // Get history statistics
  getStats() {
    return {
      pastCount: this.state.past.length,
      futureCount: this.state.future.length,
      hasPresent: !!this.state.present,
      maxSize: this.maxHistorySize,
    }
  }
}

// Factory function to create history operations
export const createHistoryOperation = (type: HistoryOperation['type'], description: string, data: any): Omit<HistoryOperation, 'timestamp'> => ({
  type,
  description,
  data,
})

// Common operation creators
export const historyOperations = {
  nodeAdd: (node: any, flow: Flow) => createHistoryOperation('NODE_ADD', `Added node: ${node.type}`, flow),

  nodeDelete: (node: any, flow: Flow) => createHistoryOperation('NODE_DELETE', `Deleted node: ${node.type}`, flow),

  nodeUpdate: (node: any, flow: Flow) => createHistoryOperation('NODE_UPDATE', `Updated node: ${node.type}`, flow),

  edgeAdd: (edge: any, flow: Flow) => createHistoryOperation('EDGE_ADD', `Added edge: ${edge.source} → ${edge.target}`, flow),

  edgeDelete: (edge: any, flow: Flow) => createHistoryOperation('EDGE_DELETE', `Deleted edge: ${edge.source} → ${edge.target}`, flow),

  edgeUpdate: (edge: any, flow: Flow) => createHistoryOperation('EDGE_UPDATE', `Updated edge: ${edge.source} → ${edge.target}`, flow),

  flowUpdate: (flow: Flow, description: string = 'Flow updated') => createHistoryOperation('FLOW_UPDATE', description, flow),
}
