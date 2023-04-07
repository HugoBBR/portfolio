import { Box, Center, HStack, Icon } from "@chakra-ui/react";
import { TbBrandReact } from "react-icons/tb";
import { SiCsharp } from "react-icons/si";
import {FaAngular} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Icons() {

    return (
        <Center>
            <HStack fontSize={100} spacing={12} >  
            <motion.div
            style={{ textAlign:'center', justifyContent:'center', alignItems:'center',padding: 0 }}
    animate={{
        //scale: [1, ],
        rotate: [0, 360],
       // borderRadius: ["0%", "0%", "50%", "50%", "0%"]
      }}
      transition={{
        duration: 20,
    
        times: [0, 1],
        repeat: Infinity,
        //repeatDelay: 2
      }}>
        <Center>
                <Icon as={TbBrandReact} ></Icon>
                
                </Center>
                </motion.div>
                <motion.div
            style={{ textAlign:'center', justifyContent:'center', alignItems:'center',padding: 0 }}
            animate={{
                scale: [1,1.1,1 ],
                //rotate: [0, 360],
               // borderRadius: ["0%", "0%", "50%", "50%", "0%"]
              }}
              transition={{
                duration: 5,
            
                times: [0, 1],
                repeat: Infinity,
                //repeatDelay: 2
              }}>
        <Center>
        <Icon as={SiCsharp} ></Icon>

    </Center>
                </motion.div>
                <motion.div
            style={{ textAlign:'center', justifyContent:'center', alignItems:'center',padding: 0 }}
    animate={{
        scale: [1,1.1,1 ],
        //rotate: [0, 360],
       // borderRadius: ["0%", "0%", "50%", "50%", "0%"]
      }}
      transition={{
        duration: 5,
    
        times: [0, 1],
        repeat: Infinity,
        //repeatDelay: 2
      }}>
        <Center>
        <Icon as={FaAngular} ></Icon>

    </Center>
                </motion.div>
            </HStack>
        </Center>
    )
}