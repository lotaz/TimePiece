import { Avatar, Box, Typography, Skeleton } from '@mui/material'
import { ConversationType } from '../../type'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'

interface ChatHeaderProps {
  conversation: ConversationType | null
  loading: boolean
}

const ChatHeader = ({ conversation, loading }: ChatHeaderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#ffffff'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          p: 2
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          {loading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <Avatar src={conversation?.recipientAvatar} />
          )}
          <Box
            sx={{
              ml: 2,
              textAlign: 'left'
            }}
          >
            {loading ? (
              <>
                <Skeleton width={100} height={20} />
                <Skeleton width={80} height={20} sx={{ mt: 1 }} />
              </>
            ) : (
              <>
                <Typography
                  sx={{
                    fontSize: '16px'
                  }}
                >
                  {conversation?.recipientName}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: '#969696'
                  }}
                >
                  {conversation?.roleRecipient === 'User'
                    ? 'Người dùng'
                    : 'Thẩm định viên'}
                </Typography>
              </>
            )}
          </Box>
        </Box>
        <Box>
          {loading ? (
            <Skeleton variant="rectangular" width={24} height={24} />
          ) : (
            <MoreVertOutlinedIcon />
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'left',
          ml: 4,
          borderTop: '1px solid #f0f0f0',
          pX: 2
        }}
      >
        {loading ? (
          <>
            <Skeleton variant="rectangular" width={80} height={80} />
            <Box ml={2} textAlign={'left'}>
              <Skeleton width={200} height={24} />
              <Skeleton width={100} height={20} sx={{ mt: 1 }} />
            </Box>
          </>
        ) : (
          <>
            <Box>
              <img
                src={conversation?.watchImage}
                width={'80px'}
                height={'80px'}
                alt=""
              />
            </Box>
            <Box ml={2} textAlign={'left'}>
              <Typography
                sx={{
                  color: '#484848',
                  fontSize: '18px'
                }}
              >
                {conversation?.watchName}
              </Typography>
              <Typography
                sx={{
                  color: '#CA2C2C',
                  fontSize: '16px',
                  mt: 1,
                  fontWeight: 'bold'
                }}
              >
                {conversation?.watchPrice ?? 0}đ
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}

export default ChatHeader
