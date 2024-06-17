import AppraiserLayout from '@/components/Layout/AppraiserLayout'
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material'
import { useFormik } from 'formik'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { useRef, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import jsPDF from 'jspdf'
import AppraisalFormInput from '../AppraisalFormInput'
import ConfirmDialog from '../ConfirmDialog'
import html2canvas from 'html2canvas'

interface CreateAppraisalPaperProps {
  itemName: string
  itemCode: string
}

const CreateAppraisalPaper = ({
  itemCode,
  itemName
}: CreateAppraisalPaperProps) => {
  const pageRef = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useState(false)
  const [selectedImages, setSelectedImages] = useState<string[]>([])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      )
      setSelectedImages((prevImages) => prevImages.concat(filesArray))
      Array.from(event.target.files).map((file) =>
        URL.revokeObjectURL(file.name)
      ) // Avoid memory leaks
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...selectedImages]
    newImages.splice(index, 1)
    setSelectedImages(newImages)
  }

  const renderPhotos = (source: string[]) => {
    return source.map((photo, index) => (
      <Box key={index} position="relative">
        <img
          src={photo}
          alt={`uploaded-${index}`}
          style={{
            width: '200px',
            height: '150px',
            marginBottom: '10px',
            borderRadius: '8px'
          }}
        />
        <IconButton
          onClick={() => handleRemoveImage(index)}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.8)'
          }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      </Box>
    ))
  }

  const form = useFormik({
    initialValues: {
      brand: '',
      model: '',
      serial: '',
      type: '',
      caseMaterial: '',
      strapMaterial: '',
      productYear: '',
      itemStatus: '',
      itemCondition: '',
      itemGender: '',
      madeIn: '',
      size: '',
      valueEstimate: '',
      images: [],
      signature: ''
    },
    onSubmit: (values) => {
      console.log(values)
    }
  })

  const formatVietnameseDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()

    return `Ngày ${day} tháng ${month} năm ${year}`
  }

  const currentDate = formatVietnameseDate(new Date())

  const exportToPDF = async () => {
    const input = pageRef.current
    const canvas = await html2canvas(input as HTMLElement)
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const imgProps = pdf.getImageProperties(imgData)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save('appraisal.pdf')
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = () => {
    setOpen(false)
    exportToPDF()
  }

  return (
    <AppraiserLayout>
      <Box
        component={'form'}
        ref={pageRef}
        onSubmit={form.handleSubmit}
        marginTop={20}
        bgcolor={'#fff'}
        marginX={20}
        marginBottom={10}
      >
        <Box marginTop={4} component={'div'} marginX={20}>
          <Typography
            sx={{
              fontSize: 54,
              fontWeight: 'bold'
            }}
          >
            Timepiece Appraisals
          </Typography>
          <Typography
            sx={{
              fontSize: 36,
              fontWeight: 'medium'
            }}
          >
            Giấy thẩm định đồng hồ
          </Typography>
          <Divider />
          <Typography textAlign={'right'} fontSize={'24px'}>
            Mã: 19999
          </Typography>
          <Typography
            sx={{
              fontSize: 32,
              fontWeight: 'medium'
            }}
          >
            Mặt hàng: <b>Đồng hồ Rolex</b>
          </Typography>
        </Box>
        <Grid container spacing={2} component={'div'} marginX={8} marginTop={8}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              flexDirection: 'column',
              display: 'flex'
            }}
          >
            <Typography
              sx={{
                textAlign: 'left',
                textDecoration: 'underline',
                fontWeight: 'bold',
                fontSize: 32
              }}
            >
              Mô tả
            </Typography>
            <AppraisalFormInput
              value={form.values.brand}
              label={'Thương hiệu'}
              name={'brand'}
              onChange={form.handleChange}
              error={form.errors.brand}
            />
            <AppraisalFormInput
              value={form.values.model}
              label={'Mẫu mã'}
              name={'model'}
              onChange={form.handleChange}
              error={form.errors.model}
            />
            <AppraisalFormInput
              value={form.values.serial}
              label={'Số tham chiếu'}
              name={'serial'}
              onChange={form.handleChange}
              error={form.errors.serial}
            />
            <AppraisalFormInput
              value={form.values.type}
              label={'Loại đồng hồ'}
              name={'type'}
              onChange={form.handleChange}
              error={form.errors.type}
            />
            <AppraisalFormInput
              value={form.values.caseMaterial}
              label={'Chất liệu vỏ'}
              name={'caseMaterial'}
              onChange={form.handleChange}
              error={form.errors.caseMaterial}
            />
            <AppraisalFormInput
              value={form.values.strapMaterial}
              label={'Chất liệu dây đeo'}
              name={'strapMaterial'}
              onChange={form.handleChange}
              error={form.errors.strapMaterial}
            />
            <AppraisalFormInput
              value={form.values.productYear}
              label={'Năm sản xuất'}
              name={'productYear'}
              onChange={form.handleChange}
              error={form.errors.productYear}
            />
            <AppraisalFormInput
              value={form.values.itemStatus}
              label={'Trạng thái'}
              name={'itemStatus'}
              onChange={form.handleChange}
              error={form.errors.itemStatus}
            />
            <AppraisalFormInput
              value={form.values.itemCondition}
              label={'Tình trạng'}
              name={'itemCondition'}
              onChange={form.handleChange}
              error={form.errors.itemCondition}
            />

            <AppraisalFormInput
              value={form.values.itemGender}
              label={'Giới tính'}
              name={'itemGender'}
              onChange={form.handleChange}
              error={form.errors.itemGender}
            />
            <AppraisalFormInput
              value={form.values.madeIn}
              label={'Nơi sản xuất'}
              name={'madeIn'}
              onChange={form.handleChange}
              error={form.errors.madeIn}
            />
            <AppraisalFormInput
              value={form.values.size}
              label={'Kích thước'}
              name={'size'}
              onChange={form.handleChange}
              error={form.errors.size}
            />
            <AppraisalFormInput
              value={form.values.valueEstimate}
              label={'Giá ước lượng'}
              name={'valueEstimate'}
              isEstimated
              onChange={form.handleChange}
              error={form.errors.valueEstimate}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              marginRight={12}
            >
              {renderPhotos(selectedImages)}
              {selectedImages.length < 2 && (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="1px dashed grey"
                  borderRadius={4}
                  marginTop={2}
                  padding={2}
                  position="relative"
                  style={{ cursor: 'pointer' }}
                >
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="icon-button-file"
                    type="file"
                    multiple
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="icon-button-file"
                    style={{
                      width: '150px',
                      height: '150px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <AddPhotoAlternateIcon style={{ fontSize: '48px' }} />
                      </IconButton>
                      <Typography>Đăng từ 01 đến 06 ảnh</Typography>
                    </Box>
                  </label>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'end',
            marginY: 8,
            flexDirection: 'column',
            marginX: 20
          }}
        >
          <Box
            sx={{
              flexDirection: 'column',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Typography component={'div'} fontSize={24}>
              {currentDate}
            </Typography>
            <Typography component={'div'} fontSize={24} margin={2}>
              Người thẩm định
            </Typography>

            <TextField
              size="small"
              name="signature"
              value={form.values.signature}
              onChange={form.handleChange}
              sx={{
                width: '200px',
                marginTop: 6
              }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: '#434343',
                marginTop: 6,
                width: '16vw'
              }}
              onClick={handleOpen}
            >
              Lưu
            </Button>
          </Box>
        </Box>
        <ConfirmDialog
          open={open}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      </Box>
    </AppraiserLayout>
  )
}

export default CreateAppraisalPaper
