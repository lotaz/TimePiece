import { Box, IconButton, InputBase, styled } from '@mui/material'
import PhotoIcon from '@mui/icons-material/Photo'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import SendIcon from '@mui/icons-material/Send'
import { useState } from 'react'

interface ChatInputProps {
  handleSendMessage: (messageText: string) => void
}

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  borderRadius: '50px',
  backgroundColor: theme.palette.common.white,
  border: '1px solid #C1C1C1',
  marginRight: theme.spacing(1)
}))

const ChatInput = (props: ChatInputProps) => {
  const [message, setMessage] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  const handleSendClick = () => {
    console.log('Send message:', message)
    if (message.trim()) {
      props.handleSendMessage(message)
      setMessage('') // Clear the input field
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSendClick()
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        backgroundColor: 'white'
      }}
    >
      <IconButton>
        <PhotoIcon />
      </IconButton>
      <IconButton>
        <AttachFileIcon />
      </IconButton>
      <StyledInputBase
        placeholder="Type a message..."
        inputProps={{ 'aria-label': 'Type a message' }}
        value={message}
        onChange={handleChange}
        onKeyPress={handleKeyPress} // Handle Enter key press
      />
      <IconButton onClick={handleSendClick}>
        <SendIcon />
      </IconButton>
    </Box>
  )
}

export default ChatInput
