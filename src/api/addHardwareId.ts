import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const addHardwareId = functions.https.onCall(async (data, context) => {
  interface HardwareDataResultInterface {
    mac: string
    password: string
    uuid: string
  }

  const mac = data.mac._value
  const id = data.id._value
  const pass = data.password._value

  if (!mac && !pass && !id && typeof id === 'string') {
    return {
      status: 406,
      resText: 'Request information is missing',
    }
  }

  /**
   * idで指定したFirestoreドキュメントの情報をすべて取得
   */
  const hardwareDataResult = await admin.firestore().collection('hardwareData').doc(id).get().catch((err) => {
    throw new functions.https.HttpsError('invalid-argument', 'Either or both the id entered is incorrect')
  })
  /**
   * hardwareDataResultのデータのみ
   */
  const hardwareData = hardwareDataResult.data() as HardwareDataResultInterface

  // クエリのmacアドレスとpassがFirestoreドキュメントと一致していた場合は、JWT形式のトークンを発行する
  if (hardwareData.mac === mac && hardwareData.password === pass) {
    const uid = context.auth?.uid

    console.log(uid)
    if (uid) {
      // sensingDataのテーブルにアクセス可能なuid配列に、この関数を呼びだしたアカウントを追加する
      await admin.firestore().collection('sensingData').doc(id).update({
        authorityHolder: admin.firestore.FieldValue.arrayUnion(uid),
      })

      // 関数を呼び出したアカウントのユーザー情報に、アクセスができるhardwareのIDを追加する
      await admin.firestore().collection('userData').doc(uid).set({
        hardwareIds: admin.firestore.FieldValue.arrayUnion(id),
      }).then(() => {
        return {
          status: 200,
          resText: 'Data successfully added!',
        }
      })
    }

    return {
      status: 403,
      resText: 'Password or mac address not match',
    }
  } else {
    throw new functions.https.HttpsError('invalid-argument', 'Either or both the mac address or password entered is incorrect')
  }
})
