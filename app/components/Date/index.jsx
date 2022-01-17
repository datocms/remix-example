import { parseISO, format } from "date-fns";
import styles from "./styles.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

export function Date({ dateString }) {
  const date = parseISO(dateString);
  return (
    <time className="date" dateTime={dateString}>
      {format(date, "LLLL	d, yyyy")}
    </time>
  );
}
