import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { checkCustomToken } from './checkCustomToken'

export const addSensingData = functions.https.onRequest(async (req, res) => {
  interface SensingDataInterface {
    date: Date
    humidity: number
    temperature: number
  }

  interface DateTimeInterface {
    date: string
    time: string
  }

  const firestore = admin.firestore()

  const jwtToken: string = req.body.token
  const datetime: DateTimeInterface = req.body.datetime
  const data: SensingDataInterface = req.body.data

  if (typeof jwtToken === 'string') {
    const id = await checkCustomToken(jwtToken)

    if (id) {
      const ref = firestore.collection('sensingData').doc(id).collection(datetime.date).doc(datetime.time)
      await ref.set({
        date: data.date,
        humidity: data.humidity,
        temperature: data.temperature,
      }).then((WriteResult) => {
        res.status(200).send(WriteResult)
      }).catch((error) => {
        res.status(500).send(`Error adding sensing data: ${error}`)
      })
    } else {
      res.send(403).send('This token is invalid')
    }
  } else {
    res.status(400).send('Jwt Token format is not a string type')
  }

  return
})
