import { Contract, EventLog, Log, Provider, ethers } from "ethers";
import { Contract as ContarctEtherProject } from "@ethersproject/contracts";
import axios from "axios";
import { Web3Provider } from "@ethersproject/providers";
import stats_abi from "../db/ctf/Statistics.json";
import ctf_abi from "../db/ctf/PositiveCTF.json";
import fm_abi from "../db/ctf/FormalMethods.json";
import ctf_users from "../db/ctf/ctf_users.json";
import addresses from "../db/ctf/ctf_address.json";

export type CtfUser = {
  username: string;
  address: string;
  level_instance: string[];
  level_completed: string[];
  num_levels_completed: number;
  avg_completion_time: number;
  points: number;
  tags: string[];
};


// export const getNewAddress = async (
//   provider: Web3Provider
// ): Promise<string[]> => {

//   const watcher_contract: Contract = new Contract(
//     ctf_watcher_address,
//     watcher.abi,
//     provider
//   );

//   const res = await watcher_contract
//     .getAddr()
//     .then((result: any) => {
//       // console.log("watcher_contract getAddr: ", result)
//       return result;
//     })
//     .catch((error: any) => {
//       console.log("getNewAddress CATCH ERROR: ", error.code);
//       return 0;
//     });

//   return res;
// };

export const ctfStarted = async (provider: Web3Provider): Promise<boolean> => {

  const positiveCTF = addresses.positiveCTF;

  const ctf_contract: Contract = new Contract(
    positiveCTF,
    ctf_abi.abi,
    provider
  );

  const res = await ctf_contract
    .isStart()
    .then((result: boolean) => {
      console.log("ctfStarted positiveCTF: ", positiveCTF);
      console.log("ctfStarted RESULT: ", result);
      return Boolean(result);
    })
    .catch((error: any) => {
      console.log("ctfStarted -- CATCH ERROR: ", error.code);
      return false;
    });
  return res;
};

export const isRegisted = async (
  account: string,
  provider: Web3Provider
): Promise<boolean> => {

  const positiveCTF = addresses.positiveCTF;

  const ctf_contract: Contract = new Contract(
    positiveCTF,
    ctf_abi.abi,
    provider
  );

  const res = await ctf_contract
    .isPlayerRegisted(account)
    .then((result: string) => {
      console.log("isRegisted -- RESULT: ", result)
      return Boolean(result);
    })
    .catch((error: any) => {
      console.log("isRegisted -- CATCH ERROR: ", error.code);
      return false;
    });

  return res;
};

/// Getters
// общее количество задач создано
export const getTotalNoOfLevelInstancesCreatedByPlayer = async (
  account: string,
  provider: Web3Provider
): number | undefined => {

  const proxyStats = addresses.proxyStats

  const ctf_stats_contract: Contract = new Contract(
    proxyStats,
    stats_abi.abi,
    provider
  );

  const result = await ctf_stats_contract
    .getTotalNoOfLevelInstancesCreatedByPlayer(account)
    .then((result: any) => {
      return Number(result);
    })
    .catch((error: any) => {
      console.log("getTotalNoOfLevelInstancesCreatedByPlayer CATCH ERROR: ", error.code);
      return 0;
    });

  return result;
};

// общее количество задач выполнено
export const getTotalNoOfLevelInstancesCompletedByPlayer = async (
  account: string,
  provider: Web3Provider
): number | undefined => {

  const proxyStats = addresses.proxyStats


  const ctf_stats_contract: Contract = new Contract(
    proxyStats,
    stats_abi.abi,
    provider
  );

  const res = await ctf_stats_contract
    .getTotalNoOfLevelInstancesCompletedByPlayer(account)
    .then((result: any) => {
      return Number(result);
    })
    .catch((error: any) => {
      console.log("getTotalNoOfLevelInstancesCompletedByPlayer CATCH ERROR: ", error.code);
      return 0;
    });

  return res;
};

export const joinedToFormal = async (
  account: string,
  provider: Web3Provider
): Promise<boolean> => {

  const formal = addresses.formalMethods

  const ctf_stats_contract: Contract = new Contract(
    formal,
    fm_abi.abi,
    provider
  );

  const res = await ctf_stats_contract
    .userJoined(account)
    .then((result: boolean) => {
      return Boolean(result);
    })
    .catch((error: any) => {
      console.log("joinedToFormal CATCH ERROR: ", error.code);
      return false;
    });

  return res;
};

// Общее количество проваленых попыток
export const getTotalNoOfFailedSubmissionsByPlayer = async (
  account: string,
  provider: Web3Provider
): number | undefined => {

  const proxyStats = addresses.proxyStats


  const ctf_stats_contract: Contract = new Contract(
    proxyStats,
    stats_abi.abi,
    provider
  );

  const res = await ctf_stats_contract
    .getTotalNoOfFailedSubmissionsByPlayer(account)
    .then((result: any) => {

      return Number(result);
    })
    .catch((error: any) => {
      console.log("getTotalNoOfFailedSubmissionsByPlayer -- CATCH ERROR: ", error.code);
      return 0;
    });

  return res;
};

// Общее количество уровней выполненных пользователем
export const getTotalNoOfLevelsCompletedByPlayer = async (
  account: string,
  provider: Web3Provider
): number | undefined => {

  const proxyStats = addresses.proxyStats


  const ctf_stats_contract: Contract = new Contract(
    proxyStats,
    stats_abi.abi,
    provider
  );

  const res = await ctf_stats_contract
    .getTotalNoOfLevelsCompletedByPlayer(account)
    .then((result: any) => {
      return Number(result);
    })
    .catch("error", console.error);

  return res;
};

// Общее количество неудачный попыток для конкретного уровня
export const getTotalNoOfFailuresForLevelAndPlayer = async (
  account: string,
  level: string,
  provider: Web3Provider
): number | undefined => {

  const proxyStats = addresses.proxyStats


  const ctf_stats_contract: Contract = new Contract(
    proxyStats,
    stats_abi.abi,
    provider
  );

  const res = await ctf_stats_contract
    .getTotalNoOfFailuresForLevelAndPlayer(level, account)
    .then((result: any) => {
      return Number(result);
    })
    .catch("error", console.error);

  return res;
};

// Проверка выполнен ли уровень
export const isLevelCompleted = async (
  account: string,
  level: string,
  provider: Web3Provider
): Promise<Number> => {

  const proxyStats = addresses.proxyStats

  const ctf_stats_contract: Contract = new Contract(
    proxyStats,
    stats_abi.abi,
    provider
  );

  const res = await ctf_stats_contract
    .isLevelCompleted(account, level)
    .then((result: any) => {
      console.log("resilt: ", result)

      if (result == true) {
        return 1
      } else {
        return 0
      }
    })
    .catch((error: any) => {
      console.log("isLevelCompleted -- ERROR: ", error);
      return 0;
    });

  return res;
};

// Среднее время выполнения уровня
export const getTimeElapsedForCompletionOfLevel = async (
  account: string,
  level: string,
  provider: Web3Provider
): number | undefined => {

  const proxyStats = addresses.proxyStats


  const ctf_stats_contract: Contract = new Contract(
    proxyStats,
    stats_abi.abi,
    provider
  );

  const res = await ctf_stats_contract
    .getTimeElapsedForCompletionOfLevel(account, level)
    .then((result: any) => {
      return Number(result);
    })
    .catch("error", console.error);

  return res;
};

// Непонятно для чего
export const getSubmissionsForLevelByPlayer = async (
  account: string,
  level: string,
  index: number,
  provider: Web3Provider
): number | undefined => {

  const proxyStats = addresses.proxyStats


  const ctf_stats_contract: Contract = new Contract(
    proxyStats,
    stats_abi.abi,
    provider
  );

  const res = await ctf_stats_contract
    .getSubmissionsForLevelByPlayer(account, level, index)
    .then((result: any) => {
      return Number(result);
    })
    .catch("error", console.error);

  return res;
};

// Процент уровней выполнено для пользователя
export const getPercentageOfLevelsCompleted = async (
  account: string,
  level: string,
  index: number,
  provider: Web3Provider
): number | undefined => {

  const proxyStats = addresses.proxyStats


  const ctf_stats_contract: Contract = new Contract(
    proxyStats,
    stats_abi.abi,
    provider
  );

  const res = await ctf_stats_contract
    .getPercentageOfLevelsCompleted(account)
    .then((result: any) => {
      return Number(result);
    })
    .catch("error", console.error);

  return res;
};

// Общее количество задач созданных всеми пользователями
export const getTotalNoOfLevelInstancesCreated = async (
  account: string,
  level: string,
  index: number,
  provider: Web3Provider
): number | undefined => {

  const proxyStats = addresses.proxyStats


  const ctf_stats_contract: Contract = new Contract(
    proxyStats,
    stats_abi.abi,
    provider
  );

  const res = await ctf_stats_contract
    .getTotalNoOfLevelInstancesCreated()
    .then((result: any) => {
      return Number(result);
    })
    .catch("error", console.error);

  return res;
};

// Общее количество задач выполненных всеми пользователями
export const getTotalNoOfLevelInstancesCompleted = async (
  account: string,
  level: string,
  index: number,
  provider: Web3Provider
): number | undefined => {

  const proxyStats = addresses.proxyStats


  const ctf_stats_contract: Contract = new Contract(
    proxyStats,
    stats_abi.abi,
    provider
  );

  const res = await ctf_stats_contract
    .getTotalNoOfLevelInstancesCompleted()
    .then((result: any) => {
      return Number(result);
    })
    .catch("error", console.error);

  return res;
};

// Общее количество проваленых попыток
export const getTotalNoOfFailedSubmissions = async (
  account: string,
  level: string,
  index: number,
  provider: Web3Provider
): number | undefined => {

  const proxyStats = addresses.proxyStats

  const ctf_stats_contract: Contract = new Contract(
    proxyStats,
    stats_abi.abi,
    provider
  );

  const res = await ctf_stats_contract
    .getTotalNoOfFailedSubmissions()
    .then((result: any) => {
      return Number(result);
    })
    .catch("error", console.error);

  return res;
};

// Общее количество игроков
export const getTotalNoOfPlayers = async (
  account: string,
  level: string,
  index: number,
  provider: Web3Provider
): number | undefined => {

  const proxyStats = addresses.proxyStats


  const ctf_stats_contract: Contract = new Contract(
    proxyStats,
    stats_abi.abi,
    provider
  );

  const res = await ctf_stats_contract
    .getTotalNoOfPlayers()
    .then((result: any) => {
      return Number(result);
    })
    .catch("error", console.error);

  return res;
};

// Общее Количество неудачных попыток для уровня
export const getNoOfFailedSubmissionsForLevel = async (
  account: string,
  level: string,
  index: number,
  provider: Web3Provider
): number | undefined => {

  const proxyStats = addresses.proxyStats


  const ctf_stats_contract: Contract = new Contract(
    proxyStats,
    stats_abi.abi,
    provider
  );

  const res = await ctf_stats_contract
    .getNoOfFailedSubmissionsForLevel(level)
    .then((result: any) => {
      return Number(result);
    })
    .catch("error", console.error);

  return res;
};

// Общее Количество выполненных задач для уровня
export const getNoOfCompletedSubmissionsForLevel = async (
  account: string,
  level: string,
  index: number,
  provider: Web3Provider
): number | undefined => {

  const proxyStats = addresses.proxyStats


  const ctf_stats_contract: Contract = new Contract(
    proxyStats,
    stats_abi.abi,
    provider
  );

  const res = await ctf_stats_contract
    .getNoOfCompletedSubmissionsForLevel(level)
    .then((result: any) => {
      return Number(result);
    })
    .catch("error", console.error);

  return res;
};

// Проверка существует ли уровень
export const doesLevelExist = async (
  account: string,
  level: string,
  index: number,
  provider: Web3Provider
): number | undefined => {

  const proxyStats = addresses.proxyStats


  const ctf_stats_contract: Contract = new Contract(
    proxyStats,
    stats_abi.abi,
    provider
  );

  const res = await ctf_stats_contract
    .doesLevelExist(level)
    .then((result: any) => {
      return Number(result);
    })
    .catch("error", console.error);

  return res;
};

// Проверка существует ли пользователь
export const doesPlayerExist = async (
  account: string,
  level: string,
  index: number,
  provider: Web3Provider
): number | undefined => {

  const proxyStats = addresses.proxyStats


  const ctf_stats_contract: Contract = new Contract(
    proxyStats,
    stats_abi.abi,
    provider
  );

  const res = await ctf_stats_contract
    .doesPlayerExist(account)
    .then((result: any) => {
      return Number(result);
    })
    .catch("error", console.error);

  return res;
};

// Общее количество уровней
export const getTotalNoOfCTFLevels = async (
  account: string,
  level: string,
  index: number,
  provider: Web3Provider
): number | undefined => {

  const proxyStats = addresses.proxyStats


  const ctf_stats_contract: Contract = new Contract(
    proxyStats,
    stats_abi.abi,
    provider
  );

  const res = await ctf_stats_contract
    .getTotalNoOfCTFLevels()
    .then((result: any) => {
      return Number(result);
    })
    .catch("error", console.error);

  return res;
};

// Среднее время выполнения уровнней пользователем
export const getAverageTimeTakenToCompleteLevels = async (
  account: string,
  level: string,
  index: number,
  provider: Web3Provider
): number | undefined => {

  const proxyStats = addresses.proxyStats


  const ctf_stats_contract: Contract = new Contract(
    proxyStats,
    stats_abi.abi,
    provider
  );

  const res = await ctf_stats_contract
    .getAverageTimeTakenToCompleteLevels(account)
    .then((result: any) => {
      return Number(result);
    })
    .catch("error", console.error);

  return res;
};

export const getPlayers = async (
  provider: Web3Provider
): string[] | undefined => {

  const proxyStats = addresses.proxyStats


  const ctf_stats_contract: Contract = new Contract(
    proxyStats,
    stats_abi.abi,
    provider
  );

  const res = await ctf_stats_contract
    .getPlayers()
    .then((result: any) => {
      console.log("getPlayers RESULT: ", result);
      return result;
    })
    .catch("error", console.error);

  return res;
};

export const getCurrentLevelInstance = async (
  account: string,
  level: string,
  provider: Web3Provider
): Promise<string> => {

  const positiveCTF = addresses.positiveCTF;


  const ctf_contract: Contract = new Contract(
    positiveCTF,
    ctf_abi.abi,
    provider
  );

  const res = await ctf_contract
    .getCurrentLevelInstance(level, account)
    .then((result: any) => {
      console.log("UTILS getCurrentLevelInstance -- RESULT: ", result);
      return String(result);
    })
    .catch((error: any) => {
      console.log("UTILS getCurrentLevelInstance -- ERROR: ", error);
      return "0x0"
    })

  return res;
};

/// Creaters

// Запустить или остановить CTF
export const setStart = async (provider: Web3Provider) => {

  const positiveCTF = addresses.positiveCTF;

  const ctf_main_contract: Contract = new Contract(
    positiveCTF,
    ctf_abi.abi,
    provider
  );
  const connectedContract = ctf_main_contract.connect(provider.getSigner());

  connectedContract
    .setStart()
    .then((result: string) => {
      console.log("setStart RESULT: ", result);
    })
    .catch((error: any) => {
      console.log("setStart error: ", error);
    });
};

export const registerLevel = async (level: string, provider: Web3Provider) => {

  const positiveCTF = addresses.positiveCTF;



  const ctf_main_contract: Contract = new Contract(
    positiveCTF,
    ctf_abi.abi,
    provider
  );
  const connectedContract = ctf_main_contract.connect(provider.getSigner());

  connectedContract
    .registerLevel(level)
    .then((result: string) => {
      console.log("registerLevel RESULT: ", result);
    })
    .catch((error: any) => {
      console.log("registerLevel error: ", error);
    });
};

export const setStatistics = async (
  statProxy: string,
  provider: Web3Provider
) => {

  const positiveCTF = addresses.positiveCTF;



  const ctf_main_contract: Contract = new Contract(
    positiveCTF,
    ctf_abi.abi,
    provider
  );
  const connectedContract = ctf_main_contract.connect(provider.getSigner());

  connectedContract
    .setStatistics(statProxy)
    .then((result: string) => {
      console.log("setStatistics RESULT: ", result);
    })
    .catch((error: any) => {
      console.log("setStatistics error: ", error);
    });
};

export const registerName = async (
  nickname: string,
  provider: Web3Provider
): Promise<boolean> => {

  const ctf_contract: Contract = new Contract(
    addresses.positiveCTF,
    ctf_abi.abi,
    provider
  );
  const connectedContract = ctf_contract.connect(provider.getSigner());

  const res = await connectedContract
    .registerName(nickname)
    .then((result: boolean) => {
      return result;
    })
    .catch((error: any) => {
      console.log("RegisterName --- ERROR: ", error);
      return false
    });

  return res;
};

export const createLevelInstance = async (
  challenageAddress: string,
  provider: Web3Provider,
  amount: string
): Promise<String> => {

  const positiveCTF = addresses.positiveCTF;

  const ctf_contract: Contract = new ContarctEtherProject(
    positiveCTF,
    ctf_abi.abi,
    provider
  );
  const connectedContract = ctf_contract.connect(provider.getSigner());
  // добавил отправку msg.value
  const res = await connectedContract
    .createLevelInstance(challenageAddress, {
      value: ethers.parseEther(amount),
    })
    .then((result: string) => {
      console.log("createLevelInstance result: ", result);
      return result
    })
    .catch((error: any) => {
      console.log("createLevelInstance error: ", error);
      return ["error", error.data]
    });

  return res;
};


export const joinToFormalChallange = async (
  challenageAddress: string,
  provider: Web3Provider,
  amount: string
): Promise<String> => {

  const positiveCTF = addresses.positiveCTF;


  const ctf_contract: Contract = new ContarctEtherProject(
    positiveCTF,
    ctf_abi.abi,
    provider
  );
  const connectedContract = ctf_contract.connect(provider.getSigner());
  // добавил отправку msg.value
  const res = await connectedContract
    .joinToFormalChallange(challenageAddress, {
      value: ethers.parseEther(amount),
    })
    .then((result: string) => {
      console.log("joinToFormalChallange result: ", result);
    })
    .catch((error: any) => {
      console.log("joinToFormalChallange error: ", error);
    });

  return res;
};

export const submitLevelInstance = async (
  instanceAddress: string,
  provider: Web3Provider
): Promise<String> => {
  const positiveCTF = addresses.positiveCTF;

  const ctf_contract: Contract = new ContarctEtherProject(
    positiveCTF,
    ctf_abi.abi,
    provider
  );
  const connectedContract = ctf_contract.connect(provider.getSigner());

  const res = await connectedContract
    .submitLevelInstance(instanceAddress)
    .then((result: string) => {
      console.log("submitLevelInstance result: ", result);
      return result
    })
    .catch((error: any) => {
      console.log("submitLevelInstance error: ", error);
      return "error"
    });

  return res;
};


export const submitFormalSpecAsSuccesssfull = async (account: string,
  instanceAddress: string,
  provider: Web3Provider
): Promise<Boolean> => {
  const positiveCTF = addresses.positiveCTF;

  const ctf_contract: Contract = new Contract(
    positiveCTF,
    ctf_abi.abi,
    provider
  );
  const connectedContract = ctf_contract.connect(provider.getSigner());

  const res = await connectedContract
    .submitFormalSpecAsSuccesssfull(instanceAddress, account)
    .then((result: string) => {
      console.log("submitFormalSpecAsSuccesssfull result: ", result);
    })
    .catch((error: any) => {
      console.log("submitFormalSpecAsSuccesssfull error: ", error);
    });

  return res;
};

export const newTlaSpec = async (
  user: string,
  specHash: string,
  provider: Web3Provider
) => {

  const formalMethods = addresses.formalMethods;

  const ctf_contract: Contract = new Contract(
    formalMethods,
    fm_abi.abi,
    provider
  );
  const connectedContract = ctf_contract.connect(provider.getSigner());

  connectedContract
    .newTlaSpec(user, specHash)
    .then((result: string) => {
      console.log("newTlaSpec result: ", result);
    })
    .catch((error: any) => {
      console.log("newTlaSpec error: ", error);
    });
};

// EVENTS

// Получить
export const getPlayerScoreProfile = async (
  account: string,
  provider: Web3Provider
): (EventLog | Log)[] | undefined => {

  const proxyStats = addresses.proxyStats

  const ctf_contract: Contract = new Contract(
    proxyStats,
    stats_abi.abi,
    provider
  );
  const oldTaskCreated = ctf_contract.filters.playerScoreProfile(
    account,
    null,
    null
  );
  let ev = await ctf_contract.queryFilter(oldTaskCreated);
  return ev;
};

export const getLevelInstanceCreatedLog = async (
  provider: Web3Provider
): (EventLog | Log)[] | undefined => {
  const positiveCTF = addresses.positiveCTF;


  const ctf_contract: Contract = new Contract(
    positiveCTF,
    ctf_abi.abi,
    provider
  );
  const oldTaskCreated = ctf_contract.filters.LevelInstanceCreatedLog(
    null,
    null,
    null,
    null
  );
  let ev = await ctf_contract.queryFilter(oldTaskCreated);
  return ev;
};

export const getLevelInstanceCreatedLogByPlayer = async (
  account: string,
  provider: Web3Provider
): (EventLog | Log)[] | undefined => {

  const positiveCTF = addresses.positiveCTF;



  const ctf_contract: Contract = new Contract(
    positiveCTF,
    ctf_abi.abi,
    provider
  );
  const oldTaskCreated = ctf_contract.filters.LevelInstanceCreatedLog(
    account,
    null,
    null,
    null
  );
  let ev = await ctf_contract.queryFilter(oldTaskCreated);
  return ev;
};

export const getLevelInstanceCreatedLogByPlayerAndLevel = async (
  account: string,
  level: string,
  provider: Web3Provider
): (EventLog | Log)[] | undefined => {

  const positiveCTF = addresses.positiveCTF;



  const ctf_contract: Contract = new ContarctEtherProject(
    positiveCTF,
    ctf_abi.abi,
    provider
  );
  const oldTaskCreated = ctf_contract.filters.LevelInstanceCreatedLog(
    account,
    level,
    null,
    null
  );

  let ev = await ctf_contract.queryFilter(oldTaskCreated);
  console.log("ev: ", ev);

  // ev.map((event: any) => {
  //     console.log("event: ", event.args)
  // })

  return ev;
};

export const getLevelInstanceCreatedLogByLevel = async (
  level: string,
  provider: Web3Provider
): (EventLog | Log)[] | undefined => {

  const positiveCTF = addresses.positiveCTF;



  const ctf_contract: Contract = new Contract(
    positiveCTF,
    ctf_abi.abi,
    provider
  );
  const oldTaskCreated = ctf_contract.filters.LevelInstanceCreatedLog(
    null,
    level,
    null,
    null
  );
  let ev = await ctf_contract.queryFilter(oldTaskCreated);
  return ev;
};

export const getLevelCompletedLog = async (
  provider: Web3Provider
): (EventLog | Log)[] | undefined => {

  const positiveCTF = addresses.positiveCTF;



  const ctf_contract: Contract = new Contract(
    positiveCTF,
    ctf_abi.abi,
    provider
  );
  const oldTaskCreated = ctf_contract.filters.LevelCompletedLog(
    null,
    null,
    null
  );
  let ev = await ctf_contract.queryFilter(oldTaskCreated);
  return ev;
};

export const getLevelCompletedLogByPlayer = async (
  account: string,
  provider: Web3Provider
): (EventLog | Log)[] | undefined => {

  const positiveCTF = addresses.positiveCTF;



  const ctf_contract: Contract = new Contract(
    positiveCTF,
    ctf_abi.abi,
    provider
  );
  const oldTaskCreated = ctf_contract.filters.LevelCompletedLog(
    account,
    null,
    null
  );
  let ev = await ctf_contract.queryFilter(oldTaskCreated);
  return ev;
};

export const getPlayerRegistered = async (
  provider: Web3Provider
): (EventLog | Log)[] | undefined => {
  const positiveCTF = addresses.positiveCTF;



  const ctf_contract: Contract = new Contract(
    positiveCTF,
    ctf_abi.abi,
    provider
  );
  const oldTaskCreated = ctf_contract.filters.PlayerRegistered(
    null,
    null,
    null
  );
  let ev = await ctf_contract.queryFilter(oldTaskCreated);
  return ev;
};

export const getPlayerRegisteredByPlayer = async (
  account: string,
  provider: Web3Provider
): (EventLog | Log)[] | undefined => {

  const positiveCTF = addresses.positiveCTF;



  const ctf_contract: Contract = new Contract(
    positiveCTF,
    ctf_abi.abi,
    provider
  );
  const oldTaskCreated = ctf_contract.filters.PlayerRegistered(
    account,
    null,
    null
  );
  let ev = await ctf_contract.queryFilter(oldTaskCreated);
  return ev;
};

export const getTlaSpec = async (account: string, _provider: Web3Provider) => {
  const provider = new ethers.BrowserProvider(window.ethereum); // .providers.Web3Provider(window.ethereum);

  const formalMethods = addresses.formalMethods;

  const ctf_contract: Contract = new Contract(
    formalMethods,
    fm_abi.abi,
    provider
  );

  const filter = ctf_contract.filters.NewTlaSpec;
  const events = await ctf_contract.queryFilter(filter).then((result: any) => {
    console.log("ctf_contract.queryFilter.NewTlaSpec RESULT: ", result)
    return result;
  }).catch((error: any) => {
    console.log("ctf_contract.queryFilter.NewTlaSpec ERROR: ", error)
  });

  let cleanEvent = events.map((event: any) => {
    return event.data.slice(2).match(/.{0,64}/g);
  });

  console.log("cleanEvent: ", cleanEvent)

  return cleanEvent;
};

export const getAllSpec = async (_provider: Web3Provider) => {
  // const provider = new ethers.BrowserProvider(window.ethereum); // .providers.Web3Provider(window.ethereum);

  const formalMethods = addresses.formalMethods;

  const fm_contract: Contract = new Contract(
    formalMethods,
    fm_abi.abi,
    _provider
  );

  const res = await fm_contract
    .getAllSpecs()
    .then((result: any) => {
      console.log("getAllSpecs RESULT: ", result)
      return result;
    })
    .catch((error: any) => {
      console.log("getAllSpecs ERROR: ", error.code);
      return [];
    });

  return res;
};

export const getUsersFromBackend = async () => {
  const apiUrl = "/api/v1/users";
  const users = axios
    .get(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((resp: any) => {
      console.log("API RESP: ", resp.data);
      return resp.data
    })
    .catch((error: any) => {
      console.log("getUsersFromBackend error: ", error);
      return []
    });

  return users;
};

export const sendSpecToBackend = async (account: string, file: any) => {
  const solutionKey = 'solution.tla'
  const apiUrl =
    `/api/v1/users/` +
    account +
    "/fm/upload";

  let formData = new FormData();
  formData.append(solutionKey, file);

  const resp = axios
    .post(apiUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        // "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"
      },
    })
    .then((resp: any) => {
      console.log("sendSpecToBackend RESULT: ", resp);
      return resp;
    })
    .catch((error: any) => {
      console.log("sendSpecToBackend ERROR: ", error);
      return "error";
    });

  return resp;
};


export const getSpecFromBackend = async (spec: string) => {
  console.log("getSpecFromBackend -- spec: ", spec)
  const apiUrl =
    `/api/v1fm/solution/` + spec;

  axios
    .get(apiUrl, {
      headers: {
        // "Content-Type": "multipart/form-data",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        // "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"
      },
    })
    .then((resp: any) => {
      console.log("sendSpecToBackend RESULT: ", resp);
    })
    .catch((error: any) => {
      console.log("sendSpecToBackend ERROR: ", error);
      return 0;
    });
};

export const getCtfUsersFromJson = (): CtfUser[] => {
  // const users_json = year == 2023 ? users_2023 : users_2024; // TODO: 0 для всех лет
  const ctf_users_all: CtfUser[] = JSON.parse(
    JSON.stringify(ctf_users)
  ) as CtfUser[];

  // const users2024: CtfUser[] = JSON.parse(
  //   JSON.stringify(users_2024)
  // ) as CtfUser[];

  const historicUsers = [...ctf_users_all]

  return historicUsers;
};


export const getTxStatus = async (
  txHash: string,
  provider: Web3Provider
): Promise<string> => {

  const proxyStats = addresses.proxyStats

  const ctf_stats_contract: Contract = new Contract(
    proxyStats,
    stats_abi.abi,
    provider
  );

  const res = await ctf_stats_contract
    .getTimeElapsedForCompletionOfLevel(account, level)
    .then((result: any) => {
      return Number(result);
    })
    .catch((error: any) => {
      console.log("error: ", error)
    })

  return res;
};