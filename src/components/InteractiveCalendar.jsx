import { useState, useEffect, useCallback } from "react";
import {
  format,
  addMonths,
  subMonths,
  isSameDay,
  isBefore,
  differenceInCalendarDays,
} from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, PenLine, Sun, Moon, X } from "lucide-react";

// --- NEW: Modular Imports ---
import { THEMES, MONTH_IMAGES, WEEKDAYS } from "../constants/calendarData";
import { buildDayGrid } from "../utils/calendarUtils";
import DayCell from "./DayCell";

export default function InteractiveCalendar({ theme, setTheme }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [notes, setNotes] = useState({});
  const [direction, setDirection] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  const t = THEMES[theme];
  const monthKey = format(currentDate, "yyyy-MM");
  const monthIndex = currentDate.getMonth();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ical-notes-v2");
      if (saved) setNotes(JSON.parse(saved));
    } catch (_) {}
  }, []);

  const handleNoteChange = useCallback(
    (e) => {
      const updated = { ...notes, [monthKey]: e.target.value };
      setNotes(updated);
      try {
        localStorage.setItem("ical-notes-v2", JSON.stringify(updated));
      } catch (_) {}
    },
    [notes, monthKey],
  );

  const prevMonth = () => {
    setDirection(-1);
    setCurrentDate((d) => subMonths(d, 1));
    setImgLoaded(false);
  };

  const nextMonth = () => {
    setDirection(1);
    setCurrentDate((d) => addMonths(d, 1));
    setImgLoaded(false);
  };

  const onDayClick = useCallback(
    (day) => {
      if (!startDate) {
        setStartDate(day);
        setEndDate(null);
      } else if (startDate && !endDate) {
        if (isSameDay(day, startDate)) setStartDate(null);
        else if (isBefore(day, startDate)) {
          setStartDate(day);
          setEndDate(null);
        } else setEndDate(day);
      } else {
        setStartDate(day);
        setEndDate(null);
        setHoverDate(null);
      }
    },
    [startDate, endDate],
  );

  const clearSelection = () => {
    setStartDate(null);
    setEndDate(null);
    setHoverDate(null);
  };

  const days = buildDayGrid(currentDate);
  const rangeLength =
    startDate && endDate ? differenceInCalendarDays(endDate, startDate) : null;

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir < 0 ? 48 : -48, opacity: 0 }),
  };

  const styles = {
    wrap: {
      maxWidth: 880,
      width: "100%",
      background: t.card,
      borderRadius: 24,
      overflow: "hidden",
      boxShadow: t.shadow,
      display: "flex",
      flexWrap: "wrap",
      transition: "background 0.3s, box-shadow 0.3s",
    },
    left: {
      position: "relative",
      background: "#1a1208",
      color: "#f5f0e8",
      flex: "1 1 320px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "2.5rem",
      overflow: "hidden",
      minHeight: 350,
    },
    heroImg: {
      position: "absolute",
      inset: 0,
      backgroundImage: `url('${MONTH_IMAGES[monthIndex]}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: imgLoaded ? 0.38 : 0,
      transition: "opacity 0.6s, transform 0.6s",
    },
    heroOverlay: {
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(to top, #1a1208 30%, rgba(26,18,8,0.3) 80%, transparent 100%)",
    },
    leftContent: { position: "relative", zIndex: 2 },
    monthTag: {
      fontSize: 11,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: t.accent,
      fontWeight: 500,
      marginBottom: "0.4rem",
    },
    monthBig: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
      fontWeight: 700,
      lineHeight: 1,
      marginBottom: "0.2rem",
    },
    yearSmall: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontStyle: "italic",
      fontSize: "1.05rem",
      color: "rgba(245,240,232,0.55)",
      marginBottom: "1.5rem",
    },
    notesBox: {
      background: t.noteGlass,
      backdropFilter: "blur(4px)",
      border: `1px solid ${t.noteBorder}`,
      borderRadius: 10,
      padding: "0.9rem 1rem",
    },
    notesLabel: {
      fontSize: 10,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: t.accent,
      marginBottom: "0.5rem",
      fontWeight: 500,
    },
    notesArea: {
      width: "100%",
      background: "transparent",
      border: "none",
      color: "#f5f0e8",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 13,
      lineHeight: 1.6,
      resize: "none",
      height: 90,
      outline: "none",
    },
    rangeBadge: {
      marginTop: "1rem",
      background: t.accent,
      color: "#fff",
      borderRadius: 8,
      padding: "0.55rem 0.85rem",
      fontSize: 12,
      lineHeight: 1.5,
    },
    themeBtn: {
      position: "absolute",
      top: "1.5rem",
      right: "1.5rem",
      zIndex: 10,
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.18)",
      color: "#f5f0e8",
      borderRadius: 20,
      padding: "6px 12px",
      fontSize: 11,
      cursor: "pointer",
      fontFamily: "'DM Sans', sans-serif",
      letterSpacing: "0.05em",
      display: "flex",
      alignItems: "center",
      gap: 6,
      transition: "background 0.2s",
    },
    right: {
      flex: "1.5 1 400px",
      padding: "2.5rem 3rem",
      minWidth: 0,
      background: t.card,
      transition: "background 0.3s",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    calHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "1.5rem",
    },
    calTitle: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: "1.25rem",
      fontWeight: 700,
      color: t.ink,
    },
    navGroup: { display: "flex", gap: 8 },
    navBtn: {
      background: "none",
      border: `1px solid ${t.soft}`,
      color: t.muted,
      width: 36,
      height: 36,
      borderRadius: "50%",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s",
    },
    weekdays: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      marginBottom: "0.5rem",
    },
    wd: {
      textAlign: "center",
      fontSize: 10,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: t.muted,
      padding: "0.5rem 0",
      fontWeight: 500,
    },
    gridOuter: { position: "relative", minHeight: 270, overflow: "hidden" },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      gap: 4,
      position: "absolute",
      inset: 0,
    },
    footer: {
      marginTop: "1.5rem",
      paddingTop: "1.25rem",
      borderTop: `1px solid ${t.soft}`,
      display: "flex",
      gap: "1rem",
      flexWrap: "wrap",
      alignItems: "center",
    },
    pill: {
      flex: 1,
      minWidth: 100,
      background: t.pillBg,
      border: `1px solid ${t.soft}`,
      borderRadius: 12,
      padding: "0.6rem 1rem",
    },
    pillLabel: {
      fontSize: 10,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: t.muted,
      marginBottom: 4,
      fontWeight: 500,
    },
    pillVal: { fontSize: 14, fontWeight: 500, color: t.ink },
    clearBtn: {
      background: "none",
      border: `1px solid ${t.soft}`,
      color: t.muted,
      borderRadius: 8,
      padding: "0.5rem 0.9rem",
      fontSize: 12,
      cursor: "pointer",
      fontFamily: "'DM Sans', sans-serif",
      display: "flex",
      alignItems: "center",
      gap: 4,
      transition: "background 0.2s",
    },
    legend: {
      display: "flex",
      gap: "1.25rem",
      marginTop: "1rem",
      flexWrap: "wrap",
    },
    legendItem: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 11,
      color: t.muted,
    },
    legendDot: (color) => ({
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: color,
    }),
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');`}</style>
      <div style={styles.wrap}>
        {/* ── LEFT PANEL ── */}
        <div style={styles.left}>
          <div style={styles.heroImg}>
            <img
              src={MONTH_IMAGES[monthIndex]}
              alt=""
              style={{ display: "none" }}
              onLoad={() => setImgLoaded(true)}
            />
          </div>
          <div style={styles.heroOverlay} />

          <button
            style={styles.themeBtn}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.15)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
            }
          >
            {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
            {theme === "light" ? "Dark" : "Light"}
          </button>

          <div style={styles.leftContent}>
            <div style={styles.monthTag}>{format(currentDate, "yyyy")}</div>
            <div style={styles.monthBig}>{format(currentDate, "MMMM")}</div>
            <div style={styles.yearSmall}>
              {format(currentDate, "EEEE, do")}
            </div>

            <div style={styles.notesBox}>
              <div style={styles.notesLabel}>
                <PenLine
                  size={12}
                  style={{ display: "inline", marginRight: 6 }}
                />{" "}
                Month memo
              </div>
              <textarea
                style={styles.notesArea}
                value={notes[monthKey] || ""}
                onChange={handleNoteChange}
                placeholder={`Notes for ${format(currentDate, "MMMM")}...`}
              />
            </div>

            <AnimatePresence>
              {startDate && endDate && (
                <motion.div
                  key="badge"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                  style={styles.rangeBadge}
                >
                  <div
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      opacity: 0.7,
                      marginBottom: 4,
                    }}
                  >
                    Selected range
                  </div>
                  <div>
                    {format(startDate, "MMM d")} →{" "}
                    {format(endDate, "MMM d, yyyy")}
                  </div>
                  <div style={{ opacity: 0.75, fontSize: 11, marginTop: 2 }}>
                    {rangeLength} day{rangeLength !== 1 ? "s" : ""}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div style={styles.right}>
          <div style={styles.calHeader}>
            <div style={styles.calTitle}>
              {format(currentDate, "MMMM yyyy")}
            </div>
            <div style={styles.navGroup}>
              <button
                style={styles.navBtn}
                onClick={prevMonth}
                aria-label="Previous month"
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = t.hoverBg)
                }
                onMouseOut={(e) => (e.currentTarget.style.background = "none")}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                style={styles.navBtn}
                onClick={nextMonth}
                aria-label="Next month"
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = t.hoverBg)
                }
                onMouseOut={(e) => (e.currentTarget.style.background = "none")}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div style={styles.weekdays}>
            {WEEKDAYS.map((w) => (
              <div key={w} style={styles.wd}>
                {w}
              </div>
            ))}
          </div>

          <div style={styles.gridOuter} onMouseLeave={() => setHoverDate(null)}>
            <AnimatePresence
              custom={direction}
              mode="popLayout"
              initial={false}
            >
              <motion.div
                key={format(currentDate, "yyyy-MM")}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: "easeInOut" }}
                style={styles.grid}
              >
                {days.map((day) => (
                  <DayCell
                    key={day.toISOString()}
                    day={day}
                    currentDate={currentDate}
                    startDate={startDate}
                    endDate={endDate}
                    hoverDate={hoverDate}
                    theme={theme}
                    onClick={() => onDayClick(day)}
                    onEnter={() => setHoverDate(day)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div style={styles.footer}>
            <div style={styles.pill}>
              <div style={styles.pillLabel}>Start</div>
              <div style={styles.pillVal}>
                {startDate ? format(startDate, "MMM d, yyyy") : "—"}
              </div>
            </div>
            <div style={styles.pill}>
              <div style={styles.pillLabel}>End</div>
              <div style={styles.pillVal}>
                {endDate ? format(endDate, "MMM d, yyyy") : "—"}
              </div>
            </div>
            {(startDate || endDate) && (
              <button
                style={styles.clearBtn}
                onClick={clearSelection}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = t.hoverBg)
                }
                onMouseOut={(e) => (e.currentTarget.style.background = "none")}
              >
                <X size={14} /> Clear
              </button>
            )}
          </div>

          <div style={styles.legend}>
            <div style={styles.legendItem}>
              <span style={styles.legendDot(t.accent)} />
              Today
            </div>
            <div style={styles.legendItem}>
              <span style={styles.legendDot(t.accent)} />
              Selected
            </div>
            <div style={styles.legendItem}>
              <span style={styles.legendDot(t.muted)} />
              Holiday
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
