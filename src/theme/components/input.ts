import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/system';
import { mode } from '@chakra-ui/theme-tools';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    inputAnatomy.keys
);

const baseStyle = definePartsStyle(props => ({
    field: {
        bgColor: mode('#a1afc4', '#292d33')(props),
        borderRadius: 4,
        padding: 8,
        width: '100%',
        _placeholder: {
            color: mode('#1f1f1f', '#dbdbdb')(props),
        },
    },
}));

export const Input = defineMultiStyleConfig({ baseStyle });
