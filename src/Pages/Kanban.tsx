import React from 'react'
import { useState } from 'react'


interface Task {
    id: string
    title: string
    assignee: string
    priority: 'critical' | 'high' | 'medium' | 'low'
    dueDate?: string
}

interface Column {
    name: string
    status: 'todo' | 'in_progress' | 'in_review' | 'finished'
    items: Task[]
}

function Kanban() {
    const [columns, setColumns] = useState({
        todo: {
            name: "To Do",
            status: "todo",
            items: [
                {
                    id: "1",
                    title: "Market Research",
                    assignee: "John D",
                    priority: "high",
                    dueDate: "2026-04-01"
                },
                {
                    id: "2", title: "Market Project", assignee: "JS", priority: "medium", dueDate: "2026-04-01"
                }
            ]
        },
        in_progress: {
            name: "In Progress",
            status: "in_progress",
            items: [

                {
                    id: "3", title: "Market UI DESIGN", assignee: "MR", priority: "critical", dueDate: "2026-03-20"
                }
            ]
        },
        in_review: {
            name: "In Review",
            status: "in_review",
            items: [
                {
                    id: "4", title: "Backend API", assignee: "SK", priority: "high"
                }
            ]
        },
        finished: {
            name: "Finished",
            status: "finished",
            items: [

                {
                    id: "5", title: "Deployment Script", assignee: "AM", priority: "low"
                }
            ]
        },
    });

    const [newTask, setNewTask] = useState<string>("");
    type ColumnType = "todo" | "in_progress" | "in_review" | "finished";

    const [activeColumns, setActiveColumns] = useState<ColumnType>("todo");
    const [draggedItem, setDraggedItem] = useState<any>(null);
    const [newAssignee, setNewAssignee] = useState<string>("");
    const [newDueDate, setNewDueDate] = useState<string>("");

    const addNewTask = () => {
        if (newTask.trim() === "") return;

        const updatedColumns = { ...columns };

        updatedColumns[activeColumns].items.push({
            id: Date.now().toString(),
            title: newTask,
            assignee: "?",
            priority: "medium" as const,
            dueDate: newDueDate,
        });

        setColumns(updatedColumns);
        setNewTask("");
        setNewAssignee("");
        setNewDueDate("");
    }

    const removeTask = (taskId: string, columnkey: ColumnType) => {
        const updatedColumns = { ...columns };

        updatedColumns[columnkey].items = updatedColumns[columnkey].items.filter(task => task.id !== taskId)

        setColumns(updatedColumns)

    };

    const handleDragStart = (taskId: string, source: ColumnType) => {
        setDraggedItem({ taskId, source })
        console.log("Dragging Item: ", taskId,
            "from: ", source,
        )
    }

    const handleDragOver = (e: any) => {
        e.preventDefault();

    }

    const handleDrop = (e: any, targetColumn: ColumnType) => {
        e.preventDefault();

        if (!draggedItem) return;

        const { taskId, source } = draggedItem;

        if (source === targetColumn) return;

        const updatedColumns = { ...columns };

        const taskToMove = columns[source as keyof typeof columns].items.find(task => task.id === taskId)
        updatedColumns[source].items = updatedColumns[source].items.filter(task => task.id !== taskId);


        if (taskToMove) {
            updatedColumns[targetColumn].items.push(taskToMove)
        }

        setColumns(updatedColumns)
        setDraggedItem(null)
    }

    const priorityColors: Record<Task['priority'], string> = {
        critical: '#ff4d4d',
        high: '#ffa500',
        medium: '#ffeb3b',
        low: '#4caf50'
    }

    const columnStyles = {
        todo: {
            header: "text-blue-300",
            border: "border-t-blue-500"
        },
        in_progress: {
            header: "text-amber-300", border: "border-t-amber-500"
        },
        in_review: {
            header: "text-violet-300", border: "border-t-violet-500"
        },
        finished: {
            header: "text-green-300", border: "border-t-green-500"
        },
    }

    const isOverDue = (dueDate?: string) => {
        if (!dueDate) return;

        if (new Date(dueDate) < new Date(new Date().toString())) return true;
        return false;
    }

    return (
        <>
            <div className=" p-6 w-full min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 flex items-center justify-center">
                <div className="flex items-center justify-center flex-col gap-4 w-full max-w-6xl">
                    <h1 className='text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-800 via-amber-600 to-red-200 flex items-center justify-center'> KANBAN BOARD</h1>

                    <div className='mb-4 flex w-full  rounded-lg overflow-hidden gap-4 justify-center items-center flex-wrap'>


                        <input type='text' value={newTask} onChange={(e: any) => setNewTask(e.target.value)} className='px-3 py-1 bg-zinc-400 text-zinc-600 rounded-lg' placeholder='Enter New Task'></input>

                        <input
                            type="text"
                            value={newAssignee}
                            onChange={(e) => setNewAssignee(e.target.value)}
                            className="px-3 py-1 bg-zinc-700 text-zinc-100 rounded-lg w-28 placeholder:text-zinc-400"
                            placeholder="Assignee"
                        />

                        <input
                            type="date"
                            value={newDueDate}
                            onChange={(e) => setNewDueDate(e.target.value)}
                            className="px-3 py-1 bg-zinc-700 text-zinc-100 rounded-lg"
                        />

                        <button className='bg-red-400 px-3 py-1 rounded-lg whitespace-nowrap' onClick={addNewTask}>ADD TASK</button>

                        <select className='text-zinc-100 bg-zinc-700 px-3 py-1 rounded-lg border-zinc-500' value={activeColumns} onChange={(e) => setActiveColumns(e.target.value as ColumnType)}>
                            {Object.keys(columns).map((activeColumns) => (
                                <option value={activeColumns} key={activeColumns}>
                                    {columns[activeColumns].name}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div className='flex gap-6 overflow-x-auto pb-6 w-full px-4 '>
                        {(Object.keys(columns) as ColumnType[]).map((activeColumns) => (
                            <div key={activeColumns} className={`text-white flex-shrink-0 w-80 rounded-lg shadow-xl border-t-4 ${columnStyles[activeColumns]?.border || ""} bg-zinc-800 p-4`}

                                onDragOver={(e) => handleDragOver(e)}
                                onDrop={(e) => handleDrop(e, activeColumns)}>

                                <div className={`p-4 flex flex-row font-bold text-xl rounded-l-lg gap-3  ${columnStyles[activeColumns]?.header || ""}`}>

                                    {columns[activeColumns].name}

                                    <span className=' ml-auto text-sm text-zinc-400 px-2 py-0.5 rounded-full'>{columns[activeColumns].items.length}</span>
                                </div>

                                <div className='p-2 min-h-64 overflow-y-auto flex flex-auto bg-zinc-700 gap-2 rounded-lg  flex-col'>
                                    {columns[activeColumns].items.map((task) => (
                                        <div key={task.id}
                                            draggable
                                            onDragStart={() => handleDragStart(task.id, activeColumns)}
                                            className="group relative bg-zinc-900 border border-zinc-700 rounded-lg p-3 cursor-grab hover:border-zinc-500 transition-all"
                                        >
                                            <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${priorityColors[task.priority]}`}>
                                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                            </span>

                                            <h2 className="text-zinc-100 text-sm font-medium mb-3">{task.title}</h2>

                                            <div className="flex items-center justify-between">
                                                {task.assignee}
                                            </div>

                                            {task.dueDate && (
                                                <span className={`text-xs px-2 py-0.5 rounded font-mono ${isOverDue(task.dueDate) ? "text-red-400 bg-red-500/10 border border-red-500/30" : "text-zinc-400"}`}>
                                                    {isOverDue(task.dueDate) && "⚠ "}
                                                    {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                                </span>
                                            )}

                                        </div>


                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </>
    )
}

export default Kanban
