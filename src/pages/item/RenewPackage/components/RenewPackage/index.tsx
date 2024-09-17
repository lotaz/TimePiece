import { AppPath } from '@/services/utils'
import {
  Box,
  Typography,
  Radio,
  FormControlLabel,
  RadioGroup,
  Skeleton
} from '@mui/material'
import { useState } from 'react'
import useSWR from 'swr'

export interface IRenewPackage {
  id: number
  name: string
  price: number
  duration: number
}

interface RenewPackageProps {
  selectedPackage?: IRenewPackage | null
  setSelectedPackage: (pakage: IRenewPackage) => void
}

const RenewPackage = ({
  selectedPackage,
  setSelectedPackage
}: RenewPackageProps) => {
  const [packages, setPackages] = useState<IRenewPackage[]>([])

  const { isLoading } = useSWR(AppPath.GET_RENEWAL_PACKAGE, {
    onSuccess: (data) => {
      setPackages(data)
    }
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '10px 0',
        borderBottom: '1px solid #e0e0e0'
      }}
    >
      <Typography sx={{ fontWeight: 600, fontSize: 18, textAlign: 'left' }}>
        Chọn gói gia hạn
      </Typography>
      <RadioGroup
        value={selectedPackage}
        onChange={(e) => {
          const selected = packages.find(
            (pkg) => pkg.id === parseInt(e.target.value)
          )
          if (selected) setSelectedPackage(selected)
        }}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          margin: '40px',
          justifyContent: 'space-between'
        }}
      >
        {isLoading && packages.length === 0
          ? Array.from({ length: 3 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '10px 40px',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer'
                }}
              >
                <Skeleton variant="text" width={100} height={20} />
                <Skeleton variant="text" width={60} height={20} />
              </Box>
            ))
          : packages.map((pkg) => (
              <FormControlLabel
                key={pkg.id}
                value={pkg.id}
                control={
                  <Radio
                    sx={{
                      display: 'none'
                    }}
                  />
                }
                label={
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '10px 40px',
                      borderRadius: '8px',
                      border: '1px solid',
                      borderColor:
                        selectedPackage?.id == pkg.id
                          ? 'primary.main'
                          : 'rgba(0, 0, 0, 0.23)',
                      backgroundColor:
                        selectedPackage?.id == pkg.id ? '#f9f9f9' : '#ffffff',
                      cursor: 'pointer'
                    }}
                  >
                    <Typography sx={{ fontWeight: 600 }}>{pkg.name}</Typography>
                    <Typography sx={{ color: 'green', fontWeight: 500 }}>
                      {pkg.price.toLocaleString()}đ
                    </Typography>
                  </Box>
                }
                sx={{ margin: 0 }}
              />
            ))}
      </RadioGroup>
    </Box>
  )
}

export default RenewPackage
