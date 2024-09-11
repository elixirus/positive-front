import { Box, Link, useToast } from "@chakra-ui/react";
import { CopyIcon } from '@chakra-ui/icons'

function CopiableInstance({ currentInstance }) {
  const toast = useToast();

  console.log("currentInstance: ", currentInstance)

  const handleCopy = () => {

    async function copyToClipboard(textToCopy) {
      // Navigator clipboard api needs a secure context (https)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy).then(() => {
          showToast("Success", "The address is copied to the clipboard", "success");
        })
          .catch((err) => {
            showToast("Error", "Failed to copy the address.", "error");
            console.error("Copy error: ", err);
          });
      } else {
        // Use the 'out of viewport hidden text area' trick
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;

        // Move textarea out of the viewport so it's not visible
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";

        document.body.prepend(textArea);
        textArea.select();

        try {
          document.execCommand('copy');
          showToast("Success", "The address is copied to the clipboard.", "success");

        } catch (error) {
          showToast("Error", "Failed to copy the address.", "error");
          console.error("Copy error:", err);

          console.error(error);
        } finally {
          textArea.remove();
        }
      }
    }
    copyToClipboard(currentInstance)
  };

  const showToast = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 600,
      isClosable: true,
    });
  };

  return (
    <Box>

      <p >
        Current Instance:{" "}
        <Link href={"https://amoy.polygonscan.com/address/" + currentInstance} style={{ textDecoration: "underline" }}>
          {currentInstance.substr(0, 10) + "..." + currentInstance.substr(34)}
        </Link> {" "}
        <CopyIcon style={{ cursor: "pointer" }} onClick={handleCopy} w={5} h={5} />
      </p>
    </Box>
  );
}

export default CopiableInstance;
