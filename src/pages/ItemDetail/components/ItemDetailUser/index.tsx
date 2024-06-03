import { Box, Typography, Grid, Button, Avatar, Link } from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone'
import ChatIcon from '@mui/icons-material/Chat'
import { useLoaderData } from 'react-router-dom'

const ItemDetailUser = () => {
  const data = useLoaderData()
  const { id } = data as { id: string }
  return (
    <Box sx={{ padding: 2 }} component={'div'} id={`${id}`}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Avatar
            alt="Thắng Nguyễn Store"
            src="https://via.placeholder.com/100" // Replace with actual image URL
            sx={{ width: 80, height: 80 }}
          />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h6" fontWeight="bold">
            Thắng Nguyễn Store
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <Box component="span" sx={{ color: 'gold' }}>
              ★★★★☆
            </Box>
            4.7 (
            <Link href="#" underline="hover">
              10 đánh giá
            </Link>
            )
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" fullWidth startIcon={<PhoneIcon />}>
            0987654321
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" fullWidth startIcon={<ChatIcon />}>
            Chat với người bán
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            textAlign: 'left'
          }}
        >
          <Typography variant="body2" color="textSecondary">
            Được thẩm định bởi:
          </Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <Avatar
              alt="Jack"
              src="https://via.placeholder.com/50" // Replace with actual image URL
              sx={{ width: 40, height: 40 }}
            />
            <Box ml={2}>
              <Typography variant="body2" fontWeight="bold">
                Jack
              </Typography>
              <Typography variant="body2">
                <PhoneIcon
                  sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }}
                />
                0987654321
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" fullWidth startIcon={<ChatIcon />}>
            Liên hệ ngay
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ItemDetailUser
