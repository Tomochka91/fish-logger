import styles from "./DebugPage.module.css";

import { DebugSearchBar } from "../../shared/components/debug/DebugSearchBar";
import { useMemo, useState } from "react";
import { DebugLogView } from "../../shared/components/debug/DebugLogView";
import { DebugControls } from "../../shared/components/debug/DebugControls";
import { useDebug } from "../../shared/hooks/useDebug";

export function DebugPage() {
  const { messages, autoscroll, clearMessages, toggleAutoscroll } = useDebug();
  const [search, setSearch] = useState("");

  const filteredMessages = useMemo(() => {
    if (!search.trim()) return messages;

    const query = search.toLowerCase();
    return messages.filter((msg) => {
      return (
        msg.text.toLowerCase().includes(query) ||
        msg.source.toLowerCase().includes(query)
      );
    });
  }, [messages, search]);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Debug</h2>
      <DebugSearchBar value={search} onChange={setSearch} />

      <DebugLogView messages={filteredMessages} autoscroll={autoscroll} />

      <DebugControls
        autoscroll={autoscroll}
        onToggleAutoscroll={toggleAutoscroll}
        onClear={clearMessages}
      />
    </section>
  );
}
