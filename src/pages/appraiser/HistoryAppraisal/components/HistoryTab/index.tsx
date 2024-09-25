import React from 'react'
import { Box, Button, ButtonGroup } from '@mui/material'

interface HistoryTabProps {
  status: 'all' | 'processing' | 'wait' | 'complete'
  setStatus: (status: 'all' | 'processing' | 'wait' | 'complete') => void
}

const HistoryTab: React.FC<HistoryTabProps> = ({ status, setStatus }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        bgcolor: '#fff',
        borderRadius: '8px',
        padding: '4px',
        marginBottom: '16px',
        marginTop: '20px'
      }}
    >
      <ButtonGroup variant="outlined">
        <Button
          onClick={() => setStatus('all')}
          sx={{
            backgroundColor: status === 'all' ? '#f0f0f0' : 'transparent',
            fontWeight: status === 'all' ? 'bold' : 'normal',
            color: '#000',
            textTransform: 'none',
            minWidth: '100px'
          }}
        >
          Tất cả
        </Button>
        <Button
          onClick={() => setStatus('wait')}
          sx={{
            backgroundColor: status === 'wait' ? '#f0f0f0' : 'transparent',
            fontWeight: status === 'wait' ? 'bold' : 'normal',
            color: '#000',
            textTransform: 'none',
            minWidth: '100px'
          }}
        >
          Đã nhận
        </Button>
        <Button
          onClick={() => setStatus('processing')}
          sx={{
            backgroundColor:
              status === 'processing' ? '#f0f0f0' : 'transparent',
            fontWeight: status === 'processing' ? 'bold' : 'normal',
            color: '#000',
            textTransform: 'none',
            minWidth: '100px'
          }}
        >
          Đang xử lý
        </Button>
        <Button
          onClick={() => setStatus('complete')}
          sx={{
            backgroundColor: status === 'complete' ? '#f0f0f0' : 'transparent',
            fontWeight: status === 'complete' ? 'bold' : 'normal',
            color: '#000',
            textTransform: 'none',
            minWidth: '100px'
          }}
        >
          Hoàn thành
        </Button>
      </ButtonGroup>
    </Box>
  )
}

export default HistoryTab
