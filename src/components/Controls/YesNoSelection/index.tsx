// YesNoSelection.tsx
import React from 'react'
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import styled from '@emotion/styled'

interface YesNoSelectionProps {
  name: string
  value: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const StyledFormControlLabel = styled(FormControlLabel)({
  flex: '1 1 0',
  marginLeft: 4,
  width: '140px',
  '& .MuiRadio-root': {
    display: 'none'
  },
  '& .MuiTypography-root': {
    border: '1px solid black',
    padding: '10px 0',
    textAlign: 'center',
    width: '100%', // Full width
    boxSizing: 'border-box' as const // Update the type of boxSizing
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
})

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
