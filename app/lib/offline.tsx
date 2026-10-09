import { createContext, useContext, useState } from "react";

// A playful demo switch, not real connectivity: it drives the banner, work statuses and diagrams.
const Ctx = createContext({ offline: false, toggle: () => {} });

export function OfflineProvider({ children }: { children: React.ReactNode }) {
  const [offline, setOffline] = useState(false);
  return <Ctx value={{ offline, toggle: () => setOffline((o) => !o) }}>{children}</Ctx>;
}

export const useOffline = () => useContext(Ctx);
