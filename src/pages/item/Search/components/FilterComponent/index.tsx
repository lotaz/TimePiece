import { Box, MenuItem, TextField, Typography, Skeleton } from '@mui/material'
import useSWR from 'swr'
import { AppPath } from '@/services/utils'
import { Area, ProductStatus } from '@/common/type'

interface FilterProps {
  area: string
  brand: string
  price: string
  status: string
  type: string
  condition: string
  isLoading: boolean
  onFilterChange: (name: string, value: string) => void
}

const FilterComponent = ({
  isLoading,
  area,
  brand,
  price,
  status,
  type,
  condition,
  onFilterChange
}: FilterProps) => {
  const { data: brands, isLoading: loadBrand } = useSWR(AppPath.GET_BRANDS)
  const { data: types, isLoading: loadTypes } = useSWR(AppPath.GET_TYPES)

  const filterOptions = [
    {
      label: 'Khu vực',
      name: 'area',
      options: Object.values(Area)
    },
    {
      label: 'Thương hiệu',
      name: 'brand',
      options: brands?.map((brand) => brand.brandName) || []
    },
    {
      label: 'Giá',
      name: 'price',
      options: ['Option 1', 'Option 2', 'Option 3']
    },
    {
      label: 'Trạng thái',
      name: 'status',
      options: ['Đã sử dụng', 'Mới', 'Cũ']
    },
    {
      label: 'Loại',
      name: 'type',
      options: types?.map((type) => type.typeName) || []
    },
    {
      label: 'Tình trạng',
      name: 'condition',
      options: Object.values(ProductStatus)
    }
  ]

  const handleFilterChange = (name: string, value: string) => {
    onFilterChange(name, value)
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      my={2}
    >
      <Typography>Sắp xếp theo</Typography>

      {filterOptions.map((filter) => (
        <TextField
          key={filter.name}
          select
          sx={{
            width: '150px'
          }}
          label={filter.label}
          variant="outlined"
          value={(() => {
            switch (filter.name) {
              case 'area':
                return area
              case 'brand':
                return brand
              case 'price':
                return price
              case 'status':
                return status
              case 'type':
                return type
              case 'condition':
                return condition
              default:
                return ''
            }
          })()}
          onChange={(e) => handleFilterChange(filter.name, e.target.value)}
        >
          {isLoading ||
          (filter.name === 'brand' && loadBrand) ||
          (filter.name === 'type' && loadTypes)
            ? [1, 2, 3].map((idx) => (
                <MenuItem key={idx} value="">
                  <Skeleton width="100%" />
                </MenuItem>
              ))
            : filter.options.map((option, idx) => (
                <MenuItem key={idx} value={option}>
                  {option}
                </MenuItem>
              ))}
        </TextField>
      ))}
    </Box>
  )
}

export default FilterComponent
