// src/components/KanbanBoard/Task.jsx
import React from 'react';
import styled from 'styled-components';
import { Draggable } from '@hello-pangea/dnd';

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 2px 6px;
  border: none;
  background-color: #f4f5f7;
  color: #6b778c;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0; // The button is invisible by default.
  transition: opacity 0.2s ease-in-out;
  font-size: 14px;
  line-height: 1;

  &:hover {
    background-color: #ebecf0;
    color: #172b4d;
  }
`;

const Container = styled.div`
  position: relative; // This is required to position the delete button inside the container.
  border: 1px solid lightgrey;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? '#e2f7f1' : 'white')};
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  font-family: 'Arial', sans-serif;

  // 2. This CSS rule makes the delete button appear when we hover over the task card.
  &:hover ${DeleteButton} {
    opacity: 1;
  }
`;

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
          <DeleteButton onClick={() => onDeleteTask(task.id)}>
            🗑️
          </DeleteButton>
        </Container>
      )}
    </Draggable>
  );
};

export default Task;