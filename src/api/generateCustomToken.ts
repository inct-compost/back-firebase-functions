import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const generateCustomToken = functions.https.onRequest(async (req, res) => {
  interface HardwareDataResultInterface {
    mac: string
    password: string
    uuid: string
  }

  const id = req.query.id
  const mac = req.query.mac
  const pass = req.query.pass

  if (!mac && !pass && !id) {
    res.status(400).send('Request information is missing')
  }

  // 
  if (typeof id === 'string') {
    /**
     * idで指定したFirestoreドキュメントの情報をすべて取得し保存したもの
     */
    const hardwareDataResult = await admin.firestore().collection('hardwareData').doc(id).get()
    /**
     * hardwareDataResultのデータのみ
     */
    const hardwareData = hardwareDataResult.data() as HardwareDataResultInterface

    // クエリのmacアドレスとpassがFirestoreドキュメントと一致していた場合は、JWT形式のトークンを発行する
    if (hardwareData.mac === mac && hardwareData.password === pass) {
      admin.auth()
        .createCustomToken(mac)
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
})
