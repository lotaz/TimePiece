import { FC, ReactNode } from 'react'
import { Box, Typography, TextField, MenuItem } from '@mui/material'

interface SelectInputProps {
  label: string
  placeholder: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  fullWidth?: boolean
  isRequired?: boolean
  isDisabled?: boolean
  prefix?: string | ReactNode
  suffix?: string | ReactNode
  name: string
  options: string[]
}

const SelectInput: FC<SelectInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  isRequired,
  isDisabled = false,
  fullWidth = false,
  name,
  options
}) => {
  return (
    <Box mb={2}>
      <Typography
        gutterBottom
        fontSize={'16px'}
        fontWeight={'bold'}
        textAlign={'left'}
      >
        {label} {isRequired && '*'}
      </Typography>
      <TextField
        fullWidth={fullWidth}
        name={name}
        label={label}
        select
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        required={isRequired}
        disabled={isDisabled}
        variant="outlined"
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  )
}

export default SelectInput