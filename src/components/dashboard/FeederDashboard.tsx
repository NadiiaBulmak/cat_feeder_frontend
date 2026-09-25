import { AUTH_COPY } from "../../shared/constants/auth";
import { FEEDER_COPY } from "../../shared/constants/feeder";
import type { FeederDashboardProps } from "../../shared/types/feeder";
import { isFeederOnline } from "../../shared/utils/feederState";
import { FeederRow } from "./FeederRow";
import { useFeederDashboard } from "./useFeederDashboard";
import { FeederCommandEnum } from "../../shared/types/feeder";

export function FeederDashboard({ user, onLogout }: FeederDashboardProps) {
  const { feeders, isLoading, submittingCommand, handleCommand, onlineCount } =
    useFeederDashboard();

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#eef0e7] text-[#26382f]">
      <header className="border-b border-[#d7dccf] bg-[#eef0e7]">
        <div className="mx-auto flex min-h-20 w-[calc(100%-2.5rem)] max-w-[66rem] items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#d8ed75] text-base">
              🐾
            </span>

            <div className="min-w-0">
              <p className="truncate text-[.82rem] font-black tracking-[.02em] text-[#26382f]">
                {AUTH_COPY.brand}
              </p>

              <p className="hidden text-[.62rem] text-[#8a948c] sm:block">
                Smart feeder dashboard
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-6 md:flex">
            <div className="text-center">
              <p className="text-[.95rem] font-black text-[#26382f]">
                {feeders.length}
              </p>
              <p className="text-[.58rem] font-bold uppercase tracking-[.08em] text-[#8a948c]">
                Feeders
              </p>
            </div>

            <div className="h-7 w-px bg-[#d1d8cb]" />

            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#86a639] opacity-40" />
                <span className="relative inline-flex size-2 rounded-full bg-[#86a639]" />
              </span>

              <div>
                <p className="text-[.95rem] font-black text-[#26382f]">
                  {onlineCount}
                </p>
                <p className="text-[.58rem] font-bold uppercase tracking-[.08em] text-[#8a948c]">
                  Online
                </p>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="max-w-36 truncate text-[.72rem] font-bold text-[#26382f]">
                {user?.name || "User"}
              </p>
              <p className="max-w-36 truncate text-[.6rem] text-[#8a948c]">
                {user?.email}
              </p>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="rounded-full border border-[#c7cec1] px-4 py-2 text-[.65rem] font-extrabold text-[#26382f] transition-all duration-200 hover:border-[#26382f] hover:bg-[#e2e7dc] active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9aaa62]"
            >
              Вийти
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto w-[calc(100%-2.5rem)] max-w-[66rem] py-[clamp(3rem,8vh,6rem)]">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[.68rem] font-extrabold uppercase tracking-[.16em] text-[#9aa894]">
            {FEEDER_COPY.eyebrow}
          </span>

          <div className="flex shrink-0 items-center gap-2 rounded-full border border-[#d1d8cb] bg-[#e6eadf] px-3 py-1.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#86a639] opacity-40" />
              <span className="relative inline-flex size-2 rounded-full bg-[#86a639]" />
            </span>

            <span className="text-[.68rem] font-semibold text-[#657267]">
              {FEEDER_COPY.online}
            </span>
          </div>
        </div>

        {/* <div className="mt-8 max-w-4xl">
          <h1 className="font-serif text-[clamp(3rem,12vw,7rem)] font-medium leading-[.88] tracking-[-.055em] text-[#26382f]">
            {FEEDER_COPY.heading}
          </h1>

          <p className="mt-6 max-w-xl text-[.95rem] leading-7 text-[#778078] md:text-base">
            {FEEDER_COPY.subtitle}
          </p>
        </div> */}

        <section className="mt-12">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-lg font-extrabold text-[#26382f]">Feeders</h2>
              <p className="mt-1 text-[.75rem] text-[#7c877e]">
                Monitor and control your connected devices.
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-[#e2e7dc] px-3 py-1.5 text-[.68rem] font-bold text-[#657267]">
              {feeders.length}
            </span>
          </div>

          {isLoading ? (
            <div className="rounded-xl border border-[#d1d8cb] bg-[#f4f5ef] px-5 py-10 text-center text-sm text-[#7c877e]">
              Loading feeders...
            </div>
          ) : feeders.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#c7cec1] bg-[#f4f5ef] px-5 py-10 text-center">
              <p className="text-sm font-bold text-[#26382f]">
                No feeders connected
              </p>
              <p className="mt-1 text-xs text-[#7c877e]">
                Connect a feeder to start monitoring it.
              </p>
            </div>
          ) : (
            <div className="w-full overflow-hidden rounded-xl border border-[#d1d8cb] bg-[#f4f5ef]">
              <div className="hidden md:grid grid-cols-[minmax(150px,1.5fr)_minmax(110px,1fr)_minmax(75px,.8fr)_minmax(75px,.8fr)_minmax(95px,1fr)_minmax(90px,1fr)_minmax(135px,1.4fr)] border-b border-[#d1d8cb] bg-[#e6eadf]">
                <div className="px-5 py-4 text-[.62rem] font-black uppercase tracking-[.1em] text-[#7c877e]">
                  Feeder
                </div>
                <div className="px-4 py-4 text-[.62rem] font-black uppercase tracking-[.1em] text-[#7c877e]">
                  Device
                </div>
                <div className="px-3 py-4 text-[.62rem] font-black uppercase tracking-[.1em] text-[#7c877e]">
                  Desired
                </div>
                <div className="px-3 py-4 text-[.62rem] font-black uppercase tracking-[.1em] text-[#7c877e]">
                  Actual
                </div>
                <div className="px-3 py-4 text-[.62rem] font-black uppercase tracking-[.1em] text-[#7c877e]">
                  Connection
                </div>
                <div className="px-3 py-4 text-[.62rem] font-black uppercase tracking-[.1em] text-[#7c877e]">
                  Last ping
                </div>
                <div className="px-3 py-4 text-[.62rem] font-black uppercase tracking-[.1em] text-[#7c877e]">
                  Control
                </div>
              </div>

              <div className="divide-y divide-[#dfe3da]">
                {feeders.map((feeder) => {
                  const isOnline = isFeederOnline(feeder.lastPing);
                  const isSubmitting =
                    submittingCommand?.feederId === feeder.id;

                  return (
                    <FeederRow
                      key={feeder.id}
                      feeder={feeder}
                      isOnline={isOnline}
                      submitting={isSubmitting}
                      onOpen={() =>
                        void handleCommand(feeder.id, FeederCommandEnum.OPEN)
                      }
                      onClose={() =>
                        void handleCommand(feeder.id, FeederCommandEnum.CLOSE)
                      }
                    />
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
