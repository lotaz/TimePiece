import Layout from '@/components/Layout'
import { Box } from '@mui/material'
import FindRequestAppraiser from './components/FindRequestAppraiser'
import ListRequest from './components/ListRequest'
import { useState } from 'react'

// interface RequestAppraiserProps {}

const RequestAppraiserPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 8

  const requests = [
    {
      date: '01-09-2020',
      code: '098765432',
      brand: 'Rolex',
      status: 'Đợi duyệt'
    },
    {
      date: '01-09-2020',
      code: '098765432',
      brand: 'Rolex',
      status: 'Đợi duyệt'
    },
    {
      date: '01-09-2020',
      code: '098765432',
      brand: 'Rolex',
      status: 'Đợi duyệt'
    },
    {
      date: '01-09-2020',
      code: '098765432',
      brand: 'Rolex',
      status: 'Đợi duyệt'
    },
    {
      date: '01-09-2020',
      code: '098765432',
      brand: 'Rolex',
      status: 'Đợi duyệt'
    }
  ]

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page)
  }

  return (
    <Layout>
      <Box sx={{ marginTop: '80px', display: 'flex', flexDirection: 'column' }}>
        <FindRequestAppraiser />
        <ListRequest
          requests={requests}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Box>
    </Layout>
  )
}

export default RequestAppraiserPage
