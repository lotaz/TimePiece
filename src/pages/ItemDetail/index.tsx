import Layout from '@/components/Layout'
import { Container, Grid } from '@mui/material'
import ItemDetail from './components/ItemDetail'
import ItemDetailUser from './components/ItemDetailUser'

interface ItemDetailPageProps {
  id?: string
}

const ItemDetailPage: React.FC<ItemDetailPageProps> = ({
  id
}: ItemDetailPageProps) => {
  console.log('id', id)

  return (
    <Layout>
      <Container
        component={'div'}
        sx={{
          backgroundColor: '#fff',
          padding: '40px',
          marginTop: '60px'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <ItemDetail />
          </Grid>
          <Grid item xs={12} md={4}>
            <ItemDetailUser />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default ItemDetailPage
