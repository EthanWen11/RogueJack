import React from "react";

export default function LoadGameScreen({
  onLoad,
  fileInputRef,
}: {
  onLoad: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>; // Allow null here
}) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      console.log("Loaded save:", reader.result);
      onLoad();
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-20">
      <h2 className="text-2xl">Load Game</h2>
      <textarea
        className="w-96 h-32 p-2 border"
        placeholder="Paste saved game string here..."
        onBlur={(e) => {
          console.log("Loaded string:", e.target.value);
          onLoad();
        }}
      />
      <input
        type="file"
        accept=".txt"
        ref={fileInputRef}
        onChange={handleFileUpload}
      />
    </div>
  );
}
