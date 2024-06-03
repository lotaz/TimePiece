import {
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box
} from '@mui/material'

const ItemDetail = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Paper
            elevation={4}
            sx={{
              width: 'fit-content',
              margin: 'auto'
            }}
          >
            <img
              src="https://via.placeholder.com/300" // Replace with actual image URL
              alt="Main"
              style={{ width: '500px' }}
            />
          </Paper>
          <Grid container spacing={1} mt={1}>
            <Grid item xs={4}>
              <Paper elevation={3}>
                <img
                  src="https://via.placeholder.com/100" // Replace with actual image URL
                  alt="Thumbnail 1"
                  style={{ width: '100%' }}
                />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper elevation={3}>
                <img
                  src="https://via.placeholder.com/100" // Replace with actual image URL
                  alt="Thumbnail 2"
                  style={{ width: '100%' }}
                />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper elevation={3}>
                <img
                  src="https://via.placeholder.com/100" // Replace with actual image URL
                  alt="Thumbnail 3"
                  style={{ width: '100%' }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              textAlign: 'left',
              marginLeft: '20px'
            }}
          >
            <Typography variant="h5" color={'#484848'} fontWeight={'bold'}>
              Rolex Day Date 36 128235 Ombre Chocolate
            </Typography>
            <Typography variant="h6" color={'#CA2C2C'} fontWeight={'bold'}>
              1,080,869₫
            </Typography>
          </Box>
          <List>
            <ListItem>
              <Typography variant="h5" mt={2} fontWeight={700}>
                Thông tin
              </Typography>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Thương hiệu"
                primaryTypographyProps={{ fontWeight: 600 }}
                secondary="Rolex"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Mẫu mã"
                primaryTypographyProps={{ fontWeight: 600 }}
                secondary="Date 36"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Số tham chiếu"
                primaryTypographyProps={{ fontWeight: 600 }}
                secondary="128238"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Dung lượng pin"
                primaryTypographyProps={{ fontWeight: 600 }}
                secondary="70 tiếng"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Chất liệu vỏ"
                primaryTypographyProps={{ fontWeight: 600 }}
                secondary="Vàng"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Chất liệu dây đeo"
                primaryTypographyProps={{ fontWeight: 600 }}
                secondary="Vàng"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Năm sản xuất"
                primaryTypographyProps={{ fontWeight: 600 }}
                secondary="2023"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Trạng thái"
                primaryTypographyProps={{ fontWeight: 600 }}
                secondary="Mới"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Tình trạng"
                primaryTypographyProps={{ fontWeight: 600 }}
                secondary="Hộp, giấy tờ gốc"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Giới tính"
                primaryTypographyProps={{ fontWeight: 600 }}
                secondary="Đồng hồ nam"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Nơi sản xuất"
                primaryTypographyProps={{ fontWeight: 600 }}
                secondary="Nước Anh"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Kích thước"
                primaryTypographyProps={{ fontWeight: 600 }}
                secondary="41x40 mm"
              />
            </ListItem>
            <Divider />
          </List>
          <Box
            sx={{
              textAlign: 'left'
            }}
          >
            <Typography variant="h5" fontWeight={700} mt={2}>
              Mô tả
            </Typography>
            <Typography variant="body1">
              Rolex daydate 36 - Vàng Vàng
            </Typography>
            <Typography variant="body2">2023 Mới tinh chưa đeo</Typography>
            <Typography variant="body2" mt={2}>
              Chiếc đồng hồ trong hình là chiếc đồng hồ thực tế được rao bán.
              Đồng hồ này còn hàng và sẵn sàng để vận chuyển vào cùng ngày/ngày
              hôm sau.
            </Typography>
            <Typography variant="body2" mt={2}>
              Chúng tôi khuyến khích tất cả các khách hàng có quan điểm xem lại
              hình ảnh một cách chính xác và tận dụng sự bảo vệ của người mua
              Chrono24. Để thực hiện điều này, vui lòng nhấn nút mua và chúng
              tôi sẽ sắp xếp lập tức sắp xếp giao hàng hoặc nhận hàng vào ngày
              hôm sau tại các phòng trưng bày ở Glasgow, London hoặc Liverpool
              của chúng tôi.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ItemDetail
