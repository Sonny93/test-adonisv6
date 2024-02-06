type Message = {
  id: string
  author?: User
  type: 'system' | 'user'
  content: string
  createdAt: string
  updatedAt: string
}

type User = {
  id: string
  name: string
  nickName: string
  avatarUrl: string
  createdAt: string
  updatedAt: string
}

type Channel = {
  id: string
  name: string
  author: User
  createdAt: string
  updatedAt: string
}

type ChannelExtended = Channel & {
  author: User
  users: User[]
  messages: Message[]
}
