import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Plus, Trash2, Play } from 'lucide-react'
import { calculateCPM } from './utils/cpm'
import PertChart from './components/PertChart'
import GanttChart from './components/GanttChart'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([
    { id: 'A', name: 'A', duration: 3, precedents: [] },
    { id: 'B', name: 'B', duration: 2, precedents: [] },
    { id: 'C', name: 'C', duration: 4, precedents: ['B'] },
    { id: 'D', name: 'D', duration: 6, precedents: ['A'] },
    { id: 'E', name: 'E', duration: 2, precedents: ['A'] },
    { id: 'F', name: 'F', duration: 7, precedents: ['D'] },
    { id: 'G', name: 'G', duration: 8, precedents: ['F'] },
    { id: 'H', name: 'H', duration: 5, precedents: ['G', 'D'] }
  ]);
  
  const [cpmResult, setCpmResult] = useState(null);

  const handleTaskChange = (index, field, value) => {
    const newTasks = [...tasks];
    if (field === 'precedents') {
      newTasks[index][field] = value.split(',').map(s => s.trim()).filter(s => s);
    } else {
      newTasks[index][field] = value;
    }
    setTasks(newTasks);
  };

  const addTask = () => {
    setTasks([...tasks, { id: uuidv4().substring(0,4).toUpperCase(), name: '', duration: 1, precedents: [] }]);
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const generateCharts = () => {
    const result = calculateCPM(tasks);
    setCpmResult(result);
  };

  return (
    <div className="app-container">
      <header className="glass-header">
        <h1>Generador de PERT y Gantt</h1>
        <p>Calcula el Camino Crítico y genera gráficos automáticamente</p>
      </header>

      <main className="main-content">
        <section className="input-section glass-panel">
          <div className="section-header">
            <h2>Tareas del Proyecto</h2>
            <button className="btn-primary" onClick={generateCharts}>
              <Play size={16} /> Generar
            </button>
          </div>
          
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID Tarea</th>
                  <th>Duración</th>
                  <th>Precedencias (separadas por coma)</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index}>
                    <td>
                      <input 
                        type="text" 
                        value={task.id} 
                        onChange={(e) => handleTaskChange(index, 'id', e.target.value)} 
                        placeholder="ID"
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        min="0"
                        value={task.duration} 
                        onChange={(e) => handleTaskChange(index, 'duration', e.target.value)} 
                      />
                    </td>
                    <td>
                      <input 
                        type="text" 
                        value={task.precedents.join(', ')} 
                        onChange={(e) => handleTaskChange(index, 'precedents', e.target.value)} 
                        placeholder="Ej: A, B"
                      />
                    </td>
                    <td>
                      <button className="btn-icon" onClick={() => removeTask(index)}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn-secondary" onClick={addTask}>
            <Plus size={16} /> Agregar Tarea
          </button>
        </section>

        {cpmResult && (
          <section className="charts-section">
            <div className="chart-panel glass-panel">
              <h2>Diagrama PERT (Red)</h2>
              <PertChart graph={cpmResult.graph} />
            </div>
            
            <div className="chart-panel glass-panel">
              <h2>Diagrama de Gantt</h2>
              <GanttChart tasks={cpmResult.tasks} />
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
