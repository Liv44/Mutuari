import { Button, Input, Box, Select, Heading, Table, Thead, Tr, Th, Tbody, Td, Text, } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { useState } from "react";

export const Calendar = () => {

    //"Extension" de la classe "Date" récupérée sur : https://www.epochconverter.com/weeknumbers
    Date.prototype.getWeek = function () {
        var target  = new Date(this.valueOf());
        var dayNr   = (this.getDay() + 6) % 7;
        target.setDate(target.getDate() - dayNr + 3);
        var firstThursday = target.valueOf();
        target.setMonth(0, 1);
        if (target.getDay() != 4) {
            target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
        }
        return 1 + Math.ceil((firstThursday - target) / 604800000);
    }

    const setCorrespondingDaysOfWeek = (date) => {
        const dayOfMonth = date.getDate();
        const dayOfWeek = (date.getDay() + 6) % 7;
        // const firstDayOfWeek = new Date(date.setDate(dayOfMonth - dayOfWeek));
        // const lastDayOfWeek = new Date(date.setDate(dayOfMonth - dayOfWeek + 6));
        // console.log(firstDayOfWeek, lastDayOfWeek)
        let datesOfWeek = [];

        for (let i = 0; i < 7; i++) {
            datesOfWeek[i] = new Date(date.setDate(dayOfMonth - dayOfWeek + i)).getDate();
        }

        console.log(datesOfWeek);
        return datesOfWeek;
    }

    //Mettre une date de référence (initialisation sur le jour actuel)
    // let referenceDate = new Date();

    //Mettre le mois et l'année actuelle sous le bon format (MONTH YEAR)
    const optionsForMonth = { month: 'long', year: "numeric"};
    const actualMonth = new Intl.DateTimeFormat('fr-FR', optionsForMonth).format().toUpperCase();

    //Mettre la semaine actuelle et le premier jour de la semaine
    const actualWeekNumber = new Date().getWeek(); //Janvier = 0, donc Mai = 4 et pas 5

    const daysOfWeek = ["Lundi ", "Mardi ", "Mercredi ", "Jeudi ", "Vendredi ", "Samedi ", "Dimanche "];
    const [referenceDate, setReferenceDate] = useState(new Date())
    const [chosenMonthAndYear, setChosenMonthAndYear] = useState(actualMonth);
    const [chosenWeekNumber, setChosenWeekNumber] = useState(actualWeekNumber);
    const [chosenWeekDates, setChosenWeekDates] = useState(setCorrespondingDaysOfWeek(new Date()));

    setCorrespondingDaysOfWeek(new Date(2022, 4, 8));

    const setNewWeek = (state) => {

        let numberOfDaysToNewWeek = (state == "next") ? 7 : -7; 
        setReferenceDate(new Date(referenceDate.setDate(referenceDate.getDate() + numberOfDaysToNewWeek)));
        console.log(referenceDate);
        const newMonth = new Intl.DateTimeFormat('fr-FR', optionsForMonth).format(referenceDate).toUpperCase()
        console.log(newMonth);
        setChosenMonthAndYear(newMonth)
        setChosenWeekNumber(referenceDate.getWeek())
        setChosenWeekDates(setCorrespondingDaysOfWeek(referenceDate))
    }

    // const optionsForMonth = { month: 'long', year: "numeric"};
    // const actualMonth = new Intl.DateTimeFormat('fr-FR', optionsForMonth).format().toUpperCase();
    // console.log(new Intl.DateTimeFormat('fr-FR', optionsForMonth).format().toUpperCase());

    // var options = { weekday: 'long'};
    // console.log(new Intl.DateTimeFormat('fr-FR', options).format());

    console.log(actualMonth);
    console.log(actualWeekNumber);
    // console.log(firstDayOfWeek);

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
                        <Button size="xs" background="none" _hover={{ bg: 'purple' }} onClick={() => setNewWeek("previous")}>
                            <ArrowLeftIcon/>
                        </Button>
                        <Text margin={2}>Semaine {chosenWeekNumber}</Text>
                        <Button size="xs" background="none" _hover={{ bg: 'purple' }} onClick={() => setNewWeek("next")}>
                            <ArrowRightIcon/>
                        </Button>
                    </Box>
                </Box>
                <Table width="100%">
                    <Thead>
                        <Tr>
                            {
                                chosenWeekDates.map((date, index) => (
                                    <Th key={index} width="14%" textAlign="center" fontSize={11}>
                                        {daysOfWeek[index]}
                                        {date}
                                    </Th>
                                ))
                            }
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