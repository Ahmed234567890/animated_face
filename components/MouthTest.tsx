"use client";

export default function MouthTest() {
  const openMouth = () => {
    (window as any).audioLevel = 1;
  };

  const closeMouth = () => {
    (window as any).audioLevel = 0;
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 20,
      }}
    >
      <button onClick={openMouth}>
        Open mouth
      </button>

      <button onClick={closeMouth}>
        Close mouth
      </button>
    </div>
  );
}
