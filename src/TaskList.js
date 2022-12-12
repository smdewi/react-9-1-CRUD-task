import React from 'react';

export default class TaskList extends React.Component {
    state = {
        "tasks": [
            {
                id: 1,
                description:'Walk the dog',
                done:false
            },
            {
                id: 2,
                description:'Water the plants',
                done:false
            },
            {
                id: 3,
                description:'Pay the bills',
                done:false
            }
        ],
        newTaskName: "",
        taskBeingEdited: null,
        editedTaskName: ""
    }

    addTask = () => {
        const newTask = {
            id: Math.floor(Math.random()*10000 + 1),
            description: this.state.newTaskName,
            done: false
        };
        console.log("new Task: ", newTask);
        console.log("Task being added");

        this.setState({
            tasks: [...this.state.tasks, newTask]
        }); 

    }

    updateFormField = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    checkTask = (task) => {
        let clonedTask = {...task};
        clonedTask.done = !clonedTask.done;
        const indexToReplace = this.state.tasks.findIndex((eachTask => {
            if(eachTask.id === task.id) return true;
            else return false;
        }))
        const left = this.state.tasks.slice(0, indexToReplace);
        const right = this.state.tasks.slice(indexToReplace+1);
        this.setState({
            tasks: [...left, clonedTask, ...right]
        });
    }

    beginEditTask = (task) => {
        this.setState({
            taskBeingEdited: task,
            editedTaskName: task.description
        });
    }

    processEditTask = (task) => {
        const clonedTask = {...this.state.taskBeingEdited,
        description: this.state.editedTaskName};
        const indexToReplace = this.state.tasks.findIndex((eachTask) => {
            if(eachTask.id === clonedTask.id) return true;
            else return false;
        });
        const modifiedTasks = [...this.state.tasks.slice(0, indexToReplace), clonedTask,
        ...this.state.tasks.slice(indexToReplace + 1)];
        this.setState({
            tasks: modifiedTasks,
            taskBeingEdited: null
        });
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <label>Task Name: </label>
                    <input type="text" name="newTaskName" value={this.state.newTaskName} onChange={this.updateFormField}/>
                    <button onClick={this.addTask}>Add Task</button>
                </div>

                <ul>
                    {this.state.tasks.map(eachTask => {
                        if (this.state.taskBeingEdited && eachTask.id === this.state.taskBeingEdited.id) {
                            return (
                                <li key={eachTask.id}>
                                    <input type="text" name="editedTaskName" value={this.state.editedTaskName}
                                    onChange={this.updateFormField}/>
                                    <button onClick={this.processEditTask}>Update</button>
                                    <button>Cancel</button>
                                </li>
                            );
                        }
                        else {
                            return (
                                <li key={eachTask.id}>
                                {eachTask.description}
                                <input type="checkbox" checked={eachTask.done}
                                onChange={() => {this.checkTask(eachTask)}}/>
                                <button onClick={() => {
                                    this.beginEditTask(eachTask)
                                }}>Edit</button>
                                <button>Delete</button>
                            </li>
                            ); 
                        }
                         
                    })}
                </ul>


            </React.Fragment>
        );
    }
}