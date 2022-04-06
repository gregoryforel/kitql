import { KitQLClient } from '@kitql/client'

import { appConfig } from '$lib/util/config'
import { nhost } from '$lib/util/nhost'

const token = nhost.auth.getAccessToken()
console.log('token', token)
export const kitQLClient = new KitQLClient({
	url: `${import.meta.env.DEV ? appConfig.localBackendUrl : appConfig.liveBackendUrl}/v1/graphql`,
	headersContentType: 'application/json',
	logType: ['client', 'server', 'operationAndvariables'],
	// endpointSSRDelayMs: 1000,
	headers: token ? { authorization: `Bearer ${token}` } : null,
	// endpointNetworkDelayMs: 2000,
})
