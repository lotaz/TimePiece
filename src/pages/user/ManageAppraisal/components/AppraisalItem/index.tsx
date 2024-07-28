import { Box, Typography, Skeleton } from '@mui/material'
import { Appraisal } from '../ManageAppraisalContent'
import moment from 'moment'

interface AppraisalItemProps {
  appraisal: Appraisal
  isLoading?: boolean
}

const AppraisalItem = ({ appraisal, isLoading }: AppraisalItemProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #a8a1a1',
        borderRadius: 2,
        paddingX: 6,
        '&:hover': {
          borderColor: '#1976d2',
          cursor: 'pointer',
          transition: 'all 0.3s'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingY: 2,
          borderBottom: '1px solid #e0e0e0'
        }}
      >
        <Typography
          component={'div'}
          sx={{
            fontWeight: 'bold',
            fontSize: 18
          }}
        >
          {isLoading ? (
            <Skeleton width={200} />
          ) : (
            `Yêu cầu thẩm định đồng hồ ngày ${moment(appraisal.createDate).format('DD-MM-YYYY')}`
          )}
        </Typography>
        <Typography
          component={'div'}
          sx={{
            fontWeight: 'bold',
            fontSize: 18
          }}
        >
          {isLoading ? (
            <Skeleton width={100} />
          ) : appraisal.status === 'wait' ? (
            'Đợt duyệt'
          ) : appraisal.status === 'complete' ? (
            'Đã thẩm định'
          ) : (
            'Đang thẩm định'
          )}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: 2
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 2,
            gap: 2
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              borderRight: '1px solid #a8a1a1',
              paddingRight: 2
            }}
          >
            <Typography>Mã yêu cầu:</Typography>
            <Typography
              sx={{
                fontWeight: 'bold'
              }}
            >
              {isLoading ? <Skeleton width={40} /> : appraisal.id}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1
            }}
          >
            <Typography>Thương hiệu đồng hồ:</Typography>
            <Typography
              sx={{
                fontWeight: 'bold'
              }}
            >
              {isLoading ? <Skeleton width={100} /> : appraisal.brand}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: 2
          }}
        >
          {isLoading ? (
            <Skeleton width={80} />
          ) : (
            moment(appraisal.updateDate).format('DD-MM-YYYY')
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default AppraisalItem
