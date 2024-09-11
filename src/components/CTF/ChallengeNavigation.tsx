import { Button, Center, Container, Grid, Stack } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ChallengeNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const getPrevious = () => {
    switch (location.pathname) {
      case "/ctf/FakeDAO":
        navigate("/ctf/AntiRugPull");
        break;
      case "/ctf/DAO_1":
        navigate("/ctf/FakeDAO");
        break;
      case "/ctf/DAO_2":
        navigate("/ctf/DAO_1");
        break;
      // case "/ctf/Metamorphic":
      //   navigate("/ctf/DAO_2");
      //   break;
      case "/ctf/WrappedEther":
        navigate("/ctf/DAO_2");
        break;
      case "/ctf/Underconstrained":
        navigate("/ctf/WrappedEther");
        break;
      // case "/ctf/FormalMethods":
      //   navigate("/ctf/Underconstrained");
      //   break;
      case "/ctf/AntiRugPull":
        navigate("/ctf/Underconstrained");
        break;
      // Закомментированные пути, которые не участвуют в текущем варианте:
      // case "/ctf/LendingPool":
      //   navigate("/ctf/FindMe");
      //   break;
      // case "/ctf/FindMe":
      //   navigate("/ctf/Underconstrained");
      //   break;
      // case "/ctf/Lift":
      //   navigate("/ctf/LendingPool");
      //   break;
      // case "/ctf/PredictTheFuture":
      //   navigate("/ctf/Lift");
      //   break;
      default:
        navigate("/ctf");
        break;
    }
  };

  const getNext = () => {
    switch (location.pathname) {
      case "/ctf/AntiRugPull":
        navigate("/ctf/FakeDAO");
        break;
      case "/ctf/FakeDAO":
        navigate("/ctf/DAO_1");
        break;
      case "/ctf/DAO_1":
        navigate("/ctf/DAO_2");
        break;
      case "/ctf/DAO_2":
        navigate("/ctf/WrappedEther");
        break;
      // case "/ctf/Metamorphic":
      //   navigate("/ctf/Underconstrained");
      //   break;
      case "/ctf/WrappedEther":
        navigate("/ctf/Underconstrained");
        break;
      case "/ctf/Underconstrained":
        navigate("/ctf/AntiRugPull");
        break;
      // case "/ctf/FormalMethods":
      //   navigate("/ctf/AntiRugPull");
      //   break;
      // эти не участвуют в текущем варианте
      // case "/ctf/FindMe":
      //   navigate("/ctf/LendingPool");
      //   break;
      // case "/ctf/LendingPool":
      //   navigate("/ctf/Lift");
      //   break;
      // case "/ctf/Lift":
      //   navigate("/ctf/PredictTheFuture");
      //   break;
      // case "/ctf/PredictTheFuture":
      //   navigate("/ctf/AntiRugPull"); // assuming there's a final challenge
      //   break;
      default:
        navigate("/ctf");
        break;
    }
  };
  // обновил отображение кнопок
  return (
    <Grid>
      <Center>
        <Button
          colorScheme="red"
          onClick={getPrevious}
          variant="outline"
          w="120px"
          mx="25px"
        >
          Prev
        </Button>
        <Button
          colorScheme="red"
          onClick={getNext}
          variant="outline"
          w="120px"
          mx="25px"
        >
          Next
        </Button>
      </Center>
    </Grid>
  );
}
