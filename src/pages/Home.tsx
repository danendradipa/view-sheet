import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FileJson, Zap, Layout } from "lucide-react"; 
import FileUploader from "../features/file-viewer/components/FileUploader";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Alert from "../components/ui/Alert";
import { useFile } from "../context/FileContext";

export default function Home() {
  const navigate = useNavigate();
  const { data, loading, error, parseFile, reset } = useFile();

  useEffect(() => {
    if (data) {
      navigate("/preview");
    }
  }, [data, navigate]);

  const handleFileSelect = async (file: File) => {
    await parseFile(file);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="text-center space-y-6 pt-8">
        
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
          Spreadsheet Viewer <br className="hidden sm:block" />
          <span className="text-slate-500">Simplified.</span>
        </h1>
        
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          The fastest way to preview CSV, TSV, or JSON files without opening heavy spreadsheet software. Secure, client-side, and instant.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        {error && (
          <div className="mb-6">
            <Alert type="error" message={error.message} onClose={reset} />
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-200 rounded-xl shadow-sm">
            <LoadingSpinner />
            <p className="mt-4 text-sm text-slate-500 animate-pulse">Processing your file...</p>
          </div>
        ) : (
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
            <FileUploader onFileSelect={handleFileSelect} disabled={loading} />
          </div>
        )}
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-100">
        <FeatureCard 
          icon={<FileJson className="w-6 h-6" />}
          title="Multiple Formats"
          description="Native support for CSV, TSV, and JSON files with automatic delimiter detection."
        />
        <FeatureCard 
          icon={<Zap className="w-6 h-6" />}
          title="Instant Preview"
          description="Lightning fast parsing engine that handles large datasets directly in your browser."
        />
        <FeatureCard 
          icon={<Layout className="w-6 h-6" />}
          title="Clean Interface"
          description="Distraction-free viewing experience designed for data readability and focus."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300">
      <div className="h-12 w-12 rounded-lg bg-slate-50 flex items-center justify-center text-slate-900 mb-4 group-hover:bg-slate-900 group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}