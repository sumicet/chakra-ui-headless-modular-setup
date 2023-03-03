import { Input } from '@chakra-ui/input';
import { Box, Center, Text, VStack } from '@chakra-ui/layout';

function App() {
    return (
        <Center width='100%'>
            <VStack>
                <Input color='secondary' placeholder='Placeholder' />
                <Text>A text component</Text>
            </VStack>
        </Center>
    );
}

export default App;
