import {Box, Button, Image} from "@chakra-ui/react"
import { CalendarIcon, PlusSquareIcon, HamburgerIcon } from '@chakra-ui/icons';
import  { Link } from 'react-router-dom'

export const Navbar = ({selected}) => {

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Image src='../img/logo-w-txt.png' alt='Mutuari' w={400} />
            <Link to="/admin/calendar">
                <Button 
                boxShadow="xl"
                width={200}
                minWidth={200}
                size='lg' 
                leftIcon={<CalendarIcon/>} 
                borderRadius={20} 
                backgroundColor={(selected == "calendar") ? "lavender" : "white"}
                mt={20}
                >
                    Calendrier
                </Button>
            </Link>

            <Link to="/admin/reservations">
                <Button 
                boxShadow="xl"
                size='lg' 
                width={200}
                minWidth={200}
                leftIcon={<HamburgerIcon/>} 
                borderRadius={20} 
                backgroundColor={(selected == "loans") ? "lavender" : "white"} 
                mt={10}
                > 
                    Emprunts
                </Button>
            </Link>
            <Link to="/admin/materials">
                <Button 
                boxShadow="xl"
                width={200}
                minWidth={200}
                size='lg' 
                leftIcon={<PlusSquareIcon/>} 
                borderRadius={20} 
                backgroundColor={(selected == "materials") ? "lavender" : "white"} 
                mt={10}
                > 
                    Matériels
                </Button>     
            </Link>

        </Box>
    )
}