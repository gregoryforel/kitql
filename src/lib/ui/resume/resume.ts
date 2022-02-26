import { JSONPath } from 'jsonpath-plus'

import resume from '../../../resume.json'
import theme from '../../../theme.json'

import type { ContainerType } from './components/container.types'

const loop = ({ branch, index }: { branch: ContainerType; index: number }) => {
	const resumeKey = branch?.resumeKey
	const tag = branch?.tag
	const containers = branch?.containers

	const child = containers && containers[0]
	const childResumeKey = child && child?.resumeKey?.replace('{{index}}', '0')
	const childResumeValue = childResumeKey ? getValue(childResumeKey) : null
	const isChildValueArray = childResumeKey ? Array.isArray(childResumeValue) : false

	const value = resumeKey?.replace('{{index}}', index.toString())
		? getValue(resumeKey?.replace('{{index}}', index.toString()))
		: null

	if (isChildValueArray) {
		const list = getValue(childResumeKey)
		return {
			resumeKey,
			class: branch?.class,
			tag,
			containers: list.map((_, i) => {
				const child = containers && containers[i]
				const childResumeKey = child && child?.resumeKey?.replace('{{index}}', i.toString())

				return loop({
					branch: {
						resumeKey: childResumeKey,
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

const getValue = (path: string) => {
	return JSONPath({ path, json: resume })[0]
}

export const themedResume = loop({ branch: theme as ContainerType, index: 0 })
