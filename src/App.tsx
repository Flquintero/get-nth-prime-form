import { useState } from "react";
import {
  Flex,
  Text,
  Grid,
  Button,
  Card,
  Box,
  TextField,
  Heading,
} from "@radix-ui/themes";
import { getNthPrime } from "nth-prime-retriever";

const App = () => {
  const [nthPosition, setNthPosition] = useState<number | undefined>();
  const [nthNumber, setNthNumber] = useState<number | null>();
  const handleSetNthPositon = (nthPosition: number): void => {
    if (nthNumber) setNthNumber(null);
    setNthPosition(nthPosition);
  };
  const handleSetNthNumber = (): void => {
    setNthNumber(getNthPrime(nthPosition as number));
  };
  return (
    <Box maxWidth="500px" p="3" mx="auto" mt="100px">
      <Card size="2">
        <Flex direction="column" gap="3">
          <Heading as="h1" size="5" my="2" align="center">
            Get Nth Prime Number
          </Heading>
          <Grid gap="2">
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                handleSetNthNumber();
              }}
            >
              <TextField.Root
                size="3"
                type="number"
                placeholder="Enter nth position"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleSetNthPositon(parseInt(e.target.value))
                }
              />
            </form>
          </Grid>
          <Grid columns="1">
            <Button type="submit" size="3" my="3">
              Get Number
            </Button>
            {nthNumber && (
              <Text as="div" size="5" mt="2" align="center">
                For the {nthPosition} position the prime number is {nthNumber}
              </Text>
            )}
          </Grid>
        </Flex>
      </Card>
    </Box>
  );
};

export default App;
