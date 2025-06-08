// src/App.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DragDropContext } from '@hello-pangea/dnd';
import Confetti from 'react-confetti';
import initialData from './data/initial-data';
import Column from './components/KanbanBoard/Column';

const AppContainer = styled.div`
  font-family: 'Arial', sans-serif;
  text-align: center;
`;

const Header = styled.header`
  background-color: #0079bf;
  color: white;
  padding: 10px 0;
  margin-bottom: 20px;
`;

const BoardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

function App() {
  const [data, setData] = useState(initialData);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddTask = (content, columnId) => {
    const newTaskId = `task-${Date.now()}`;
    const newTask = { id: newTaskId, content: content };
    const newState = {
      ...data,
      tasks: { ...data.tasks, [newTaskId]: newTask },
      columns: {
        ...data.columns,
        [columnId]: {
          ...data.columns[columnId],
          taskIds: [newTaskId, ...data.columns[columnId].taskIds],
        },
      },
    };
    setData(newState);
  };

  const handleDeleteTask = (taskIdToDelete) => {
    const columnContainingTask = Object.values(data.columns).find((column) =>
      column.taskIds.includes(taskIdToDelete)
    );
    if (!columnContainingTask) {
      console.error('Task or column not found for deletion.');
      return;
    }
    const newTaskIds = columnContainingTask.taskIds.filter(
      (id) => id !== taskIdToDelete
    );
    const { [taskIdToDelete]: _, ...remainingTasks } = data.tasks;
    const newState = {
      ...data,
      tasks: remainingTasks,
      columns: {
        ...data.columns,
        [columnContainingTask.id]: {
          ...columnContainingTask,
          taskIds: newTaskIds,
        },
      },
    };
    setData(newState);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];
    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = { ...startColumn, taskIds: newTaskIds };
      const newState = {
        ...data,
        columns: { ...data.columns, [newColumn.id]: newColumn },
      };
      setData(newState);
      return;
    }
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStartColumn = { ...startColumn, taskIds: startTaskIds };
    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = { ...finishColumn, taskIds: finishTaskIds };
    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    };
    setData(newState);
    if (finishColumn.id === 'column-3') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  return (
    <AppContainer>
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
        />
      )}
      <Header>
        <h1>Kanban Task Tracker</h1>
      </Header>
      <DragDropContext onDragEnd={onDragEnd}>
        <BoardContainer>
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks}
                onAddTask={handleAddTask}
                onDeleteTask={handleDeleteTask}
              />
            );
          })}
        </BoardContainer>
      </DragDropContext>
    </AppContainer>
  );
}

export default App;