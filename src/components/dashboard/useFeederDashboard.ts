import { useCallback, useEffect, useMemo, useState } from "react";

import { getUserFeeders, sendFeederCommand } from "../../services/feeder.service";
import type { FeederInfo, SubmittingCommand } from "../../shared/types/feeder";
import { FeederCommandEnum } from "../../shared/types/feeder";
import { isFeederOnline } from "../../shared/utils/feederState";

export function useFeederDashboard() {
  const [feeders, setFeeders] = useState<FeederInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [submittingCommand, setSubmittingCommand] = useState<SubmittingCommand>(null);

  useEffect(() => {
    const loadFeeders = async () => {
      try {
        const data = await getUserFeeders();
        const nextFeeders = Array.isArray(data) ? data : data ? [data] : [];

        setFeeders(nextFeeders);
      } catch (error) {
        console.error("Failed to load feeder list", error);
      } finally {
        setIsLoading(false);
      }
    };

    void loadFeeders();
  }, []);

  const handleCommand = useCallback(
    async (feederId: string, command: FeederCommandEnum) => {
      if (submittingCommand) {
        return;
      }

      const feeder = feeders.find((item) => item.id === feederId);

      if (!feeder) {
        return;
      }

      setSubmittingCommand({ feederId, command });

      try {
        await sendFeederCommand(feederId, command);

        setFeeders((currentFeeders) =>
          currentFeeders.map((currentFeeder) =>
            currentFeeder.id === feederId
              ? {
                  ...currentFeeder,
                  desiredState: command,
                }
              : currentFeeder,
          ),
        );
      } catch (error) {
        console.error("Failed to send feeder command", error);
      } finally {
        setSubmittingCommand(null);
      }
    },
    [feeders, submittingCommand],
  );

  const onlineCount = useMemo(
    () => feeders.filter((feeder) => isFeederOnline(feeder.lastPing)).length,
    [feeders],
  );

  return {
    feeders,
    isLoading,
    submittingCommand,
    handleCommand,
    onlineCount,
  };
}
