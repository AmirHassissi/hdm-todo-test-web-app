Backend
I implemented the POST /tasks endpoint for creating tasks and modified the PATCH /tasks/:id endpoint to update tasks using the SaveTaskUseCase. I also adjusted its import in the controller.

The save() method was added to handle both task creation and updates, based on the presence of an ID. Additionally, input types have been simplified by removing the @todo annotations.

The injection of the TaskRepository now handles task storage, along with data validation and error management in the handle() method.

Frontend
The updated code enables full task management, including creation, deletion, and editing. The interface utilizes states like newTask, editingTask, and showAddTaskForm to dynamically and responsively control button visibility based on possible actions.
