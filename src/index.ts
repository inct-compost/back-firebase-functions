import * as admin from 'firebase-admin'
import serviceAccount from './admin-sdk-token.key.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
})

export * from './api/helloWorld'
export * from './api/getSensingData'
export * from './api/generateCustomToken'
