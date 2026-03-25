import React from 'react'
import { useState } from 'react'
import './App.css'
import Kanban from './Pages/Kanban'
// import ListView from './Pages/List.tsx'


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

function App() {
  return (
    <>
      <Kanban />
    </>
  )

}


export default App