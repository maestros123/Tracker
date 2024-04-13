import { makeAutoObservable } from "mobx";

export interface Task {
    id: string;
    title: string;
}

class TaskStore {
    tasks: Task[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addTask(title: string) {
        const newTask: Task = {
            id: Math.random().toString(36).substr(2, 9),
            title,
        };
        this.tasks.push(newTask);
    }

    // moveTask(id: string, newStatus: Task["status"]) {
    //     const task = this.tasks.find(task => task.id === id);
    //     if (task) {
    //         task.status = newStatus;
    //     }
    // }

    delTask(id: string) {
        this.tasks = this.tasks.filter((el) => el.id !== id)

    }
}

export const taskStore = new TaskStore();
