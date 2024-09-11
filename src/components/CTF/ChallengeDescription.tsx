import { GridItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CustomDivider } from "../CustomDivider/CustomDivider";
import loadText from "../../utils/loadText";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


// type TaskEvent = {
//     // TODO: информация по событиям происходщяим с задачей
// }

// собрать все задачи по событиям TaskCreated
// запросить по нему информацию и вывести в таблицу

// function wrapHex(hex: string) {
//     return ethers.utils.parseBytes32String(ethers.utils.hexlify(hex))
// }

export default function ChallengeDescription({ id }: any) {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    const loadContents = async (sourcesFile: any) => {
      let targetText =
        typeof sourcesFile === "string" ? sourcesFile : sourcesFile.default;
      try {
        const text = await loadText(targetText);
        setText(text);
      } catch (e) {
        console.log("error: ", e);
      }
    };

    // Dynamic import of the challenge file based on id
    import(`../../db/ctf/challenges/${id}.md`)
      .then((module) => loadContents(module))
      .catch((e) => console.log("error: ", e));
  }, [id]); // Depend on id to reload if it changes

  return (
    <>
      <CustomDivider title={"Description"} padding="5" />
      <GridItem colSpan={1}>
        <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
      </GridItem>
    </>
  );
}
