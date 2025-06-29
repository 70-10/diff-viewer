"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { diffLines } from "diff";
import lz from "lz-string";
import { createShareUrl } from "@/create-share-url";
import { TextInputPanel } from "@/components/text-input-panel";
import { DiffDisplay } from "@/components/diff-display";
import { ShareUrlSection } from "@/components/share-url-section";

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

  const calculateDiff = (a: string, b: string) => {
    setDiffs(diffLines(a, b));
  };

  const handleText1Change = (value: string) => {
    setText1(value);
    calculateDiff(value, text2);
  };

  const handleText2Change = (value: string) => {
    setText2(value);
    calculateDiff(text1, value);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(
      createShareUrl(window.location.href, text1, text2)
    );
  };

  return (
    <main className="p-5 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold p-5">Diff Viewer</h1>

      <div className="p-4 space-y-6">
        <TextInputPanel
          text1={text1}
          text2={text2}
          onText1Change={handleText1Change}
          onText2Change={handleText2Change}
        />

        <DiffDisplay diffs={diffs} />

        <ShareUrlSection
          shareUrl={createShareUrl(window.location.href, text1, text2)}
          onCopy={copyUrl}
        />
      </div>
    </main>
  );
}
