"use client";
import { useSearchParams } from "next/navigation";
import { Fragment, useState } from "react";
import { diffLines } from "diff";
import lz from "lz-string";

type DiffResult = {
  added?: boolean;
  removed?: boolean;
  value: string;
};

export default function Home() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  const { textA, textB } = data
    ? (JSON.parse(lz.decompressFromEncodedURIComponent(data)) as {
        textA: string;
        textB: string;
      })
    : { textA: "", textB: "" };

  const [text1, setText1] = useState<string>(textA);
  const [text2, setText2] = useState<string>(textB);
  const [diffs, setDiffs] = useState<DiffResult[]>(diffLines(textA, textB));
  const [copyButtonText, setCopyButtonText] = useState<string>("Copy");

  const calculateDiff = (a: string, b: string) => {
    setDiffs(diffLines(a, b));
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(
      `${window.location.href}?data=${lz.compressToEncodedURIComponent(
        JSON.stringify({ textA: text1, textB: text2 })
      )}`
    );
  };

  return (
    <main className="p-5">
      <h1 className="text-4xl font-bold p-5">Diff Viewer</h1>

      <div className="p-4">
        <div className="flex mb-4 space-x-4">
          <textarea
            className="border p-2 flex-1 h-96"
            value={text1}
            onChange={(e) => {
              setText1(e.target.value);
              calculateDiff(e.target.value, text2);
            }}
            placeholder="Text 1"
          />
          <textarea
            className="border p-2 flex-1 h-96"
            value={text2}
            onChange={(e) => {
              setText2(e.target.value);
              calculateDiff(text1, e.target.value);
            }}
            placeholder="Text 2"
          />
        </div>

        <pre className="border mt-4 p-4 whitespace-pre-wrap">
          {diffs.map((part, index) => {
            const lines = part.value
              .replace(/\n$/, "")
              .split("\n")
              .map((line, lineIndex) => {
                if (part.added) {
                  return (
                    <div
                      key={`${index}-${lineIndex}`}
                      className="bg-green-100 text-green-700"
                    >
                      + {line}
                    </div>
                  );
                }
                if (part.removed) {
                  return (
                    <div
                      key={`${index}-${lineIndex}`}
                      className="bg-red-100 text-red-700"
                    >
                      - {line}
                    </div>
                  );
                }
                return (
                  <div key={`${index}-${lineIndex}`} className="">
                    {line}
                  </div>
                );
              });

            return <Fragment key={index}>{lines}</Fragment>;
          })}
        </pre>
      </div>

      <div className="p-4 flex space-x-4">
        <input
          type="text"
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-100 focus:border-blue-100 block w-full p-2.5"
          value={`${
            window.location.href
          }?data=${lz.compressToEncodedURIComponent(
            JSON.stringify({ textA: text1, textB: text2 })
          )}`}
        />
        <button
          type="button"
          className="text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-3"
          onClick={() => {
            copyUrl();

            setCopyButtonText("Copied");
            setTimeout(() => {
              setCopyButtonText("Copy");
            }, 1000);
          }}
        >
          {copyButtonText}
        </button>
      </div>
    </main>
  );
}
