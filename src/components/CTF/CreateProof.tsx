import { useRef } from "react";
import { Button, useToast, Box } from "@chakra-ui/react";
import { Contract } from "ethers";
import under_abi from "../../db/ctf/Underconstrained.json";

const snarkjs = window.snarkjs;

function CreateProof({ provider, addr }) {
  const fileInputRef = useRef(null);
  const toast = useToast();

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

    try {
      const data = new Uint8Array(await file.arrayBuffer());
      const { proof, publicSignals } = await snarkjs.groth16.prove(
        "/circuit.zkey",
        data
      );
      const verificationKey = await snarkjs.zKey.exportVerificationKey(
        "/circuit.zkey"
      );
      const isValidProof = await snarkjs.groth16.verify(
        verificationKey,
        publicSignals,
        proof
      );

      if (isValidProof) {
        showToast(
          "Success",
          "The proof has been successfully created",
          "success"
        );
        console.log(proof);

        await verifyOnChain(proof, publicSignals);
      } else {
        showToast("Error", "The proof is not valid", "error");
      }
    } catch (error) {
      console.error("Error during file processing:", error);
      showToast("Error", error.message, "error");
    }

    event.target.value = null;
  };

  const verifyOnChain = async (proof, publicSignals) => {
    try {
      const contract = new Contract(addr, under_abi, provider);
      const signer = await provider.getSigner();
      const connectedContract = contract.connect(signer);
      await connectedContract.verify(
        [proof.pi_a[0], proof.pi_a[1]],
        [
          [proof.pi_b[0][1], proof.pi_b[0][0]],
          [proof.pi_b[1][1], proof.pi_b[1][0]],
        ],
        [proof.pi_c[0], proof.pi_c[1]],
        publicSignals
      );
    } catch (error) {
      console.error("Verification error on the blockchain:", error);
      showToast("Error", "Verification error on the blockchain.", "error");
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Box>
      <Button colorScheme="red" width={"sm"} onClick={handleClick}>
        Check the proof
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept=".wtns"
      />
    </Box>
  );
}

export default CreateProof;
