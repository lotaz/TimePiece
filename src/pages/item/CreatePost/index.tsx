import { useEffect, useState } from 'react'
import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Skeleton
} from '@mui/material'
import useSWR from 'swr'
import SelectInput from '@/components/Controls/SelectInput'
import TextInput from '@/components/Controls/TextInput'
import { AppPath } from '@/services/utils'
import ImageSide from './components/ImageVideoSide'
import { createWatchService } from '@/services/watchService'
import { Area, ProductStatus } from '@/common/type'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { IBrand, IWatchModel, IWatchType } from './type'

const statusOptions = ['Đã sử dụng', 'Mới', 'Cũ']

const CreatePostPage = () => {
  const navigate = useNavigate()
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null

  const [submitting, setSubmitting] = useState(false)
  const [watchModel, setWatchModel] = useState<IWatchModel[] | null>(null)
  const [brands, setBrands] = useState<IBrand[]>()
  const [types, setTypes] = useState<IWatchType[]>()

  const [formValues, setFormValues] = useState({
    postName: '',
    brandId: null,
    status: '',
    typeId: null,
    modelId: null,
    modelsNumber: '',
    materialId: null,
    watchStrapId: null,
    productYear: '',
    statusProduct: '',
    sizeId: null,
    madeBy: '',
    price: '',
    description: '',
    address: '',
    area: '',
    images: [] as Blob[],
    appraisalCertificateFile: null as Blob | null
  })

  const { data: brandsData, isLoading: isLoadingBrands } = useSWR(
    AppPath.GET_BRANDS
  )
  const { data: typesData, isLoading: isLoadingTypes } = useSWR(
    AppPath.GET_TYPES
  )
  const { data: watchModelData, isLoading: isLoadingModel } = useSWR(
    AppPath.GET_WATCHES_MODEL
  )

  useEffect(() => {
    if (brandsData) setBrands(brandsData)
    if (typesData) setTypes(typesData)
    if (watchModelData) setWatchModel(watchModelData)
  }, [brandsData, typesData, watchModelData])

  const selectedWatchModel = watchModel?.find(
    (model) => model.id === formValues.modelId
  )

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = e.target as HTMLInputElement
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
      ...(name === 'brandId' && {
        modelId: null,
        materialId: null,
        watchStrapId: null,
        sizeId: null
      }),
      ...(name === 'modelId' && {
        materialId: null,
        watchStrapId: null,
        sizeId: null
      })
    }))
  }

  const handleUploadImage = (images: Blob[]) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      images: images
    }))
  }

  const handleUploadAppraisalFile = (data: Blob) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      appraisalCertificateFile: data
    }))
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const data = await createWatchService({
        userId: user?.id,
        name: formValues.postName,
        watchStatus: formValues.statusProduct,
        description: formValues.description,
        price: parseInt(formValues.price),
        brandId: formValues.brandId,
        yearProduced: parseInt(formValues.productYear),
        modelId: formValues.modelId,
        materialId: formValues.materialId,
        watchStrapId: formValues.watchStrapId,
        sizeId: formValues.sizeId,
        accessories: formValues.statusProduct,
        referenceCode: formValues.modelsNumber,
        placeOfProduction: formValues.madeBy,
        watchTypeId: formValues.typeId,
        area: formValues.area,
        imageFiles: formValues.images,
        appraisalCertificateFile: formValues.appraisalCertificateFile
      })

      if (data) {
        toast.success('Đăng bài thành công')
        setSubmitting(false)
        navigate('/post/manage-post')
      }
    } catch (error) {
      setSubmitting(false)
      toast.error('Đăng bài không thành công')
    }
  }
  return (
    <Box
      component={'div'}
      sx={{
        marginTop: '60px',
        marginBottom: '40px',
        padding: '40px',
        backgroundColor: '#fff'
      }}
    >
      <Grid container spacing={6} justifyContent={'center'}>
        <Grid item xs={12} md={5}>
          {isLoadingBrands && isLoadingTypes && isLoadingModel ? (
            <Skeleton
              variant="rectangular"
              height={200}
              width={200}
              sx={{
                mx: 'auto'
              }}
            />
          ) : (
            <ImageSide
              handleUploadFile={handleUploadImage}
              handleUploadAppraisalFile={handleUploadAppraisalFile}
            />
          )}
        </Grid>
        <Grid item xs={12} md={5}>
          <Box component={'div'}>
            <Box>
              <TextInput
                label="Tên bài đăng"
                type="text"
                placeholder="Nhập tên bài viết"
                value={formValues.postName}
                onChange={handleChange}
                isRequired={true}
                isDisabled={false}
                fullWidth={true}
                name="postName"
              />
              <SelectInput
                label="Thương hiệu"
                placeholder="Chọn thương hiệu"
                value={formValues.brandId}
                onChange={handleChange}
                isRequired={true}
                isDisabled={false}
                isLoading={isLoadingBrands}
                fullWidth={true}
                name="brandId"
                options={
                  brands?.map((brand) => ({
                    value: brand.id,
                    label: brand.brandName
                  })) || []
                }
              />
              <Typography
                textAlign={'left'}
                fontWeight={'600'}
                fontSize={'24px'}
                gutterBottom
                component={'div'}
              >
                Thông tin chi tiết
              </Typography>
              <Typography
                textAlign={'left'}
                component={'div'}
                fontWeight={'600'}
                fontSize={'18px'}
                gutterBottom
              >
                Trạng thái *
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginY: '10px'
                }}
              >
                {statusOptions.map((status, index) => (
                  <Box
                    key={index}
                    sx={{
                      padding: '10px',

                      marginRight: '10px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      backgroundColor:
                        formValues.status === status ? '#484848' : '#F2F2F2',
                      color: formValues.status === status ? '#fff' : '',
                      minWidth: '100px'
                    }}
                    onClick={() =>
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        status
                      }))
                    }
                  >
                    {status}
                  </Box>
                ))}
              </Box>
              <SelectInput
                label="Loại sản phẩm"
                placeholder="Nhập loại sản phẩm"
                value={formValues.typeId}
                onChange={handleChange}
                isRequired={true}
                isDisabled={false}
                fullWidth={true}
                isLoading={isLoadingTypes}
                name="typeId"
                options={
                  types?.map((type) => ({
                    value: type.id,
                    label: type.typeName
                  })) || []
                }
              />
              <SelectInput
                label="Mẫu mã"
                placeholder="Nhập mẫu mã"
                value={formValues.modelId}
                onChange={handleChange}
                isRequired={true}
                isDisabled={false}
                fullWidth={true}
                name="modelId"
                options={
                  watchModel
                    ?.filter((model) => model.brandId === formValues.brandId)
                    .map((model) => ({
                      value: model.id,
                      label: model.name
                    })) || []
                }
              />
              <TextInput
                label="Số tham chiếu"
                type="text"
                placeholder="Nhập số tham chiếu"
                value={formValues.modelsNumber}
                onChange={handleChange}
                isRequired={true}
                isDisabled={false}
                fullWidth={true}
                name="modelsNumber"
              />
              <SelectInput
                label="Chất liệu vỏ"
                placeholder="Nhập chất liệu vỏ"
                value={formValues.materialId}
                onChange={handleChange}
                isDisabled={false}
                isRequired={true}
                fullWidth={true}
                name="materialId"
                options={
                  selectedWatchModel?.materials.map((material) => ({
                    value: material.materialId,
                    label: material.materialName
                  })) || []
                }
              />
              <SelectInput
                label="Chất liệu dây đeo"
                placeholder="Nhập chất liệu dây đeo"
                value={formValues.watchStrapId}
                onChange={handleChange}
                isDisabled={false}
                isRequired={true}
                fullWidth={true}
                name="watchStrapId"
                options={
                  selectedWatchModel?.watchStraps.map((strap) => ({
                    value: strap.watchStrapId,
                    label: strap.watchStrapName
                  })) || []
                }
              />
              <TextInput
                label="Năm sản xuất"
                type="text"
                placeholder="Nhập năm sản xuất"
                value={formValues.productYear}
                onChange={handleChange}
                isDisabled={false}
                fullWidth={true}
                name="productYear"
              />
              <SelectInput
                label="Tình trạng sản phẩm"
                placeholder="Nhập tình trạng sản phẩm"
                value={formValues.statusProduct}
                onChange={handleChange}
                isRequired
                isDisabled={false}
                fullWidth={true}
                name="statusProduct"
                options={Object.values(ProductStatus).map((status) => ({
                  value: status,
                  label: status
                }))}
              />
              <SelectInput
                label="Kích thước"
                placeholder="Chọn kích thước"
                value={formValues.sizeId}
                onChange={handleChange}
                isDisabled={false}
                isRequired={true}
                fullWidth={true}
                name="sizeId"
                options={
                  selectedWatchModel?.sizes.map((size) => ({
                    value: size.sizeId,
                    label: size.sizeName
                  })) || []
                }
              />
              <TextInput
                label="Nơi sản xuất"
                type="text"
                placeholder="Nhập xuất xứ"
                value={formValues.madeBy}
                onChange={handleChange}
                isDisabled={false}
                fullWidth={true}
                name="madeBy"
              />
              <TextInput
                label="Giá"
                type="text"
                placeholder="Nhập giá"
                value={formValues.price}
                onChange={handleChange}
                isDisabled={false}
                fullWidth={true}
                name="price"
                suffix="VND"
              />
              <TextInput
                type="textarea"
                label={
                  <Typography fontWeight={600} fontSize={'24px'}>
                    Mô tả sản phẩm
                  </Typography>
                }
                placeholder="Nhập mô tả sản phẩm"
                value={formValues.description}
                onChange={handleChange}
                isDisabled={false}
                fullWidth={true}
                name="description"
              />
              <SelectInput
                label="Khu vực"
                placeholder="Chọn khu vực"
                value={formValues.area}
                onChange={handleChange}
                isRequired
                isDisabled={false}
                fullWidth={true}
                name="area"
                options={Object.values(Area).map((area) => ({
                  value: area,
                  label: area
                }))}
              />
              <Button
                variant="contained"
                component="button"
                disabled={submitting}
                color="primary"
                onClick={handleSubmit}
                startIcon={
                  submitting && <CircularProgress size={20} color="inherit" />
                }
              >
                Đăng bài
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CreatePostPage
