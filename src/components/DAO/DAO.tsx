import {
    Container,
    Grid,
    GridItem,
} from '@chakra-ui/react';
import TaskList from './TaskList';
import Metainfo from './Metainfo';
import CreateTask from './CreateTask';
import EventList from './EventList';
import DAODescription from './DAODescription';
import { CustomDivider } from '../CustomDivider/CustomDivider';


export default function DAO() {
    return (

        <Container maxW={'7xl'}>
            <Grid
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 1fr)'
            >
                <GridItem colSpan={1}>
                    <Metainfo />
                    <CustomDivider title="Actions" padding="5" />
                    <CreateTask />
                </GridItem>

                <GridItem colSpan={4}>
                    <TaskList />
                    <EventList />
                    <DAODescription />
                </GridItem>
            </Grid>
        </Container>





    );
}