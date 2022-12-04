import * as admin from 'firebase-admin'
import serviceAccount from './admin-sdk-token.key.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
})

export * from './api/generateCustomToken'
export * from './api/addSensingData'
export * from './api/checkIdToken'
