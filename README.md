# chakra-ui-headless-setup

This is an example of how to setup Chakra-UI in a headless manner, without using the predefined theme.

Folder structure
- `theme`
    - `foundations`
    - `components`


# Step by step guide

## Installation

`npm i @chakra-ui/provider @chakra-ui/theme @chakra-ui/anatomy @chakra-ui/system`

## Create the `theme` folder

```typescript
// theme/theme.ts

import { ThemeConfig } from '@chakra-ui/theme';
import { components } from './components';
import { foundations } from './foundations';

const config: ThemeConfig = {
    useSystemColorMode: true,
    initialColorMode: 'dark',
    cssVarPrefix: 'your-prefix',
};

export const theme = {
    components,
    ...foundations,
    config,
};
```

```typescript
// theme/index.ts

export * from './theme';
```

```typescript
// theme/components/index.ts

export const components = {};
```

```typescript
// theme/foundations/index.ts

export const foundations = {};
```

## Add the provider

```tsx
// Entry point of the application (usually `index.tsx` or `main.tsx` if you're using Vite)
import { theme } from './theme';

<ChakraProvider theme={theme}>
    <App />
</ChakraProvider>
```

## Configure `foundations`
You can create files for each foundation property (`blur`, `borders`,
`breakpoints`, `colors`, `radius`, etc.) like showcased in the [official
repo](https://github.com/chakra-ui/chakra-ui/tree/main/packages/components/theme/src/foundations).

### Example for colors
1. Create `colors.ts` inside `foundations`
```typescript
// theme/foundations/colors.ts

export const colors = {
    primary: '#1f1f1f',
    secondary: '#dbdbdb',
};
```
2. Add `colors` to `foundations`
```typescript
// theme/foundations/index.ts

import { colors } from './colors';

export const foundations = {
    colors,
};
```

## Style `components`

### `Text` example
1. `npm i @chakra-ui/layout`
2. Create a new file inside `components` called `text.ts`.
4. Create a new `text.ts` file inside `components`
```typescript
// theme/components/text.ts

import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

const baseStyle = defineStyle(props => ({
    color: mode('#1f1f1f', '#dbdbdb')(props),
    lineHeight: '1.2',
    fontSize: '16px',
}));

export const Text = defineStyleConfig({ baseStyle });
```
5. Add `Text` to `components`
```typescript
// theme/components/index.ts

import { Text } from './text';

export const components = {
    Text,
};
```
6. You're done! Usage
```tsx
import { Text } from '@chakra-ui/layout';
...
<Text>Hello!</Text>
```

### `Input` example

1. `npm i @chakra-ui/input`
2. Create a new file inside `components` called `input.ts`. We can now follow the steps from the [official documentation](https://chakra-ui.com/docs/components/input/theming#customizing-the-default-theme).
4. Create a new `input.ts` file inside `components`
```typescript
// theme/components/input.ts

import { inputAnatomy } from '@chakra-ui/anatomy';
// Import `createMultiStyleConfigHelpers` from `@chakra-ui/system`, not `@chakra-ui/react` as mentioned in the docs
import { createMultiStyleConfigHelpers } from '@chakra-ui/system';
import { mode } from '@chakra-ui/theme-tools';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    inputAnatomy.keys
);

const baseStyle = definePartsStyle(props => ({
    field: {
        // To use `mode`, install `@chakra-ui/theme-tools`
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
```
5. Add `Input` to `components`
```typescript
// theme/components/index.ts

import { Text } from './text';
import { Input } from './input';

export const components = {
    Text,
    Input,
};
```
6. You're done! Usage
```tsx
import { Input } from '@chakra-ui/input';
...
<Input placeholder="Hello!" />
```

## Generate typings for your theme

Follow the steps from the [official documentation](https://chakra-ui.com/docs/styled-system/cli).

1. Add a command
```json
// package.json
{
  ...
  "scripts": {
    ...
    "theme": "chakra-cli tokens theme",
    "theme:watch": "chakra-cli tokens theme --watch",
  },
  ...
}
```
2. `npm run theme:watch`

Note: You might have to restart VSCode to see the changes.

Note: You might get an error about `"type": "module"`. Removing it is one way to
solve the issue, but probably not the recommended solution for all projects.
# FAQ

##### How do I know which package to install if I want to use component X?
The name of the packages are written in the documentation, at the top of the
page, under the description.
![npm package](https://i.gyazo.com/1510078e653ff46772e89ba83f37cd23.png)

##### How do I know how to call the files inside `components`?
The names of the files inside `components` usually correspond to the name in lower case of the component you're looking to style. You can also check the [official `components` folder](https://github.com/chakra-ui/chakra-ui/tree/main/packages/components/theme/src/components) if you get confused.