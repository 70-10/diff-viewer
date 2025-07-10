import React, { Fragment } from "react";

type DiffResult = {
  added?: boolean;
  removed?: boolean;
  value: string;
};

interface DiffDisplayProps {
  diffs: DiffResult[];
}

export function DiffDisplay({ diffs }: DiffDisplayProps) {
  return (
    <pre className="border mt-4 p-4 whitespace-pre-wrap bg-card rounded-md">
      {diffs.map((part, index) => {
        const lines = part.value
          .replace(/\n$/, "")
          .split("\n")
          .map((line, lineIndex) => {
            if (part.added) {
              return (
                <div
                  key={`${index}-${lineIndex}`}
                  className="bg-green-100 text-green-700 px-1 rounded"
                >
                  + {line}
                </div>
              );
            }
            if (part.removed) {
              return (
                <div
                  key={`${index}-${lineIndex}`}
                  className="bg-red-100 text-red-700 px-1 rounded"
                >
                  - {line}
                </div>
              );
            }
            return (
              <div key={`${index}-${lineIndex}`} className="px-1">
                {line}
              </div>
            );
          });

        return <Fragment key={index}>{lines}</Fragment>;
      })}
    </pre>
  );
}