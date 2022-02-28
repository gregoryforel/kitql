import { JSONPath } from 'jsonpath-plus'

import resume from '../../../resume2.json'
import theme from '../../../theme2.json'

import type { ContainerType } from './components/container.types'
import { getValue, hydratePath } from './resume.helpers'

const loop = ({
	branch,
	indexes,
	resume,
}: {
	resume
	branch: ContainerType
	indexes: number[]
}) => {
	const path = hydratePath({ path: branch?.path, indexes })
	const value = getValue({ path, resume })
	const tag = branch?.tag

	if (Array.isArray(value)) {
		// for (let index = 0; index < value.length; index++) {
		return {
			tag,
			type: 'ARRAY',
			path,
			containers: value.map((_, index) => {
				return loop({
					branch: branch.containers[0],
					indexes: [...indexes, index],
					resume,
				})
			}),
		}
		// return loop({
		// 	branch: branch.containers[0],
		// 	indexes: [...indexes, index],
		// 	resume,
		// })
		// }
	} else {
		return { tag, type: 'SCALAR|NULL', path, value }
	}
}

// const loop = ({
// 	branch,
// 	index,
// 	branchValue,
// }: {
// 	branch: ContainerType
// 	branchValue: any
// 	index: number[]
// }) => {
// 	const { value, isArray, key } = getValueDetails({
// 		path: branch?.key,
// 		index,
// 		branchValue,
// 	})

// 	if (isArray) {
// 		return {
// 			ARRAY: true,
// 			key,
// 			branchValue: `${value.length}[]`,
// 			// class: branch?.class,
// 			tag: branch?.tag,
// 			containers: value.map((_, i) => {
// 				return loop({ branch: branch?.containers[0], branchValue: value[i], index: i })
// 			}),
// 		}
// 	} else {
// 		return {
// 			SINGLE: true,
// 			key,
// 			branchValue: value,
// 			// class: branch?.class,
// 			tag: branch?.tag,
// 			containers: branch?.containers?.map((c, i) => {
// 				return loop({
// 					branch: {
// 						tag: c?.tag,
// 						class: c?.class,
// 						containers: c?.containers,
// 					},
// 					branchValue,
// 					index: i,
// 				})
// 			}),
// 		}
// 	}
// }

export const themedResume = loop({ branch: theme as ContainerType, resume, indexes: [0] })
