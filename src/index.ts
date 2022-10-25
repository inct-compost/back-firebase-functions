import * as admin from 'firebase-admin'
import serviceAccount from './admin-sdk-token.key.json'

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: serviceAccount.client_id,
    clientEmail: serviceAccount.client_email,
    privateKey: serviceAccount.private_key,
  }),
})

export * from './api/generateCustomToken'
