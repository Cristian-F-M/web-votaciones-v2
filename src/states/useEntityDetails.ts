import type { TableSingleItem } from '@/types/table'
import { create } from 'zustand'
import type { CustomObject } from '@/types'

interface ModelDetailsState {
	entityId: string | null
	entity: CustomObject<TableSingleItem> | null | undefined
	keys: string[]
	setEntityId: (entityId: ModelDetailsState['entityId']) => void
	setKeys: (keys: ModelDetailsState['keys']) => void
	getLastKey: () => ModelDetailsState['keys'][number] | undefined
	setEntity: (entity: ModelDetailsState['entity']) => void
	reset: () => void
}

export const useModelDetails = create<ModelDetailsState>()((set, get) => ({
	entityId: null,
	keys: [],
	entity: null,
	setEntityId: (entityId) => set({ entityId }),
	setKeys: (keys) => set({ keys }),
	getLastKey: () => get().keys.at(-1),
	setEntity: (entity) => set({ entity }),
	reset: () => set({ entityId: null, keys: [], entity: null })
}))
