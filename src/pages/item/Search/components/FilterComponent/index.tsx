import React, { useState, useEffect } from 'react'
import {
  Box,
  TextField,
  Typography,
  Slider,
  Button,
  Popover,
  RadioGroup,
  FormControlLabel,
  Radio,
  Skeleton
} from '@mui/material'
import useSWR from 'swr'
import { AppPath } from '@/services/utils'
import { Area, ProductStatus } from '@/common/type'

interface FilterProps {
  area: string
  brand: string
  maxPrice: number | undefined
  minPrice: number | undefined
  status: string
  type: string
  condition: string
  isLoading: boolean
  onFilterChange: (name: string, value: string | number | number[]) => void
}

const FilterComponent = ({
  isLoading,
  area,
  brand,
  maxPrice,
  minPrice,
  status,
  type,
  condition,
  onFilterChange
}: FilterProps) => {
  const [brands, setBrands] = useState<{ brandName: string; id: number }[]>([])
  const [types, setTypes] = useState<{ typeName: string; id: number }[]>([])
  const [priceRange, setPriceRange] = useState<number[]>([
    minPrice || 0,
    maxPrice || 100000000
  ])

  const [popups, setPopups] = useState<{
    area: null | HTMLElement
    brand: null | HTMLElement
    status: null | HTMLElement
    type: null | HTMLElement
    condition: null | HTMLElement
    price: null | HTMLElement // Add the 'price' property
  }>({
    area: null,
    brand: null,
    status: null,
    type: null,
    condition: null,
    price: null // Initialize the 'price' property
  })

  const { data: brandsRes, isLoading: loadBrand } = useSWR(AppPath.GET_BRANDS)
  const { data: typesRes, isLoading: loadTypes } = useSWR(AppPath.GET_TYPES)

  useEffect(() => {
    if (brandsRes) {
      setBrands(brandsRes)
    }
  }, [brandsRes])

  useEffect(() => {
    if (typesRes) {
      setTypes(typesRes)
    }
  }, [typesRes])

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

  const handleFilterChange = (
    name: string,
    value: string | number | number[]
  ) => {
    onFilterChange(name, value)
  }

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[])
    handleFilterChange('minPrice', (newValue as number[])[0])
    handleFilterChange('maxPrice', (newValue as number[])[1])
  }

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    setPriceRange([value, priceRange[1]])
    handleFilterChange('minPrice', value)
  }

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    setPriceRange([priceRange[0], value])
    handleFilterChange('maxPrice', value)
  }

  const handleClick =
    (name: string) => (event: React.MouseEvent<HTMLElement>) => {
      setPopups({
        ...popups,
        [name]: event.currentTarget
      })
    }

  const handleClose = (name: string) => () => {
    setPopups({
      ...popups,
      [name]: null
    })
  }

  const handleRadioChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      handleFilterChange(name, event.target.value)
      handleClose(name)()
    }

  const renderPopover = (name: string, options: string[]) => (
    <Popover
      open={Boolean(popups[name])}
      anchorEl={popups[name]}
      onClose={handleClose(name)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
    >
      <Box p={2} width="200px">
        <Typography variant="subtitle1">{`Chọn ${name}`}</Typography>
        <RadioGroup
          value={(() => {
            switch (name) {
              case 'area':
                return area
              case 'brand':
                return brand
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
          onChange={handleRadioChange(name)}
        >
          {isLoading ||
          (name === 'brand' && loadBrand) ||
          (name === 'type' && loadTypes)
            ? [1, 2, 3].map((idx) => (
                <FormControlLabel
                  key={idx}
                  value=""
                  control={<Skeleton width={40} height={40} />}
                  label={<Skeleton width="100%" />}
                />
              ))
            : options.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
        </RadioGroup>
      </Box>
    </Popover>
  )

  return (
    <Box my={2}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        my={2}
      >
        <Typography>Sắp xếp theo</Typography>
        {filterOptions.map((filter) => (
          <Button
            key={filter.name}
            aria-describedby={`${filter.name}-popover`}
            variant="outlined"
            onClick={handleClick(filter.name)}
            sx={{
              width: '120px',
              textTransform: 'none',
              borderRadius: '20px'
            }}
          >
            {filter.label}
          </Button>
        ))}
        <Button
          aria-describedby="price-popover"
          variant="outlined"
          onClick={handleClick('price')}
          sx={{
            width: '120px',
            textTransform: 'none',
            borderRadius: '20px'
          }}
        >
          Giá
        </Button>
        <Popover
          id="price-popover"
          open={Boolean(popups.price)}
          anchorEl={popups.price}
          onClose={handleClose('price')}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <Box p={2} width="300px">
            <Typography variant="subtitle1">Giá</Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={100000000}
              sx={{ width: '100%' }}
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <TextField
                label="Giá tối thiểu"
                variant="outlined"
                type="number"
                value={priceRange[0]}
                onChange={handleMinPriceChange}
                sx={{ width: '45%' }}
              />
              <TextField
                label="Giá tối đa"
                variant="outlined"
                type="number"
                value={priceRange[1]}
                onChange={handleMaxPriceChange}
                sx={{ width: '45%' }}
              />
            </Box>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                variant="outlined"
                onClick={handleClose('price')}
                sx={{ mr: 2 }}
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClose('price')}
              >
                Áp dụng
              </Button>
            </Box>
          </Box>
        </Popover>
        {filterOptions.map((filter) =>
          renderPopover(filter.name, filter.options)
        )}
      </Box>
    </Box>
  )
}

export default FilterComponent
