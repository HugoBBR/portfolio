import { Center, HStack, Icon } from "@chakra-ui/react";
import { TbBrandReact } from "react-icons/tb";
import { SiCsharp } from "react-icons/si";
import { FaAngular } from "react-icons/fa";
import { motion } from "framer-motion";

export default function FIcons() {

    return (
        <Center p={2} >
            <HStack fontSize={100} spacing={{base:6,md:12}} >
                <motion.div
                    style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', padding: 0 }}
                    animate={{
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 20,
                        times: [0, 1],
                        repeat: Infinity,
                    }}>
                    <Center>
                        <Icon as={TbBrandReact} ></Icon>

                    </Center>
                </motion.div>
                <motion.div
                    style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', padding: 0 }}
                    animate={{
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 5,
                        times: [0, 1],
                        repeat: Infinity,
                    }}>
                    <Center>
                        <Icon as={SiCsharp} ></Icon>

                    </Center>
                </motion.div>
                <motion.div
                    style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', padding: 0 }}
                    animate={{
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 5,
                        times: [0, 1],
                        repeat: Infinity,
                    }}>
                    <Center>
                        <Icon as={FaAngular} ></Icon>
                    </Center>
                </motion.div>
            </HStack>
        </Center>
    )
}