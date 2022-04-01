import type { Theme } from '$lib/data-access/themes/themes.types'

export type ContainerType = Theme & {
	id?: string
	value: string
}
