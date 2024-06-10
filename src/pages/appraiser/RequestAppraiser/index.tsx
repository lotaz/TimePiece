import { Box } from '@mui/material'
import FindRequestAppraiser from './components/FindRequestAppraiser'
import ListRequest from './components/ListRequest'
import { useState } from 'react'
import AppraiserLayout from '@/components/Layout/AppraiserLayout'

// interface RequestAppraiserProps {}

const RequestAppraiserPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 8

  const requests = [
    {
      id: 1,
      date: '01-09-2020',
      code: '098765432',
      brand: 'Rolex',
      status: 'Đợi duyệt'
    },
    {
      id: 2,
      date: '01-09-2020',
      code: '098765432',
      brand: 'Rolex',
      status: 'Đợi duyệt'
    },
    {
      id: 3,
      date: '01-09-2020',
      code: '098765432',
      brand: 'Rolex',
      status: 'Đợi duyệt'
    },
    {
      id: 4,
      date: '01-09-2020',
      code: '098765432',
      brand: 'Rolex',
      status: 'Đợi duyệt'
    },
    {
      id: 5,
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
    <AppraiserLayout>
      <Box sx={{ marginTop: '80px', display: 'flex', flexDirection: 'column' }}>
        <FindRequestAppraiser />
        <ListRequest
          requests={requests}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Box>
    </AppraiserLayout>
  )
}

export default RequestAppraiserPage
