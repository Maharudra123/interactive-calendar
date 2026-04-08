import {
  isSameMonth,
  isSameDay,
  isAfter,
  isWithinInterval,
  format,
} from "date-fns";
import { THEMES, HOLIDAYS } from "../constants/calendarData";
import { holidayKey } from "../utils/calendarUtils";

export default function DayCell({
  day,
  currentDate,
  startDate,
  endDate,
  hoverDate,
  theme,
  onClick,
  onEnter,
}) {
  const t = THEMES[theme];
  const today = new Date();
  const inCurrentMonth = isSameMonth(day, currentDate);
  const isToday = isSameDay(day, today);
  const isStart = startDate && isSameDay(day, startDate);
  const isEnd = endDate && isSameDay(day, endDate);
  const isSingle = isStart && !endDate;

  const inRange =
    startDate &&
    endDate &&
    isWithinInterval(day, { start: startDate, end: endDate });

  const inHoverRange =
    startDate &&
    !endDate &&
    hoverDate &&
    isAfter(hoverDate, startDate) &&
    isWithinInterval(day, { start: startDate, end: hoverDate });

  const holiday = HOLIDAYS[holidayKey(day)];
  const isSelected = isStart || isEnd || isSingle;

  let borderRadius = "8px";
  if (isStart && endDate && !isSameDay(startDate, endDate))
    borderRadius = "8px 0 0 8px";
  if (isEnd && !isSameDay(startDate, endDate)) borderRadius = "0 8px 8px 0";
  if (inRange || inHoverRange) borderRadius = "0";

  let bg = "transparent";
  if (isSelected) bg = t.accent;
  else if (inRange) bg = t.rangeBg;
  else if (inHoverRange) bg = t.rangeBg;

  let color = inCurrentMonth ? t.ink : t.muted;
  if (isSelected) color = "#fff";
  if (isToday && !isSelected) color = t.accent;

  return (
    <div
      onClick={inCurrentMonth ? onClick : undefined}
      onMouseEnter={inCurrentMonth ? onEnter : undefined}
      title={holiday || undefined}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "44px",
        cursor: inCurrentMonth ? "pointer" : "default",
        borderRadius,
        background: bg,
        color,
        opacity: inCurrentMonth ? 1 : 0.25,
        fontSize: "13px",
        fontWeight: isSelected ? 500 : isToday ? 500 : 400,
        transition: "background 0.15s, color 0.15s",
        position: "relative",
        userSelect: "none",
        outline: isToday && !isSelected ? `2px solid ${t.todayDot}` : "none",
        outlineOffset: "-2px",
      }}
      onMouseOver={(e) => {
        if (!isSelected && inCurrentMonth)
          e.currentTarget.style.background = isSelected
            ? bg
            : inRange
              ? bg
              : t.hoverBg;
      }}
      onMouseOut={(e) => {
        if (!isSelected && !inRange && !inHoverRange)
          e.currentTarget.style.background = "transparent";
        else if (!isSelected) e.currentTarget.style.background = bg;
      }}
    >
      <span style={{ position: "relative" }}>{format(day, "d")}</span>
      {holiday && inCurrentMonth && (
        <span
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: isSelected ? "rgba(255,255,255,0.7)" : t.accent,
            marginTop: 2,
          }}
        />
      )}
    </div>
  );
}
