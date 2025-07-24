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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TreeNode } from './ui/treeNode';
import TreeEdge from './ui/treeEdge';

const nodeTypes = {
    treeNode: TreeNode,
};

const edgeTypes = {
    treeEdge: TreeEdge,
}


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
            width: 320,
            height: 230,
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

    const style={background: '#f7f9fb'}

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onConnect={onConnect}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            nodesDraggable={false}
            minZoom={0.1}
            style={style}
            fitView
            className="min-h-[500px] md:min-h-[700px] rounded-xl"
        >
            <Panel position="top-right">
                <Tabs defaultValue="account">
                    <TabsList>
                        <TabsTrigger value="account" onClick={() => onLayout({ direction: 'DOWN' })}>
                            <ArrowDownFromLine />
                        </TabsTrigger>
                        <TabsTrigger value="password" onClick={() => onLayout({ direction: 'RIGHT' })}>
                            <ArrowRightFromLine />
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="account"></TabsContent>
                    <TabsContent value="password"></TabsContent>
                </Tabs>
            </Panel>
            <Background />
            <Controls />
        </ReactFlow>
    );
}

export function Tree({ data }) {

    const initPosition = { x: 0, y: 0 };
    let initialEdges = [];
    let initialNodes = [];

    for (let dataset in data) {

        const share = parseFloat(data[dataset].share)
        const shareRounded = Math.round(share * 10) / 10

        let node = {
            id: data[dataset].id,
            position: initPosition,
            type: 'treeNode',
            sourcePosition: 'right',
            targetPosition: 'left',
            data: {
                detailedName: data[dataset].lotOverview?.detailedName?.value || '-',
                productName: data[dataset].lotOverview?.product_name?.value || '-',
                primaryImage: data[dataset].primaryImage,
                share: shareRounded,
                gtin: data[dataset].lotOverview.gtin.value,
                lot: data[dataset].lotOverview.lot.value,
                quantity: data[dataset].lotOverview?.lotQuantity?.value || '-',
                quantityUom: data[dataset].lotOverview.lotQuantity.uom_desc,
                productionStep: data[dataset].productionDetails.productionStep.value,
                eventTime: data[dataset].productionDetails.eventTime.value
            }
        }

        initialNodes.push(node);

        var edge = {
            id: 'e' + data[dataset].id + 'TO' + data[dataset].parent,
            source: data[dataset].parent,
            target: data[dataset].id,
            data: {
                label: shareRounded,
            },
            type: 'treeEdge'
        }

        if (edge.source != edge.target) {
            initialEdges.push(edge);
        }
    }

    return (
        <div className="min-h-[500px] md:min-h-[700px] rounded-xl shadow-sm">
            <ReactFlowProvider>
                <LayoutFlow initialNodes={initialNodes} initialEdges={initialEdges} />
            </ReactFlowProvider>
        </div>
    )
}