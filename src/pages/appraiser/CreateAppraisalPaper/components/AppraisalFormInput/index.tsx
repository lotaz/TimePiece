import React from 'react'
import {
  Box,
  FormHelperText,
  InputLabel,
  TextField,
  MenuItem,
  Select
} from '@mui/material'

interface AppraisalFormInputProps {
  value: string | number | null
  label: string
  name: string
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | { name?: string; value?: string | number }
    >
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => void
  error?: string
  isEstimated?: boolean
  isSelection?: boolean
  options?: { label: string; value: string | number }[]
  onBlur?: (e) => void
  loading?: boolean
}

const AppraisalFormInput: React.FC<AppraisalFormInputProps> = ({
  label,
  value,
  onChange,
  name,
  error,
  isEstimated,
  isSelection = false, // Default to input control
  options = [],
  onBlur,
  loading = false
}: AppraisalFormInputProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 2
      }}
    >
      <InputLabel
        component={'div'}
        sx={{
          fontSize: 16,
          fontWeight: 'bold',
          alignSelf: 'center',
          width: '180px',
          textAlign: 'left'
        }}
      >
        {label}:
      </InputLabel>
      {isSelection ? (
        <Select
          value={value}
          name={name}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e) => onChange(e as any)}
          variant="outlined"
          size="small"
          sx={{
            marginLeft: 8,
            width: '20vw'
          }}
          disabled={loading}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <TextField
          value={value} // Display the input value
          name={name}
          onChange={onChange}
          variant="outlined"
          size="small"
          onBlur={onBlur}
          helperText={error}
          sx={{
            marginLeft: 8,
            width: '20vw'
          }}
          disabled={loading}
        />
      )}
      {isEstimated && (
        <FormHelperText
          sx={{
            fontSize: 14,
            color: 'gray',
            marginLeft: 2,
            alignSelf: 'center'
          }}
        >
          VNĐ
        </FormHelperText>
      )}
    </Box>
  )
}

export default AppraisalFormInput
