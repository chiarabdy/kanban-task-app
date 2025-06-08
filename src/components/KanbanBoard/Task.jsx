// src/components/KanbanBoard/Task.jsx
import React from 'react';
import styled from 'styled-components';
import { Draggable } from '@hello-pangea/dnd';

// 1. Create a styled component for the delete button
const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 2px 6px;
  border: none;
  background-color: #f4f5f7; // Match column background
  color: #6b778c;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0; // Make it invisible by default
  transition: opacity 0.2s ease-in-out;
  font-size: 14px;
  line-height: 1;

  &:hover {
    background-color: #ebecf0;
    color: #172b4d;
  }
`;

const Container = styled.div`
  position: relative; // Needed for positioning the delete button
  border: 1px solid lightgrey;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? '#e2f7f1' : 'white')};
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  font-family: 'Arial', sans-serif;

  // 2. On hover, make the delete button visible
  &:hover ${DeleteButton} {
    opacity: 1;
  }
`;

// 3. Add 'onDeleteTask' to the component's props
const Task = ({ task, index, onDeleteTask }) => {
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
          {/* 4. Add the button with an onClick handler */}
          <DeleteButton onClick={() => onDeleteTask(task.id)}>
            🗑️
          </DeleteButton>
        </Container>
      )}
    </Draggable>
  );
};

export default Task;