import AppraiserLayout from '@/components/Layout/AppraiserLayout'
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Typography,
  Skeleton
} from '@mui/material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import CustomerInfo from './components/CustomerInfo'
import WatchInfo from './components/WatchInfo'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import ConfirmDialog from '@/components/ConfirmDiaglog'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import { AppPath } from '@/services/utils'
import { convertBooleanToYesNo } from '@/common/utils'
import WatchImages from './components/WatchImages'

const ViewAppraisalFormPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, error, isLoading } = useSWR(
    `${AppPath.GET_APPRAISAL_REQUESTS_BY_ID}/${id}`
  )

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [buttonText, setButtonText] = useState('Tạo kết quả')
  const [openDialog, setOpenDialog] = useState(false)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedFile(file)
      setButtonText('Xác nhận hoàn thành')
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setButtonText('Tạo kết quả')
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  return (
    <AppraiserLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '1200px'
        }}
        marginTop={20}
        marginX={'auto'}
        marginBottom={10}
      >
        <Box
          bgcolor={'#fff'}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 4,
            borderRadius: 1
          }}
        >
          <Box
            component="div"
            sx={{ display: 'flex', alignItems: 'center', textAlign: 'left' }}
          >
            <Avatar
              src="path_to_avatar_image.jpg"
              alt="Thắng Nguyễn"
              sx={{ width: 56, height: 56, marginRight: 2 }}
            />
            <Box>
              <Typography variant="body1" fontWeight="bold">
                Thắng Nguyễn
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Thẩm định viên
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ChatBubbleOutlineIcon sx={{ marginRight: 1 }} />
            <Typography variant="body2" color="textSecondary">
              Chat với khách
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end'
            }}
          >
            <input
              accept="application/pdf"
              id="upload-pdf"
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <label htmlFor={selectedFile ? '' : 'upload-pdf'}>
              <Button
                variant="contained"
                color="success"
                component="span"
                onClick={() => {
                  if (selectedFile) {
                    handleOpenDialog()
                  }
                }}
              >
                {buttonText}
              </Button>
            </label>
            {selectedFile && (
              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                <Typography variant="body2">{selectedFile.name}</Typography>
                <IconButton size="small" onClick={handleRemoveFile}>
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>
        <ConfirmDialog
          open={openDialog}
          onClose={handleCloseDialog}
          onConfirm={() => {
            toast.success('Yêu cầu thẩm định đã hoàn thành', {})
            setOpenDialog(false)
            navigate('/appraiser/dashboard')
          }}
          title={'Xác nhận hoàn tất yêu cầu'}
          description={'Bạn có chắc chắn muốn hoàn yêu cầu thẩm định này ?'}
        />
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
                  referenceNumber={data?.referenceCode}
                  brand={data?.brand}
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
                <WatchImages images={data?.imageUrls} />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </AppraiserLayout>
  )
}

export default ViewAppraisalFormPage
