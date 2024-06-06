import { Box, Button, Container, Grid, Typography } from '@mui/material'
import CardItem from '../CardItem'

const ListCards: React.FC = () => {
  return (
    <Container component={'div'}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Tin đăng dành cho bạn
        </Typography>
        <Button
          sx={{
            textTransform: 'none'
          }}
        >
          <Typography variant="h6">Xem Tất Cả</Typography>
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1, paddingBottom: 10 }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 3, sm: 8, md: 12 }}
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <Grid item key={index} xs={2} sm={4} md={3}>
              <CardItem
                name="BULOVA MARINE STAR WATCH 44MM"
                id="123"
                image={''}
                price={0}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

export default ListCards
