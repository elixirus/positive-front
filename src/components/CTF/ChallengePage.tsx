import {
  Button,
  Container,
  Grid,
  GridItem,
  Stack,
  Spinner,
  Center,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { CustomDivider } from "../CustomDivider/CustomDivider";
import { useLocation, useParams } from "react-router-dom";
import ChallengeDescription from "./ChallengeDescription";
import ChallengeCode from "./ChallengeCode";
import addresses from "../../db/ctf/ctf_address.json";
import { useTranslation } from "react-i18next";
import {
  ctfStarted,
  getTotalNoOfLevelInstancesCreatedByPlayer,
  getTotalNoOfLevelInstancesCompletedByPlayer,
  createLevelInstance,
  submitLevelInstance,
  getCurrentLevelInstance,
  getTotalNoOfFailedSubmissionsByPlayer,
  isLevelCompleted,
  joinToFormalChallange,
  joinedToFormal,
} from "../../utils/ctf.utils";
import CreateProof from "./CreateProof";
import ChallengeNavigation from "./ChallengeNavigation";
import CopiableInstance from "./CopiableInstance";
import CircomCode from "./CircomCode";
// import { EventLog, Log } from 'ethers';
// собрать все задачи по событиям TaskCreated
// запросить по нему информацию и вывести в таблицу

import challenges from "../../db/ctf/challenges.json";
import { LevelCompleted, MetamaskDeactivated, MetamaskNotInstalled, NotJoinedToFormal, NotStarted } from "./Notifications/Notifications";
import FMSpec from "./Challenges/FMSpec";

export default function ChallengePage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { account, isActive, provider } = useWeb3React();
  const location = useLocation();

  const [challengeAddress, setChallengeAddress] = useState<string>("");
  const [started, setStarted] = useState<boolean>(false);
  const [instanceCreated, setInstanceCreated] = useState<number>(0);
  const [instanceCompleted, setInstanceCompleted] = useState<number>(0);
  const [instanceFailed, setInstanceFailed] = useState<number>(0);
  const [currentInstance, setCurrentInstance] = useState<string>("");
  const [challangeType, setChallangeType] = useState<string>("");
  const [levelCompleted, setLevelCompleted] = useState<boolean>(false);
  const [isJoned, setJoinToFormal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [levelDifficult, setLevelDifficult] = useState<number>(0);
  const [levelCategory, setLevelCategory] = useState<string>("");
  // const { addresses, setAddresses } = useContext(AddressContext);
  const toast = useToast();

  useEffect(() => {
    // getNewAddress(provider).then((addresses: any) => {
    //   console.log("address: ", addresses)
    //   setAddresses(addresses);
    // }).catch('error', console.error);

    challenges.challenges.map((e: any) => {
      if (e.name == id) {
        setLevelDifficult(e.difficulty);
        setLevelCategory(e.type);
      }
    });

    const updateChallengeAddress = () => {
      if (!(isActive && account && provider)) return;

      switch (location.pathname) {
        case "/ctf/AntiRugPull":
          // setChallengeAddress(addresses[4]);
          setChallengeAddress(addresses.antiRugPull2);
          setChallangeType("regular");
          break;
        case "/ctf/FakeDAO":
          // setChallengeAddress(addresses[5]);
          setChallengeAddress(addresses.fakeDAO);
          setChallangeType("regular");
          break;
        case "/ctf/DAO_1":
          // setChallengeAddress(addresses[5]);
          setChallengeAddress(addresses.dao1);
          setChallangeType("regular");
          break;
        case "/ctf/DAO_2":
          // setChallengeAddress(addresses[6]);
          setChallengeAddress(addresses.dao2);
          setChallangeType("regular");
          break;
        // case "/ctf/Metamorphic":
        //   setChallengeAddress(addresses.metamorphic);
        //   setChallangeType("regular");
        //   break;
        case "/ctf/WrappedEther":
          // setChallengeAddress(addresses[7]);
          setChallengeAddress(addresses.wrappedEther);
          setChallangeType("regular");
          break;
        case "/ctf/Underconstrained":
          // setChallengeAddress(addresses[8]);
          setChallengeAddress(addresses.underconstrained);
          setChallangeType("zk");
          break;
        case "/ctf/FormalMethods":
          // setChallengeAddress(addresses[9]);
          setChallengeAddress(addresses.formalMethods);
          setChallangeType("formal");
          break;
        case "/ctf/FindMe":
        case "/ctf/LendingPool":
        case "/ctf/Lift":
        case "/ctf/PredictTheFuture":
        default:
          setChallengeAddress("");
          break;
      }
    };

    const fetchData = async () => {
      if (!(isActive && account && provider)) return;

      try {
        const code = await provider.getCode(addresses.positiveCTF);
        if (code === "0x") return;

        // CTF STARTED
        const started = await ctfStarted(provider);
        setStarted(started);

        const instancesCreated =
          await getTotalNoOfLevelInstancesCreatedByPlayer(account, provider);
        setInstanceCreated(instancesCreated);

        const instancesCompleted =
          await getTotalNoOfLevelInstancesCompletedByPlayer(account, provider);
        setInstanceCompleted(instancesCompleted);

        const joined = await joinedToFormal(account, provider);
        setJoinToFormal(joined);

        const currentInstance = await getCurrentLevelInstance(
          account,
          challengeAddress,
          provider
        );
        setCurrentInstance(currentInstance);

        const instancesFailed = await getTotalNoOfFailedSubmissionsByPlayer(
          account,
          provider
        );
        setInstanceFailed(instancesFailed);

        const levelCompleted = await isLevelCompleted(
          account,
          challengeAddress,
          provider
        );
        setLevelCompleted(levelCompleted);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    updateChallengeAddress();
    fetchData();
  }, [
    location.pathname,
    isActive,
    account,
    provider,
    challengeAddress,
    loading,
  ]);

  const handleJoinToChallenge = () => {
    if (!(isActive && account && provider)) return;
    joinToFormalChallange(challengeAddress, provider, "0");
  };

  const showToast = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 10000,
      isClosable: true,
    });
  };

  const handleCreateLevelInstance = () => {
    if (!(isActive && account && provider)) return;

    setLoading(true);

    try {
      location.pathname === "/ctf/WrappedEther"
        ? createLevelInstance(challengeAddress, provider, "0.001").then(
          (result) => {
            if (result == "error") {
              setLoading(false);
              return;
            }

            result
              .wait()
              .then((result: any) => {
                setLoading(false);
              })
              .catch((error: any) => {
                setLoading(false);
              });
          }
        )
        : location.pathname === "/ctf/DAO_1" || location.pathname === "/ctf/FakeDAO" || location.pathname === "/ctf/DAO_2"
          ? createLevelInstance(
            challengeAddress,
            provider,
            "0.017329992840538346"
          ).then((result) => {
            if (result[0] == "error") {
              console.log("result[1]: ", result[1])

              if (result[1].code === -32000)
                showToast("Error", result[1].message, "error");
              console.error("Copy error:", result[1]);
              setLoading(false);
              return;
            }

            result
              .wait()
              .then((result: any) => {
                setLoading(false);
              })
              .catch((error: any) => {
                console.log("result wait: ", error)
                setLoading(false);
              });
          })
          : location.pathname === "/ctf/DAO_2"
            ? createLevelInstance(
              challengeAddress,
              provider,
              "0.017329992840538344"
            ).then((result) => {
              if (result[0] == "error") {
                console.log("result[1]: ", result[1])

                if (result[1].code === -32000)
                  showToast("Error", result[1].message, "error");
                console.error("Copy error:", result[1]);
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
            })
            : // else
            createLevelInstance(challengeAddress, provider, "0").then(
              (result) => {
                if (result[0] == "error") {
                  console.log("result[1]: ", result[1])

                  if (result[1].code === -32000)
                    showToast("Error", result[1].message, "error");
                  console.error("Copy error:", result[1]);
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
              }
            );
    } catch (error) {
      console.error("Error: ", error);
      setLoading(false);
    }
  };

  const handleSolve = () => {
    if (!(isActive && account && provider)) return;

    setLoading(true);

    try {
      submitLevelInstance(currentInstance, provider).then((result) => {
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
      console.error("Error: ", error);
      setLoading(false);
    }
  };

  const renderButtons = (challangeType: any) => {
    return (<>
      {challangeType === "regular" ? (
        <>
          {" "}
          {!loading ? (
            <>
              <Button
                colorScheme="red"
                width={"sm"}
                onClick={handleCreateLevelInstance}
              >
                Create Instanse
              </Button>
              <Button
                colorScheme="red"
                width={"sm"}
                onClick={handleSolve}
              >
                Submit Instanse
              </Button>
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
      ) : (
        <>
          {location.pathname == "/ctf/Underconstrained" && (
            <>
              {" "}
              {!loading ? (
                <>
                  <Button
                    colorScheme="red"
                    width={"sm"}
                    onClick={handleCreateLevelInstance}
                  >
                    Create Instanse
                  </Button>
                  <CreateProof
                    provider={provider}
                    addr={currentInstance}
                  />

                  <Button
                    colorScheme="red"
                    width={"sm"}
                    onClick={handleSolve}
                  >
                    Submit Instanse
                  </Button>
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
          )}

          {location.pathname == "/ctf/FormalMethods" && (NotJoinedToFormal(joinedToFormal, currentInstance, challengeAddress))}
        </>
      )}</>)
  }

  return (
    <Container maxW={"7xl"}>
      <Grid
        // templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem colSpan={4}>
          <ChallengeDescription id={id} />
          {location.pathname === "/ctf/Underconstrained" && (
            <CircomCode id={id} />
          )}
          {location.pathname == "/ctf/FormalMethods" && (
            <FMSpec id={id} />
          )}

          {location.pathname !== "/ctf/FormalMethods" && (
            <ChallengeCode id={id} />
          )}

          {/* <EventList events={eventsCreatedInstanse} /> */}
        </GridItem>

        <GridItem colSpan={1}>
          <CustomDivider title={t("challengeMetaInfo")} padding="5" />

          <p>
            {t("challengeName")}: {id}
          </p>
          <p>
            {t("challengeCategory")}: {levelCategory}
          </p>
          {/* <p>Срок: </p> */}
          <p>Difficulty: {levelDifficult}</p>
          {/* <p>Тип: </p> */}

          <CustomDivider title="Your stats" padding="5" />
          <CopiableInstance
            currentInstance={
              challangeType === "formal" ? challengeAddress : currentInstance
            }
          />

          <CustomDivider title="Actions" padding="5" />

          <Stack spacing={4}>

            {
              !provider?.provider.isMetaMask ? (MetamaskNotInstalled())
                : (!isActive ? (MetamaskDeactivated())
                  : (!started ? (NotStarted())
                    : (renderButtons(challangeType))))
            }

            {levelCompleted ? (LevelCompleted()) : (<></>)}

            <ChallengeNavigation />
          </Stack>

        </GridItem>
      </Grid>
    </Container>
  );
}
