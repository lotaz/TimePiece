import { useState } from 'react'
import { Box, Grid, Typography, Button } from '@mui/material'
import useSWR from 'swr'
import SelectInput from '@/components/Controls/SelectInput'
import TextInput from '@/components/Controls/TextInput'
import { AppPath } from '@/services/utils'
import ImageSide from './components/ImageVideoSide'
import { createWatchService } from '@/services/watchService'
import { Area, ProductStatus } from '@/common/type'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const statusOptions = ['Đã sử dụng', 'Mới', 'Cũ']

const CreatePostPage = () => {
  const navigator = useNavigate()
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null

  const { data: brands, isLoading: isLoadingBrands } = useSWR(
    AppPath.GET_BRANDS
  )
  const { data: types, isLoading: isLoadingTypes } = useSWR(AppPath.GET_TYPES)

  const [formValues, setFormValues] = useState({
    postName: '',
    brand: '',
    status: '',
    type: '',
    models: '',
    modelsNumber: '',
    materialCase: '',
    materialStrap: '',
    productYear: '',
    statusProduct: '',
    size: '',
    madeBy: '',
    price: '',
    description: '',
    address: '',
    area: '',
    images: [] as string[]
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = e.target as HTMLInputElement
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }))
  }

  const handleUploadImage = (images: Blob[]) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      images: images as unknown
    }))
  }

  const handleSubmit = async () => {
    const data = await createWatchService({
      userId: user?.id,
      name: formValues.postName,
      watchStatus: formValues.statusProduct,
      description: formValues.description,
      price: parseInt(formValues.price),
      brandId: brands?.find((brand) => brand.brandName === formValues.brand)
        ?.id as number,
      yearProduced: parseInt(formValues.productYear),
      model: formValues.models,
      material: formValues.materialCase,
      watchStrap: formValues.materialStrap,
      size: formValues.size,
      accessories: formValues.statusProduct,
      referenceCode: formValues.modelsNumber,
      placeOfProduction: formValues.madeBy,
      watchTypeId: types?.find((type) => type.typeName === formValues.type)
        ?.id as number,
      address: formValues.address,
      area: formValues.area,
      imageFiles: formValues.images
    })

    if (data) {
      toast.success('Đăng bài thành công')
      navigator('/')
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
      <Typography
        fontSize={'26px'}
        fontWeight={'bold'}
        gutterBottom
        textAlign={'left'}
      >
        Hình ảnh và video sản phẩm
      </Typography>
      <Grid container spacing={6} justifyContent={'center'}>
        <Grid item xs={12} md={5}>
          <ImageSide handleUploadFile={handleUploadImage} />
        </Grid>
        <Grid item xs={12} md={5}>
          <Box component={'div'}>
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
              value={formValues.brand}
              onChange={handleChange}
              isRequired={true}
              isDisabled={false}
              fullWidth={true}
              name="brand"
              options={
                isLoadingBrands
                  ? []
                  : brands?.map(
                      (brand: { id: number; brandName: string }) =>
                        brand.brandName
                    ) || []
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
              value={formValues.type}
              onChange={handleChange}
              isRequired={true}
              isDisabled={false}
              fullWidth={true}
              name="type"
              options={
                isLoadingTypes
                  ? []
                  : types?.map(
                      (type: { id: number; typeName: string }) => type.typeName
                    ) || []
              }
            />
            <TextInput
              label="Mẫu mã"
              type="text"
              placeholder="Nhập mẫu mã"
              value={formValues.models}
              onChange={handleChange}
              isRequired={true}
              isDisabled={false}
              fullWidth={true}
              name="models"
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
            <TextInput
              label="Chất liệu vỏ"
              type="text"
              placeholder="Nhập chất liệu vỏ"
              value={formValues.materialCase}
              onChange={handleChange}
              isDisabled={false}
              isRequired={true}
              fullWidth={true}
              name="materialCase"
            />
            <TextInput
              label="Chất liệu dây đeo"
              type="text"
              placeholder="Nhập chất liệu dây đeo"
              value={formValues.materialStrap}
              onChange={handleChange}
              isDisabled={false}
              isRequired={true}
              fullWidth={true}
              name="materialStrap"
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
              options={Object.values(ProductStatus)}
            />
            <TextInput
              label="Kích thước"
              type="text"
              placeholder="41x41"
              value={formValues.size}
              onChange={handleChange}
              isDisabled={false}
              fullWidth={true}
              suffix="mm"
              name="size"
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
              options={Object.values(Area)}
            />
            <TextInput
              label="Địa chỉ cụ thể"
              type="text"
              placeholder="Nhập địa chỉ"
              value={formValues.address}
              onChange={handleChange}
              isRequired={true}
              isDisabled={false}
              fullWidth={true}
              name="address"
            />
            <Button
              variant="contained"
              component="button"
              color="primary"
              onClick={handleSubmit}
            >
              Đăng bài
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CreatePostPage
