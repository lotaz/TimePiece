import { useState } from 'react'
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
import useSWR from 'swr'
import { AppPath } from '@/services/utils'

export interface Order {
  id: number
  note?: string | null
  orderDate?: string
  status?: string
  totalPrice?: number
  watchImages?: string[]
  watchName?: string
  role?: 'seller' | 'buyer'
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
  const [value, setValue] = useState(0)
  const [orders, setOrders] = useState<Order[]>([])

  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null

  const { data: buyerOrder, isLoading: isLoadingBuyer } = useSWR(
    AppPath.GET_BUYER_ORDERS(user?.id)
  )

  const { data: sellerOrder, isLoading: isLoadingSeller } = useSWR(
    AppPath.GET_SELLER_ORDERS(user?.id)
  )

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
            <StyledTab label={`Tất cả (${orders.length})`} {...a11yProps(0)} />
            <StyledTab
              label={`Đợi duyệt (${orders.filter((order) => order.status === 'wait').length})`}
              {...a11yProps(1)}
            />
            <StyledTab
              label={`Đã duyệt (${orders.filter((order) => order.status === 'approved').length})`}
              {...a11yProps(2)}
            />
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
          <OrderItem
            data={orders}
            isLoading={isLoadingBuyer || isLoadingSeller}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <OrderItem
            data={orders.filter((order) => order.status === 'wait')}
            isLoading={isLoadingBuyer || isLoadingSeller}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <OrderItem
            data={orders.filter((order) => order.status === 'approved')}
            isLoading={isLoadingBuyer || isLoadingSeller}
          />
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
