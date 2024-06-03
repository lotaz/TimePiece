import React, { FC, ReactNode } from 'react'
import { TextField, InputAdornment, Box, Typography } from '@mui/material'

interface TextInputProps {
  label: string | ReactNode
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  fullWidth?: boolean
  isRequired?: boolean
  isDisabled?: boolean
  prefix?: string | ReactNode
  suffix?: string | ReactNode
  name: string
}

const TextInput: FC<TextInputProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  isRequired,
  isDisabled = false,
  fullWidth = false,
  prefix,
  suffix,
  name
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
        multiline={type === 'textarea'}
        rows={type === 'textarea' ? 4 : 1}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={isRequired}
        disabled={isDisabled}
        InputProps={{
          startAdornment: prefix && (
            <InputAdornment position="start">{prefix}</InputAdornment>
          ),
          endAdornment: suffix && (
            <InputAdornment position="end">{suffix}</InputAdornment>
          )
        }}
        variant="outlined"
      />
    </Box>
  )
}

export default TextInput
