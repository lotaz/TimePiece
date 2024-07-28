import {
  Box,
  Button,
  Typography,
  IconButton,
  Avatar,
  Grid
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useState, ChangeEvent } from 'react'

interface ImageUploadProps {
  onFileChange: (files: Blob[]) => void
  files: Blob[]
}

const ImageUpload = ({ onFileChange, files }: ImageUploadProps) => {
  const [fileList, setFileList] = useState<Blob[]>(files)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles)
      setFileList((prevFiles) => [...prevFiles, ...newFiles])
      onFileChange([...fileList, ...newFiles])
    }
  }

  const handleRemoveFile = (index: number) => {
    const newFiles = fileList.filter((_, i) => i !== index)
    setFileList(newFiles)
    onFileChange(newFiles)
  }

  return (
    <Box
      sx={{
        width: '100%',
        border: '1px solid #ddd',
        padding: 2,
        borderRadius: 2
      }}
    >
      {fileList.length < 6 && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <input
            accept="image/*"
            id="upload-image"
            type="file"
            multiple
            style={{ display: 'none' }}
            onChange={handleFileChange}
            name="images"
          />
          <label htmlFor="upload-image" style={{ flex: 1 }}>
            <Button variant="outlined" component="span">
              Choose files to upload
            </Button>
          </label>
        </Box>
      )}
      {fileList.length > 0 && (
        <Box sx={{ marginTop: 2 }}>
          <Grid container spacing={2}>
            {fileList.map((file, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
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
                      src={URL.createObjectURL(file)}
                      variant="square"
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                    <Box sx={{ flex: 1 }}>
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
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  )
}

export default ImageUpload
