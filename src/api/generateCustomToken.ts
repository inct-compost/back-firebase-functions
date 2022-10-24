import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const generateCustomToken = functions.https.onRequest(async (req, res) => {
  const mac = req.query.mac
  const pass = req.query.pass

  if (typeof mac === 'string') {
    admin.auth()
      .createCustomToken(mac)
      .then((customToken) => {
        res.status(200).send(customToken)
      })
      .catch((error) => {
        console.error('Error creating custom token:', error)
      })
  } else {
    console.error('mac not string')
  }
})
