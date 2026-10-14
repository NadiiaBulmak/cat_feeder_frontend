import type { User } from "./auth";

export enum FeederCommandEnum {
  OPEN = "open",
  CLOSE = "close",
}

export type FeederState = "open" | "close";

export type FeederInfo = {
  id: string;
  name: string;
  deviceId: string;
  desiredState: string;
  actualState: string;
  lastPing: string;
  createdAt: string;
  updatedAt: string;
};

export type FeederDashboardProps = {
  user: User | null;
  onLogout: () => void;
};

export type SubmittingCommand = {
  feederId: string;
  command: FeederCommandEnum;
} | null;

export interface BleState {
  lastSeen: number;
  rssi: number | null;
}

export type FeederRowProps = {
  feeder: Partial<
    FeederInfo & {
      lastDistance: number | null;
      bleState: BleState;
      connectedDevices: string[];
    }
  >;

  isOnline: boolean;
  submitting: boolean;
  onOpen: () => void;
  onClose: () => void;
};
