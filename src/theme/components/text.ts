import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

const baseStyle = defineStyle(props => ({
    color: mode('#1f1f1f', '#dbdbdb')(props),
    lineHeight: '1.2',
    fontSize: '16px',
}));

export const Text = defineStyleConfig({ baseStyle });
