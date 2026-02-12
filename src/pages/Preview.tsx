import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DataGrid from "../features/file-viewer/components/DataGrid";
import { useFile } from "../context/FileContext";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function Preview() {
  const navigate = useNavigate();
  const { data, loading, reset } = useFile();

  useEffect(() => {
    if (!data && !loading) {
      navigate("/", { replace: true });
    }
  }, [data, loading, navigate]);

  if (loading) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <LoadingSpinner text="Preparing preview..." />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <DataGrid data={data} onReset={reset} />
    </div>
  );
}
