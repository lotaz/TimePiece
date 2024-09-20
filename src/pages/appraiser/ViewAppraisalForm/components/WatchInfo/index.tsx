import YesNoSelection from '@/components/Controls/YesNoSelection'
import { Box, Grid, Typography, TextField } from '@mui/material'

interface WatchInfoProps {
  hasBox: string
  hasPapersOrWarranty: string
  hasPurchaseReceipt: string
  region: string
  arethereanystickers: string
  age: number
  description: string
  desiredPrice: number
  referenceNumber: string
  brand: string
}

const WatchInfo = ({
  hasBox,
  hasPapersOrWarranty,
  hasPurchaseReceipt,
  age,
  arethereanystickers,
  desiredPrice,
  description,
  referenceNumber,
  brand
}: WatchInfoProps) => {
  return (
    <Box component={'div'} marginTop={'10px'} marginLeft={4}>
      <Grid container spacing={6} gap={1}>
        <Grid item xs={12} md={6}>
          <Typography
            textAlign={'left'}
            fontSize={16}
            marginTop={1}
            marginLeft={4}
          >
            Đồng hồ còn nguyên hộp không?
          </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <YesNoSelection name={'hasBox'} value={hasBox} />
        </Grid>
      </Grid>
      <Grid container spacing={6} gap={1} marginTop={1}>
        <Grid item xs={12} md={6}>
          <Typography textAlign={'left'} fontSize={16} marginLeft={4}>
            Bạn có giấy tờ gốc của đồng hồ hoặc thẻ bảo hành không?
          </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <YesNoSelection
            name={hasPapersOrWarranty}
            value={hasPapersOrWarranty}
          />
        </Grid>
      </Grid>
      <Grid container spacing={6} gap={1} marginTop={1}>
        <Grid item xs={12} md={6}>
          <Typography
            textAlign={'left'}
            fontSize={16}
            marginTop={1}
            marginLeft={4}
          >
            Bạn có hóa đơn mua hàng không?
          </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <YesNoSelection
            name={'hasPurchaseReceipt'}
            value={hasPurchaseReceipt}
          />
        </Grid>
      </Grid>
      <Grid container spacing={6} gap={1} marginTop={1}>
        <Grid item xs={12} md={6}>
          <Typography
            textAlign={'left'}
            fontSize={16}
            marginTop={1}
            marginLeft={4}
          >
            Đồng hồ của bạn còn nhãn dán không?
          </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <YesNoSelection
            name={'arethereanystickers'}
            value={arethereanystickers}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4} marginTop={1}>
        <Grid item xs={12} md={6}>
          <Typography
            textAlign={'left'}
            fontSize={16}
            marginTop={4}
            marginLeft={4}
          >
            Đồng hồ của bạn bao nhiêu tuổi
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} marginLeft={2}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            disabled
            fullWidth
            id="age"
            name="age"
            value={age}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4} marginTop={1}>
        <Grid item xs={12} md={6}>
          <Typography
            textAlign={'left'}
            fontSize={16}
            marginTop={4}
            marginLeft={4}
          >
            Thương hiệu đồng hồ
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} marginLeft={2}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="brand"
            disabled
            name="brand"
            value={brand}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4} marginTop={1}>
        <Grid item xs={12} md={6}>
          <Typography
            textAlign={'left'}
            fontSize={16}
            marginTop={4}
            marginLeft={4}
          >
            Số tham chiếu
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} marginLeft={2}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            disabled
            id="referenceNumber"
            name="referenceNumber"
            value={referenceNumber}
          />
        </Grid>
      </Grid>

      <Grid container spacing={4} marginTop={1}>
        <Grid item xs={12} md={6}>
          <Typography
            textAlign={'left'}
            fontSize={16}
            marginTop={1}
            marginLeft={4}
          >
            Giá bán mong muốn của bạn là bao nhiêu?
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} marginLeft={2}>
          <TextField
            variant="outlined"
            disabled
            fullWidth
            value={desiredPrice}
            InputProps={{
              startAdornment: (
                <Typography sx={{ marginRight: 1, fontSize: 15 }}>
                  VND
                </Typography>
              )
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4} marginTop={1}>
        <Grid item xs={12} md={6}>
          <Typography
            textAlign={'left'}
            fontSize={16}
            marginTop={1}
            marginLeft={4}
          >
            Thông tin thêm (nếu có)
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} marginLeft={2}>
          <TextField
            variant="outlined"
            disabled
            rows={4}
            fullWidth
            multiline
            value={description}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default WatchInfo
