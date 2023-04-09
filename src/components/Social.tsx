import { Box, Heading, Icon,  Link, VStack } from "@chakra-ui/react";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { FiMail } from "react-icons/fi";


export default function Social() {


    return (
        <Box>
            <Heading>Social</Heading>
            <VStack p={5} fontSize={17}>
                <Box  >
                    <Icon as={BsLinkedin} /><Link href="https://www.linkedin.com/in/hugobbr/" isExternal> /Hugobbra</Link>
                </Box>
                <Box>
                    <Icon as={BsGithub} /><Link href="https://github.com/HugoBBR" isExternal> /HugoBBR</Link>
                </Box>
                <Box>
                    <Icon as={FiMail} /><Link href="mailto:hugobr_@outlook.com" isExternal> /HugoBBR</Link>
                </Box>
            </VStack>

        </Box>
    )
}