import {
  Button,
  Container,
  Grid,
  GridItem,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { CustomDivider } from "../CustomDivider/CustomDivider";
import { useLocation, useParams } from "react-router-dom";
import addresses from "../../db/ctf/ctf_address.json";
import { getUserPosiBalance, sendPosiToMerchant } from "../../utils/positoken.utils";
import React from "react";
import CopiableInstance from "../CTF/CopiableInstance";

export default function PosiToken() {
  const { account, isActive, provider } = useWeb3React();
  const location = useLocation();

  const [amount, setAmount] = useState<string>("0");
  const [userBalance, setUserBalance] = useState<Number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [merchant, setMerchant] = useState<string>("")

  const handleAmount = (e) => setAmount(e.target.value)
  const isErrorAmount = amount === "0"
  const isErrorMerchant = merchant === ""
  const initialRef = React.useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!(isActive && account && provider)) return;

      try {
        const code = await provider.getCode(addresses.positiveCTF);
        if (code === "0x") return;

        const usrBalance = await getUserPosiBalance(
          account,
          provider
        );
        setUserBalance(usrBalance);

      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchData();
  }, [
    location.pathname,
    isActive,
    account,
    provider,
    loading,
    userBalance
  ]);

  const handleMerchants = (m: any) => {
    setMerchant(m)
  }

  const handleSendPosiToMerchant = () => {
    if (!(isActive && account && provider)) return;
    if (isErrorAmount) return
    if (isErrorMerchant) return

    setLoading(true);

    try {
      sendPosiToMerchant(merchant, amount, provider).then(
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
    } catch (error) {
      console.error("Error: ", error);
      setLoading(false);
    }
  };

  return (
    <Container maxW={"7xl"}>
      <CustomDivider title="PosiToken" padding="10" />

      <Grid
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem colSpan={4}>
          <FormControl isInvalid={isErrorMerchant}>
            <FormLabel>Merchants</FormLabel>
            <Select placeholder='Select merchants' onChange={(e) => handleMerchants(e.target.value)}>
              <option value={"0x58e77EA8e3B53ec7fE5E00d7F87BA4c704F1Dd35"}>0x58e77EA8e3B53ec7fE5E00d7F87BA4c704F1Dd35</option>
              <option value={"0x64c56051F1d82566205a334dB55835bCb450F2D1"}>0x64c56051F1d82566205a334dB55835bCb450F2D1</option>
              <option value={"0x9BDc2f3ba2472FEb0FDC2c4F53C63816744F433F"}>0x9BDc2f3ba2472FEb0FDC2c4F53C63816744F433F</option>
            </Select>
            {!isErrorMerchant ? (
              <FormHelperText>
              </FormHelperText>
            ) : (
              <FormErrorMessage>Merchant is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isErrorAmount}>
            {/* <FormLabel>Amount</FormLabel> */}
            <Input type='text' value={amount} onChange={handleAmount} ref={initialRef} placeholder='Amount' />
            {!isErrorAmount ? (
              <FormHelperText>
              </FormHelperText>
            ) : (
              <FormErrorMessage>Amount is required.</FormErrorMessage>
            )}

          </FormControl>

        </GridItem>

        <GridItem colSpan={1}>
          <CustomDivider title={"Balance"} padding="5" />

          {!loading ? (
            <>
              Balance: {userBalance}
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

          <CustomDivider title="Actions" padding="5" />

          <>
            <Button
              colorScheme="red"
              onClick={handleSendPosiToMerchant}
            >Send to merchant</Button>
          </>
        </GridItem>
      </Grid>
    </Container>
  );
}
