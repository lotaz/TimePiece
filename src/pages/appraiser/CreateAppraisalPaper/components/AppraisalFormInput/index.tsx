import { Box, FormHelperText, InputLabel, TextField } from '@mui/material'

interface AppraisalFormInputProps {
  value: string
  label: string
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  isEstimated?: boolean
}

const AppraisalFormInput: React.FC<AppraisalFormInputProps> = ({
  label,
  value,
  onChange,
  name,
  error,
  isEstimated
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
          fontSize: 20,
          fontWeight: 'bold',
          alignSelf: 'center',
          width: '200px',
          textAlign: 'left'
        }}
      >
        {label}:
      </InputLabel>
      <TextField
        value={value}
        name={name}
        onChange={onChange}
        variant="outlined"
        size="small"
        helperText={error}
        sx={{
          marginLeft: 8,
          width: '24vw'
        }}
      />
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
