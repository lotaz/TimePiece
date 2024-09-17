import { Box, Button, Paper, Typography, Skeleton } from '@mui/material'
import { User } from '../../item/ManageBuyOrder/type'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { AppPath } from '@/services/utils'
import { Transaction } from './type'
import ListTransaction from './components/Transaction'
import DepositModal from './components/DepositModal'

const WalletPage = () => {
  const local = JSON.parse(localStorage.getItem('user') || '{}') as User

  const [user, setUser] = useState<User | null>(null)
  const [balance, setBalance] = useState<number>(0)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [open, setOpen] = useState(false)

  const { isLoading: loadingBalance } = useSWR<number>(
    AppPath.USER_BALANCE(local?.id),
    {
      onSuccess: (data) => {
        setBalance(data)
      }
    }
  )

  const { isLoading: loadingTransactions } = useSWR(AppPath.TRANSACTIONS, {
    onSuccess: (data) => {
      setTransactions(data)
    }
  })

  const { data: userData, isLoading: loadingUserInfo } = useSWR<User>(
    AppPath.USER_INFO(local?.id),
    {
      onSuccess: (data) => {
        setUser(data)
      }
    }
  )

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // Ensure user data is updated when loading finishes
  useEffect(() => {
    if (userData) {
      setUser(userData)
    }
  }, [userData])

  return (
    <Box
      sx={{
        marginTop: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        minHeight: 'calc(100vh - 340px)',
        width: '70vw',
        marginX: 'auto'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginX: 'auto',
          width: '100%'
        }}
      >
        <Box>
          <Box
            sx={{
              textAlign: 'left'
            }}
          >
            {loadingUserInfo ? (
              <>
                <Skeleton variant="text" width={100} height={30} />
                <Skeleton variant="text" width={150} height={40} />
              </>
            ) : (
              <>
                <Typography>Xin chào</Typography>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 600
                  }}
                >
                  {user?.name || 'N/A'}
                </Typography>
              </>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 4
          }}
        >
          <Box
            sx={{
              textAlign: 'left'
            }}
          >
            {loadingBalance ? (
              <>
                <Skeleton variant="text" width={120} height={30} />
                <Skeleton variant="text" width={100} height={40} />
              </>
            ) : (
              <>
                <Typography>Số dư tài khoản</Typography>
                <Typography>{balance}đ</Typography>
              </>
            )}
          </Box>
          <Box>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Nạp tiền
            </Button>
          </Box>
        </Box>
      </Box>

      <Paper style={{ height: 400, width: '100%' }}>
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 600,
            padding: 2,
            textAlign: 'left'
          }}
        >
          Lịch sử giao dịch
        </Typography>
        <ListTransaction
          transactions={transactions}
          loading={loadingTransactions}
        />
      </Paper>
      <DepositModal open={open} onClose={handleClose} userId={local.id} />
    </Box>
  )
}

export default WalletPage
