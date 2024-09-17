import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton
} from '@mui/material'
import { Transaction } from '../../type'
import React from 'react'
import { TableComponents, TableVirtuoso } from 'react-virtuoso'
import moment from 'moment'

interface TransactionProps {
  transactions: Transaction[]
  loading: boolean
}

interface ColumnData {
  dataKey: keyof Transaction
  label: string
  numeric?: boolean
  width: number | string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  format?: (value: any) => string
}

function mappingTransactionType(type: string) {
  switch (type) {
    case 'DEPOSIT':
      return 'Nạp tiền'
    case 'ORDER_PAYMENT':
      return 'Thanh toán đơn hàng'
    case 'POST_WATCH_PAYMENT':
      return 'Chuyển tiền'
    default:
      return 'Không xác định'
  }
}

const ListTransaction = (props: TransactionProps) => {
  const { transactions, loading } = props

  const columns: ColumnData[] = [
    { dataKey: 'id', label: 'Mã giao dịch', numeric: false, width: '15%' },
    {
      dataKey: 'createdAt',
      label: 'Ngày giao dịch',
      numeric: false,
      width: '20%',
      format: (value) => moment(value).format('DD/MM/YYYY HH:mm')
    },
    { dataKey: 'amount', label: 'Tổng tiền (đ)', numeric: false, width: '15%' },
    {
      dataKey: 'transactionType',
      label: 'Loại giao dịch',
      numeric: false,
      width: '20%',
      format: (value) => mappingTransactionType(value)
    },
    {
      dataKey: 'description',
      label: 'Mô tả',
      numeric: false,
      width: '30%'
    }
  ]

  const VirtuosoTableComponents: TableComponents<Transaction> = {
    // eslint-disable-next-line react/display-name
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }}
      />
    ),
    TableHead: React.forwardRef<HTMLTableSectionElement>(
      function TableHeadComponent(props, ref) {
        return <TableHead {...props} ref={ref} />
      }
    ),
    TableRow,
    TableBody: React.forwardRef<HTMLTableSectionElement>(
      function TableBodyComponent(props, ref) {
        return <TableBody {...props} ref={ref} />
      }
    )
  }

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric || false ? 'right' : 'left'}
            style={{ width: column.width }}
            sx={{ backgroundColor: 'background.paper' }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    )
  }

  function rowContent(_index: number, row: Transaction) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? 'right' : 'left'}
          >
            {column.format
              ? column.format(row[column.dataKey])
              : row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    )
  }

  if (loading) {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>{fixedHeaderContent()}</TableHead>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton variant="text" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  return (
    <TableVirtuoso
      data={transactions}
      components={VirtuosoTableComponents}
      fixedHeaderContent={fixedHeaderContent}
      itemContent={rowContent}
      sandbox="div"
    />
  )
}

export default ListTransaction
