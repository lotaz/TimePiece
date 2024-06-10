import { useState } from 'react'
import { Box, Button, Typography, IconButton, Avatar } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const ImageUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files)
    setSelectedFiles((prevFiles: File[]) => [...prevFiles, ...files] as File[])
  }

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
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
          multiple
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <label htmlFor="upload-image" style={{ flex: 1 }}>
          <Button variant="outlined" component="span" fullWidth>
            Choose files to upload
          </Button>
        </label>
      </Box>
      {selectedFiles.length > 0 && (
        <Box sx={{ marginTop: 2 }}>
          {selectedFiles.map((file, index) => (
            <Box
              key={index}
              sx={{
                border: '1px solid #1976d2',
                padding: 2,
                borderRadius: 2,
                position: 'relative',
                marginBottom: 2
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  src={URL.createObjectURL(file)}
                  variant="square"
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1">{file.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {(file.size / 1024).toFixed(1)} KB
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  sx={{ position: 'absolute', top: 8, right: 8 }}
                  onClick={() => handleRemoveFile(index)}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default ImageUpload
