import React from 'react'
import { Box, Typography, Link, Grid, Divider, Skeleton } from '@mui/material'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'

interface WatchInfoProps {
  seller?: string
  itemName?: string
  itemType?: string
  itemPrice?: string
  itemLocation?: string
  itemImage?: string
  isLoading?: boolean
}

const WatchInfo: React.FC<WatchInfoProps> = ({
  seller,
  itemName,
  itemType,
  itemPrice,
  itemLocation,
  itemImage,
  isLoading
}) => {
  return (
    <Grid
      container
      border={1}
      width={'inherit'}
      borderColor="grey.300"
      borderRadius={2}
      m={2}
      bgcolor={'#FFFFFF'}
    >
      <Grid item xs={5} m={2}>
        <Box display="flex" alignItems="baseline" flexDirection={'column'}>
          <Typography variant="h6" color={'#000000'}>
            Sản phẩm
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'left',
              flexDirection: 'row'
            }}
          >
            {isLoading ? (
              <>
                <Skeleton width={100} height={20} />
                <Divider
                  orientation="vertical"
                  sx={{
                    bgcolor: '#C8C8C8',
                    mx: 1
                  }}
                  flexItem
                />
                <Skeleton width={60} height={20} />
              </>
            ) : (
              <>
                <Typography>Người bán: {seller}</Typography>
                <Divider
                  orientation="vertical"
                  sx={{
                    bgcolor: '#C8C8C8',
                    mx: 1
                  }}
                  flexItem
                />
                <Link href="#" underline="hover">
                  <Typography color={'#00C600'}>
                    <QuestionAnswerIcon
                      sx={{
                        fontSize: 16,
                        verticalAlign: 'middle',
                        marginRight: 0.5
                      }}
                    />
                    Chat ngay
                  </Typography>
                </Link>
              </>
            )}
          </Box>
        </Box>
        <Box display="flex" flexDirection={'row'} mt={2}>
          {isLoading ? (
            <Skeleton variant="rectangular" width={64} height={64} />
          ) : (
            <Box>
              <img src={itemImage} width={64} height={64} />
            </Box>
          )}
          <Box
            alignItems="baseline"
            display={'flex'}
            flexDirection={'column'}
            marginLeft={2}
            textAlign={'left'}
          >
            {isLoading ? (
              <>
                <Skeleton width={150} height={20} />
                <Skeleton width={100} height={20} />
              </>
            ) : (
              <>
                <Typography
                  sx={{
                    fontWeight: 'bold'
                  }}
                >
                  {itemName}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14
                  }}
                >
                  {itemLocation}
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={3} m={2}>
        <Box display="flex" flexDirection={'column'}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
              marginBottom: 4
            }}
          >
            {isLoading ? (
              <Skeleton width={60} height={20} />
            ) : (
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 'bold'
                }}
              >
                Loại
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row'
            }}
          >
            {isLoading ? (
              <Skeleton width={60} height={20} />
            ) : (
              <Typography>{itemType}</Typography>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={3} m={2}>
        <Box display="flex" flexDirection={'column'}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 4
            }}
          >
            {isLoading ? (
              <Skeleton width={60} height={20} />
            ) : (
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 'bold'
                }}
              >
                Đơn giá
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row'
            }}
          >
            {isLoading ? (
              <Skeleton width={60} height={20} />
            ) : (
              <Typography>{itemPrice}</Typography>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default WatchInfo
