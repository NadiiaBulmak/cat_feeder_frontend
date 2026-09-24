import { useState } from "react";
import type { FeederRowProps } from "../../shared/types/feeder";
import {
  formatDate,
  getStateClasses,
  getStateLabel,
  normalizeState,
} from "../../shared/utils/feederState";
import { FeederControlButton } from "./FeederControlButton";
import { triggerCamera } from "../../services/camera/triggerCamera";

export function FeederRow({ feeder, isOnline, submitting, onOpen, onClose }: FeederRowProps) {
  const actualState = normalizeState(feeder.actualState);
  const desiredState = normalizeState(feeder.desiredState);
  const hasStateMismatch =
    actualState !== undefined && desiredState !== undefined && actualState !== desiredState;
  const deviceId = feeder.deviceId;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const handleTakeSnapshot = async () => {
    if (!deviceId) return;
    
    setIsModalOpen(true);
    setIsPhotoLoading(true);
    setPhotoError(null);

    if (photoUrl) {
      URL.revokeObjectURL(photoUrl);
    }

    try {
      const url = await triggerCamera(deviceId);
      setPhotoUrl(url);
    } catch (error) {
      console.error(error);
      setPhotoError("Помилка зв'язку з камерою. Перевірте, чи вона увімкнена.");
    } finally {
      setIsPhotoLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (photoUrl) {
      URL.revokeObjectURL(photoUrl); 
      setPhotoUrl(null);
    }
  };

  return (
    <>
      <div className="grid grid-cols-[minmax(150px,1.5fr)_minmax(110px,1fr)_minmax(75px,.8fr)_minmax(75px,.8fr)_minmax(95px,1fr)_minmax(90px,1fr)_minmax(145px,1.5fr)] items-center border-b border-[#dfe3da] last:border-0">
        
        <div className="min-w-0 px-5 py-5">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className={`grid size-9 shrink-0 place-items-center rounded-full ${
                actualState === "open"
                  ? "bg-[#f0c766]"
                  : actualState === "close"
                    ? "bg-[#d8ed75]"
                    : "bg-[#e2e5df]"
              }`}
            >
              {actualState === "open" ? "◌" : actualState === "close" ? "✓" : "?"}
            </span>

            <div className="min-w-0">
              <p className="break-words text-[.75rem] font-extrabold text-[#26382f]">
                {feeder.name || "Unnamed feeder"}
              </p>
              <p className="mt-0.5 break-all text-[.58rem] text-[#8a948c]">{feeder.id}</p>
            </div>
          </div>
        </div>

        <div className="min-w-0 px-4 py-5">
          <span className="block break-all font-mono text-[.6rem] leading-4 text-[#657267]">
            {feeder.deviceId || "—"}
          </span>
        </div>

        <div className="min-w-0 px-3 py-5">
          <span
            className={`inline-block max-w-full rounded-full px-2 py-1 text-[.52rem] font-black uppercase ${getStateClasses(feeder.desiredState)}`}
          >
            {getStateLabel(feeder.desiredState)}
          </span>
        </div>

        <div className="min-w-0 px-3 py-5">
          <div className="flex min-w-0 items-center gap-1">
            <span
              className={`inline-block max-w-full rounded-full px-2 py-1 text-[.52rem] font-black uppercase ${getStateClasses(feeder.actualState)}`}
            >
              {getStateLabel(feeder.actualState)}
            </span>
            {hasStateMismatch && (
              <span
                className="shrink-0 text-[.65rem] text-[#a17c28]"
                title="Device state differs from desired state"
              >
                ⚠
              </span>
            )}
          </div>
        </div>

        <div className="min-w-0 px-3 py-5">
          <div className="flex items-center gap-2">
            <span className={`size-2 shrink-0 rounded-full ${isOnline ? "bg-[#86a639]" : "bg-[#b6bbb3]"}`} />
            <span className="text-[.6rem] font-bold text-[#657267]">{isOnline ? "Online" : "Offline"}</span>
          </div>
        </div>

        <div className="min-w-0 px-3 py-5">
          <span className="block break-words text-[.58rem] leading-4 text-[#657267]">
            {formatDate(feeder.lastPing)}
          </span>
        </div>

        <div className="min-w-0 px-3 py-4">
          
          <div className="flex flex-col gap-2">
            
            <div className="flex gap-2">
              <div className="flex-1">
                <FeederControlButton
                  label="Open"
                  active={desiredState === "open"}
                  disabled={submitting}
                  loading={submitting}
                  onClick={onOpen}
                />
              </div>
              <div className="flex-1">
                <FeederControlButton
                  label="Close"
                  active={desiredState === "close"}
                  disabled={submitting}
                  loading={submitting}
                  onClick={onClose}
                />
              </div>
            </div>

            <button
              onClick={handleTakeSnapshot}
              disabled={isPhotoLoading}
              className="flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-[#e2e5df] px-3 text-xs font-extrabold uppercase text-[#4a544b] shadow-sm transition-colors hover:bg-[#d4d8d1] active:scale-[0.98] disabled:opacity-50"
              title="Переглянути фото з камери"
            >
              <span className="text-sm">📸</span> Live Камера
            </button>
            
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity">
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-5 py-3">
              <h3 className="text-sm font-bold text-gray-800">
                Live Камера: {feeder.name || feeder.deviceId}
              </h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-400 transition-colors hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="flex min-h-[300px] flex-col items-center justify-center bg-gray-100 p-4">
              {isPhotoLoading ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="size-8 animate-spin rounded-full border-4 border-[#86a639] border-t-transparent"></div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500">З'єднання з камерою...</span>
                </div>
              ) : photoError ? (
                <div className="text-center text-red-500">
                  <span className="mb-2 block text-3xl">⚠️</span>
                  <p className="text-sm">{photoError}</p>
                </div>
              ) : photoUrl ? (
                <img 
                  src={photoUrl} 
                  alt="Live Snapshot" 
                  className="max-h-[60vh] w-full rounded-lg object-contain shadow-sm"
                />
              ) : null}
            </div>

            <div className="flex justify-end gap-3 bg-white px-5 py-3">
              <button
                onClick={handleCloseModal}
                className="rounded-lg px-4 py-2 text-xs font-bold text-gray-500 transition-colors hover:bg-gray-100"
              >
                Закрити
              </button>
              <button
                onClick={handleTakeSnapshot}
                disabled={isPhotoLoading}
                className="flex items-center gap-2 rounded-lg bg-[#86a639] px-5 py-2 text-xs font-bold text-white transition-colors hover:bg-[#749132] disabled:opacity-70"
              >
                {isPhotoLoading ? "Оновлюю..." : "🔄 Оновити фото"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}