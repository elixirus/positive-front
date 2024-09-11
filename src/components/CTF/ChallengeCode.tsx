import { GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CustomDivider } from "../CustomDivider/CustomDivider";
import loadText from "../../utils/loadText";
import hljs from "highlight.js"; // Use ES6 import for consistency

const hljsDefineSolidity = require("highlightjs-solidity");

require("highlight.js/styles/atom-one-dark.css");

hljsDefineSolidity(hljs);

export default function ChallengeCode({ id, language = "solidity" }) {
  const [code, setCode] = useState("");

  useEffect(() => {
    const loadContents = async () => {
      try {
        const sourcesFile = await import(`../../db/ctf/challenges/${id}.sol`);
        const targetText =
          typeof sourcesFile === "string" ? sourcesFile : sourcesFile.default;
        const text = await loadText(targetText);
        setCode(text);
      } catch (e) {
        console.error("Error loading content: ", e);
      }
    };

    loadContents();
  }, [id]); // Depend on ID to reload if it changes

  const renderHighlightedCode = (content, lang) => {
    const adaptedLanguage = lang; // Set the language based on props or logic

    const highlightedCode = hljs.highlight(content, {
      language: adaptedLanguage,
    }).value;

    const lineNumbers = highlightedCode
      .split(/\n/)
      .map(
        (line, index) =>
          `<tr key=${index}>
          <td class="line-number" data-pseudo-content="${index + 1}"></td>
          <td>${line || " "}</td>
        </tr>`
      )
      .join("");

    return `<pre><code><table class='code-table'>${lineNumbers}</table></code></pre>`;
  };

  return (
    <>
      <CustomDivider title={"Solidity code"} padding="5" />
      <GridItem colSpan={1}>
        <div
          dangerouslySetInnerHTML={{
            __html: renderHighlightedCode(code, language),
          }}
        />
      </GridItem>
    </>
  );
}
