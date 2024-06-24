import AppraiserLayout from '@/components/Layout/AppraiserLayout'
import { Box, Button, Typography, Skeleton } from '@mui/material'
import CustomerInfo from '../ViewAppraisalForm/components/CustomerInfo'
import WatchInfo from '../ViewAppraisalForm/components/WatchInfo'
import { useNavigate, useParams } from 'react-router-dom'
import { AppPath } from '@/services/utils'
import useSWR from 'swr'
import { convertBooleanToYesNo } from '@/common/utils'
import WatchImages from '../ViewAppraisalForm/components/WatchImages'
import { useState } from 'react'
import ConfirmDialog from '@/components/ConfirmDiaglog'

const AppraisalFormDetailPage = () => {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, error, isLoading } = useSWR(
    `${AppPath.GET_APPRAISAL_REQUESTS_BY_ID}/${id}`
  )

  return (
    <AppraiserLayout>
      <Box
        component={'div'}
        marginTop={20}
        bgcolor={'#fff'}
        marginX={20}
        marginBottom={10}
        paddingY={5}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: '600'
          }}
        >
          Yêu cầu thẩm định
        </Typography>
        <Box marginTop={2} bgcolor={'#fff'} padding={8}>
          {isLoading ? (
            <>
              <Skeleton variant="text" width={300} height={40} />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={200}
                sx={{ my: 2 }}
              />
              <Skeleton variant="text" width={300} height={40} sx={{ my: 2 }} />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={200}
                sx={{ my: 2 }}
              />
              <Skeleton variant="text" width={300} height={40} sx={{ my: 2 }} />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={200}
                sx={{ my: 2 }}
              />
            </>
          ) : (
            <>
              <Box>
                <Typography
                  component={'div'}
                  sx={{
                    padding: '16px',
                    width: '300px',
                    backgroundColor: '#434343',
                    textAlign: 'left',
                    marginLeft: '40px',
                    color: '#fff',
                    fontWeight: '600'
                  }}
                >
                  Thông tin của khách hàng
                </Typography>
                <CustomerInfo
                  name={data?.name}
                  email={data?.email}
                  address={data?.address}
                  phone={data?.phone}
                />
              </Box>
              <Box>
                <Typography
                  component={'div'}
                  sx={{
                    padding: '16px',
                    width: '300px',
                    backgroundColor: '#434343',
                    textAlign: 'left',
                    marginLeft: '40px',
                    color: '#fff',
                    fontWeight: '600',
                    marginTop: '40px'
                  }}
                >
                  Thông tin đồng hồ
                </Typography>
                <WatchInfo
                  hasBox={convertBooleanToYesNo(data?.hasBox)}
                  hasPapersOrWarranty={convertBooleanToYesNo(
                    data?.hasPapersOrWarranty
                  )}
                  hasPurchaseReceipt={convertBooleanToYesNo(
                    data?.hasPurchaseReceipt
                  )}
                  region={data?.region}
                  arethereanystickers={convertBooleanToYesNo(
                    data?.areThereAnyStickers
                  )}
                  age={data?.age}
                  description={data?.description}
                  desiredPrice={data?.desiredPrice}
                  referenceNumber={data.referenceCode}
                  brand={data.brand}
                />
              </Box>
              <Box>
                <Typography
                  component={'div'}
                  sx={{
                    padding: '16px',
                    width: '300px',
                    backgroundColor: '#434343',
                    textAlign: 'left',
                    marginLeft: '40px',
                    color: '#fff',
                    fontWeight: '600',
                    marginTop: '40px'
                  }}
                >
                  Hình ảnh đồng hồ
                </Typography>
                <WatchImages images={data.imageUrls} />
              </Box>
            </>
          )}
        </Box>
        <Button
          sx={{
            bgcolor: '#434343',
            color: '#fff',
            padding: '10px 20px',
            ':hover': {
              bgcolor: '#434343',
              opacity: 0.8,
              cursor: 'pointer'
            }
          }}
          onClick={() => setShow(true)}
        >
          NHẬN YÊU CẦU
        </Button>
        <ConfirmDialog
          open={show}
          onClose={() => setShow(false)}
          onConfirm={function (): void {
            navigate(`/appraiser/${id}/view-appraisal-form`)
          }}
          title={'Xác nhận nhận yêu cầu'}
          description={'Bạn có chắc chắn muốn nhận yêu cầu này không?'}
        />
      </Box>
    </AppraiserLayout>
  )
}

export default AppraisalFormDetailPage
