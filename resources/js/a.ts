import { Transmit } from '@adonisjs/transmit-client'

const transmit = new Transmit({
  baseUrl: 'http://localhost:3333',
  maxReconnectAttempts: 5,
  removeSubscriptionOnZeroListener: true,
  onSubscribeFailed: console.log,
  onReconnectAttempt: console.log,
  onReconnectFailed: console.log,
  beforeSubscribe: console.log,
  beforeUnsubscribe: console.log,
  onSubscription: console.log,
  onUnsubscription: console.log,
})

const messageList = document.querySelector('.messages')

function createMessageElement(content: string) {
  const element = document.createElement('div')
  element.classList.add('message')
  element.textContent = content
  return element
}

transmit.listenOn('chat', ({ message }: { message: string }) => {
  messageList?.append(createMessageElement(message))
})
