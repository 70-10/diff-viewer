import { Textarea } from "@/components/ui/textarea";

interface TextInputPanelProps {
  text1: string;
  text2: string;
  onText1Change: (value: string) => void;
  onText2Change: (value: string) => void;
}

export function TextInputPanel({
  text1,
  text2,
  onText1Change,
  onText2Change,
}: TextInputPanelProps) {
  return (
    <div className="flex mb-4 space-x-4">
      <Textarea
        className="flex-1 h-96"
        value={text1}
        onChange={(e) => onText1Change(e.target.value)}
        placeholder="Text 1"
      />
      <Textarea
        className="flex-1 h-96"
        value={text2}
        onChange={(e) => onText2Change(e.target.value)}
        placeholder="Text 2"
      />
    </div>
  );
}