import { styled } from '@mui/material'

interface StyledImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Image = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover'
})

const StyledImage = ({ src, alt, ...props }: StyledImageProps) => {
  return <Image src={src} alt={alt} {...props} />
}

export default StyledImage
