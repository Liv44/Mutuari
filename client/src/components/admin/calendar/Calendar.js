import { Button, Input, Box, Select, Heading, Table, Thead, Tr, Th, Tbody, Td, Text, } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { useState, useEffect } from "react";
import axios from "axios";

import {Navbar} from "../NavBar"

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

    //Requête pour récupérer les Emprunts
    const getBorrow = () => {
        axios.get("/borrow/notreturned").then((resp) => {
            setListOfLoans(resp.data);
        })
    }

    //Requête pour récupérer les Utilisateurs
    const getUsers = () => {
        axios.get("/users").then((resp) => {
            setListOfUsers(resp.data);
        })
    }

    //Requête pour récupérer le Matériels
    const getMaterials = () => {
        axios.get("/materials").then((resp) => {
            setListOfMaterials(resp.data);
        })
    }

    //Permet de mettre dans un tableau les 7 dates de la semaine.
    const setCorrespondingDaysOfWeek = (date) => {
        const dayOfMonth = date.getDate();
        const dayOfWeek = (date.getDay() + 6) % 7;

        let refDate = new Date(date);

        const firstDayOfWeek = new Date(refDate.setDate(dayOfMonth - dayOfWeek));
        let datesOfWeek = [];

        for (let i = 0; i < 7; i++) {

            let day = new Date(new Date(refDate).setDate(firstDayOfWeek.getDate() + i));
            let isCorresponding = (day.getMonth() == date.getMonth()) ? true : false;
            let datesObj = {
                isCorrespondingToMonth: isCorresponding,
                date: day.getDate()
            };

            datesOfWeek[i] = datesObj;
        }

        return datesOfWeek;
    }

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

    const [chosenUser, setChosenUser] = useState("");
    const [chosenMaterial, setChosenMaterial] = useState("");
    const [listOfLoans, setListOfLoans] = useState([]);
    const [listOfUsers, setListOfUsers] = useState([]);
    const [listOfMaterials, setListOfMaterials] = useState([]);
    const [loansOfWeek, setLoansOfWeek] = useState([]);

    const setNewWeek = (state) => {

        let numberOfDaysToNewWeek = (state == "next") ? 7 : -7; 
        setReferenceDate(new Date(referenceDate.setDate(referenceDate.getDate() + numberOfDaysToNewWeek)));
        console.log(referenceDate);
        const newMonth = new Intl.DateTimeFormat('fr-FR', optionsForMonth).format(referenceDate).toUpperCase()
        console.log(newMonth);
        setChosenMonthAndYear(newMonth)
        setChosenWeekNumber(referenceDate.getWeek())
        setChosenWeekDates(setCorrespondingDaysOfWeek(referenceDate))
        setCorrespondingLoans();
    }

    const setCorrespondingLoans = () => {

        const dayOfMonth = referenceDate.getDate();
        const dayOfWeek = (referenceDate.getDay() + 6) % 7;

        let refDate = new Date(referenceDate);

        const weekStartDate = new Date(refDate.setDate(dayOfMonth - dayOfWeek));
        const weekEndDate = new Date(refDate.setDate(dayOfMonth - dayOfWeek + 6));

        const loansInActualWeek = listOfLoans.filter((loan) => {
            
            if(chosenUser != "" && loan.userID != chosenUser) {
                return false;
            }

            if(chosenMaterial != "" && loan.materialID != chosenMaterial) {
                return false;
            }

            const startDate = new Date(loan.startDate);
            const endDate = new Date(loan.endDate);

            if(startDate <= weekStartDate && endDate >= weekStartDate && endDate <= weekEndDate) {
                return true;
            } else if(startDate >= weekStartDate && startDate <= weekEndDate && endDate >= weekEndDate) {
                return true;
            } else if (startDate >= weekStartDate && endDate <= weekEndDate || startDate <= weekStartDate && endDate >= weekEndDate) {
                return true;
            } else {
                return false;
            }
        })
        
        let loansPerDay = []

        for(let i = 0; i < 7; i++) {
            let actualDayObject = [];

            loansInActualWeek.forEach(loan => {
                //Faire condition de si le startDate etendDate permette d'avoir la valeur entre firstDate+i
                let day = new Date(new Date(refDate).setDate(weekStartDate.getDate() + i));
                day.setHours(0,0,0,0);
                let startDate = new Date(loan.startDate);
                startDate.setHours(0,0,0,0);
                let endDate = new Date(loan.endDate);
                endDate.setHours(0,0,0,0);

                if(startDate <= day && endDate >= day) {
                    
                    actualDayObject.push(loan);
                }
            })

            loansPerDay.push(actualDayObject)
        }

        setLoansOfWeek(loansPerDay);
    }

    useEffect(() => {
        getBorrow();
        getUsers();
        getMaterials();
    }, [])

    useEffect(() => {
        setCorrespondingLoans();
    }, [listOfLoans, chosenMaterial, chosenUser])

    return (
        <Box      
            boxShadow="xl"
            borderRadius="30px"
            overflow="scroll"
            mt={20}
            mr={20}
            mb={5}
            boxSize="5xl"
            backgroundColor="white"
            maxHeight="36em"
            p={5}
        >
            <Box display="flex" flexDirection="row" justifyContent="space-between" marginBottom="2em">
                <Heading as="h3" size="lg" textAlign="left" mb={5}>Calendrier</Heading>
                <Box display="flex" flexDirection="row">
                    <Select onChange={(e) => {setChosenMaterial(e.target.value)}} mr={5} variant='outline' placeholder='Matériels' size="md" borderColor="purple" border="2px" width="20em">
                        {listOfMaterials.map((material, index) => (
                            <option key={index} value={material.id}>{material.name}</option>
                        ))}
                    </Select>
                    <Select onChange={(e) => {setChosenUser(e.target.value); console.log(e.target.value)}} variant='outline' defaultValue={-1} placeholder='Utilisateurs' size="md" borderColor="purple" border="2px" width="20em">
                        {listOfUsers.map((user, index) => (
                            <option key={index} value={user.id}>{user.firstname} {user.lastname}</option>
                        ))}
                    </Select>
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
                                chosenWeekDates.map((dateObj, index) => (
                                    <Th key={index} width="14%" textAlign="center" fontSize={11}>
                                        {daysOfWeek[index]}
                                        {dateObj.date}
                                    </Th>
                                ))
                            }
                        </Tr>
                    </Thead>
                    <Tbody height="22em">
                        <Tr>
                            {
                                loansOfWeek.map((column, index) => (
                                    <Td key={index} borderRight="1px solid #EDF2F7" borderLeft="1px solid #EDF2F7" backgroundColor={(chosenWeekDates[index].isCorrespondingToMonth) ? "" : "#EDF2F7"}>
                                        {
                                            column.map((loan, index) => (
                                                <Box backgroundColor="lavender" mb={5} borderRadius={6} p={2} fontSize={14}>
                                                    <Text><span style={{fontWeight: "bold"}}>{loan.materialName}</span> emprunté par <span style={{fontWeight: "bold"}}>{loan.fistname} {loan.lastname}</span></Text>
                                                </Box>
                                            ))
                                        }

                                    </Td>
                                ))
                            }
                        </Tr>
                    </Tbody>
                </Table>
            </Box>

        </Box>
    )
}