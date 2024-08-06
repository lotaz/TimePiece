import { useEffect, useState } from 'react'
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Breadcrumbs,
  Link,
  styled,
  Skeleton
} from '@mui/material'
import OrderItem from '../OrderItem'
import useSWR from 'swr'
import { AppPath } from '@/services/utils'
import { Order } from '@/pages/item/ManageBuyOrder/type'

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

  const { data: sellerOrders, isLoading: isLoadingSeller } = useSWR(
    user ? AppPath.GET_SELLER_ORDERS(user.id) : null
  )

  useEffect(() => {
    if (sellerOrders) {
      setOrders(sellerOrders)
    }
  }, [sellerOrders])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const isLoading = isLoadingSeller

  return (
    <div
      style={{
        padding: '20px',
        borderRadius: '8px',
        minHeight: 'calc(100vh - 310px)',
        minWidth: 'calc(100vw - 500px)'
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
          <Typography color="textPrimary">Đơn bán</Typography>
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
            <StyledTab
              label={`Tất cả (${isLoadingSeller ? '' : orders.length})`}
              {...a11yProps(0)}
            />
            <StyledTab
              label={`Đợi duyệt (${isLoadingSeller ? '' : orders.filter((order) => order.status === 'wait').length})`}
              {...a11yProps(1)}
            />
            <StyledTab
              label={`Đã duyệt (${isLoadingSeller ? '' : orders.filter((order) => order.status === 'Approved').length})`}
              {...a11yProps(2)}
            />
            <StyledTab
              label={`Giao dịch trực tiếp (${isLoadingSeller ? '' : orders.filter((order) => order.status === 'Direct payment').length})`}
              {...a11yProps(3)}
            />
            <StyledTab
              label={`Đã cọc (${isLoadingSeller ? '' : orders.filter((order) => order.status === 'Payment success').length})`}
              {...a11yProps(4)}
            />
            <StyledTab
              label={`Hoàn tất giao dịch (${isLoadingSeller ? '' : orders.filter((order) => order.status === 'complete').length})`}
              {...a11yProps(5)}
            />
          </Tabs>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: '20px',
          backgroundColor: '#fff'
        }}
      >
        {isLoading ? (
          <Box p={3}>
            <Skeleton variant="rectangular" width="100%" height={300} />
          </Box>
        ) : (
          <>
            <TabPanel value={value} index={0}>
              <OrderItem data={orders} isLoading={isLoading} useId={user.id} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <OrderItem
                data={orders.filter((order) => order.status === 'wait')}
                isLoading={isLoading}
                useId={user.id}
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <OrderItem
                data={orders.filter((order) => order.status === 'Approved')}
                isLoading={isLoading}
                useId={user.id}
              />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <OrderItem
                data={orders.filter(
                  (order) => order.status === 'Direct payment'
                )}
                isLoading={isLoading}
                useId={user.id}
              />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <OrderItem
                data={orders.filter(
                  (order) => order.status === 'Payment success'
                )}
                isLoading={isLoading}
                useId={user.id}
              />
            </TabPanel>
            <TabPanel value={value} index={5}>
              <OrderItem
                data={orders.filter((order) => order.status === 'complete')}
                isLoading={isLoading}
                useId={user.id}
              />
            </TabPanel>
          </>
        )}
      </Box>
    </div>
  )
}

export default ManageOrderTab
