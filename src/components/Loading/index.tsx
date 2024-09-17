import React from 'react'
import { Box, Skeleton } from '@mui/material'

interface LoadingComponentProps {
  type: 'text' | 'rectangular' | 'circular'
  width?: number | string
  height?: number | string
  count?: number // Number of skeletons to display for repeated elements
  animation?: 'pulse' | 'wave' | false
}

/**
 * LoadingComponent
 * A reusable loading component that shows different types of skeletons based on props.
 */
const LoadingComponent: React.FC<LoadingComponentProps> = ({
  type,
  width = '100%', // Default width
  height = 40, // Default height for text and rectangular types
  count = 1, // Default number of skeletons
  animation = 'pulse' // Animation type, defaults to 'pulse'
}) => {
  // Render multiple skeletons based on the count
  const skeletons = Array.from({ length: count }).map((_, index) => (
    <Skeleton
      key={index}
      variant={type}
      width={width}
      height={height}
      animation={animation}
      sx={{ marginBottom: 1 }} // Add margin for better spacing between skeletons
    />
  ))

  return <Box>{skeletons}</Box>
}

export default LoadingComponent
