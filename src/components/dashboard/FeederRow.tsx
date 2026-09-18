import type { FeederRowProps } from "../../shared/types/feeder";
import {
  formatDate,
  getStateClasses,
  getStateLabel,
  normalizeState,
} from "../../shared/utils/feederState";
import { FeederControlButton } from "./FeederControlButton";

export function FeederRow({ feeder, isOnline, submitting, onOpen, onClose }: FeederRowProps) {
  const actualState = normalizeState(feeder.actualState);
  const desiredState = normalizeState(feeder.desiredState);
  const hasStateMismatch =
    actualState !== undefined && desiredState !== undefined && actualState !== desiredState;

  return (
    <div className="grid grid-cols-[minmax(150px,1.5fr)_minmax(110px,1fr)_minmax(75px,.8fr)_minmax(75px,.8fr)_minmax(95px,1fr)_minmax(90px,1fr)_minmax(135px,1.4fr)] items-center border-b border-[#dfe3da] last:border-0">
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

      <div className="min-w-0 px-3 py-5">
        <div className="flex flex-wrap gap-1.5">
          <FeederControlButton
            label="Open"
            active={desiredState === "open"}
            disabled={submitting}
            loading={submitting}
            onClick={onOpen}
          />
          <FeederControlButton
            label="Close"
            active={desiredState === "close"}
            disabled={submitting}
            loading={submitting}
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
}
