// src/components/KanbanBoard/AddTaskForm.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.form`
  padding: 8px;
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid lightgrey;
  border-radius: 8px;
  margin-bottom: 8px;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
`;

const StyledButton = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: #5aac44;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background-color: #61c548;
  }
`;

const AddTaskForm = ({ onAddTask, columnId }) => {
  const [taskContent, setTaskContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!taskContent.trim()) return;

    onAddTask(taskContent, columnId);
    setTaskContent('');
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        placeholder="Enter a title for this card..."
        value={taskContent}
        onChange={(e) => setTaskContent(e.target.value)}
      />
      <StyledButton type="submit">Add Card</StyledButton>
    </FormContainer>
  );
};

export default AddTaskForm;