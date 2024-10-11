import { GridItem, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CustomDivider } from "../../CustomDivider/CustomDivider";
import loadText from "../../../utils/loadText";
import hljs from "highlight.js"; // Use ES6 import for consistency
import React from "react";
import { JSEncrypt } from "jsencrypt";
import {Crypto} from "cryptojs";

const hljsDefineSolidity = require("highlightjs-solidity");

require("highlight.js/styles/atom-one-dark.css");

hljsDefineSolidity(hljs);

export default function FMSpec({ id, language = "solidity" }) {
//   const [code, setCode] = useState("");
//   let [value, setValue] = React.useState("");
//   let [encryptedValue, setEncryptedValue] = React.useState("");


//   const publicKey = `
// -----BEGIN PUBLIC KEY-----
// MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN
// FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76
// xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4
// gwQco1KRMDSmXSMkDwIDAQAB
// -----END PUBLIC KEY-----`;


//   useEffect(() => {
//     const loadContents = async () => {
//       try {
//         const sourcesFile = await import(`../../db/ctf/challenges/${id}.sol`);
//         const targetText =
//           typeof sourcesFile === "string" ? sourcesFile : sourcesFile.default;
//         const text = await loadText(targetText);
//         setCode(text);
//       } catch (e) {
//         console.error("Error loading content: ", e);
//       }
//     };

//     loadContents();
//   }, [id]); // Depend on ID to reload if it changes

//   const renderHighlightedCode = (content, lang) => {
//     const adaptedLanguage = lang; // Set the language based on props or logic

//     const highlightedCode = hljs.highlight(content, {
//       language: adaptedLanguage,
//     }).value;

//     const lineNumbers = highlightedCode
//       .split(/\n/)
//       .map(
//         (line, index) =>
//           `<tr key=${index}>
//           <td class="line-number" data-pseudo-content="${index + 1}"></td>
//           <td>${line || " "}</td>
//         </tr>`
//       )
//       .join("");

//     return `<pre><code><table class='code-table'>${lineNumbers}</table></code></pre>`;
//   };

//   let handleInputChange = (e) => {
//     var encrypt = new JSEncrypt();
//     encrypt.setPublicKey(publicKey);
//     let encrypted = Crypto.AES.e //.encrypt(e.target.value, publicKey).toString(); //encrypt..encrypt(e.target.value);
//     console.info("encrypted: ", encrypted);
//     // let inputValue = e.target.value
//     setValue(e.target.value)
//     setEncryptedValue(encrypted)
//   }

  return (
    <>
      <CustomDivider title={"STEP 1: Encrypt"} padding="5" />
      <GridItem colSpan={1}>
        <Textarea placeholder='Put your spec here' value={value} onChange={handleInputChange} />
      </GridItem>
      <CustomDivider title={"STEP 2: copy encrypted spec"} padding="5" />
      <Textarea placeholder='Here is a sample placeholder' value={encryptedValue} />
      <CustomDivider title={"STEP 3: send  to IPFS"} padding="5" />
      <Textarea placeholder='Here is a sample placeholder' />
      <CustomDivider title={"STEP 4: send  to blockchain"} padding="5" />
      <Textarea placeholder='Here is a sample placeholder' />

    </>
  );
}
