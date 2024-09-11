import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Button,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import {
    joinToFormalChallange,
} from "../../../utils/ctf.utils";
import { RegisterName } from "../../Wallet/RegisterName";
import CreateFormalSpec from "../CreateFormalSpec";

export function NotJoinedToFormal(isJoned: any, currentInstance: any, challengeAddress: string) {

    const { account, isActive, provider } = useWeb3React();

    const handleJoinToChallenge = () => {
        if (!(isActive && account && provider)) return;
        joinToFormalChallange(challengeAddress, provider, "0");
    };

    return (<>
        {
            isJoned ? (
                <CreateFormalSpec
                    provider={provider}
                    addr={currentInstance}
                />
            ) : (
                <>
                    <Alert status="warning">
                        <AlertIcon />
                        <AlertTitle>Attention!</AlertTitle>
                        <AlertDescription>
                            Your should Join to Challenge
                        </AlertDescription>
                    </Alert>
                    <Button
                        colorScheme="red"
                        width={"sm"}
                        onClick={handleJoinToChallenge}
                    >
                        Join to challange
                    </Button>
                </>)
        }
    </>)

}

export function NotRegisted() {

    return (<>
        <Alert status="warning">
            <AlertIcon />
            <AlertTitle>Attention!</AlertTitle>
            <AlertDescription>Your should register</AlertDescription>
        </Alert>
        <br />
        <RegisterName
            buttonSize={"lg"}
            colorScheme={"red"}
            width={"sm"}
        />
    </>)

}

export function MetamaskNotInstalled() {

    return (<>
        <Alert status="warning">
            <AlertIcon />
            <AlertTitle>Attention!</AlertTitle>
            <AlertDescription>
                You should install Metamask
            </AlertDescription>
        </Alert>
    </>)
}

export function MetamaskDeactivated() {

    return (<>
        <Alert status="warning">
            <AlertIcon />
            <AlertTitle>Attention!</AlertTitle>
            <AlertDescription>
                You should activate Metamask
                {/* <MetaMaskCard /> */}
            </AlertDescription>
        </Alert>
    </>)
}

export function NotStarted() {

    return (<>
        <Alert status="warning">
            <AlertIcon />
            <AlertTitle>Attention!</AlertTitle>
            <AlertDescription>CTF not started</AlertDescription>
        </Alert>

    </>)
}

export function LevelCompleted() {

    return (<Alert status="success">
        <AlertIcon />
        {/* <AlertTitle>Congrats!</AlertTitle> */}
        <AlertDescription>
            You successfully completed level
        </AlertDescription>
    </Alert>)
}
