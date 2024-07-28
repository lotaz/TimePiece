import { Avatar, Box, Typography, Divider, Skeleton } from '@mui/material'
import moment from 'moment'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'

interface InfoTabProps {
  sellerId?: number
  name?: string
  image?: string
  joinedAt?: string
  address?: string
  phone?: string
  rating?: number
  feedback?: number
  isLoading?: boolean
}

const InfoTab = ({
  name,
  image,
  joinedAt,
  address,
  phone,
  rating,
  feedback,
  isLoading
}: InfoTabProps) => {
  return (
    <Box
      component={'div'}
      sx={{
        width: 'fit-content',
        height: 'fit-content',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        bgcolor: 'white',
        paddingY: 3,
        paddingX: 4,
        borderRadius: 4
      }}
    >
      {isLoading ? (
        <Skeleton variant="circular" width={100} height={100} />
      ) : (
        <Avatar src={image} sx={{ width: 100, height: 100, marginBottom: 1 }} />
      )}
      {isLoading ? (
        <Skeleton variant="text" width={120} height={30} />
      ) : (
        <Typography variant={'h6'}>{name}</Typography>
      )}
      <Divider sx={{ marginY: 1 }} />
      <Box
        sx={{
          textAlign: 'left'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 1
          }}
        >
          <CalendarMonthOutlinedIcon
            sx={{
              color: '#9C9C9C'
            }}
          />
          {isLoading ? (
            <Skeleton variant="text" width={180} />
          ) : (
            <>
              <Typography
                variant={'body1'}
                color={'#9C9C9C'}
                marginRight={'4px'}
              >
                Ngày tham gia:
              </Typography>
              <Typography
                variant={'body1'}
              >{`${moment(joinedAt).format('DD/MM/YYYY')}`}</Typography>
            </>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 1
          }}
        >
          <PlaceOutlinedIcon
            sx={{
              color: '#9C9C9C'
            }}
          />
          {isLoading ? (
            <Skeleton variant="text" width={180} />
          ) : (
            <>
              <Typography
                variant={'body1'}
                color={'#9C9C9C'}
                marginRight={'4px'}
              >
                Địa chỉ:
              </Typography>
              <Typography variant={'body1'}>{address}</Typography>
            </>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 1
          }}
        >
          <LocalPhoneOutlinedIcon
            sx={{
              color: '#9C9C9C'
            }}
          />
          {isLoading ? (
            <Skeleton variant="text" width={180} />
          ) : (
            <>
              <Typography
                variant={'body1'}
                color={'#9C9C9C'}
                marginRight={'4px'}
              >
                Số điện thoại:
              </Typography>
              <Typography variant={'body1'}>{phone}</Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default InfoTab
