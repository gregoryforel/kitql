export interface ContainerType {
	key?: string
	class?: string
	tag: string
	containers?: ContainerType[]
}
