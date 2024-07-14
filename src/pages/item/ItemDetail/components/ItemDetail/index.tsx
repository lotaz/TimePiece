import React from 'react'
import {
  Container,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Skeleton
} from '@mui/material'
import ItemImageList from '../ItemImageList'

interface IWatch {
  accessories?: string
  address?: string
  brandName?: string
  createDate?: string
  description?: string
  id?: number
  material?: string
  model?: string
  name?: string
  placeOfProduction?: string
  price?: number
  referenceCode?: string
  size?: string
  status?: string
  updateDate?: string
  userId?: number
  watchStatus?: string
  watchStrap?: string
  watchTypeName?: string
  yearProduced?: number
}

interface ItemDetailProps {
  watch: IWatch
  images: []
  isLoading?: boolean
}

const ItemDetail: React.FC<ItemDetailProps> = ({
  watch,
  images,
  isLoading = false
}) => {
  return (
    <Container>
      <Grid container spacing={2}>
        {isLoading ? (
          <Skeleton variant="rectangular" width={210} height={118} />
        ) : (
          <ItemImageList images={images} />
        )}
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              textAlign: 'left',
              marginLeft: '20px'
            }}
          >
            {isLoading ? (
              <Skeleton variant="text" width="60%" height={40} />
            ) : (
              <Typography variant="h5" color={'#484848'} fontWeight={'bold'}>
                {watch.name}
              </Typography>
            )}
            {isLoading ? (
              <Skeleton variant="text" width="40%" height={30} />
            ) : (
              <Typography variant="h6" color={'#CA2C2C'} fontWeight={'bold'}>
                {watch.price?.toLocaleString()}₫
              </Typography>
            )}
          </Box>
          <List>
            <ListItem>
              {isLoading ? (
                <Skeleton variant="text" width="100%" height={30} />
              ) : (
                <Typography variant="h5" mt={2} fontWeight={700}>
                  Thông tin
                </Typography>
              )}
            </ListItem>
            <ListItem>
              {isLoading ? (
                <Skeleton variant="text" width="100%" height={30} />
              ) : (
                <ListItemText
                  primary="Thương hiệu"
                  primaryTypographyProps={{ fontWeight: 600 }}
                  secondary={watch.brandName}
                />
              )}
            </ListItem>
            <Divider />
            <ListItem>
              {isLoading ? (
                <Skeleton variant="text" width="100%" height={30} />
              ) : (
                <ListItemText
                  primary="Mẫu mã"
                  primaryTypographyProps={{ fontWeight: 600 }}
                  secondary={watch.model}
                />
              )}
            </ListItem>
            <Divider />
            <ListItem>
              {isLoading ? (
                <Skeleton variant="text" width="100%" height={30} />
              ) : (
                <ListItemText
                  primary="Số tham chiếu"
                  primaryTypographyProps={{ fontWeight: 600 }}
                  secondary={watch.referenceCode}
                />
              )}
            </ListItem>
            <Divider />
            <ListItem>
              {isLoading ? (
                <Skeleton variant="text" width="100%" height={30} />
              ) : (
                <ListItemText
                  primary="Chất liệu vỏ"
                  primaryTypographyProps={{ fontWeight: 600 }}
                  secondary={watch.material}
                />
              )}
            </ListItem>
            <Divider />
            <ListItem>
              {isLoading ? (
                <Skeleton variant="text" width="100%" height={30} />
              ) : (
                <ListItemText
                  primary="Chất liệu dây đeo"
                  primaryTypographyProps={{ fontWeight: 600 }}
                  secondary={watch.watchStrap}
                />
              )}
            </ListItem>
            <Divider />
            <ListItem>
              {isLoading ? (
                <Skeleton variant="text" width="100%" height={30} />
              ) : (
                <ListItemText
                  primary="Năm sản xuất"
                  primaryTypographyProps={{ fontWeight: 600 }}
                  secondary={watch.yearProduced}
                />
              )}
            </ListItem>
            <Divider />
            <ListItem>
              {isLoading ? (
                <Skeleton variant="text" width="100%" height={30} />
              ) : (
                <ListItemText
                  primary="Trạng thái"
                  primaryTypographyProps={{ fontWeight: 600 }}
                  secondary={watch.watchStatus}
                />
              )}
            </ListItem>
            <Divider />
            <ListItem>
              {isLoading ? (
                <Skeleton variant="text" width="100%" height={30} />
              ) : (
                <ListItemText
                  primary="Tình trạng"
                  primaryTypographyProps={{ fontWeight: 600 }}
                  secondary={watch.accessories}
                />
              )}
            </ListItem>
            <Divider />
            <ListItem>
              {isLoading ? (
                <Skeleton variant="text" width="100%" height={30} />
              ) : (
                <ListItemText
                  primary="Giới tính"
                  primaryTypographyProps={{ fontWeight: 600 }}
                  secondary={watch.watchTypeName}
                />
              )}
            </ListItem>
            <Divider />
            <ListItem>
              {isLoading ? (
                <Skeleton variant="text" width="100%" height={30} />
              ) : (
                <ListItemText
                  primary="Nơi sản xuất"
                  primaryTypographyProps={{ fontWeight: 600 }}
                  secondary={watch.placeOfProduction}
                />
              )}
            </ListItem>
            <Divider />
            <ListItem>
              {isLoading ? (
                <Skeleton variant="text" width="100%" height={30} />
              ) : (
                <ListItemText
                  primary="Kích thước"
                  primaryTypographyProps={{ fontWeight: 600 }}
                  secondary={watch.size}
                />
              )}
            </ListItem>
            <Divider />
          </List>
          <Box
            sx={{
              textAlign: 'left'
            }}
          >
            {isLoading ? (
              <>
                <Skeleton variant="text" width="60%" height={30} />
                <Skeleton variant="text" width="100%" height={60} />
                <Skeleton variant="text" width="100%" height={60} />
                <Skeleton variant="text" width="100%" height={60} />
              </>
            ) : (
              <>
                <Typography variant="h5" fontWeight={700} mt={2}>
                  Mô tả
                </Typography>
                <Typography variant="body1">{watch.description}</Typography>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ItemDetail
