//create chatting context and provide it to the app
import React, { createContext, useEffect, useMemo, useState } from 'react'
import { io, Socket } from 'socket.io-client'

interface MesageProps {
  content: string
  channelId: string
  senderId: string
}

interface ChattingContextType {
  socket: Socket
  chanelId?: string
  setChanelId: (chanelId: string) => void
  messages?: MesageProps[]
  setMessages: (newMessages: MesageProps[]) => void
}

const createSocket = (token: string): Socket => {
  return io(import.meta.env.VITE_BASE_URL, {
    reconnection: false,
    secure: true,
    rejectUnauthorized: false,
    auth: {
      authorization: `Bearer ${token}`
    },
    path: '/ws'
  })
}

const SocketChattingContext = createContext<ChattingContextType>({
  socket: {} as Socket,
  setChanelId: () => {},
  setMessages: () => false
})

export const ChattingProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const token = localStorage.getItem('token') || ''

  const [chanelId, setChanelId] = useState<string>()
  const [messages, setMessages] = useState<MesageProps[]>([])

  const socket = createSocket(token)

  const contextValue = useMemo(
    () => ({
      socket,
      chanelId,
      setChanelId: (newChanelId: string) => setChanelId(newChanelId),
      messages,
      setMessages: (newMessages: MesageProps[]) => setMessages(newMessages)
    }),
    [chanelId, messages, socket]
  )

  useEffect(() => {
    socket.on('message', (message: MesageProps) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })
  }, [chanelId, messages, socket])

  useEffect(() => {
    return () => {
      socket.disconnect()
    }
  }, [socket])

  return (
    <SocketChattingContext.Provider value={contextValue}>
      {children}
    </SocketChattingContext.Provider>
  )
}
