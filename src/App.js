import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { ChakraProvider, Box, VStack, Heading, Flex, useColorModeValue } from '@chakra-ui/react';
import TaskForm from './components/TaskForm';
import TaskBoard from './components/TaskBoard';
import PriorityFilter from './components/PriorityFilter';
import ThemeToggle from './components/ThemeToggle';
import useTaskStore from './store/taskStore';
import theme from './theme';
import './App.css';

function AppContent() {
  const { moveTask } = useTaskStore();
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    moveTask(result.draggableId, source.droppableId, destination.droppableId);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box className="app-container" bg={bgColor} color={textColor} minHeight="100vh" p={4} transition="background-color 0.2s">
        <VStack spacing={6} align="stretch">
          <Flex justifyContent="space-between" alignItems="center" wrap="wrap">
            <Heading as="h1" size="2xl">
              Task Management App
            </Heading>
            <ThemeToggle />
          </Flex>
          <TaskForm />
          <PriorityFilter />
          <TaskBoard />
        </VStack>
      </Box>
    </DragDropContext>
  );
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppContent />
    </ChakraProvider>
  );
}

export default App;