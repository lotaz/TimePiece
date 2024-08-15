import { Box, IconButton, InputBase, styled } from '@mui/material'
import PhotoIcon from '@mui/icons-material/Photo'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import SendIcon from '@mui/icons-material/Send'

interface ChatInputProps {}

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
      />
      <IconButton>
        <SendIcon />
      </IconButton>
    </Box>
  )
}

export default ChatInput
