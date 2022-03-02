import resume from '../../../resume.json'
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

	test('can hydrate path with multiple values', () => {
		expect(
			hydratePath({
				indexes: [0],
				path: '$.work[{{index}}].startDate - $.work[{{index}}].endDate',
			})
		).toEqual('$.work[0].startDate - $.work[0].endDate')
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
		).toEqual('Led sales team')
	})
	test('can get a value from path with multiple values', () => {
		expect(
			getValue({
				path: hydratePath({
					indexes: [0, 2],
					path: '$.work[{{index}}].startDate - $.work[{{index}}].endDate',
				}),
				resume,
			})
		).toEqual('2014-03-01 - 2018-05-01')
	})
})
