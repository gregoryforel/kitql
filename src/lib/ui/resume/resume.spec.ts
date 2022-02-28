import { JSONPath } from 'jsonpath-plus'

import resume from '../../../resume2.json'
import theme from '../../../theme2.json'
import { getValue, hydratePath } from './resume.helpers'

describe('Resume', () => {
	// test('can hydrate path'),
	// 	() => {
	// 		expect(
	// 			hydratePath({ indexes: [0, 2], path: '$.work[{{index}}].highlights[{{index}}]' })
	// 				.hydratedPath
	// 		).toEqual('$.work[0].highlights[2]')
	// 	}
	test('can hydrate path', () => {
		expect(
			hydratePath({ indexes: [0, 2], path: '$.work[{{index}}].highlights[{{index}}]' })
		).toEqual('$.work[0].highlights[2]')
	})

	test('can get a value from path', () => {
		expect(
			getValue({
				path: hydratePath({
					indexes: [0, 2],
					path: '$.work[{{index}}].highlights[{{index}}]',
				}),
				resume,
			})
		).toEqual('Highlight 1.3')
	})

	// test('can access work experience at index 1', () => {
	// 	expect(
	// 		getValueDetails({ resume, index: [1], path: '$.work[{{index}}]' }).value
	// 	).toEqual({
	// 		position: 'Position 2',
	// 		name: 'Company 2',
	// 		highlights: ['Highlight 2.1', 'Highlight 2.2'],
	// 	})
	// })
})
