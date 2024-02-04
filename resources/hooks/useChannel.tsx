import { ChannelContext } from '@/contexts/channelContext'
import { useContext } from 'react'

export default function useChannel() {
  return useContext(ChannelContext)
}
