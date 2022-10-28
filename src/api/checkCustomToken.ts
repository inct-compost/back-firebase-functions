import * as admin from 'firebase-admin'

export const checkCustomToken = async (token: string): Promise<string | null> => {
  let returnValue: string | null = null
  await admin.auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      returnValue = decodedToken.uid
    })
    .catch((error) => {
      console.log(error)
      returnValue = null
    })

  return returnValue
}
