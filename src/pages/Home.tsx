import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FileJson, Zap, ShieldCheck } from "lucide-react";
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
    <div className="max-w-4xl mx-auto space-y-20 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12">
      <div className="text-center space-y-6 pt-12">
        <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
          Spreadsheet Viewer <br className="hidden sm:block" />
          <span className="text-slate-400 dark:text-slate-500">
            Simplified.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          The fastest way to preview CSV, TSV, or JSON files.{" "}
          <br className="hidden md:block" />
          Secure, client-side, and instant parsing.
        </p>
      </div>

      <div className="max-w-2xl mx-auto relative">
        <div className="absolute -inset-1 bg-slate-200 dark:bg-slate-800 rounded-3xl blur opacity-25"></div>

        <div className="relative">
          {error && (
            <div className="mb-6">
              <Alert type="error" message={error.message} onClose={reset} />
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <LoadingSpinner />
              <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
                Processing your file...
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/20 border border-slate-200 dark:border-slate-800">
              <FileUploader
                onFileSelect={handleFileSelect}
                disabled={loading}
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-slate-200 dark:border-slate-800">
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
          icon={<ShieldCheck className="w-6 h-6" />}
          title="Secure & Private"
          description="Your data never leaves your device. All parsing happens locally in your browser."
        />
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 hover:shadow-md dark:hover:bg-slate-900">
      <div className="h-12 w-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-900 dark:text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
