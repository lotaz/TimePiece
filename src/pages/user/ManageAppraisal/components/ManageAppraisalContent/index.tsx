import { Box, Pagination, Skeleton } from '@mui/material'
import AppraisalItem from '../AppraisalItem'

export interface Appraisal {
  id: number
  createDate: string
  brand: string
  status: string
  updateDate: string
}

interface ManageAppraisalContentProps {
  appraisal: Appraisal[]
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  totalPage: number
}
const ITEM_PER_PAGE = 4

const ManageAppraisalContent = ({
  appraisal,
  isLoading,
  page,
  setPage,
  totalPage
}: ManageAppraisalContentProps) => {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
  }

  return (
    <Box
      sx={{
        minWidth: 'calc(100vw - 500px)'
      }}
    >
      <Box>
        {isLoading
          ? Array.from(new Array(ITEM_PER_PAGE)).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                height={120}
                sx={{ marginBottom: 2 }}
              />
            ))
          : appraisal?.map((item, index) => (
              <AppraisalItem
                key={index}
                appraisal={item}
                isLoading={isLoading}
              />
            ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 2
        }}
      >
        {totalPage > 1 && (
          <Pagination
            count={totalPage}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        )}
      </Box>
    </Box>
  )
}

export default ManageAppraisalContent
