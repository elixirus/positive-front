import { Contract } from "ethers";
import { Contract as ContractEtherProject } from "@ethersproject/contracts";
import { Web3Provider } from "@ethersproject/providers";
import positoken_abi from "../db/positoken/PosiCoin.json";
import addresses from "../db/positoken/positoken_address.json";

export const sendPosiToMerchant = async (merchant: string,
  amount: string,
  provider: Web3Provider): Promise<String> => {

  const positoken_contract = new ContractEtherProject(
    addresses.posiToken,
    positoken_abi.abi,
    provider
  );
  const connectedContract = positoken_contract.connect(provider.getSigner());

  const res = await connectedContract.transfer(merchant, amount).then((result: string) => {
    console.log("sendPosiToMerchant result: ", result);
    return result
  })
    .catch((error: any) => {
      console.log("sendPosiToMerchant error: ", error);
      return "error"
    });

  return res;
};

export const getUserPosiBalance = async (account: string, provider: Web3Provider): Promise<Number> => {

  console.log("account: ", account)
  const positoken_contract: Contract = new Contract(
    addresses.posiToken,
    positoken_abi.abi,
    provider
  );

  const res = await positoken_contract
    .balanceOf(account)
    .then((result: string) => {
      console.log("PosiToken balanceOf: ", result);

      return Number(result);
    })
    .catch((error: any) => {
      console.log("PosiToken balanceOf -- CATCH ERROR: ", error.code);
      return false;
    });
  return res;
};
