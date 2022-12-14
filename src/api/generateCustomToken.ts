import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const generateCustomToken = functions.https.onRequest(async (req, res) => {
  interface HardwareDataResultInterface {
    mac: string
    password: string
    uuid: string
  }

  // クエリから値を取得
  const id = req.query.id
  const mac = req.query.mac
  const pass = req.query.pass


  const additionalClaims = {
    /**
     * セキュリティルールの中で `auth`, `request.auth` オブジェクトを使用可能にするフラグ
     */
    premiumAccount: true,
  }

  if (!mac && !pass && !id) {
    res.status(400).send('Request information is missing')
  }

  // クエリのidがstring形式でないといけないので制約をかけている
  if (typeof id === 'string') {
    /**
     * idで指定したFirestoreドキュメントの情報をすべて取得
     */
    const hardwareDataResult = await admin.firestore().collection('hardwareData').doc(id).get()
    /**
     * hardwareDataResultのデータのみ
     */
    const hardwareData = hardwareDataResult.data() as HardwareDataResultInterface

    // クエリのmacアドレスとpassがFirestoreドキュメントと一致していた場合は、JWT形式のトークンを発行する
    if (hardwareData.mac === mac && hardwareData.password === pass) {
      // macアドレスを元にしたJWT形式のトークンを発行する
      admin.auth()
        .createCustomToken(id, additionalClaims)
        .then((customToken) => {
          res.status(200).send(customToken)
        })
        .catch((error) => {
          res.status(500).send(`Error creating custom token: ${error}`)
        })
    } else {
      res.status(403).send('Password or mac address not match')
    }
  } else {
    res.status(400).send('Mac address format is not a string type')
  }

  return
})
