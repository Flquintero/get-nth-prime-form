import { Card, Box, Heading } from "@radix-ui/themes";
import CForm from "./Form";

const App = () => {
  return (
    <Box maxWidth="500px" p="3" mx="auto" mt="100px">
      <Card size="2">
        <Heading as="h1" size="5" mt="3" mb="4" align="center">
          Get Nth Prime Number
        </Heading>
        <CForm />
      </Card>
    </Box>
  );
};

export default App;
