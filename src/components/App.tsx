import { createSignal } from "solid-js";
import { fileToHex } from "~/lib/fileToHex";

const App = () => {
  const [hex, setHex] = createSignal<string>("");
  const [error, setError] = createSignal<string>("");
  const [loading, setLoading] = createSignal<boolean>(false);

  const handleFileChange = async (e: Event) => {
    setError("");
    setHex("");
    setLoading(true);
    const input = e.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      setLoading(false);
      return;
    }
    const file = input.files[0];
    if (!file) {
      setLoading(false);
      return;
    }
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const content = reader.result as string;
          const hexString = fileToHex(content);
          setHex(hexString);
        } catch (err) {
          setError("Failed to convert file to hex.");
        } finally {
          setLoading(false);
        }
      };
      reader.onerror = () => {
        setError("Failed to read file.");
        setLoading(false);
      };
      reader.readAsText(file);
    } catch (err) {
      setError("Failed to convert file to hex.");
      setLoading(false);
    }
  };

  return (
    <div class="p-8 max-w-xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">File to Hex Converter</h1>
      <input
        type="file"
        onChange={handleFileChange}
        class="mb-4 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
      />
      {loading() && (
        <div class="flex items-center gap-2 text-blue-600 mt-4">
          <svg
            class="animate-spin h-5 w-5 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          Converting...
        </div>
      )}
      {error() && <div class="text-red-600 mt-4">{error()}</div>}
      {hex() && !loading() && (
        <div class="mt-4">
          <div class="font-mono whitespace-pre bg-gray-100 p-2 rounded">
            {hex().split("\n").slice(0, 5).join("\n")}
            {hex().split("\n").length > 5 && "\n..."}
          </div>
          <a
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(hex())}`}
            download="output.txt"
            class="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded no-underline hover:bg-blue-700 transition-colors"
          >
            Download Hex File
          </a>
        </div>
      )}
    </div>
  );
};

export default App;
