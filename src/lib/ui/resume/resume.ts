import { JSONPath } from 'jsonpath-plus'
import resume from '../../../resume.json'
import theme from '../../../theme.json'
import type { ContainerType } from './components/container.types'

const loop = ({ branch, index }: { branch: ContainerType; index: number }) => {
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

	if (isChildValueArray) {
		const list = JSONPath({ path: childValue, json: resume })[0]
		return {
			resumeKey,
			class: branch?.class,
			tag,
			containers: list.map((c, i) => {
				return loop({
					branch: {
						resumeKey: child?.resumeKey?.replace('{{index}}', i.toString()),
						tag: child?.tag,
						class: child?.class,
						containers: child?.containers,
					},
					index: i,
				})
			}),
		}
	} else {
		return {
			value: Array.isArray(value)
				? null
				: value || resumeKey?.replace('{{index}}', index.toString()),
			class: branch?.class,
			tag,
			containers: containers?.map((c, i) =>
				loop({
					branch: {
						tag: c?.tag,
						class: c?.class,
						containers: c?.containers,
						resumeKey: c?.resumeKey?.replace('{{index}}', i.toString()),
					},
					index: i,
				})
			),
		}
	}
}

export const themedResume = loop({ branch: theme as ContainerType, index: 0 })
