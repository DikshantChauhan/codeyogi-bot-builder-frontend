// strictStore.ts
import { StoreApi, UseBoundStore } from 'zustand'

type Selector<T, T2> = (state: T) => T2

export function createStrictStore<T extends object>(
  store: UseBoundStore<StoreApi<T>>
): <U>(selector: Selector<T, U>) => U {
  return (selector) => store(selector)
}