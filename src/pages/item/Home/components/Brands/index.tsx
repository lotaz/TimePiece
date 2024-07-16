import React from 'react'
import { Grid, Button, Typography, Container, Skeleton } from '@mui/material'
import useSWR from 'swr'
import { AppPath } from '@/services/utils'

const Brands = () => {
  const { data, isLoading } = useSWR(AppPath.GET_BRANDS)

  return (
    <Container component={'div'} style={{ padding: '20px' }}>
      <Typography
        variant="h6"
        gutterBottom
        textAlign={'left'}
        sx={{
          fontWeight: 'bold',
          marginBottom: '20px',
          fontSize: '24px'
        }}
      >
        Thương hiệu
      </Typography>
      <Grid container spacing={2}>
        {isLoading
          ? Array.from(new Array(8)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Skeleton variant="rectangular" height={50} />
              </Grid>
            ))
          : data?.map((brand) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={brand.id}>
                <Button
                  variant="contained"
                  fullWidth
                  style={{
                    backgroundColor: '#f5f5f5',
                    color: '#000',
                    textTransform: 'none',
                    height: '50px',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  {brand.brandName}
                </Button>
              </Grid>
            ))}
      </Grid>
    </Container>
  )
}

export default Brands
