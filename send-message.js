const rheaPromise = require('rhea-promise')
const message = require('./message.json')

sendMessage()

async function sendMessage () {
  const connectionOptions = {
    host: process.env.MESSAGE_HOST,
    hostname: process.env.MESSAGE_HOST,
    port: process.env.MESSAGE_PORT,
    username: process.env.MESSAGE_USERNAME,
    password: process.env.MESSAGE_PASSWORD,
    transport: process.env.MESSAGE_TRANSPORT
  }

  const queue = process.env.MESSAGE_QUEUE
  const connection = new rheaPromise.Connection(connectionOptions)
  const senderOptions = configureSender(queue)

  try {
    await connection.open()
    const sender = await connection.createAwaitableSender(senderOptions)
    const messageBody = JSON.stringify(message)
    console.log(`sending message ${messageBody}`)
    await sender.send({ body: messageBody })
    await sender.close()
    await connection.close()
    console.log('message sent')
  } catch (err) {
    console.error('unable to send message', err)
  }
}

function configureSender (address) {
  return {
    name: 'amqp-send-test',
    target: {
      address
    },
    sendTimeoutInSeconds: 10,
    onError: (context) => {
      const senderError = context.sender && context.sender.error
      if (senderError) {
        console.error('unable to send message', senderError)
      }
    },
    onSessionError: (context) => {
      const sessionError = context.session && context.session.error
      if (sessionError) {
        console.error('session error', sessionError)
      }
    }
  }
}
