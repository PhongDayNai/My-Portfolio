import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDanger?: boolean;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  onConfirm,
  onCancel,
  isDanger = true,
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={onCancel}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="bg-[#141b2b] border border-white/10 rounded-3xl p-6 w-full max-w-md shadow-2xl relative space-y-6"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onCancel}
              className="absolute top-4 right-4 text-slate-500 hover:text-white p-2 rounded-xl transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-start gap-4">
              {isDanger && (
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                  <AlertTriangle size={20} />
                </div>
              )}
              <div className="space-y-1 min-w-0 flex-1">
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  {title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed break-words">
                  {message}
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs transition-all cursor-pointer"
              >
                {cancelText}
              </button>
              <button
                type="button"
                onClick={() => {
                  onConfirm();
                  onCancel();
                }}
                className={`px-5 py-2.5 rounded-xl text-white font-bold text-xs transition-all shadow-md cursor-pointer ${
                  isDanger
                    ? "bg-red-600 hover:bg-red-700 shadow-red-500/15"
                    : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/15"
                }`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
