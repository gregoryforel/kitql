import { JSONPath } from 'jsonpath-plus'
import resume from '../../../resume.json'
import theme from '../../../theme.json'
import type { ContainerType } from './components/container.types'

const loop = (branch: ContainerType, index = 0) => {
	const resumeKey = branch?.resumeKey
	const className = branch?.class
	const tag = branch?.tag
	const containers = branch?.containers

	const value = resumeKey?.replace('{{index}}', index.toString())
		? JSONPath({ path: resumeKey?.replace('{{index}}', index.toString()), json: resume })[0]
		: null
	const isValueArray = Array.isArray(value)

	return {
		value: isValueArray
			? `(${value.length})[]`
			: value || resumeKey?.replace('{{index}}', index.toString()),
		isValueArray,
		className,
		tag,
		containers: containers?.map((c, i) =>
			loop(
				{
					tag: c?.tag,
					class: c?.class,
					containers: c?.containers,
					resumeKey: c?.resumeKey?.replace('{{index}}', i.toString()),
				},
				i
			)
		),
	}
}

export const resumeTree = loop(theme as ContainerType)
