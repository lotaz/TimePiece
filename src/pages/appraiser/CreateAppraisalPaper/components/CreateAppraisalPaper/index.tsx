import AppraiserLayout from '@/components/Layout/AppraiserLayout'
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
  Switch,
  FormControlLabel,
  FormHelperText
} from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import AppraisalFormInput from '../AppraisalFormInput'
import ConfirmDialog from '../ConfirmDialog'
import { useNavigate } from 'react-router-dom'
import { AppPath } from '@/services/utils'
import useSWR from 'swr'
import { AppraisalType } from '@/pages/appraiser/AppraisalFormDetail'
import { IWatchModel, IBrand, IWatchType } from '@/pages/item/CreatePost/type'
import { createAppraisal } from '@/services/appraisalRequestService'

interface CreateAppraisalPaperProps {
  id: string | undefined
}

const CreateAppraisalPaper = ({ id }: CreateAppraisalPaperProps) => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const [open, setOpen] = useState(false)
  const [selectedImages, setSelectedImages] = useState<Blob[]>([])
  const [selectedModel, setSelectedModel] = useState<IWatchModel | null>(null) // Selected model data
  const [submitting, setSubmitting] = useState(false)
  // Fetch brands, types, watch models and the appraisal data using SWR
  const { data: brandsData, isLoading: isLoadingBrand } = useSWR<IBrand[]>(
    AppPath.GET_BRANDS
  )
  const { data: typesData, isLoading: isLoadingType } = useSWR<IWatchType[]>(
    AppPath.GET_TYPES
  )
  const { data: watchModelData, isLoading: isLoadingModel } = useSWR<
    IWatchModel[]
  >(AppPath.GET_WATCHES_MODEL)
  const { data: appraisal, isLoading: isLoadingAppraisal } =
    useSWR<AppraisalType>(`${AppPath.GET_APPRAISAL_REQUESTS_BY_ID}/${id}`)

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    brandId: Yup.number().required('Vui lòng chọn thương hiệu'),
    modelId: Yup.number().required('Vui lòng chọn mẫu mã'),
    materialId: Yup.number().required('Vui lòng chọn chất liệu vỏ'),
    watchStrapId: Yup.number().required('Vui lòng chọn chất liệu dây đeo'),
    sizeId: Yup.number().required('Vui lòng chọn kích thước'),
    referenceCode: Yup.string().required('Vui lòng nhập số tham chiếu'),
    commentValue: Yup.number().required('Vui lòng nhập giá ước lượng'),
    yearProduced: Yup.number().required('Vui lòng nhập năm sản xuất'),
    watchStatus: Yup.string().required('Vui lòng nhập tình trạng đồng hồ'),
    origin: Yup.string().required('Vui lòng nhập xuất xứ'),
    accessories: Yup.string().required('Vui lòng nhập phụ kiện đi kèm'),
    imageFiles: Yup.array()
      .min(1, 'Vui lòng tải lên ít nhất 1 hình ảnh')
      .max(6, 'Chỉ được tải lên tối đa 6 hình ảnh')
  })

  // Formik form setup
  const form = useFormik({
    initialValues: {
      brandId: null,
      modelId: null,
      materialId: null,
      watchStrapId: null,
      sizeId: null,
      referenceCode: '',
      watchTypeId: null,
      yearProduced: '',
      watchStatus: '',
      accessories: '',
      origin: '',
      imageFiles: [], // Images will be handled as an array
      commentValue: '',
      isAuthentic: false // Authenticity toggle default state
    },
    validationSchema,
    onSubmit: async (values) => {
      setSubmitting(true)
      if (selectedImages.length > 0) {
        const data = await createAppraisal({
          ...values,
          userId: user.id
        })

        if (data) {
          // Redirect to appraisal preview page with pdfUrl in query params
          navigate(`/appraiser/${id}/view-appraisal-form`, {
            state: { pdfUrl: data.pdfUrl }
          })
        }
      } else {
        form.setFieldError('imageFiles', 'Vui lòng tải lên ít nhất 1 hình ảnh')
      }
      setSubmitting(false)
      setOpen(false)
    }
  })

  // Dynamically filter models based on selected brand
  const filteredModels =
    watchModelData?.filter(
      (model) => model.brandId === Number(form.values.brandId)
    ) || []

  // Update selected model details when the model is changed
  const handleModelChange = (
    event: React.ChangeEvent<
      HTMLInputElement | { name?: string; value?: string | number }
    >
  ) => {
    const modelId = Number(event.target.value)
    form.setFieldValue('modelId', modelId)
    const selectedModel = filteredModels.find((model) => model.id === modelId)
    setSelectedModel(selectedModel || null)
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles)
      setSelectedImages((prevFiles) => [...prevFiles, ...newFiles])
      form.setFieldValue('imageFiles', [...selectedImages, ...newFiles])
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...selectedImages]
    newImages.splice(index, 1)
    setSelectedImages(newImages)
    form.setFieldValue('imageFiles', newImages)
  }

  const renderPhotos = (source: Blob[]) => {
    return source.map((photo, index) => (
      <Box key={index} position="relative">
        <img
          src={URL.createObjectURL(photo)}
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

  const formatVietnameseDate = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `Ngày ${day} tháng ${month} năm ${year}`
  }

  const currentDate = formatVietnameseDate(new Date())

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <AppraiserLayout>
      <Box
        component={'form'}
        onSubmit={form.handleSubmit}
        marginTop={20}
        bgcolor={'#fff'}
        marginX={20}
        marginBottom={10}
        minHeight={'84vh'}
      >
        <Box marginTop={4} component={'div'} marginX={20}>
          <Typography sx={{ fontSize: 40, fontWeight: 'bold' }}>
            Timepiece Appraisals
          </Typography>
          <Typography
            sx={{ fontSize: 28, fontWeight: 'medium', paddingBottom: 2 }}
          >
            Giấy thẩm định đồng hồ
          </Typography>
          <Divider />
          <Typography textAlign={'right'} fontSize={'20px'} paddingTop={2}>
            Mã: {appraisal?.referenceCode}
          </Typography>
        </Box>
        <Grid container component={'div'} marginX={8}>
          <Grid item xs={12} md={8}>
            <Typography
              sx={{
                textAlign: 'left',
                textDecoration: 'underline',
                fontWeight: 'bold',
                fontSize: 20
              }}
            >
              Mô tả
            </Typography>
            <AppraisalFormInput
              value={form.values.brandId}
              label={'Thương hiệu'}
              name={'brandId'}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.brandId ? form.errors.brandId : ''}
              isSelection
              options={brandsData?.map((brand) => ({
                label: brand.brandName,
                value: brand.id
              }))}
            />
            <AppraisalFormInput
              value={form.values.watchTypeId}
              label={'Loại đồng hồ'}
              name={'watchTypeId'}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.watchTypeId ? form.errors.watchTypeId : ''}
              isSelection
              options={
                typesData?.map((type) => ({
                  label: type.typeName,
                  value: type.id
                })) || []
              }
            />
            {/* Model Select */}
            <AppraisalFormInput
              value={form.values.modelId}
              label={'Mẫu mã'}
              name={'modelId'}
              onChange={handleModelChange}
              onBlur={form.handleBlur}
              error={form.touched.modelId ? form.errors.modelId : ''}
              isSelection
              options={filteredModels.map((model) => ({
                label: model.name,
                value: model.id
              }))}
            />
            {/* Material Select */}
            <AppraisalFormInput
              value={form.values.materialId}
              label={'Chất liệu vỏ'}
              name={'materialId'}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.materialId ? form.errors.materialId : ''}
              isSelection
              options={
                selectedModel?.materials.map((material) => ({
                  label: material.materialName,
                  value: material.materialId
                })) || []
              }
            />
            <AppraisalFormInput
              value={form.values.watchStrapId}
              label={'Chất liệu dây đeo'}
              name={'watchStrapId'}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.watchStrapId ? form.errors.watchStrapId : ''}
              isSelection
              options={
                selectedModel?.watchStraps.map((strap) => ({
                  label: strap.watchStrapName,
                  value: strap.watchStrapId
                })) || []
              }
            />
            <AppraisalFormInput
              value={form.values.sizeId}
              label={'Kích thước'}
              name={'sizeId'}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.sizeId ? form.errors.sizeId : ''}
              isSelection
              options={
                selectedModel?.sizes.map((size) => ({
                  label: size.sizeName,
                  value: size.sizeId
                })) || []
              }
            />
            <AppraisalFormInput
              value={form.values.referenceCode}
              label={'Số tham chiếu'}
              name={'referenceCode'}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={
                form.touched.referenceCode ? form.errors.referenceCode : ''
              }
            />
            <AppraisalFormInput
              value={form.values.commentValue}
              label={'Giá ước lượng'}
              name={'commentValue'}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              isEstimated
              error={form.touched.commentValue ? form.errors.commentValue : ''}
            />
            <AppraisalFormInput
              value={form.values.yearProduced}
              label={'Năm sản xuất'}
              name={'yearProduced'}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.yearProduced ? form.errors.yearProduced : ''}
            />
            <AppraisalFormInput
              value={form.values.watchStatus}
              label={'Tình trạng'}
              name={'watchStatus'}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.watchStatus ? form.errors.watchStatus : ''}
            />
            <AppraisalFormInput
              value={form.values.origin}
              label={'Xuất xứ'}
              name={'origin'}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.origin ? form.errors.origin : ''}
            />
            <AppraisalFormInput
              value={form.values.accessories}
              label={'Phụ kiện'}
              name={'accessories'}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.accessories ? form.errors.accessories : ''}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              marginRight={20}
            >
              {renderPhotos(selectedImages)}
              {selectedImages.length < 6 && (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="1px dashed grey"
                  borderRadius={4}
                  marginTop={2}
                  padding={2}
                  position="relative"
                >
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="icon-button-file"
                    type="file"
                    multiple
                    onChange={handleImageChange}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton color="primary" component="span">
                      <AddPhotoAlternateIcon style={{ fontSize: '48px' }} />
                    </IconButton>
                    <Typography>Đăng từ 01 đến 06 ảnh</Typography>
                  </label>
                </Box>
              )}
              {form.errors.imageFiles && (
                <FormHelperText error>{form.errors.imageFiles}</FormHelperText>
              )}
              <FormControlLabel
                control={
                  <Switch
                    checked={form.values.isAuthentic}
                    onChange={(event) =>
                      form.setFieldValue('isAuthentic', event.target.checked)
                    }
                    name="isAuthentic"
                  />
                }
                label="Đồng hồ chính hãng"
                sx={{ marginTop: 2 }}
              />
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'end',
            marginY: 4,
            flexDirection: 'column',
            marginX: 20
          }}
        >
          <Typography component={'div'} fontSize={18}>
            {currentDate}
          </Typography>

          <Button
            variant="contained"
            sx={{ bgcolor: '#434343', marginTop: 2, width: '16vw' }}
            onClick={handleOpen}
          >
            Tạo giấy thẩm định
          </Button>
        </Box>
        <ConfirmDialog
          open={open}
          onClose={handleClose}
          onConfirm={form.handleSubmit}
          loading={submitting}
        />
      </Box>
    </AppraiserLayout>
  )
}

export default CreateAppraisalPaper
