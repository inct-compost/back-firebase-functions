import * as admin from 'firebase-admin'

export const checkCustomToken = async (token: string): Promise<string | null> => {
  let returnValue: string | null = null
  await admin.auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      console.log('valid')
      returnValue = decodedToken.uid
    })
    .catch((error) => {
      console.log(error)
      if (error.errorInfo.message === 'Firebase ID token has "kid" claim which does not correspond to a known public key. Most likely the ID token is expired, so get a fresh token from your client app and try again.') {
        returnValue = 'tokenReissue'
      } else {
        returnValue = null
      }
    })

  return returnValue
}
