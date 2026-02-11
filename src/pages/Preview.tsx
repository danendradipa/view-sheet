import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DataGrid from "../features/file-viewer/components/DataGrid";
import { useFile } from "../context/FileContext";

export default function Preview() {
  const navigate = useNavigate();
  const { data, reset } = useFile();

  useEffect(() => {
    if (!data) {
      navigate("/", { replace: true });
    }
  }, [data, navigate]);

  if (!data) {
    return null;
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto pb-12">
      <DataGrid data={data} onReset={reset} />
    </div>
  );
}