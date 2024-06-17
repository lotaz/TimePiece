// YesNoSelection.tsx
import React from 'react'
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  styled
} from '@mui/material'

interface YesNoSelectionProps {
  name: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  flex: '1 1 0', // Ensure equal width
  marginLeft: 4,
  width: '140px',
  '& .MuiRadio-root': {
    display: 'none'
  },
  '& .MuiTypography-root': {
    border: '1px solid black',
    padding: theme.spacing(1, 2),
    textAlign: 'center', // Center align text
    width: '100%', // Full width
    boxSizing: 'border-box'
  },
  '&.Mui-checked .MuiTypography-root': {
    backgroundColor: '#444',
    color: 'white',
    borderColor: '#444'
  },
  '&:not(.Mui-checked) .MuiTypography-root': {
    backgroundColor: '#fff',
    color: 'black'
  }
}))

const YesNoSelection: React.FC<YesNoSelectionProps> = ({
  name,
  value,
  onChange
}) => {
  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label={name}
        name={name}
        value={value}
        onChange={onChange}
        row
        style={{ justifyContent: 'space-between' }} // Ensure even spacing
      >
        <StyledFormControlLabel
          value="yes"
          control={<Radio />}
          label="Có"
          checked={value === 'yes'}
          className={value === 'yes' ? 'Mui-checked' : ''}
        />
        <StyledFormControlLabel
          value="no"
          control={<Radio />}
          label="Không"
          checked={value === 'no'}
          className={value === 'no' ? 'Mui-checked' : ''}
        />
      </RadioGroup>
    </FormControl>
  )
}

export default YesNoSelection
