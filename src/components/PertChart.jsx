import { useEffect, useRef } from 'react';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';

const PertChart = ({ graph }) => {
  const containerRef = useRef(null);
  const networkRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !graph) return;

    // Build vis-network nodes with custom labels showing
    // the tripartite structure: Event ID / ES / LS
    const nodes = new DataSet(
      graph.nodes.map(node => ({
        id: node.id,
        label: node.label + '\n───────\nET: ' + (node.es !== undefined ? node.es : '?') + '  |  LT: ' + (node.ls !== undefined ? node.ls : '?'),
        shape: 'box',
        color: {
          background: (node.isStart || node.isEnd) ? '#1e3a5f' : '#1e293b',
          border: (node.isStart || node.isEnd) ? '#60a5fa' : '#475569',
          highlight: { background: '#334155', border: '#3b82f6' },
          hover: { background: '#334155', border: '#3b82f6' }
        },
        font: {
          color: '#f8fafc',
          face: 'Inter, monospace',
          size: 12,
          multi: false,
          align: 'center'
        },
        borderWidth: 2,
        borderWidthSelected: 3,
        margin: 10,
        shadow: {
          enabled: true,
          color: 'rgba(0,0,0,0.4)',
          size: 8
        }
      }))
    );

    const edges = new DataSet(
      graph.edges.map((edge, i) => ({
        id: i,
        from: edge.from,
        to: edge.to,
        label: edge.isDummy ? (edge.label || '') : edge.label,
        arrows: { to: { enabled: true, scaleFactor: 0.8 } },
        dashes: edge.isDummy ? [6, 4] : false,
        color: {
          color: edge.isCritical ? '#ef4444' : (edge.isDummy ? '#6b7280' : '#3b82f6'),
          highlight: edge.isCritical ? '#f87171' : '#60a5fa',
          hover: edge.isCritical ? '#f87171' : '#60a5fa'
        },
        font: {
          color: edge.isCritical ? '#fca5a5' : (edge.isDummy ? '#9ca3af' : '#93c5fd'),
          strokeWidth: 0,
          size: 11,
          face: 'Inter, sans-serif',
          align: 'top',
          background: 'rgba(15,23,42,0.8)'
        },
        width: edge.isCritical ? 3 : (edge.isDummy ? 1 : 2),
        smooth: {
          enabled: true,
          type: 'cubicBezier',
          forceDirection: 'horizontal',
          roundness: 0.4
        }
      }))
    );

    const options = {
      layout: {
        hierarchical: {
          direction: 'LR',
          sortMethod: 'directed',
          nodeSpacing: 120,
          levelSeparation: 220,
          treeSpacing: 100
        }
      },
      physics: false,
      interaction: {
        dragNodes: true,
        dragView: true,
        zoomView: true,
        hover: true,
        tooltipDelay: 200
      },
      nodes: {
        widthConstraint: { minimum: 90, maximum: 140 }
      }
    };

    // Destroy previous network if it exists
    if (networkRef.current) {
      networkRef.current.destroy();
    }

    networkRef.current = new Network(containerRef.current, { nodes, edges }, options);

    return () => {
      if (networkRef.current) {
        networkRef.current.destroy();
        networkRef.current = null;
      }
    };
  }, [graph]);

  return (
    <div
      ref={containerRef}
      style={{
        height: '500px',
        width: '100%',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(0,0,0,0.2)'
      }}
    />
  );
};

export default PertChart;
