export interface ContainerType {
	path?: string
	class?: string
	tag: string
	containers?: ContainerType[]
}
