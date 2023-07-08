import React from 'react';
import logo from './logo.svg';
import NavBar from '../NavBar/NavBar';
import Hero from '../Hero/Hero';
import Newsletter from '../Newsletter/Newsletter';
import Footer from '../Footer/Footer';
import { Box, Grid, GridItem, StackDivider, VStack } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <VStack
          spacing={4}
          align='stretch'
        >
          <Box >
            <NavBar />
          </Box>
          <Box flex='1'>

            <Routes>
              <Route path="/" element={<Hero />} />
              {/* <Route path="/about" element={<About />} /> */}


            </Routes>
          </Box>

          <Box>
            <Footer />
          </Box>
        </VStack>
      </BrowserRouter>
    </div>
  );
}

export default App;
