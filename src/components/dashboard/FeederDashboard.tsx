import { useEffect, useState } from "react";

import { AUTH_COPY } from "../../shared/constants/auth";
import { FEEDER_COPY } from "../../shared/constants/feeder";
import { getFeeder, sendFeederCommand } from "../../services/feeder.service";
import type { User } from "../../shared/types/auth";
import { env } from "../../api/config";

type FeederDashboardProps = {
  user: User | null;
  onLogout: () => void;
};

enum FeederCommandEnum {
  OPEN = "open",
  CLOSE = "close",
}

export function FeederDashboard({ user, onLogout }: FeederDashboardProps) {
  const [feederStatus, setFeederStatus] = useState<FeederCommandEnum>(
    FeederCommandEnum.CLOSE,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadFeederState = async () => {
      try {
        const feeder = await getFeeder(env.feederId);

        setFeederStatus(feeder.status);
      } catch (error) {
        console.error("Failed to load feeder state", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeederState();
  }, []);

  const handleCommand = async (command: FeederCommandEnum) => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await sendFeederCommand(command);

      setFeederStatus(command);
    } catch (error) {
      console.error("Failed to send feeder command", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isOpen = feederStatus === FeederCommandEnum.OPEN;
  const isDisabled = isLoading || isSubmitting;
  return (
    <main className="min-h-screen bg-[#eef0e7] text-[#26382f]">
      <header className="flex items-center justify-between border-b border-[#d7dccf] px-5 py-6 md:px-[clamp(1.25rem,5vw,5rem)]">
        <div className="text-[.85rem] font-extrabold tracking-[.02em]">
          <span className="mr-2">🐾</span>
          {AUTH_COPY.brand}
        </div>

        {user && (
          <div className="flex items-center gap-6 text-[.78rem] text-[#748076]">
            <span>{user.name || user.email}</span>

            <button
              className="font-extrabold text-[#26382f]"
              type="button"
              onClick={onLogout}
            >
              Вийти
            </button>
          </div>
        )}
      </header>

      <section className="mx-auto w-[calc(100%-2.5rem)] max-w-[66rem] py-[clamp(4rem,12vh,9rem)]">
        <div className="flex items-start justify-between max-md:flex-col max-md:gap-4">
          <span className="text-[.68rem] font-extrabold tracking-[.16em] text-[#9aa894]">
            {FEEDER_COPY.eyebrow}
          </span>

          <p className="text-[.72rem] text-[#73806f]">
            <i className="mr-2 inline-block size-2 rounded-full bg-[#86a639] shadow-[0_0_0_4px_#d8ed75]" />
            {FEEDER_COPY.online}
          </p>
        </div>

        <h1 className="mb-3 mt-10 font-serif text-[clamp(2.8rem,14vw,7rem)] font-medium leading-[.9] tracking-[-.055em] text-[#26382f] md:mt-10 md:text-[clamp(3rem,8vw,7rem)]">
          {FEEDER_COPY.heading}
        </h1>

        <p className="text-base text-[#778078]">{FEEDER_COPY.subtitle}</p>

        <section className="mt-12 flex gap-3 max-md:flex-col">
          <button
            className="min-h-14 rounded-sm bg-[#d8ed75] px-6 text-[.72rem] font-black tracking-[.08em] text-[#26382f] transition hover:bg-[#c7df5e] disabled:cursor-not-allowed disabled:opacity-70"
            type="button"
            disabled={isDisabled}
            onClick={() => void handleCommand(FeederCommandEnum.OPEN)}
          >
            <span className="mr-2 text-base">↗</span>
            {FEEDER_COPY.open}
          </button>

          <button
            className="min-h-14 rounded-sm border border-[#bfc8bc] bg-transparent px-6 text-[.72rem] font-black tracking-[.08em] text-[#26382f] transition hover:bg-[#e2e7dc] disabled:cursor-not-allowed disabled:opacity-70"
            type="button"
            disabled={isDisabled}
            onClick={() => void handleCommand(FeederCommandEnum.CLOSE)}
          >
            <span className="mr-2 text-base">×</span>
            {FEEDER_COPY.close}
          </button>
        </section>

        <div className="mt-24 flex w-fit items-center gap-4 border-t border-[#d1d8cb] pt-4 text-[#748076]">
          <span
            className={`grid size-10 place-items-center rounded-full text-xl text-[#26382f] ${
              isOpen ? "bg-[#f0c766]" : "bg-[#d8ed75]"
            }`}
          >
            {isOpen ? "◌" : "✓"}
          </span>

          <div>
            <strong className="block text-[.88rem] text-[#26382f]">
              {isOpen ? FEEDER_COPY.openStatus : FEEDER_COPY.closedStatus}
            </strong>

            <span className="mt-1 block text-[.75rem]">
              {isOpen
                ? FEEDER_COPY.openDescription
                : FEEDER_COPY.closedDescription}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
