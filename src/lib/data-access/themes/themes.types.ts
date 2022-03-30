interface Container {
	attributes?: {
		datetime?: string
		href?: string
		target?: string
	}
	path: string
	class?: string
	tag: string
	containers?: Container[]
}

export type Theme = Container
