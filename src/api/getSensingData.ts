import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const getSensingData = functions.https.onRequest(async (req, res) => {
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin.firestore().collection('sensingData').doc('hardwareID').collection('20220711').doc('1200').get()
  // Send back a message that we've successfully written the message
  res.send({ 'result-data': `${writeResult}` })
})
