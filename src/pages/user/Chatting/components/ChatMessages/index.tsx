import { Box, Typography, Skeleton, Avatar } from '@mui/material'
import moment from 'moment'
import { useEffect, useId, useRef } from 'react'
import { Message } from '../../type'
import { stringAvatar } from '@/common/utils'

interface ChatMessagesProps {
  currentUserId?: number
  messages: Message[]
  loading: boolean
}

export const MessageAvatar = ({
  name,
  image
}: {
  name: string
  image?: string
}) => {
  return image ? <Avatar src={image} /> : <Avatar {...stringAvatar(name)} />
}

const ChatMessages = ({
  currentUserId,
  messages,
  loading
}: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const id = useId()

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <Box
      sx={{
        height: 'inherit',
        bgcolor: '#fff',
        borderTop: '1px solid #f0f0f0',
        borderBottom: '1px solid #f0f0f0',
        overflowY: 'scroll',
        padding: 2,
        display: 'flex',
        flexDirection: 'column'
      }}
      component={'div'}
    >
      <Box sx={{ flex: 1 }} component={'div'}>
        {loading
          ? Array.from({ length: 5 }).map(() => (
              <Box key={id} sx={{ display: 'flex', mb: 2 }} component={'div'}>
                <Skeleton variant="circular" width={40} height={40} />
                <Box sx={{ ml: 2, flex: 1 }}>
                  <Skeleton width="60%" />
                  <Skeleton width="80%" />
                </Box>
              </Box>
            ))
          : messages.map((message) => (
              <Box
                component={'div'}
                key={message.id}
                sx={{
                  display: 'flex',
                  mb: 2,
                  flexDirection:
                    message.senderId === currentUserId ? 'row-reverse' : 'row',
                  alignItems: 'flex-start'
                }}
              >
                <MessageAvatar
                  name={message.senderName || 'Unknown'}
                  image={message.senderAvatar}
                />
                <Box
                  sx={{
                    ml: message.senderId === currentUserId ? 0 : 2,
                    mr: message.senderId === currentUserId ? 2 : 0,
                    textAlign:
                      message.senderId === currentUserId ? 'right' : 'left'
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    {message.senderName || 'Unknown'} •{' '}
                    {moment(message.sentAt).fromNow()}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      bgcolor:
                        message.senderId === currentUserId
                          ? '#1976d2'
                          : '#f0f0f0',
                      color:
                        message.senderId === currentUserId ? '#fff' : '#000',
                      borderRadius: 2,
                      p: 1,
                      mt: 0.5,
                      display: 'inline-block',
                      boxSizing: 'border-box'
                    }}
                  >
                    {message.messageText || 'No message content'}
                  </Typography>
                </Box>
              </Box>
            ))}
      </Box>
      <div ref={messagesEndRef} />
    </Box>
  )
}

export default ChatMessages
