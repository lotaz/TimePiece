import { useState } from 'react'
import { Box, Button, Typography, IconButton, Avatar } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
  }

  return (
    <Box
      sx={{ width: 400, border: '1px solid #ddd', padding: 2, borderRadius: 2 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <input
          accept="image/*"
          id="upload-image"
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <label htmlFor="upload-image" style={{ flex: 1 }}>
          <Button variant="outlined" component="span" fullWidth>
            Choose file to upload
          </Button>
        </label>
        <Button variant="contained" component="span" sx={{ ml: 2 }}>
          Chọn ảnh
        </Button>
      </Box>
      {selectedFile && (
        <Box
          sx={{
            border: '1px solid #1976d2',
            padding: 2,
            borderRadius: 2,
            position: 'relative'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={URL.createObjectURL(selectedFile)}
              variant="square"
              sx={{ width: 56, height: 56, mr: 2 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1">{selectedFile?.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {(selectedFile?.size / 1024).toFixed(1)} KB
              </Typography>
            </Box>
            <IconButton
              size="small"
              sx={{ position: 'absolute', top: 8, right: 8 }}
              onClick={handleRemoveFile}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default ImageUpload
