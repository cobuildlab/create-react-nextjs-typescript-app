import React from 'react';
import { TextField as MUITextField, MenuItem, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const TextField = styled(MUITextField)({
  minWidth: 140
});

export const SelectPageSize: React.FC<TextFieldProps> = (props) => (
  <TextField label='' select {...props}>
    <MenuItem value={5}>5 Row(s)</MenuItem>
    <MenuItem value={10}>10 Row(s)</MenuItem>
    <MenuItem value={12}>12 Row(s)</MenuItem>
  </TextField>
);

SelectPageSize.defaultProps = {
  defaultValue: 12,
};
