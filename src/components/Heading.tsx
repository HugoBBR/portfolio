import { Box, Divider, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function Header() {




    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }} >
            <Box>

                <motion.div
                    whileHover={{ scale: 1.1 }}


                > <Heading size='2xl' mb={4}>
                        Hugo Bonilla
                    </Heading>
                </motion.div>
                <Heading>
                    Software Engineer
                </Heading>
                <Heading size='md'>
                    Full Stack Developer
                </Heading>

            </Box>
        </motion.div>
    )
}