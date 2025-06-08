// src/Task.jsx
import React from 'react';
import styled from 'styled-components';
import { Draggable } from '@hello-pangea/dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? '#e2f7f1' : 'white')};
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  font-family: 'Arial', sans-serif;
`;

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;