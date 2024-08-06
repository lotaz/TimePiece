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
import useSWR from 'swr'
import { AppPath } from '@/services/utils'
import ManageAppraisalContent, { Appraisal } from '../ManageAppraisalContent'

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

const ManageAppraisalTab = () => {
  const [value, setValue] = useState(0)
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null
  const [page, setPage] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  const [appraisal, setAppraisal] = useState<Appraisal[]>()
  const [displayAppraisal, setDisplayAppraisal] = useState<Appraisal[]>([])

  const { data, isLoading } = useSWR(
    AppPath.GET_APPRAISAL_BUY_USER({
      id: user?.id,
      page,
      size: 10
    })
  )

  useEffect(() => {
    if (data) {
      setAppraisal(data?.content)
      setTotalPage(data?.totalPages)
    } else {
      setAppraisal([])
    }
  }, [data])

  useEffect(() => {
    if (appraisal) {
      if (value === 0) {
        setDisplayAppraisal(appraisal.filter((item) => item.status === 'wait'))
      } else if (value === 1) {
        setDisplayAppraisal(
          appraisal.filter((item) => item.status === 'processing')
        )
      } else if (value === 2) {
        setDisplayAppraisal(
          appraisal.filter((item) => item.status === 'complete')
        )
      }
    }
  }, [appraisal, value])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

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
          <Typography color="textPrimary">Quản lý thẩm định</Typography>
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
              label={`Đợi duyệt  (${appraisal?.filter((item) => item.status === 'wait').length})`}
              {...a11yProps(0)}
            />
            <StyledTab
              label={`Đang thẩm định (${appraisal?.filter((item) => item.status === 'processing').length})`}
              {...a11yProps(1)}
            />
            <StyledTab
              label={`Đã thẩm định  (${appraisal?.filter((item) => item.status === 'complete').length})`}
              {...a11yProps(2)}
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
              <ManageAppraisalContent
                appraisal={displayAppraisal}
                isLoading={isLoading}
                page={page}
                setPage={setPage}
                totalPage={totalPage}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ManageAppraisalContent
                appraisal={displayAppraisal}
                isLoading={isLoading}
                page={page}
                setPage={setPage}
                totalPage={totalPage}
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <ManageAppraisalContent
                appraisal={displayAppraisal}
                isLoading={isLoading}
                page={page}
                setPage={setPage}
                totalPage={totalPage}
              />
            </TabPanel>
          </>
        )}
      </Box>
    </div>
  )
}

export default ManageAppraisalTab
