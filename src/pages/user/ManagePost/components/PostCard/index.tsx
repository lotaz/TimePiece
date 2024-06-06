import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp'
import Watch from '@/assets/watch.png'
import { Typography, Box, Button } from '@mui/material'
import { AlertPostMessage } from '../../type'
import ReplaySharpIcon from '@mui/icons-material/ReplaySharp'
import ArrowCircleUpSharpIcon from '@mui/icons-material/ArrowCircleUpSharp'
import MoreHorizSharpIcon from '@mui/icons-material/MoreHorizSharp'

interface PostCardProps {
  imageSrc: string
  title: string
  price: number
  address: string
  typePost: string
  numberDayPost: number
  timePost: string
}

const ProductCard = ({
  title,
  price,
  address,
  timePost,
  typePost,
  numberDayPost
}: PostCardProps) => {
  return (
    <Box bgcolor={'#FFFFFF'} border={'1px solid #D8D8D8'}>
      <Box
        component={'div'}
        sx={{
          display: 'flex',
          backgroundColor: `${AlertPostMessage.sucess.color}`,
          padding: '10px 20px'
        }}
      >
        <CheckCircleSharpIcon
          sx={{
            color: '#3CCC04'
          }}
        />
        <Typography
          marginLeft={2}
          sx={{
            fontSize: '14px',
            fontWeight: 600
          }}
        >
          {AlertPostMessage.sucess.message}
        </Typography>
      </Box>
      <Box
        display={'flex'}
        sx={{
          padding: '20px'
        }}
      >
        <Box>
          <img src={Watch} />
        </Box>
        <Box textAlign={'left'} paddingX={4}>
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 600
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#CA2C2C'
            }}
          >
            {price}
          </Typography>
          <Typography
            sx={{
              fontSize: '14px'
            }}
          >
            {address}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px',
          bgcolor: '#F7F7F7',
          textAlign: 'left',
          paddingX: '40px'
        }}
      >
        <Box
          sx={{
            width: '30%',
            borderRight: '1px solid #c1c1c1'
          }}
        >
          <Typography>Phương thức đăng tin</Typography>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '14px'
            }}
          >
            {typePost}
          </Typography>
        </Box>
        <Box
          sx={{
            width: '30%',
            borderRight: '1px solid #c1c1c1'
          }}
        >
          <Typography>Số ngày đăng tin</Typography>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '14px'
            }}
          >
            {numberDayPost} ngày
          </Typography>
        </Box>
        <Box
          sx={{
            width: '33%'
          }}
        >
          <Typography>Thời gian đăng tin</Typography>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '14px'
            }}
          >
            {timePost}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          padding: '20px',
          bg: '#FFFFFF',
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          sx={{
            border: '1px solid #c1c1c1',
            fontWeight: 600,
            color: '#000',
            marginRight: '10px',
            textTransform: 'none'
          }}
        >
          <ReplaySharpIcon sx={{ marginRight: '5px' }} /> Gia Hạn Tin
        </Button>
        <Button
          sx={{
            bgcolor: '#1BBE00',
            color: '#FFFFFF',
            ':hover': {
              color: '#000',
              bgcolor: '#1BBE00'
            },

            textTransform: 'none',
            marginRight: '10px'
          }}
        >
          <ArrowCircleUpSharpIcon
            sx={{
              marginRight: '5px'
            }}
          />
          Đẩy tin
        </Button>
        <Button
          sx={{
            border: '1px solid #c1c1c1'
          }}
        >
          <MoreHorizSharpIcon />
        </Button>
      </Box>
    </Box>
  )
}

export default ProductCard
