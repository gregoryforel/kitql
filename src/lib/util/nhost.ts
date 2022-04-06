import { NhostClient } from '@nhost/nhost-js'

import { appConfig } from './config'

export const nhost = new NhostClient({
	backendUrl: import.meta.env.DEV ? appConfig.localBackendUrl : appConfig.liveBackendUrl,
})
