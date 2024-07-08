import React from 'react'
import { Box, Button, MenuItem, Select, Typography } from '@mui/material'

const FilterComponent = () => {
  const filters = [
    { label: 'Khu vực', options: ['Option 1', 'Option 2', 'Option 3'] },
    { label: 'Thương hiệu', options: ['Option 1', 'Option 2', 'Option 3'] },
    { label: 'Giá', options: ['Option 1', 'Option 2', 'Option 3'] },
    { label: 'Trạng thái', options: ['Option 1', 'Option 2', 'Option 3'] },
    { label: 'Loại', options: ['Option 1', 'Option 2', 'Option 3'] },
    { label: 'Tình trạng', options: ['Option 1', 'Option 2', 'Option 3'] }
  ]

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      my={2}
    >
      <Typography>Sắp xếp theo</Typography>
      {filters.map((filter, index) => (
        <Select
          key={index}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          defaultValue=""
          variant="outlined"
          sx={{ mx: 1 }}
        >
          <MenuItem value="" disabled>
            {filter.label}
          </MenuItem>
          {filter.options.map((option, idx) => (
            <MenuItem key={idx} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      ))}
    </Box>
  )
}

export default FilterComponent
