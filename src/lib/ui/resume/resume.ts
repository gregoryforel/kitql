import { JSONPath } from 'jsonpath-plus'

import resume from '../../../resume.json'
import theme from '../../../theme2.json'

import type { ContainerType } from './components/container.types'

const loop = ({
	branch,
	index,
	branchValue,
}: {
	branch: ContainerType
	branchValue: any
	index: number
}) => {
	const { value, isArray, key } = getValueDetails({
		path: branch?.key,
		index,
		branchValue,
	})

	if (isArray) {
		return {
			ARRAY: true,
			key,
			branchValue: `${value.length}[]`,
			// class: branch?.class,
			tag: branch?.tag,
			containers: value.map((_, i) => {
				return loop({ branch: branch?.containers[0], branchValue: value[i], index: i })
			}),
		}
	} else {
		console.log('SINGLE', {
			[branch.tag]: {
				SINGLE: true,
				key,
				branchValue: value,
			},
		})
		return {
			SINGLE: true,
			key,
			branchValue: value,
			// class: branch?.class,
			tag: branch?.tag,
			containers: branch?.containers?.map((c, i) => {
				console.log(
					'SINGLE',
					getValueDetails({ branchValue, index: i, path: c?.key }).value
				)

				return loop({
					branch: {
						tag: c?.tag,
						class: c?.class,
						containers: c?.containers,
					},
					branchValue,
					index: i,
				})
			}),
		}
	}
}

const getValueDetails = ({
	path,
	branchValue,
	index,
}: {
	path: string
	index: number
	branchValue: any
}) => {
	const key = path?.replace('{{index}}', index.toString()) || null
	const value = path ? JSONPath({ path: key, json: branchValue })[0] : null

	return {
		isArray: Array.isArray(value),
		value: value || null,
		key,
	}
}

export const themedResume = loop({ branch: theme as ContainerType, branchValue: resume, index: 0 })
