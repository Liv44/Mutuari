import { Button, Input, Box, Select, Heading, Table, Thead, Tr, Th, Tbody, Td, Text, } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { useState } from "react";

export const Calendar = () => {

    const getWeek = (date) => {
        
        return date;
    }

    //Mettre le mois et l'année actuelle sous le bon format (MONTH YEAR)
    const optionsForMonth = { month: 'long', year: "numeric"};
    const actualMonth = new Intl.DateTimeFormat('fr-FR', optionsForMonth).format().toUpperCase();

    //Mettre l'année et les jours de la semaine
    const actualWeek = getWeek(new Date());

    const dayOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    const [chosenMonthAndYear, setChosenMonthAndYear] = useState(actualMonth);

    // const optionsForMonth = { month: 'long', year: "numeric"};
    // const actualMonth = new Intl.DateTimeFormat('fr-FR', optionsForMonth).format().toUpperCase();
    // console.log(new Intl.DateTimeFormat('fr-FR', optionsForMonth).format().toUpperCase());

    // var options = { weekday: 'long'};
    // console.log(new Intl.DateTimeFormat('fr-FR', options).format());

    console.log(actualMonth);
    console.log(actualWeek);

    return (
        <Box      
            boxShadow="xl"
            borderRadius="30px"
            overflow="scroll"
            mb={5}
            boxSize="5xl"
            backgroundColor="white"
            maxHeight="36em"
            p={5}
        >
            <Box display="flex" flexDirection="row" justifyContent="space-between" marginBottom="2em">
                <Heading as="h3" size="lg" textAlign="left" mb={5}>Calendrier</Heading>
                <Box display="flex" flexDirection="row">
                    <Select mr={5} variant='outline' placeholder='Matériels' size="md" borderColor="purple" border="2px" width="20em"></Select>
                    <Select variant='outline' placeholder='Utilisateurs' size="md" borderColor="purple" border="2px" width="20em"></Select>
                </Box>
            </Box>
            <Box>

                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Heading as="h3" size="md" textAlign="center">{chosenMonthAndYear}</Heading>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <Button size="xs" background="none" _hover={{ bg: 'purple' }}><ArrowLeftIcon/></Button>
                        <Text margin={2}>Semaine ...</Text>
                        <Button size="xs" background="none" _hover={{ bg: 'purple' }}><ArrowRightIcon/></Button>
                    </Box>
                </Box>
                <Table width="100%">
                    <Thead>
                        <Tr>
                            <Th width="14%" textAlign="center" fontSize={11}>Lundi 30</Th>
                            <Th width="14%" textAlign="center" fontSize={11}>Mardi 31</Th>
                            <Th width="14%" textAlign="center" fontSize={11}>Mercredi 29</Th>
                            <Th width="14%" textAlign="center" fontSize={11}>Jeudi 27</Th>
                            <Th width="14%" textAlign="center" fontSize={11}>Vendredi 22</Th>
                            <Th width="14%" textAlign="center" fontSize={11}>Samedi 29</Th>
                            <Th width="14%" textAlign="center" fontSize={11}>Dimanche 30</Th>
                        </Tr>
                    </Thead>
                    <Tbody height="22em">
                        <Tr>
                            <Td borderRight="1px solid #EDF2F7" borderLeft="1px solid #EDF2F7" borderColor="gray.100"></Td>
                            <Td borderRight="1px solid #EDF2F7" borderLeft="1px solid #EDF2F7" borderColor="gray.100"></Td>
                            <Td borderRight="1px solid #EDF2F7" borderLeft="1px solid #EDF2F7" borderColor="gray.100"></Td>
                            <Td borderRight="1px solid #EDF2F7" borderLeft="1px solid #EDF2F7" borderColor="gray.100"></Td>
                            <Td borderRight="1px solid #EDF2F7" borderLeft="1px solid #EDF2F7" borderColor="gray.100"></Td>
                            <Td borderRight="1px solid #EDF2F7" borderLeft="1px solid #EDF2F7" borderColor="gray.100"></Td>
                            <Td borderRight="1px solid #EDF2F7" borderLeft="1px solid #EDF2F7" borderColor="gray.100"></Td>
                        </Tr>
                    </Tbody>
                </Table>
            </Box>

        </Box>
    )
}