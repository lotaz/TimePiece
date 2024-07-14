import React, { useEffect, useState } from 'react'
import { Box, Button, Popover, Typography, Grid } from '@mui/material'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import useSWR from 'swr'
import { AppPath } from '@/services/utils'
import { useNavigate } from 'react-router-dom'

interface MenuPopoverProps {
  buttonLabel: string
}

const MenuPopover: React.FC<MenuPopoverProps> = ({ buttonLabel }) => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [listBrand, setBrand] = useState<{ id: number; brandName: string }[]>(
    []
  )

  const { data: brand, isLoading } = useSWR(AppPath.GET_BRANDS)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    if (brand) {
      setBrand(brand)
    }
  }, [brand])

  const open = Boolean(anchorEl)
  const id = open ? 'menu-popover' : undefined

  return (
    <>
      <Button
        sx={{
          textTransform: 'none',
          fontSize: '14px',
          fontWeight: '600',
          width: 'fit-content',
          marginRight: 2
        }}
        color="inherit"
        onClick={handlePopoverOpen}
        aria-describedby={id}
        endIcon={<ExpandMoreOutlinedIcon />}
      >
        {buttonLabel}
      </Button>
      <Popover
        sx={{ zIndex: 9999 }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Box sx={{ p: 2, display: 'flex', paddingX: 6, paddingBottom: 4 }}>
          <Box sx={{ mr: 8 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Thương hiệu
            </Typography>
            <Grid container direction="column">
              {isLoading ? (
                <Typography>Loading...</Typography>
              ) : (
                listBrand?.map((item: { id: number; brandName: string }) => (
                  <Grid
                    item
                    key={item.id}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'primary.main'
                      },
                      padding: '4px 0'
                    }}
                  >
                    {item.brandName}
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
          <Box sx={{ mr: 8 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Loại đồng hồ
            </Typography>
            <Grid container direction="column">
              <Grid
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'primary.main'
                  },
                  padding: '4px 0'
                }}
                item
              >
                Đồng hồ nam
              </Grid>
              <Grid
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'primary.main'
                  },
                  padding: '4px 0'
                }}
                item
              >
                Đồng hồ nữ
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Dịch vụ
            </Typography>
            <Grid container direction="column">
              <Grid
                onClick={() => navigate('/')}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'primary.main'
                  },
                  padding: '4px 0'
                }}
                item
              >
                Mua đồng hồ
              </Grid>
              <Grid
                onClick={() => navigate('/post/create-post')}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'primary.main'
                  },
                  padding: '4px 0'
                }}
                item
              >
                Bán đồng hồ
              </Grid>
              <Grid
                onClick={() => navigate('/appraisal/online-form')}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'primary.main'
                  },
                  padding: '4px 0'
                }}
                item
              >
                Thẩm định đồng hồ
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Popover>
    </>
  )
}

export default MenuPopover
