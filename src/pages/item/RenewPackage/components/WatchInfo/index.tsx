import { Box, Typography, Skeleton } from '@mui/material'

interface WatchInfoProps {
  image?: string
  name?: string
  price?: number
  address?: string
  loading: boolean
}

const WatchInfo = ({
  image,
  name,
  price,
  address,
  loading
}: WatchInfoProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        padding: '20px 0',
        borderBottom: '1px solid #e0e0e0'
      }}
    >
      <Box>
        {loading ? (
          <Skeleton variant="rectangular" width={80} height={80} />
        ) : (
          <img src={image} alt={name} width={80} height={80} />
        )}
      </Box>
      <Box
        sx={{
          textAlign: 'left'
        }}
      >
        {loading ? (
          <Skeleton variant="text" width={120} height={20} />
        ) : (
          <Typography sx={{ fontWeight: 600, fontSize: 18 }}>{name}</Typography>
        )}
        {loading ? (
          <Skeleton variant="text" width={80} height={20} sx={{ mt: 1 }} />
        ) : (
          <Typography sx={{ color: '#CA2C2C', fontWeight: 600 }}>
            {price?.toLocaleString('')}đ
          </Typography>
        )}
        {loading ? (
          <Skeleton variant="text" width={140} height={20} sx={{ mt: 1 }} />
        ) : (
          <Typography sx={{ color: 'gray', marginTop: 2 }}>
            {address}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default WatchInfo
