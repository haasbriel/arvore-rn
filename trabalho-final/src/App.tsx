import React, { useState } from "react";
import "./App.css";
import RedBlackTree from "./redblacktree";

const App: React.FC = () => {
  const [tree] = useState(new RedBlackTree<number>());
  const [value, setValue] = useState<string>("");
  const [nodes, setNodes] = useState<any[]>([]);

  const updateNodes = () => {
    const traverse = (node: any): any => {
      if (!node) return null;
      return {
        name: `${node.value}`,
        color: node.color,
        children: [traverse(node.left), traverse(node.right)].filter(Boolean),
      };
    };
    setNodes(tree.root ? [traverse(tree.root)] : []);
  };

  const handleInsert = () => {
    if (value.trim() === "") return;
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) {
      alert("Por favor, insira um número válido.");
      return;
    }
    if (tree.has(numValue)) {
      alert("Este valor já está na árvore.");
      return;
    }
    tree.insert(numValue);
    setValue("");
    updateNodes();
  };

  const handleClearInput = () => setValue("");
  //aksbfjadsbfjlb
  return (
    <div className="app-container">
      <h1>Árvore Rubro Negra</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Insira um número"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleInsert}>Inserir</button>
        <button onClick={handleClearInput}>Limpar</button>
      </div>
      <div className="tree-container">
        {nodes.length > 0 ? (
          <Tree nodes={nodes} />
        ) : (
          <p>Insira valores para visualizar a árvore.</p>
        )}
      </div>
    </div>
  );
};

const Tree: React.FC<{ nodes: any[] }> = ({ nodes }) => {
  const renderNode = (node: any, x: number, y: number, level: number): any => {
    const dx = 150 / (level + 1); // Distância horizontal entre os nós
    const nextY = y + 50;

    return (
      <g key={node.name}>
        {/* Linhas conectando nós */}
        {node.children?.map((child: any, index: number) => (
          <line
            key={`line-${node.name}-${child.name}`}
            x1={x}
            y1={y}
            x2={x + (index === 0 ? -dx : dx)}
            y2={nextY}
            stroke="#34495e"
            strokeWidth="2"
          />
        ))}

        {/* Nó */}
        <circle
          cx={x}
          cy={y}
          r="20"
          fill={node.color === "RED" ? "#e74c3c" : "#000000"}
          stroke="#34495e"
          strokeWidth="2"
        />
        {/* Texto */}
        <text
          x={x}
          y={y + 5}
          textAnchor="middle"
          fontSize="12px"
          fill="#ffffff"
        >
          {node.name}
        </text>

        {/* Renderização recursiva dos filhos */}
        {node.children?.map((child: any, index: number) =>
          renderNode(
            child,
            x + (index === 0 ? -dx : dx),
            nextY,
            level + 1
          )
        )}
      </g>
    );
  };

  return (
    <svg width="100%" height="500px">
      {renderNode(nodes[0], 300, 50, 0)}
    </svg>
  );
};

export default App;
