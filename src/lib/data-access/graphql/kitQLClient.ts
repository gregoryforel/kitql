import { KitQLClient } from '@kitql/client'

import { appConfig } from '$lib/util/config'

export type AppHeaders = {
	Authorization?: `Bearer ${string}`
}

const kitQLClient = new KitQLClient<AppHeaders>({
	url: `${import.meta.env.DEV ? appConfig.localBackendUrl : appConfig.liveBackendUrl}/v1/graphql`,
	headersContentType: 'application/json',
	logType: ['client', 'server', 'operationAndvariables'],
	// endpointSSRDelayMs: 1000,
	// headers: token ? { Authorization: `Bearer ${token}` } : null,
	// endpointNetworkDelayMs: 2000,
})

// token && kitQLClient.setHeaders({ Authorization: `Bearer ${token}` })

export { kitQLClient }
