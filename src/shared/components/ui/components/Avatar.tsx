import {
  Avatar as MUIAvatar,
  AvatarProps as MUIAvatarProps
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC } from 'react';

interface MUIAvatarStyledProps extends MUIAvatarProps {
  size?: 'extra-small' | 'small' | 'medium' // | 'large' | 'extra-large'
}

const AvatarStyled = styled(MUIAvatar, {
  shouldForwardProp: (prop) => prop !== 'size',
})<MUIAvatarStyledProps>(({ theme, size }) => ({
  ...(size === 'extra-small' && { width: '24px', height: '24px' }),
  ...(size === 'small' && { width: '29px', height: '29px' }),
  ...(size === 'medium' && { width: '45px', height: '45px' }),
}));

type AvatarProps = {
  size?: MUIAvatarStyledProps['size']
  alt?: string,
  src: string,
}

/**
 *
 * @param root0
 * @param root0.alt
 * @param root0.src
 * @param root0.size
 */
export const Avatar: FC<AvatarProps> = ({ alt, src, size }) => (
  <AvatarStyled
    size={size || 'medium'}
    alt={alt || ''}
    src={src}
  />
);
