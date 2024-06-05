import SelectInput from '@/components/Controls/SelectInput'
import TextInput from '@/components/Controls/TextInput'
import { Box, Button, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { FC } from 'react'

interface InformationSideProps {}

const mockedOptions = ['Option 1', 'Option 2', 'Option 3']

const InformationSide: FC<InformationSideProps> = () => {
  const form = useFormik({
    initialValues: {
      brand: '',
      status: '',
      type: '',
      models: '',
      modelsNumber: '',
      battery: '',
      materialCase: '',
      materialStrap: '',
      productYear: '',
      statusProduct: '',
      size: '',
      madeBy: '',
      price: '',
      description: '',
      address: ''
    },
    onSubmit: (values) => {
      console.log(values)
    }
  })

  return (
    <Box component={'div'}>
      <SelectInput
        label="Thương hiệu"
        placeholder="Chọn thương hiệu"
        value={form.values.brand}
        onChange={form.handleChange}
        isRequired={true}
        isDisabled={false}
        fullWidth={true}
        name="brand"
        options={mockedOptions}
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
      <SelectInput
        label="Loại sản phẩm"
        placeholder="Nhập loại sản phẩm"
        value={form.values.type}
        onChange={form.handleChange}
        isRequired={true}
        isDisabled={false}
        fullWidth={true}
        name="type"
        options={mockedOptions}
      />
      <TextInput
        label="Mẫu mã"
        type="text"
        placeholder="Nhập mẫu mã"
        value={form.values.models}
        onChange={form.handleChange}
        isRequired={true}
        isDisabled={false}
        fullWidth={true}
        name="models"
      />
      <TextInput
        label="Số tham chiếu"
        type="text"
        placeholder="Nhập số tham chiếu"
        value={form.values.modelsNumber}
        onChange={form.handleChange}
        isRequired={true}
        isDisabled={false}
        fullWidth={true}
        name="modelsNumber"
      />
      <TextInput
        label="Dung lượng pin"
        type="text"
        placeholder="Nhập dung lượng pin"
        value={form.values.battery}
        onChange={form.handleChange}
        isDisabled={false}
        suffix="Giờ"
        fullWidth={true}
        name="battery"
      />
      <TextInput
        label="Chất liệu vỏ"
        type="text"
        placeholder="Nhập chất liệu vỏ"
        value={form.values.materialCase}
        onChange={form.handleChange}
        isDisabled={false}
        isRequired={true}
        fullWidth={true}
        name="materialCase"
      />
      <TextInput
        label="Chất liệu dây đeo"
        type="text"
        placeholder="Nhập chất liệu dây đeo"
        value={form.values.materialStrap}
        onChange={form.handleChange}
        isDisabled={false}
        isRequired={true}
        fullWidth={true}
        name="materialStrap"
      />
      <TextInput
        label="Năm sản xuất"
        type="text"
        placeholder="Nhập năm sản xuất"
        value={form.values.productYear}
        onChange={form.handleChange}
        isDisabled={false}
        fullWidth={true}
        name="productYear"
      />
      <SelectInput
        label="Tình trạng sản phẩm"
        placeholder="Nhập tình trạng sản phẩm"
        value={form.values.statusProduct}
        onChange={form.handleChange}
        isRequired
        isDisabled={false}
        fullWidth={true}
        name="statusProduct"
        options={['Mới', 'Cũ']}
      />
      <TextInput
        label="Kích thước"
        type="text"
        placeholder="41x41"
        value={form.values.size}
        onChange={form.handleChange}
        isDisabled={false}
        fullWidth={true}
        suffix="mm"
        name="size"
      />
      <TextInput
        label="Nơi sản xuất"
        type="text"
        placeholder="Nhập xuất xứ"
        value={form.values.madeBy}
        onChange={form.handleChange}
        isDisabled={false}
        fullWidth={true}
        name="madeBy"
      />
      <TextInput
        label="Giá"
        type="text"
        placeholder="Nhập giá"
        value={form.values.price}
        onChange={form.handleChange}
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
        value={form.values.description}
        onChange={form.handleChange}
        isDisabled={false}
        fullWidth={true}
        name="description"
      />
      <TextInput
        label="Địa chỉ"
        type="text"
        placeholder="Nhập địa chỉ"
        value={form.values.address}
        onChange={form.handleChange}
        isRequired={true}
        isDisabled={false}
        fullWidth={true}
        name="address"
      />
      <Button
        variant="contained"
        component="button"
        color="primary"
        onClick={form.submitForm}
      >
        Đăng bài
      </Button>
    </Box>
  )
}

export default InformationSide
