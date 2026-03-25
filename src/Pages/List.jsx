// import { useState, useCallback } from 'react';
// import { useSortableData } from './hooks/useSortableData';
// import { generateTasks } from './data/tasksSeed';
// import { useTasks } from './contexts/TasksContext'; // Assume you have state management

// const ROW_HEIGHT = 60;
// const OVERSCAN = 5;
// const VISIBLE_BUFFER = 10; // ~ viewport rows

// const ListView = () => {
//   const [scrollTop, setScrollTop] = useState(0);
//   const { tasks: rawTasks, updateTask } = useTasks();
//   const tasks = generateTasks(500); // Or real data
//   const { items: sortedTasks, requestSort, sortConfig } = useSortableData(tasks);

//   const visibleCount = Math.ceil(window.innerHeight / ROW_HEIGHT) + 2 * OVERSCAN;
//   const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
//   const endIndex = Math.min(startIndex + visibleCount, sortedTasks.length);
//   const visibleTasks = sortedTasks.slice(startIndex, endIndex);
//   const topPadding = startIndex * ROW_HEIGHT;
//   const totalHeight = sortedTasks.length * ROW_HEIGHT;

//   const handleScroll = useCallback((e) => {
//     setScrollTop(e.currentTarget.scrollTop);
//   }, []);

//   const getSortIndicator = (key) => sortConfig?.key === key ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : '';

//   return (
//     <div className="list-view" style={{ height: '80vh', overflow: 'auto' }} onScroll={handleScroll}>
//       <div style={{ height: totalHeight, position: 'relative' }}>
//         <div style={{ position: 'absolute', top: 0, width: '100%', transform: `translateY(${topPadding}px)` }}>
//           <table style={{ width: '100%' }}>
//             <thead>
//               <tr>
//                 <th onClick={() => requestSort('title')}>Title {getSortIndicator('title')}</th>
//                 <th onClick={() => requestSort('priority')}>Priority {getSortIndicator('priority')}</th>
//                 <th onClick={() => requestSort('dueDate')}>Due Date {getSortIndicator('dueDate')}</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {visibleTasks.map((task) => (
//                 <tr key={task.id} style={{ height: ROW_HEIGHT }}>
//                   <td>{task.title}</td>
//                   <td>{task.priority}</td>
//                   <td>{new Date(task.dueDate).toLocaleDateString()}</td>
//                   <td>
//                     <select value={task.status} onChange={(e) => updateTask(task.id, { status: e.target.value })}>
//                       <option>todo</option>
//                       <option>in-progress</option>
//                       <option>done</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ListView