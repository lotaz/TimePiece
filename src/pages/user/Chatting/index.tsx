import { Container } from '@mui/material'
import ChattingSideBar from './components/SideBar'
import { useEffect, useState } from 'react'
import { ConversationType } from './type'
import useSWR from 'swr'
import { AppPath } from '@/services/utils'
import useDebounce from '@/hooks/useDebounce'
import ChatContent from './components/ChatContent'
import SockJS from 'sockjs-client/dist/sockjs.js'
import { Stomp } from '@stomp/stompjs'

const ChattingPage = () => {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null
  const token = localStorage.getItem('token')
  const [conversations, setConversations] = useState<ConversationType[]>([])
  const [filteredConversations, setFilteredConversations] = useState<
    ConversationType[]
  >([])
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationType | null>(null)
  const [search, setSearch] = useState<string>('')

  const debouncedSearch = useDebounce(search, 150)

  const { isLoading } = useSWR(AppPath.GET_CONVERSATION(user?.id), {
    onSuccess: (data) => {
      setConversations(data)
      setFilteredConversations(data)
      setSelectedConversation(data[0])
    }
  })

  const handleSelectConversation = (conversation: ConversationType) => {
    setSelectedConversation(conversation)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    if (debouncedSearch) {
      const filteredConversations = conversations.filter((conversation) => {
        return conversation.recipientName
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase())
      })
      setFilteredConversations(filteredConversations)
    } else {
      setFilteredConversations(conversations)
    }
  }, [conversations, debouncedSearch])

  useEffect(() => {
    if (user && token) {
      const sock = new SockJS(`https://timepiece.onrender.com/ws`)
      const client = Stomp.over(sock)

      client.connect(
        {
          Authorization: `Bearer ${token}` // Pass the token in the headers
        },
        (frame) => {
          console.log('Connected: ' + frame)
          if (selectedConversation) {
            client.subscribe(
              `/topic/conversation/${selectedConversation.conversationId}`,
              (message) => {
                const data = JSON.parse(message.body)
                console.log(data)
              }
            )
          }
        },
        (error) => {
          console.error('WebSocket connection error:', error)
        }
      )

      return () => {
        if (client.connected) {
          client.disconnect(() => {
            console.log('Disconnected from WebSocket')
          })
        }
      }
    }
  }, [selectedConversation, user, token])

  return (
    <Container
      disableGutters
      component={'div'}
      sx={{
        marginTop: 12,
        marginBottom: 4,
        minHeight: 'calc(100vh - 340px)',
        display: 'flex',
        direction: 'row',
        justifyContent: 'center'
      }}
    >
      <ChattingSideBar
        item={filteredConversations}
        handleSearch={handleSearch}
        search={search}
        loading={isLoading}
        active={selectedConversation?.conversationId}
        onClick={handleSelectConversation}
      />
      <ChatContent
        conversation={selectedConversation}
        loading={isLoading}
        userId={user.id}
      />
    </Container>
  )
}

export default ChattingPage
