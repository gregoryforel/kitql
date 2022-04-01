import { JSONPath } from 'jsonpath-plus'

export const hydratePath = ({ path, indexes }: { path: string; indexes: number[] }) => {
	const pathChunks = path?.split(' ')

	if (pathChunks?.length > 1) {
		let hydratedPath = ''
		for (let i = 0; i < pathChunks?.length; i++) {
			let pathChunk = pathChunks[i]

			if (pathChunk.includes('$.')) {
				for (let index = 0; index < indexes?.length; index++) {
					pathChunk = pathChunk?.replace('{{index}}', indexes[index]?.toString()) || null
				}
			} else {
				pathChunk = ` ${pathChunk} `
			}

			hydratedPath = hydratedPath.concat(pathChunk)
		}

		return hydratedPath
	} else {
		let hydratedPath = path
		for (let index = 0; index < indexes.length; index++) {
			hydratedPath = hydratedPath?.replace('{{index}}', indexes[index]?.toString()) || null
		}
		return hydratedPath
	}
}

export const getValue = ({ path, resume }: { path: string; resume: any }) => {
	// Finds text between double squared brackets [[whatever]]
	const separator = /\[\[(.*?)\]\]/
	const pathChunks = path?.split(separator)

	if (pathChunks?.length > 1) {
		let value = ''
		for (let index = 0; index < pathChunks.length; index++) {
			let pathChunk = pathChunks[index]
			if (pathChunk.includes('$.')) {
				pathChunk = pathChunk
					? JSONPath({ path: pathChunk, json: resume }) &&
					  JSONPath({ path: pathChunk, json: resume })[0]
					: null
			} else {
				pathChunk = `${pathChunk}`
			}

			value = value.concat(pathChunk)
		}
		return value || null
	} else {
		const value = path
			? JSONPath({ path, json: resume }) && JSONPath({ path, json: resume })[0]
			: null

		return value || null
	}
}

export const buildId = ({ indexes, path }: { indexes: number[]; path: string }) => {
	return path ? hydratePath({ indexes, path }) : null
}
