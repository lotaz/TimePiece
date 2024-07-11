import React, { useState } from 'react'
import { Box, Button, Popover, Typography, Grid } from '@mui/material'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import useSWR from 'swr'
import { AppPath } from '@/services/utils'

interface MenuPopoverProps {
  buttonLabel: string
}

const MenuPopover: React.FC<MenuPopoverProps> = ({ buttonLabel }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { data: brand, isLoading } = useSWR(AppPath.GET_BRANDS)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

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
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Box sx={{ p: 2, display: 'flex' }}>
          <Box sx={{ mr: 4 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Thương hiệu
            </Typography>
            <Grid container direction="column">
              <Grid item>Rolex</Grid>
              <Grid item>Patek Philippe</Grid>
              <Grid item>Breitling</Grid>
              <Grid item>Cartier</Grid>
              <Grid item>IWC</Grid>
              <Grid item>Jaeger-LeCoultre</Grid>
              <Grid item>Hublot</Grid>
              <Grid item>Vacheron Constantin</Grid>
            </Grid>
          </Box>
          <Box sx={{ mr: 4 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Loại đồng hồ
            </Typography>
            <Grid container direction="column">
              <Grid item>Đồng hồ nam</Grid>
              <Grid item>Đồng hồ nữ</Grid>
            </Grid>
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Dịch vụ
            </Typography>
            <Grid container direction="column">
              <Grid item>Mua đồng hồ (đưa nó về trang home)</Grid>
              <Grid item>
                Bán đồng hồ (đưa nó vào trang tạo tin chưa login thì cook)
              </Grid>
              <Grid item>
                Thẩm định đồng hồ (quảng qua trang tạo đơn thẩm định)
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Popover>
    </>
  )
}

export default MenuPopover
