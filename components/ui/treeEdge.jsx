import React from 'react';
import {
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
  getSmoothStepPath
} from '@xyflow/react';

const TreeEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
          className="absolute rounded-sm bg-white shadow-sm py-1 px-2 text-xs"
        >
          {data.label}%
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default TreeEdge;