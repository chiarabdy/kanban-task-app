// src/components/KanbanBoard/Column.jsx

// --- These imports are necessary ---
import React from 'react';
import styled from 'styled-components';
import { Droppable } from '@hello-pangea/dnd';
import Task from './Task';
import AddTaskForm from './AddTaskForm';

// --- These styled-component definitions were likely missing ---
const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 8px;
  width: 250px;
  display: flex;
  flex-direction: column;
  background-color: #f4f5f7;
`;
const Title = styled.h3`
  padding: 16px;
  font-family: 'Helvetica', sans-serif;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? '#e3f2fd' : 'inherit')};
  flex-grow: 1;
  min-height: 100px;
`;

// --- The full, correct Column component ---
const Column = ({ column, tasks, onAddTask, onDeleteTask }) => {
  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                onDeleteTask={onDeleteTask}
              />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
      {column.id === 'column-1' && (
        <AddTaskForm onAddTask={onAddTask} columnId={column.id} />
      )}
    </Container>
  );
};

export default Column;