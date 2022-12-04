import * as functions from 'firebase-functions'
import { checkCustomToken } from '../scripts/checkCustomToken'

export const checkIdToken = functions.https.onRequest(async (req, res) => {
  const idToken: string = req.body.token

  if (typeof idToken === 'string') {
    const id = await checkCustomToken(idToken)

    if (id && id !== 'tokenReissue') {
      res.status(200).send('This token is "valid"')
    } else if (id === 'tokenReissue') {
      res.status(403).send('tokenReissue')
    } else {
      res.status(403).send('This token is "invalid"')
    }
  } else {
    res.status(400).send('Jwt Token format is not a string type')
  }

  return
})
