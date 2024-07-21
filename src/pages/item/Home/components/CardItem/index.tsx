import React from 'react'
import { Avatar, Box, Card, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import StyledImage from '@/components/StyledImage'
import moment from 'moment'
import { formatDate, stringAvatar } from '@/common/utils'

interface Watch {
  id: number
  imageUrl: string
  name: string
  price: number
  status: string
  userAvatar: string | null
  userId: number
  sellerName: string
  area: string | null
  createDate: string
}

const CardItem: React.FC<Watch> = ({
  id,
  name,
  price,
  imageUrl,
  sellerName,
  area,
  createDate
}: Watch) => {
  const navigate = useNavigate()

  return (
    <Card
      component={'div'}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '20px',
        textAlign: 'left',
        borderRadius: '10px',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        width: 'fit-content',
        height: 'fit-content',
        ':hover': {
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.3)',
          cursor: 'pointer',
          transition: 'all 0.5s',
          transform: 'scale(1.05)'
        }
      }}
      onClick={() => navigate(`/item/${id}`)}
    >
      <Box
        component={'div'}
        sx={{
          width: '200px',
          height: '200px'
        }}
      >
        <StyledImage
          src={imageUrl}
          alt="Banner"
          style={{
            borderRadius: '10px'
          }}
        />
      </Box>
      <Box component={'div'} paddingTop={2}>
        <Typography
          color={'#080808'}
          textAlign={'left'}
          fontWeight={'bold'}
          fontSize={'18px'}
          noWrap
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '200px'
          }}
        >
          {name}
        </Typography>
      </Box>
      <Box
        component={'div'}
        sx={{
          display: 'flex',
          flexDirection: 'column', // Change to column to stack price and seller name
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <Box component={'div'} marginRight={2}>
          <Typography
            color={'#CA2C2C'} // Updated color to match the image
            fontWeight={'500'}
            fontSize={'20px'} // Adjusted font size to match the image
          >
            {price.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND'
            })}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '5px'
            }}
          >
            <Typography color={'#757575'} fontSize={'16px'}>
              {sellerName ? `${sellerName}` : 'Không rõ'}
            </Typography>
          </Box>
          <Typography color={'#757575'} fontSize={'14px'}>
            {formatDate(createDate)} {area && ` - ${area}`}
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default CardItem
