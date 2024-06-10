import { Container, Grid } from '@mui/material'
import ItemDetail from './components/ItemDetail'
import ItemDetailUser from './components/ItemDetailUser'
import UserLayout from '@/components/Layout/UserLayout'
import { Role } from '@/common/type'

interface ItemDetailPageProps {
  id?: string
  role?: Role
}

const ItemDetailPage: React.FC<ItemDetailPageProps> = ({
  id,
  role
}: ItemDetailPageProps) => {
  return (
    <UserLayout>
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
            <ItemDetailUser role={role} />
          </Grid>
        </Grid>
      </Container>
    </UserLayout>
  )
}

export default ItemDetailPage
