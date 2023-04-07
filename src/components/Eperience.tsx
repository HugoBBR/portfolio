import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Heading, ListItem, UnorderedList } from "@chakra-ui/react";

export default function Experience() {



    return (
        <Box width={650} py={10}>
            <Heading mb={6}>
                Experience
            </Heading>
            <Accordion allowMultiple  >
                <AccordionItem fontSize={17}>
                    <h2>
                        <AccordionButton fontSize={18} fontWeight='bolder'>
                            <Box as="span" flex='1' >
                                Cotton Holdings August 2022 - Present
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} whiteSpace='pre-wrap'>
                        <UnorderedList  textAlign='start' spacing={2}>
                            <ListItem >Development of a Single sign-on service using .NET and IdentityServer4
                                Framework</ListItem>
                            <ListItem>Implementation of authentication and authorization on .NET APIs</ListItem>
                            <ListItem>Implementation of Authentication Services like PropelAuth, Auth0,
                                IdentityServer4, etc.</ListItem>
                            <ListItem>Development of libraries for authentication and authorization on React
                                and Angular</ListItem>
                            <ListItem>Implementation of authentication and authorization on Frontend
                                Applications </ListItem>
                            <ListItem>Use of UI libraries like MUI and Chakra UI</ListItem>
                            <ListItem>Development of frontend application for inventory management on React.</ListItem>
                        </UnorderedList>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem  fontSize={17}>
                    <h2>
                        <AccordionButton fontSize={18}fontWeight='bolder'>
                            <Box as="span" flex='1' >
                                Tomin Team March 2022 - August 2022
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    <UnorderedList  textAlign='start'  spacing={2}>
                            <ListItem>Full Stack Development on Angular & ASP.NET</ListItem>
                            <ListItem>Use of ASP.NET Core Identity</ListItem>
                        </UnorderedList>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem  fontSize={17}>
                    <h2>
                        <AccordionButton fontSize={18} fontWeight='bolder'>
                            <Box as="span" flex='1' >
                                COVEICyDET December 2021 - June 2022
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    <UnorderedList  textAlign='start'  spacing={2}>
                            <ListItem>Development and implementation of a web system for inventory
management for the Veracruz Council for Scientific Research and
Technological Development</ListItem>
                            <ListItem>Database normalization</ListItem>
                        </UnorderedList>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem  fontSize={17}>
                    <h2>
                        <AccordionButton fontSize={18} fontWeight='bolder'>
                            <Box as="span" flex='1' >
                                Tomin Team February 2021- August 2021
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    <UnorderedList  textAlign='start'  spacing={2}>
                            <ListItem>Development of a web system in Laravel for the administration of
students for the Paraxute music school.
</ListItem>
                            <ListItem>Design of database schema.</ListItem>
                        </UnorderedList>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>

        </Box>
    )
}