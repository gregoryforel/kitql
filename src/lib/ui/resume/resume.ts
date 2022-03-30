import type { ContainerType } from './components/container.types'
import { getValue, hydratePath } from './resume.helpers'

interface Branch {
	attributes?: ContainerType['attributes']
	path?: string
	class?: string
	id?: string
	tag: string
	containers?: Branch[]
}

const loop = ({ branch, indexes, resume }: { branch: Branch; indexes: number[]; resume }) => {
	const hydratedValuePath = hydratePath({ path: branch?.path, indexes })
	const tag = branch?.tag
	// attributes && console.log('attributes', attributes)

	const value = getValue({ path: hydratedValuePath, resume })

	if (Array.isArray(value)) {
		return {
			attributes: branch.attributes,
			tag,
			class: branch.class,
			id: hydratedValuePath,
			containers: value.map((_, index) => {
				return loop({
					branch: branch.containers[0],
					indexes: [...indexes, index],
					resume,
				})
			}),
		}
	} else {
		return {
			attributes: branch.attributes,
			tag,
			class: branch?.class,
			id: hydratedValuePath,
			value,
			containers: branch?.containers?.map((c, index) => {
				const attributes = c.attributes && JSON.parse(JSON.stringify(c.attributes)) // Deep copy
				attributes &&
					Object.keys(attributes).forEach((key) => {
						attributes[key] = getValue({
							path: hydratePath({ path: attributes[key], indexes }),
							resume,
						})
					})

				return loop({
					branch: {
						attributes,
						tag: c?.tag,
						class: c?.class,
						id: c?.path,
						path: c?.path,
						containers: c?.containers,
					},
					resume,
					indexes: Array.isArray(getValue({ path: hydratedValuePath, resume }))
						? [...indexes, index]
						: indexes,
				})
			}),
		}
	}
}

export const buildResumeWithTheme = ({ resume, theme }: { resume; theme: Branch }) => {
	return loop({ branch: theme as Branch, resume, indexes: [] })
}
