import { AppPath } from '@/services/utils'
import { Box, Avatar, Typography, Skeleton } from '@mui/material'
import useSWR from 'swr'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Message } from '../../type'

interface ChatMessagesProps {
  conversationId?: number
  currentUserId: number
}

const ChatMessages = ({ conversationId, currentUserId }: ChatMessagesProps) => {
  const [messages, setMessages] = useState<Message[]>([])

  const { data, isLoading } = useSWR(AppPath.GET_MESSAGES(conversationId), {
    onSuccess: (data) => {
      setMessages(data)
    }
  })

  useEffect(() => {
    if (data) {
      setMessages(data)
    }
  }, [data])

  return (
    <Box
      sx={{
        height: 'calc(100vh - 40vh)',
        bgcolor: '#fff',
        borderTop: '1px solid #f0f0f0',
        borderBottom: '1px solid #f0f0f0',
        overflowY: 'auto',
        padding: 2
      }}
    >
      {isLoading
        ? Array.from({ length: 5 }).map((_, index) => (
            <Box key={index} sx={{ display: 'flex', mb: 2 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Box sx={{ ml: 2, flex: 1 }}>
                <Skeleton width="60%" />
                <Skeleton width="80%" />
              </Box>
            </Box>
          ))
        : messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                display: 'flex',
                mb: 2,
                flexDirection:
                  message.senderId === currentUserId ? 'row-reverse' : 'row',
                alignItems: 'flex-start'
              }}
            >
              {message.senderAvatar ? (
                <Avatar src={message.senderAvatar} />
              ) : (
                <Avatar>{message.senderName.charAt(0)}</Avatar>
              )}
              <Box
                sx={{
                  ml: message.senderId === currentUserId ? 0 : 2,
                  mr: message.senderId === currentUserId ? 2 : 0,
                  textAlign:
                    message.senderId === currentUserId ? 'right' : 'left'
                }}
              >
                <Typography variant="body2" color="textSecondary">
                  {message.senderName} • {moment(message.sentAt).fromNow()}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    bgcolor:
                      message.senderId === currentUserId
                        ? '#1976d2'
                        : '#f0f0f0',
                    color: message.senderId === currentUserId ? '#fff' : '#000',
                    borderRadius: 2,
                    p: 1,
                    mt: 0.5,
                    display: 'inline-block',
                    maxWidth: '60%'
                  }}
                >
                  {message.messageText}
                </Typography>
              </Box>
            </Box>
          ))}
    </Box>
  )
}

export default ChatMessages
