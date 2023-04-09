import './App.css'
import Social from './components/Social'
import Header from './components/Heading'
import { Flex, VStack } from '@chakra-ui/react'
import AboutMe from './components/AboutMe'
import Icons from './components/Icons'
import { motion } from 'framer-motion'
import Experience from './components/Eperience'

function App() {

  return (
    <main  >
    <Flex pt={4} width='100%'>
      <motion.div
      style={{ width: '100%' }}
          initial={{ opacity: 0,  }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}>
      <VStack spacing={10} width='100%'>
        <Header />
        <AboutMe />
        <Icons/>
        <Experience/>
        <Social />
      </VStack>
      </motion.div>
      </Flex>
      </main> )
}

export default App
