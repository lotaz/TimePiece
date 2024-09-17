import React, { useState } from 'react'
import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import MoreHorizSharpIcon from '@mui/icons-material/MoreHorizSharp'

interface PostMenuProps {
  onEdit: () => void
  onDelete: () => void
}

const PostMenu: React.FC<PostMenuProps> = ({ onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

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
