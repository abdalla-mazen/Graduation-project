import * as React from "react";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";

// types
interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  buttonText?: string;
}

/**
 * @example
 * <FileInput label="Upload your resume" buttonText="Choose File" onChange={(e) => console.log(e.target.files)} multiple/>
 */
const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      label = "Label",
      placeholder = "No file chosen",
      error = false,
      buttonText = "Upload file",
      className,
      id,
      onChange,
      multiple,
      ...props
    },
    ref
  ) => {
    // Create a stable id if not provided
    const inputId =
      id ?? "file-input-" + Math.random().toString(36).slice(2, 9);
    const [fileNames, setFileNames] = React.useState<string>("");

    // Handles file selection updates displayed file names
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const files = e.target.files;
      if (files && files.length > 0) {
        const names = Array.from(files)
          .map((f) => f.name)
          .join(", ");
        setFileNames(names);
      } else {
        setFileNames("");
      }
      if (onChange) onChange(e);
    }

    return (
      <div className={cn("flex flex-col w-full", className)}>
        {label && (
          <label htmlFor={inputId} className="mb-1 text-sm text-zinc-600">
            {label}
          </label>
        )}
        <div
          className={cn(
            "flex items-center justify-between gap-3 rounded-lg border px-3 py-2 min-h-[44px] bg-white",
            error ? "border-red-600" : "border-zinc-200",
            error && "border-red-500 focus-visible:ring-maroon-600",
            "dark:hover:bg-zinc-700  dark:text-white dark:placeholder:text-zinc-400 dark:focus-visible:ring-softPink-400 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600 dark:disable"
          )}
        >
          <div className="flex-1 min-w-0">
            <div
              className={cn(
                "text-sm text-zinc-700 truncate",
                fileNames ? "text-zinc-800" : "text-zinc-400",
                "dark:text-zinc-100 dark:placeholder:text-zinc-400"
              )}
            >
              {fileNames || placeholder}
            </div>
          </div>
          <label
            htmlFor={inputId}
            className={cn(
              "inline-flex items-center gap-2 rounded-md border border-transparent px-3 py-1 text-sm font-medium cursor-pointer",
              "text-maroon-500 hover:bg-rose-50",
              error && "border-red-500 focus-visible:ring-maroon-600",
              "dark:hover:bg-zinc-700  dark:text-softPink-400 dark:placeholder:text-zinc-400 dark:focus-visible:ring-softPink-400 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600 dark:disable"
            )}
          >
            <Upload size={18} />
            <span>{buttonText}</span>
          </label>
          <input
            id={inputId}
            ref={ref}
            type="file"
            className="hidden"
            onChange={handleChange}
            multiple={multiple}
            {...props}
          />
        </div>
      </div>
    );
  }
);

FileInput.displayName = "FileInput";
export default FileInput;
