import { getValue, hydratePath } from './resume.helpers'

interface Branch {
	path?: string
	class?: string
	tag: string
	containers?: Branch[]
}

const loop = ({ branch, indexes, resume }: { branch: Branch; indexes: number[]; resume }) => {
	const path = branch?.path
	const hydratedPath = hydratePath({ path, indexes })
	const tag = branch?.tag
	const value = getValue({ path: hydratedPath, resume })

	if (Array.isArray(value)) {
		return {
			tag,
			class: branch?.class,
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
			tag,
			class: branch?.class,
			value,
			containers: branch?.containers?.map((c, index) => {
				return loop({
					branch: {
						tag: c?.tag,
						class: c?.class,
						path: c?.path,
						containers: c?.containers,
					},
					resume,
					indexes: Array.isArray(getValue({ path: hydratedPath, resume }))
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
