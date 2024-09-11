// import Head from 'next/head';
import {
  Tag,
} from "@chakra-ui/react";
import ctf_address from "../../../db/ctf/ctf_address.json";
import {
  CtfUser,
} from "../../../utils/ctf.utils";
import { Tr, Td } from "@chakra-ui/react";
import challenges from "../../../db/ctf/challenges.json";

export default function LeaderboardUserInfo(user: CtfUser, key: any) {

  // console.log("index: ", key)

  const calcPoints = (user: CtfUser) => {

    if (user.level_completed == null) return 0;

    let levelCompl: string[] = [];

    user.level_completed.forEach((item, i) => {
      levelCompl.push(item.toLowerCase());
    });

    let points = 0;

    if (ctf_address.antiRugPull1 == null) {
    }
    if (ctf_address.antiRugPull2 == null) {
    }

    if (ctf_address.dao1 == null) {
    }
    if (ctf_address.dao2 == null) {
    }

    if (
      levelCompl.indexOf(ctf_address.antiRugPull1.toLowerCase()) > -1 ||
      levelCompl.indexOf(ctf_address.antiRugPull2.toLowerCase()) > -1
    ) {
      points += 30;
    }
    if (levelCompl.indexOf(ctf_address.fakeDAO.toLowerCase()) > -1
    ) {
      points += 30;
    }
    if (levelCompl.indexOf(ctf_address.fakeDAO_old_1.toLowerCase()) > -1 ||
      levelCompl.indexOf(ctf_address.fakeDAO_old_2.toLowerCase()) > -1 ||
      levelCompl.indexOf(ctf_address.fakeDAO_old_3.toLowerCase()) > -1 ||
      levelCompl.indexOf(ctf_address.fakeDAO_old_4.toLowerCase()) > -1 ||
      levelCompl.indexOf(ctf_address.fakeDAO_old_5.toLowerCase()) > -1
    ) {
      points += 30;
    }

    if (levelCompl.indexOf(ctf_address.dao1.toLowerCase()) > -1) {
      points += 40;
    }
    if (levelCompl.indexOf(ctf_address.dao2.toLowerCase()) > -1) {
      points += 50;
    }
    if (levelCompl.indexOf(ctf_address.wrappedEther.toLowerCase()) > -1) {
      points += 20;
    }
    if (levelCompl.indexOf(ctf_address.underconstrained.toLowerCase()) > -1) {
      points += 80;
    }
    if (levelCompl.indexOf(ctf_address.formalMethods.toLowerCase()) > -1) {
      points += 80;
    }

    if (levelCompl.indexOf(ctf_address.formalMethods.toLowerCase()) > -1) {
      points += 80;
    }

    if (levelCompl.indexOf(ctf_address.findMe.toLowerCase()) > -1) {

      var index = challenges.challenges.findIndex(function (level) {
        return level.address.toLowerCase() == ctf_address.findMe.toLowerCase()
      });

      points += challenges.challenges[index].points;
    }

    if (levelCompl.indexOf(ctf_address.predictTheFuture.toLowerCase()) > -1) {
      var index = challenges.challenges.findIndex(function (level) {
        return level.address.toLowerCase() == ctf_address.predictTheFuture.toLowerCase()
      });

      points += challenges.challenges[index].points;
    }

    if (levelCompl.indexOf(ctf_address.lift.toLowerCase()) > -1) {
      var index = challenges.challenges.findIndex(function (level) {
        return level.address.toLowerCase() == ctf_address.lift.toLowerCase()
      });

      points += challenges.challenges[index].points;
    }

    if (levelCompl.indexOf(ctf_address.lendingPool.toLowerCase()) > -1) {
      var index = challenges.challenges.findIndex(function (level) {
        return level.address.toLowerCase() == ctf_address.lendingPool.toLowerCase()
      });

      points += challenges.challenges[index].points;
    }

    return points;
  };

  const renderTags = (tags: any[] | undefined) => {

    if (tags == undefined) return []

    return (<>
      {
        tags.map((item, i) => (
          <Tag size={"sm"} key={i} variant='solid' colorScheme={item === 'phd2024' ? 'red' : 'blue'}>
            {item} {" "}
          </Tag>))
      }
    </>
    )
  };

  return (
    <Tr key={user.user.address}>
      {/* <Td>{key + 1}</Td> */}

      <Td>
        {/* <Link href={"/user/" + row.address} style={{ textDecoration: "underline" }}>{row.username}</Link> */}
        {user.user.username}
      </Td>
      <Td>{user.user.address}</Td>
      <Td>{user.user.num_levels_completed}</Td>
      <Td>{user.user.avg_completion_time}</Td>
      <Td>{calcPoints(user.user)}</Td>
      <Td>{renderTags(user.user.tags)}</Td>
    </Tr>

  );
}
