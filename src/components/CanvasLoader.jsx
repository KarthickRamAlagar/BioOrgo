import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();

  return (
    <Html
      center
      style={{
        background: "rgba(0,0,0,0.7)",
        padding: "20px",
        borderRadius: "10px",
        color: "#fff",
        fontSize: "16px",
        fontWeight: "bold",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <span className="canvas-loader" />
      <p style={{ marginTop: 20 }}>
        {progress > 0 ? `${progress.toFixed(2)}%` : "Loading..."}
      </p>
    </Html>
  );
};

export default CanvasLoader;
