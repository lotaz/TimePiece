import React from 'react'
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Breadcrumbs,
  Link,
  styled
} from '@mui/material'
import OrderItem from '../OrderItem'

const mockItem = {
  image: 'https://example.com/image.jpg', // Replace with actual image URL
  title: 'Rolex Day Date 36 128235 Ombre Chocolate',
  price: '1,080,869₫',
  address: 'Phường Long Thạnh Mỹ (Quận 9 cũ), Thành phố Thủ Đức, Tp Hồ Chí Minh'
}

const StyledTab = styled(Tab)(({ theme }) => ({
  fontWeight: 'bold',
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0
  }
}))

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const ManageOrderTab = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div
      style={{
        padding: '20px',
        borderRadius: '8px',
        minHeight: '64vh'
      }}
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          paddingX: '30px',
          paddingTop: '30px'
        }}
      >
        <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '20px' }}>
          <Link underline="hover" color="inherit" href="/">
            Trang chủ
          </Link>
          <Typography color="textPrimary">Đơn bán (Đơn mua)</Typography>
        </Breadcrumbs>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider'
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <StyledTab label="Tất cả (1)" {...a11yProps(0)} />
            <StyledTab label="Đợi duyệt (1)" {...a11yProps(1)} />
            <StyledTab label="Đã duyệt (0)" {...a11yProps(2)} />
            <StyledTab label="Giao dịch trực tiếp (0)" {...a11yProps(3)} />
            <StyledTab label="Đã cọc (0)" {...a11yProps(4)} />
            <StyledTab label="Hoàn tất giao dịch (0)" {...a11yProps(5)} />
          </Tabs>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: '20px',
          backgroundColor: '#fff'
        }}
      >
        <TabPanel value={value} index={0}>
          <OrderItem item={mockItem} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Đơn hàng đợi duyệt
        </TabPanel>
        <TabPanel value={value} index={2}>
          Đơn hàng đã duyệt
        </TabPanel>
        <TabPanel value={value} index={3}>
          Giao dịch trực tiếp
        </TabPanel>
        <TabPanel value={value} index={4}>
          Đơn hàng đã cọc
        </TabPanel>
        <TabPanel value={value} index={5}>
          Hoàn tất giao dịch
        </TabPanel>
      </Box>
    </div>
  )
}

export default ManageOrderTab
