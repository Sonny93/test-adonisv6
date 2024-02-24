import styled from '@emotion/styled'

const RoundedImage = styled.img<{ size?: number }>(({ size = 24 }) => ({
  height: size + 'px',
  width: size + 'px',
  borderRadius: '50%',
}))

export default RoundedImage
