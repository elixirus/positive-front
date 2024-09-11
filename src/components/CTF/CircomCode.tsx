import { GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CustomDivider } from "../CustomDivider/CustomDivider";
import loadText from "../../utils/loadText";
import hljs from "highlight.js"; // Use ES6 import for consistency

require("highlight.js/styles/atom-one-dark.css");

export default function CircomCode({ id, language = "javascript" }) {
  const [code, setCode] = useState("");

  useEffect(() => {
    async function loadContents() {
      try {
        // Обновляем путь к файлу на нужный JavaScript файл
        const sourcesFile = require(`../../db/ctf/challenges/Underconstrained.circom`);
        let targetText =
          typeof sourcesFile === "string" ? sourcesFile : sourcesFile.default;
        const text = await loadText(targetText);
        setCode(text);
      } catch (e) {
        console.error("Error loading content: ", e);
      }
    }

    loadContents();
  }, [id]);

  const renderHighlightedCode = (content, lang) => {
    const adaptedLanguage = lang; // Set the language based on props or logic
    const highlightedCode = hljs.highlight(content, {
      language: adaptedLanguage,
    }).value;
    const lineNumbers = highlightedCode
      .split(/\n/)
      .map((line, index) => {
        return `<tr>
                  <td class="line-number" data-pseudo-content="${
                    index + 1
                  }"></td>
                  <td>${line || " "}</td>
                </tr>`;
      })
      .join("");

    return `<pre><code><table class='code-table'>${lineNumbers}</table></code></pre>`;
  };

  return (
    <>
      <CustomDivider title={"Circom code"} padding="5" />

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
