import AppraiserLayout from '@/components/Layout/AppraiserLayout'
import { Box, Button, Typography, Skeleton } from '@mui/material'
import CustomerInfo from '../ViewAppraisalForm/components/CustomerInfo'
import WatchInfo from '../ViewAppraisalForm/components/WatchInfo'
import { useNavigate, useParams } from 'react-router-dom'
import { AppPath } from '@/services/utils'
import useSWR from 'swr'
import { convertBooleanToYesNo } from '@/common/utils'
import WatchImages from '../ViewAppraisalForm/components/WatchImages'
import { useEffect, useState } from 'react'
import ConfirmDialog from '@/components/ConfirmDiaglog'
import moment from 'moment'

export interface Appraisal {
  address?: string
  age?: number
  areThereAnyStickers?: boolean
  brand?: string
  description?: string
  desiredPrice?: number
  email?: string
  hasOriginalBox?: boolean
  hasPapersOrWarranty?: boolean
  hasPurchaseReceipt?: boolean
  imageUrls?: string[]
  name?: string
  phoneNumber?: string
  referenceCode?: string
  appointmentDate?: string
  appraisalLocation?: string
}

const AppraisalFormDetailPage = () => {
  const [show, setShow] = useState(false)
  const [appraisal, setAppraisal] = useState<Appraisal>()
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, isLoading } = useSWR(
    `${AppPath.GET_APPRAISAL_REQUESTS_BY_ID}/${id}`
  )

  useEffect(() => {
    if (data) {
      setAppraisal(data)
    }
  }, [data])

  return (
    <AppraiserLayout>
      <Box
        component={'div'}
        marginTop={16}
        bgcolor={'#fff'}
        marginBottom={10}
        paddingY={4}
        marginX={'auto'}
        maxWidth={1000}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: '600'
          }}
        >
          Yêu cầu thẩm định
        </Typography>
        <Box marginTop={2} bgcolor={'#fff'} padding={4}>
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
                    padding: '10px',
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
                <Box marginLeft={'20px'}>
                  <CustomerInfo
                    name={appraisal?.name}
                    email={appraisal?.email}
                    address={appraisal?.address}
                    phone={appraisal?.phoneNumber}
                  />
                </Box>
              </Box>
              <Box>
                <Typography
                  component={'div'}
                  sx={{
                    padding: '10px',
                    width: '300px',
                    backgroundColor: '#434343',
                    textAlign: 'left',
                    marginTop: '20px',
                    marginLeft: '40px',
                    color: '#fff',
                    fontWeight: '600'
                  }}
                >
                  Thời gian và địa điểm
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '20px'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row'
                    }}
                  >
                    <Box
                      sx={{
                        marginLeft: '40px',
                        marginTop: '20px',
                        fontWeight: '600'
                      }}
                    >
                      Thời gian hẹn:
                    </Box>
                    <Box
                      sx={{
                        marginLeft: '6px',
                        marginTop: '20px',
                        fontWeight: '400'
                      }}
                    >
                      {moment(appraisal?.appointmentDate).format(
                        'DD/MM/YYYY HH:mm'
                      )}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row'
                    }}
                  >
                    <Box
                      sx={{
                        marginLeft: '40px',
                        marginTop: '20px',
                        fontWeight: '600'
                      }}
                    >
                      Địa điểm:
                    </Box>
                    <Box
                      sx={{
                        marginLeft: '6px',
                        marginTop: '20px',
                        fontWeight: '400'
                      }}
                    >
                      {appraisal?.appraisalLocation}
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography
                  component={'div'}
                  sx={{
                    padding: '10px',
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
                    padding: '10px',
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
