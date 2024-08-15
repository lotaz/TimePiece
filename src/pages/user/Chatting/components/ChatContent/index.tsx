import { Box } from '@mui/material'
import ChatHeader from '../ChatHeader'
import ChatMessages from '../ChatMessages'
import ChatInput from '../ChatInput'
import { ConversationType } from '../../type'

interface ChatContentProps {
  conversation: ConversationType | null
  loading: boolean
  userId: number
}

const ChatContent = (props: ChatContentProps) => {
  return (
    <Box
      sx={{
        minWidth: 'calc(100% - 40vw)'
      }}
    >
      <ChatHeader coversation={props.conversation} loading={props.loading} />
      <ChatMessages
        conversationId={props.conversation?.conversationId}
        currentUserId={props.userId}
      />
      <ChatInput />
    </Box>
  )
}

export default ChatContent
