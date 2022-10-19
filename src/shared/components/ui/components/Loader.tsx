import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

interface LoaderProps {
  fullPage?: boolean;
  centered?: boolean;
  size?: string;
}

interface WrapperLoaderStyledProps {
  fullPage?: boolean;
  centered?: boolean;
}

const WrapperLoader = styled('div', {
  shouldForwardProp: (prop) => prop !== 'fullPage' && prop !== 'centered',
})<WrapperLoaderStyledProps>(({ fullPage, centered }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  ...(fullPage && {
    height: '100vh',
  }),
  ...(centered && {
    height: '100%',
  }),
}));

/**
 * @param {LoaderProps} props - Props of Loader.
 * @returns {JSX.Element} - Main loader component.
 */
export const Loader: React.FC<LoaderProps> = (props) => {
  if (props.fullPage || props.centered) {
    return (
      <WrapperLoader fullPage={props.fullPage} centered={props.centered}>
        <CircularProgress size={props.size} />
      </WrapperLoader>
    );
  }

  return <CircularProgress size={props.size} />;
};

Loader.defaultProps = {
  fullPage: false,
  centered: false,
  size: '5rem',
};
