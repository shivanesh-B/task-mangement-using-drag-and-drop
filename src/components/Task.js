import React from 'react';
import { Box, Text, Badge, useColorModeValue } from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';

const Task = ({ task, index }) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "white");
  const draggingBg = useColorModeValue("gray.100", "gray.600");

  const priorityColors = {
    low: {
      bg: useColorModeValue("green.100", "green.800"),
      text: useColorModeValue("green.800", "green.100"),
    },
    medium: {
      bg: useColorModeValue("yellow.100", "yellow.800"),
      text: useColorModeValue("yellow.800", "yellow.100"),
    },
    high: {
      bg: useColorModeValue("red.100", "red.800"),
      text: useColorModeValue("red.800", "red.100"),
    },
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          borderWidth={1}
          borderRadius="md"
          p={2}
          mb={2}
          bg={snapshot.isDragging ? draggingBg : bgColor}
          boxShadow={snapshot.isDragging ? "lg" : "none"}
          borderColor={borderColor}
          transition="background-color 0.2s, border-color 0.2s"
        >
          <Text fontWeight="bold" color={textColor} mb={2}>
            {task.title}
          </Text>
          <Badge
            bg={priorityColors[task.priority].bg}
            color={priorityColors[task.priority].text}
            px={2}
            py={1}
            borderRadius="md"
          >
            {task.priority.toUpperCase()}
          </Badge>
        </Box>
      )}
    </Draggable>
  );
};

export default Task;