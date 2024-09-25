import React, { useState } from 'react'
import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import MoreHorizSharpIcon from '@mui/icons-material/MoreHorizSharp'
import { useNavigate } from 'react-router-dom'
import { Product } from '../..'

interface PostMenuProps {
  onEdit: () => void
  onDelete: () => void
  product: Product
}

const PostMenu: React.FC<PostMenuProps> = ({ onEdit, onDelete, product }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <MoreHorizSharpIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose()
            onEdit()
          }}
        >
          Chỉnh sửa
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose()
            navigate(`/item/${product.id}`)
          }}
        >
          Xem chi tiết
        </MenuItem>
        <MenuItem
          disabled={
            product.status === 'DELETED' ||
            product.status === 'SOLD' ||
            product.status === 'CANCEL'
          }
          onClick={() => {
            handleClose()
            onDelete()
          }}
          sx={{ color: 'red' }}
        >
          Xoá
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default PostMenu
