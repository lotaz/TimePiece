import React from 'react'
import { Grid, Button, Typography, Container } from '@mui/material'

const brands = [
  { name: 'Rolex', link: '#' },
  { name: 'Patek Philippe', link: '#' },
  { name: 'Breitling', link: '#' },
  { name: 'Cartier', link: '#' },
  { name: 'IWC', link: '#' },
  { name: 'Omega', link: '#' },
  { name: 'Audemars Piguet', link: '#' },
  { name: 'Tudor', link: '#' },
  { name: 'Panerai', link: '#' },
  { name: 'Seiko', link: '#' }
]

const Brands = () => {
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
        {brands.map((brand, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
              {brand.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Brands
