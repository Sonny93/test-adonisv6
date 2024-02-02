import React from 'react'

export default function MessageForm() {
  return (
    <form action="/chat" method="post">
      <input type="message" name="message" placeholder="Enter your message" />
      <button type="submit">click</button>
      <ul className="messages"></ul>
    </form>
  )
}
