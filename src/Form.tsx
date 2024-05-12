import { useState } from "react";
import { Button, TextField, Callout } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import "./Form.css";
import { getNthPrime } from "nth-prime-retriever";

const CForm = () => {
  const [nthPosition, setNthPosition] = useState<number | undefined>();
  const [nthNumber, setNthNumber] = useState<number | null>();
  const [hasError, setHasError] = useState<boolean>(false);
  const handleSetNthPositon = (nthPosition: number): void => {
    resetForm();
    setNthPosition(nthPosition);
  };
  const resetForm = (): void => {
    if (nthNumber) setNthNumber(null);
    if (hasError) setHasError(false);
  };
  const handleSetNthNumber = (): void => {
    try {
      const nthPrime = getNthPrime(nthPosition as number);
      setNthNumber(nthPrime);
    } catch (error: any) {
      setHasError(true); // To do: Include actual error message from package
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
          disabled={!nthPosition}
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
      {hasError && (
        <Callout.Root color="tomato">
          <Callout.Text>
            So sorry but for now the Nth Position limit is 1000000
          </Callout.Text>
        </Callout.Root>
      )}
    </Form.Root>
  );
};

export default CForm;
