import type { ContainerType } from './components/container.types'
import { getValue, hydratePath } from './resume.helpers'

const loop = ({
	branch,
	indexes,
	resume,
}: {
	branch: ContainerType
	indexes: number[]
	resume
}) => {
	const path = branch?.path
	const hydratedPath = hydratePath({ path, indexes })
	const tag = branch?.tag
	const value = getValue({ path: hydratedPath, resume })

	if (Array.isArray(value)) {
		return {
			tag,
			type: 'ARRAY',
			path: hydratedPath,
			indexes: JSON.stringify(indexes),
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
			type: value ? 'SCALAR' : 'NULL',
			path: hydratedPath,
			indexes: JSON.stringify(indexes),
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

export const buildResumeWithTheme = ({ resume, theme }: { resume; theme: ContainerType }) => {
	return loop({ branch: theme as ContainerType, resume, indexes: [] })
}
