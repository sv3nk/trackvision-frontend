'use client'

import '@xyflow/react/dist/style.css';
import ELK from 'elkjs/lib/elk.bundled.js';
import React, { useCallback, useLayoutEffect } from 'react';
import {
    Background,
    ReactFlow,
    ReactFlowProvider,
    Controls,
    addEdge,
    Panel,
    useNodesState,
    useEdgesState,
    useReactFlow,
} from '@xyflow/react';
import {
  ArrowDownFromLine,
  ArrowRightFromLine
} from "lucide-react"


const elk = new ELK();

// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html
const elkOptions = {
    'elk.algorithm': 'mrtree',
    'elk.spacing.nodeNode': '60',
};

const getLayoutedElements = (nodes, edges, options = {}) => {
    const isHorizontal = options?.['elk.direction'] === 'RIGHT';
    const graph = {
        id: 'root',
        layoutOptions: options,
        children: nodes.map((node) => ({
            ...node,
            // Adjust the target and source handle positions based on the layout
            // direction.
            targetPosition: isHorizontal ? 'left' : 'top',
            sourcePosition: isHorizontal ? 'right' : 'bottom',

            // Hardcode a width and height for elk to use when layouting.
            width: 150,
            height: 50,
        })),
        edges: edges,
    };

    return elk
        .layout(graph)
        .then((layoutedGraph) => ({
            nodes: layoutedGraph.children.map((node) => ({
                ...node,
                // React Flow expects a position property on the node instead of `x`
                // and `y` fields.
                position: { x: node.x, y: node.y },
            })),

            edges: layoutedGraph.edges,
        }))
        .catch(console.error);
};

function LayoutFlow({ initialNodes, initialEdges }) {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { fitView } = useReactFlow();

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
    const onLayout = useCallback(
        ({ direction, useInitialNodes = false }) => {
            const opts = { 'elk.direction': direction, ...elkOptions };
            const ns = useInitialNodes ? initialNodes : nodes;
            const es = useInitialNodes ? initialEdges : edges;

            getLayoutedElements(ns, es, opts).then(
                ({ nodes: layoutedNodes, edges: layoutedEdges }) => {
                    setNodes(layoutedNodes);
                    setEdges(layoutedEdges);
                    fitView();
                },
            );
        },
        [nodes, edges],
    );

    // Calculate the initial layout on mount.
    useLayoutEffect(() => {
        onLayout({ direction: 'DOWN', useInitialNodes: true });
    }, []);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onConnect={onConnect}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            minZoom={0.1}
            fitView
            className="min-h-[500px] md:min-h-[600px]"
        >
            <Panel position="top-right">
                <button
                    className="text-sm bg-muted/50 p-1 shadow-sm mr-2"
                    onClick={() => onLayout({ direction: 'DOWN' })}
                >
                    <ArrowDownFromLine size={18} />
                </button>

                <button
                    className="text-sm bg-muted/50 p-1 shadow-sm"
                    onClick={() => onLayout({ direction: 'RIGHT' })}
                >
                    <ArrowRightFromLine size={18} />
                </button>
            </Panel>
            <Background />
            <Controls />
        </ReactFlow>
    );
}

export function Tree({ data }) {

    const initPosition = { x: 0, y: 0 };
    let initialEdges  = [];
    let initialNodes = data;

    // add position and node content information to dataset
    for (let node in initialNodes) {
        initialNodes[node].position = initPosition;
        initialNodes[node]['data'] = { label: initialNodes[node].lotOverview.detailedName.value };


        var edge = {
            id: 'e' + initialNodes[node].id + 'TO' + initialNodes[node].parent,
            source: initialNodes[node].parent,
            target: initialNodes[node].id,
            type: 'smoothstep'
        }

        initialEdges .push(edge);
    }

    return (
        <div className="min-h-[500px] md:min-h-[600px]">
              <ReactFlowProvider>
                <LayoutFlow initialNodes={initialNodes} initialEdges={initialEdges} />
            </ReactFlowProvider>
        </div>
    )
}