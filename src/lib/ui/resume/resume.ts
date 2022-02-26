import { JSONPath } from 'jsonpath-plus'
import resume from '../../../resume.json'
import theme from '../../../theme.json'
import type { ContainerType } from './components/container.types'

const loop = (branch: ContainerType, index = 0) => {
	const resumeKey = branch?.resumeKey
	const tag = branch?.tag
	const containers = branch?.containers

	const child = containers && containers[0]
	const childValue = child && child?.resumeKey?.replace('{{index}}', index.toString())
	const isChildValueArray = childValue
		? Array.isArray(JSONPath({ path: childValue, json: resume })[0])
		: false

	const value = resumeKey?.replace('{{index}}', index.toString())
		? JSONPath({ path: resumeKey?.replace('{{index}}', index.toString()), json: resume })[0]
		: null
	const isValueArray = Array.isArray(value)

	if (isChildValueArray) {
		const list = JSONPath({ path: childValue, json: resume })[0]
		return {
			// value: value || child?.resumeKey?.replace('{{index}}', index.toString()),
			resumeKey,
			class: branch?.class,
			tag,
			containers: list.map((c, i) => {
				return loop({
					resumeKey: child?.resumeKey?.replace('{{index}}', i.toString()),
					tag: child?.tag,
					class: child?.class,
					containers: child?.containers,
				})
			}),
		}
	} else {
		return {
			value: isValueArray ? null : value || resumeKey?.replace('{{index}}', index.toString()),
			class: branch?.class,
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
}

export const themedResume = loop(theme as ContainerType)
