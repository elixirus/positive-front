import { useRef, useState } from "react";
import { Button, useToast, Box, Center, Spinner } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { sendSpecToBackend } from "../../utils/ctf.utils";

const snarkjs = window.snarkjs;

function CreateFormalSpec({ provider, addr }) {
  const fileInputRef = useRef(null);
  const toast = useToast();
  const { account } = useWeb3React();
  const [loading, setLoading] = useState<boolean>(false);

  const showToast = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
    });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);

    try {
      sendSpecToBackend(account, file).then((result) => {
        if (result == "error") {
          setLoading(false);
          return;
        }

        result
          .wait()
          .then((result: any) => {
            console.log("res.wait: ", result);
            setLoading(false);
          })
          .catch((error: any) => {
            console.log("res.wait error: ", error);
            setLoading(false);
          });
      });
    } catch (error) {
      console.error("Error when sending a file:", error);
      showToast("Error", error.message, "error");
      setLoading(false);
    }

    event.target.value = null;
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Box>
      <>
        {" "}
        {!loading ? (
          <>
            <Button colorScheme="red" width={"sm"} onClick={handleClick}>
              Send spec
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept=".tla"
            />
          </>
        ) : (
          <Center>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        )}
      </>
    </Box>
  );
}

export default CreateFormalSpec;
