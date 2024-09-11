import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useEffect, useState } from 'react'
import { Box, Grid, Flex } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "../Contact/Contact";
import Blog from "../Blog/Blog";
import Main from "../Main/Main";
import CTF from "../CTF/CTF";
import ChallengePage from "../CTF/ChallengePage";
import WorkingProgress from "../WorkingProgress/WorkingProgress";
import Leaderboard from "../CTF/Leaderboard/Leaderboard";
import UserPage from "../UserPage/UserPage";
import Administration from "../CTF/Administration/Administration";
import { AddressContext } from "../../contexts/addressContext";
import { UserContext } from "../../contexts/userContext";
import CtfHelp from "../CTF/CtfHelp";
import Faucets from "../CTF/CtfHelp";
import PosiToken from "../PosiToken/PosiToken";
import ToolsPage from "../Tools/ToolsPage";
import BlogArticle from "../Blog/BlogArticle";
import Technologies from "../Technologies/Technologies";

function App() {
  const [addresses, setAddresses] = useState(false)
  const [userAddress, setUserAddress] = useState(false)

  return (

    <UserContext.Provider value={{ userAddress }}>
      <AddressContext.Provider value={{ addresses, setAddresses }}>
        <div className="App">
          <BrowserRouter>
            <Grid spacing={4} align="stretch">
              <Flex direction="column" minHeight="100vh">
                <Box>
                  <NavBar />
                </Box>
                <Box flex="1">
                  <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogArticle />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/ctf" element={<CTF />} />
                    <Route path="/ctf/:id" element={<ChallengePage />} />
                    <Route path="/ctf/leaderboard" element={<Leaderboard />} />
                    <Route path="/ctf/judge" element={<Administration />} />
                    <Route path="/dao" element={<WorkingProgress />} />
                    {/* <Route path="/tasks/:id" element={<TaskPage />} /> */}
                    <Route path="/edu" element={<WorkingProgress />} />
                    <Route path="/faucet" element={<Faucets />} />
                    <Route path="/positoken" element={<PosiToken />} />
                    <Route path="/tools" element={<ToolsPage />} />
                    <Route path="/user/:id" element={<UserPage />} />
                    <Route path="/utils" element={<WorkingProgress />} />
                  </Routes>
                </Box>
                <Box>
                  <Footer />
                </Box>
              </Flex>
            </Grid>
          </BrowserRouter>
        </div>
      </AddressContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
