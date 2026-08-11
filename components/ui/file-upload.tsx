"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { UploadCloud, File, X, AlertCircle, CheckCircle2 } from "lucide-react";
import { useFormField } from "./form";

export interface FileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
  error?: string;
  progress?: number;
}

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes (e.g. 5 * 1024 * 1024 for 5MB)
  maxFiles?: number;
  onFilesSelected?: (files: File[]) => void;
  onFileRemove?: (fileId: string) => void;
  variant?: "dropzone" | "compact" | "button";
  disabled?: boolean;
  label?: string;
  dragAndDropText?: string;
  helperText?: string;
  errorText?: string;
  className?: string;
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      accept,
      multiple = false,
      maxSize = 10 * 1024 * 1024, // 10MB default
      maxFiles,
      onFilesSelected,
      onFileRemove,
      variant = "dropzone",
      disabled: propDisabled,
      label,
      dragAndDropText = "Drag and drop files here, or click to browse",
      helperText,
      errorText: propErrorText,
      className,
    },
    ref
  ) => {
    const formField = useFormField();
    const disabled = propDisabled ?? formField.disabled ?? false;
    const errorText = propErrorText || formField.errorText;

    const [isDragOver, setIsDragOver] = React.useState(false);
    const [fileList, setFileList] = React.useState<FileItem[]>([]);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const processFiles = (rawFiles: FileList | File[]) => {
      if (disabled) return;
      const fileArray = Array.from(rawFiles);
      const validFiles: File[] = [];
      const newItems: FileItem[] = [];

      fileArray.forEach((file) => {
        if (maxFiles && fileList.length + newItems.length >= maxFiles) return;

        let err: string | undefined = undefined;
        if (maxSize && file.size > maxSize) {
          err = `File size exceeds ${formatFileSize(maxSize)}`;
        }

        const isImage = file.type.startsWith("image/");
        const item: FileItem = {
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          previewUrl: isImage ? URL.createObjectURL(file) : undefined,
          error: err,
          progress: 100,
        };

        newItems.push(item);
        if (!err) validFiles.push(file);
      });

      const updatedList = multiple ? [...fileList, ...newItems] : newItems;
      setFileList(updatedList);
      if (validFiles.length > 0) {
        onFilesSelected?.(validFiles);
      }
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setIsDragOver(true);
    };

    const handleDragLeave = () => {
      setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (disabled) return;
      if (e.dataTransfer.files) {
        processFiles(e.dataTransfer.files);
      }
    };

    const handleRemoveFile = (fileId: string, e?: React.MouseEvent) => {
      e?.stopPropagation();
      setFileList((prev) => {
        const next = prev.filter((f) => f.id !== fileId);
        return next;
      });
      onFileRemove?.(fileId);
    };

    return (
      <div className="w-full flex flex-col gap-1.5" ref={ref}>
        {label && !formField.id && (
          <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100 select-none">
            {label}
          </label>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => e.target.files && processFiles(e.target.files)}
          className="sr-only"
        />

        {variant === "dropzone" && (
          <motion.div
            onClick={() => !disabled && inputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            whileHover={!disabled ? { scale: 1.002 } : {}}
            whileTap={!disabled ? { scale: 0.998 } : {}}
            className={cn(
              "relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 text-center bg-white dark:bg-zinc-900/50 border-zinc-300 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50/20 dark:hover:bg-blue-950/20",
              isDragOver && "border-blue-500 bg-blue-50/40 dark:bg-blue-950/40 scale-[1.01]",
              errorText && "!border-red-500 dark:!border-red-500",
              disabled && "opacity-50 cursor-not-allowed bg-zinc-100 dark:bg-zinc-900",
              className
            )}
          >
            <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 mb-3">
              <UploadCloud size={24} />
            </div>

            <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {dragAndDropText}
            </p>

            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 font-mono">
              {accept ? `Accepted formats: ${accept}` : "Any file format"}{" "}
              {maxSize ? `(Up to ${formatFileSize(maxSize)})` : ""}
            </p>
          </motion.div>
        )}

        {variant === "compact" && (
          <div
            onClick={() => !disabled && inputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "flex items-center justify-between p-3 border rounded-xl cursor-pointer bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-800 hover:border-blue-500",
              isDragOver && "border-blue-500 bg-blue-50/40 dark:bg-blue-950/40",
              disabled && "opacity-50 cursor-not-allowed",
              className
            )}
          >
            <div className="flex items-center gap-3">
              <UploadCloud size={18} className="text-blue-500" />
              <span className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                Choose file...
              </span>
            </div>
            <span className="text-xs text-zinc-400 font-mono">Browse</span>
          </div>
        )}

        {/* Selected Files List */}
        {fileList.length > 0 && (
          <div className="flex flex-col gap-2 mt-2">
            <AnimatePresence>
              {fileList.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className={cn(
                    "flex items-center justify-between p-2.5 rounded-xl border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm",
                    item.error && "border-red-300 dark:border-red-900 bg-red-50/20 dark:bg-red-950/20"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {item.previewUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.previewUrl}
                        alt={item.name}
                        className="w-9 h-9 object-cover rounded-lg shrink-0 border border-zinc-200 dark:border-zinc-800"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 shrink-0">
                        <File size={18} />
                      </div>
                    )}

                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                        {formatFileSize(item.size)}
                      </span>
                      {item.error && (
                        <span className="text-[10px] text-red-500 font-medium flex items-center gap-1 mt-0.5">
                          <AlertCircle size={10} /> {item.error}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {!item.error && (
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    )}
                    <button
                      type="button"
                      onClick={(e) => handleRemoveFile(item.id, e)}
                      className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!formField.id && (
          <AnimatePresence mode="wait">
            {errorText ? (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-xs text-red-500 dark:text-red-400 font-medium"
              >
                {errorText}
              </motion.p>
            ) : helperText ? (
              <motion.p
                key="helper"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-xs text-zinc-500 dark:text-zinc-400"
              >
                {helperText}
              </motion.p>
            ) : null}
          </AnimatePresence>
        )}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";

export default FileUpload;
