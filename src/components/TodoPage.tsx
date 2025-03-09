import { Check, Delete, Edit } from '@mui/icons-material';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>(''); 
  const [editingTask, setEditingTask] = useState<Task | null>(null); 
  const [showAddTaskForm, setShowAddTaskForm] = useState<boolean>(false); 

  const handleFetchTasks = async () => setTasks(await api.get('/tasks'));

  const handleDelete = async (id: number) => {
    await api.delete(`/tasks/${id}`);
    handleFetchTasks(); 
  };

  const handleSave = async () => {
    if (newTask.trim() === '') return;
    await api.post('/tasks', { name: newTask });
    setNewTask(''); 
    handleFetchTasks(); 
    setShowAddTaskForm(false); 
  };

  const handleSaveTask = async () => {
    if (!editingTask || editingTask.name === newTask) return; 
    await api.put(`/tasks/${editingTask.id}`, { name: newTask });

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editingTask.id ? { ...task, name: newTask } : task
      )
    );

    setEditingTask(null); 
    setNewTask(''); 
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setNewTask(task.name); 
  };

  useEffect(() => {
    handleFetchTasks();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        {tasks.map((task) => (
          <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={1} width="100%" key={task.id}>
            <TextField
              size="small"
              value={editingTask?.id === task.id ? newTask : task.name}
              fullWidth
              sx={{ maxWidth: 350 }}
              onChange={(e) => setNewTask(e.target.value)} 
              disabled={editingTask?.id !== task.id} 
            />
            <Box>
              {editingTask?.id !== task.id && (
                <IconButton color="primary" onClick={() => handleEditTask(task)}>
                  <Edit />
                </IconButton>
              )}
              {/* Afficher le check seulement en mode édition */}
              {editingTask?.id === task.id && (
                <IconButton
                  color="success"
                  onClick={handleSaveTask}
                  disabled={newTask.trim() === ''}
                >
                  <Check />
                </IconButton>
              )}
              <IconButton color="error" onClick={() => handleDelete(task.id)}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))}

        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <Button variant="outlined" onClick={() => setShowAddTaskForm(true)}>
            Ajouter une tâche
          </Button>
        </Box>

        {showAddTaskForm && (
          <Box mt={3} display="flex" justifyContent="center" alignItems="center">
            <TextField
              label="Nouvelle Tâche"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              size="small"
              fullWidth
              sx={{ maxWidth: 350 }}
            />
            <IconButton
              color="success"
              onClick={handleSave}
              disabled={newTask.trim() === ''}
            >
              <Check />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => setShowAddTaskForm(false)} 
            >
              <Delete />
            </IconButton>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default TodoPage;
