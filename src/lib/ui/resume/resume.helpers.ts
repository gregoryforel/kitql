import { JSONPath } from 'jsonpath-plus'

export const hydratePath = ({ path, indexes }: { path: string; indexes: number[] }) => {
	let hydratedPath = path

	for (let index = 0; index < indexes.length; index++) {
		hydratedPath = hydratedPath?.replace('{{index}}', indexes[index]?.toString()) || null
	}

	return hydratedPath
}

export const getValue = ({ path, resume }: { path: string; resume: any }) => {
	const value = path
		? JSONPath({ path, json: resume }) && JSONPath({ path, json: resume })[0]
		: null

	return value || null
}
