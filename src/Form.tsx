import { useState } from "react";
import { Button, TextField, Callout } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import "./Form.css";
import { getNthPrime } from "nth-prime-retriever";

const CForm = () => {
  const [nthPosition, setNthPosition] = useState<number | null>();
  const [nthNumber, setNthNumber] = useState<number | null>();
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isNthPositionEmpty = [undefined, null, NaN].includes(
    nthPosition as null | undefined
  );
  const isButtonDisabled = isNthPositionEmpty || isLoading;
  const handleSetNthPositon = (nthPosition: number): void => {
    resetForm();
    setNthPosition(nthPosition);
  };
  const resetForm = (): void => {
    if (nthNumber) setNthNumber(null);
    if (errorMessage) setErrorMessage(null);
  };
  const handleSetNthNumber = (): void => {
    try {
      // To Do: Finish implement loading, could need extra changes in package, for higher numbers
      setIsLoading(true);
      const nthPrime = getNthPrime(nthPosition as number);
      setNthNumber(nthPrime);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form.Root
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSetNthNumber();
      }}
    >
      <Form.Field
        name="nth-position"
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleSetNthPositon(parseInt(e.target.value))
        }
      >
        <Form.Control asChild>
          <TextField.Root
            placeholder="Enter Nth Position"
            size="3"
            type="number"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSetNthPositon(parseInt(e.target.value))
            }
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <Button
          className="submit-button"
          disabled={isButtonDisabled}
          loading={isLoading}
          type="submit"
          size="3"
          my="3"
        >
          Get Number
        </Button>
      </Form.Submit>
      {nthNumber && (
        <Callout.Root color="grass">
          <Callout.Text>
            For the {nthPosition} position the prime number is {nthNumber}
          </Callout.Text>
        </Callout.Root>
      )}
      {errorMessage && (
        <Callout.Root color="tomato">
          <Callout.Text>{errorMessage}</Callout.Text>
        </Callout.Root>
      )}
    </Form.Root>
  );
};

export default CForm;
