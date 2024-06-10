import React from 'react'
import { Box, Typography, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface FindRequestAppraiserProps {}

const FindRequestAppraiser: React.FC<FindRequestAppraiserProps> = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={2}
      border={1}
      borderColor="grey.300"
      borderRadius={2}
      m={2}
      bgcolor="#f5f5f5"
    >
      <Typography variant="h5" component="h1" gutterBottom fontWeight={'600'}>
        Danh sách
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        yêu cầu thẩm định đồng hồ
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Tìm kiếm"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          style: { borderRadius: '50px' }
        }}
        style={{ width: '300px', marginTop: '16px' }}
      />
    </Box>
  )
}

export default FindRequestAppraiser
