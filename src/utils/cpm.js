// utils/cpm.js
// Implements CPM (Critical Path Method) with AOA (Activity on Arrow) graph construction
// including dummy/fictitious activities.

export function calculateCPM(tasks) {
  // tasks: array of { id, name, duration, precedents: string[] }

  // 1. Build task map
  const taskMap = new Map();
  tasks.forEach(t => {
    taskMap.set(t.id, {
      ...t,
      duration: Number(t.duration) || 0,
      precedents: t.precedents ? t.precedents.filter(p => p.trim()) : [],
      successors: [],
      es: 0, ef: 0, ls: 0, lf: 0, slack: 0,
      isCritical: false
    });
  });

  // 2. Populate successors
  taskMap.forEach(task => {
    task.precedents.forEach(pId => {
      if (taskMap.has(pId)) {
        taskMap.get(pId).successors.push(task.id);
      }
    });
  });

  // 3. Topological sort + Forward Pass
  const inDegree = new Map();
  taskMap.forEach((task, id) => inDegree.set(id, task.precedents.length));

  const queue = [];
  inDegree.forEach((deg, id) => { if (deg === 0) queue.push(id); });

  const topoOrder = [];
  while (queue.length > 0) {
    const cId = queue.shift();
    const task = taskMap.get(cId);
    topoOrder.push(cId);

    task.successors.forEach(sId => {
      const s = taskMap.get(sId);
      s.es = Math.max(s.es, task.ef);
      s.ef = s.es + s.duration;
      inDegree.set(sId, inDegree.get(sId) - 1);
      if (inDegree.get(sId) === 0) queue.push(sId);
    });

    // Set EF for tasks with no precedents
    if (task.precedents.length === 0) {
      task.es = 0;
      task.ef = task.duration;
    }
  }

  // 4. Project duration
  let projectDuration = 0;
  taskMap.forEach(t => { if (t.ef > projectDuration) projectDuration = t.ef; });

  // 5. Backward Pass
  taskMap.forEach(t => {
    if (t.successors.length === 0) {
      t.lf = projectDuration;
      t.ls = t.lf - t.duration;
    } else {
      t.lf = Infinity;
    }
  });

  for (let i = topoOrder.length - 1; i >= 0; i--) {
    const task = taskMap.get(topoOrder[i]);
    if (task.successors.length > 0) {
      let minLS = Infinity;
      task.successors.forEach(sId => {
        const s = taskMap.get(sId);
        if (s.ls < minLS) minLS = s.ls;
      });
      task.lf = minLS;
      task.ls = task.lf - task.duration;
    }
    task.slack = task.ls - task.es;
    task.isCritical = task.slack === 0;
  }

  // 6. Build AOA (Activity on Arrow) PERT graph
  // Each task = an arrow. Nodes = events (instants).
  // Dummy tasks (ficticias) are added to maintain correct dependencies.
  const nodes = [];
  const edges = [];
  let nodeId = 0;

  // taskToNodes: maps taskId -> { start: nodeId, end: nodeId }
  const taskToNodes = new Map();

  // Create unique start/end event nodes for each task
  taskMap.forEach((task, id) => {
    taskToNodes.set(id, { start: nodeId++, end: nodeId++ });
  });

  // Project start and end nodes
  const projectStartNode = nodeId++;
  const projectEndNode = nodeId++;

  // Add project start/end nodes
  nodes.push({ id: projectStartNode, label: '0', es: 0, ls: 0, isStart: true });
  nodes.push({ id: projectEndNode, label: 'F', es: projectDuration, ls: projectDuration, isEnd: true });

  // Add event nodes for each task
  taskMap.forEach((task, id) => {
    const tn = taskToNodes.get(id);
    nodes.push({ id: tn.start, label: String(tn.start), es: task.es, ls: task.ls });
    nodes.push({ id: tn.end, label: String(tn.end), es: task.ef, ls: task.lf });
  });

  // Add task arrows (real activities)
  taskMap.forEach((task, id) => {
    const tn = taskToNodes.get(id);
    edges.push({
      from: tn.start,
      to: tn.end,
      label: id + ' (' + task.duration + ')',
      duration: task.duration,
      isCritical: task.isCritical,
      isDummy: false
    });
  });

  // Connect project start to tasks with no precedents (dummy arrows)
  taskMap.forEach((task, id) => {
    if (task.precedents.length === 0) {
      const tn = taskToNodes.get(id);
      edges.push({
        from: projectStartNode,
        to: tn.start,
        label: '',
        duration: 0,
        isCritical: task.isCritical,
        isDummy: true
      });
    }
  });

  // Connect tasks with no successors to project end (dummy arrows)
  taskMap.forEach((task, id) => {
    if (task.successors.length === 0) {
      const tn = taskToNodes.get(id);
      edges.push({
        from: tn.end,
        to: projectEndNode,
        label: '',
        duration: 0,
        isCritical: task.isCritical,
        isDummy: true
      });
    }
  });

  // Add dependency arrows (dummy/fictitious activities)
  // If task B depends on task A, we add a dummy arrow from A.end -> B.start
  taskMap.forEach((task, id) => {
    task.precedents.forEach(precId => {
      const precEnd = taskToNodes.get(precId).end;
      const taskStart = taskToNodes.get(id).start;
      edges.push({
        from: precEnd,
        to: taskStart,
        label: 'fict.',
        duration: 0,
        isDummy: true,
        isCritical: false
      });
    });
  });

  return {
    tasks: Array.from(taskMap.values()),
    graph: { nodes, edges },
    projectDuration
  };
}
