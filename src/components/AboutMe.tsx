import { Box, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function AboutMe() {

    return (
    <Center width='100%' bgColor='#242424' color='gray.300' p={10}>
            <Box whiteSpace='pre-wrap' width={640}  >
                <Heading mb={5}>About Me</Heading>
                <motion.div
        whileHover={{ scale:1.1 }}>
                <VStack whiteSpace='pre-wrap' fontSize={18} >
                <Text as='p' whiteSpace='pre-wrap' >
                    Im a full stack developer with a passion for learning new technologies and solving problems.
                    The technologies I use are React, ASP.NET, Angular, SQLServer, Azure.
                    I like to work in a team and I am always looking for new challenges.
                </Text>
                <Text>
                    My best features are my ability to learn new technologies quickly and my ability to work in a team.
                    I am always looking to improve my skills and learn new technologies.
                </Text>
                <Text>
                    My best features are my ability to learn new technologies quickly and my ability to work in a team.
                    I am always looking to improve my skills and learn new technologies.
                </Text>
                <Text>
                    Im from Mexico, I have a degree in software engineer and I have been working as developer for 2 years.
                </Text>
                </VStack>
                </motion.div>
            </Box>
            </Center>
    )
}