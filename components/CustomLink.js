import { Link as MuiLink } from '@mui/material';
import { forwardRef } from 'react';

const CustomLink = forwardRef(({ onClick, href, name }, ref) => {
  return (
    <>
      <MuiLink href={href} onClick={onClick} ref={ref}>
        {name}
      </MuiLink>
    </>
  );
});

export default CustomLink;
