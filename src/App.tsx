import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type EducationItem = {
  title: string;
  short: string;
  details: string[];
};

type SkillItem = {
  title: string;
  desc: string;
  points: string[];
};

type ProjectItem = {
  title: string;
  desc: string;
};

const BASE = {
  page: {
    minHeight: "100vh",
    overflowX: "hidden" as const,
    color: "#ffffff",
    background:
      "linear-gradient(135deg, #020617 0%, #0f172a 45%, #000000 100%)",
    fontFamily: "Arial, sans-serif",
    position: "relative" as const,
  },
  section: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    boxSizing: "border-box" as const,
    position: "relative" as const,
    zIndex: 2,
  },
  stickyHero: {
    position: "sticky" as const,
    top: 0,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    boxSizing: "border-box" as const,
    zIndex: 3,
  },
  centered: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    textAlign: "center" as const,
  },
  button: {
    display: "inline-block",
    padding: "10px 22px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.24)",
    color: "#fff",
    textDecoration: "none",
    fontSize: "13px",
    letterSpacing: "0.18em",
    background: "rgba(255,255,255,0.05)",
    transition: "all 0.3s ease",
  },
};

function NameLetter({
  char,
  index,
  isMobile,
}: {
  char: string;
  index: number;
  isMobile: boolean;
}) {
  if (char === " ") {
    return <span style={{ width: isMobile ? 8 : 12 }} />;
  }

  return (
    <motion.span
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      style={{
        display: "inline-block",
        fontSize: isMobile ? "28px" : "54px",
        fontWeight: 900,
        letterSpacing: isMobile ? "0.12em" : "0.18em",
        textShadow: "0 0 28px rgba(255,255,255,0.22)",
      }}
    >
      {char}
    </motion.span>
  );
}

function ProfileIcon({ isMobile }: { isMobile: boolean }) {
  const size = isMobile ? 90 : 118;
  const inner = isMobile ? 64 : 82;

  return (
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2.2, repeat: Infinity }}
      style={{
        height: size,
        width: size,
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.18)",
        background: "rgba(255,255,255,0.09)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 60px rgba(255,255,255,0.10)",
      }}
    >
      <div style={{ position: "relative", height: inner, width: inner }}>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 4,
            transform: "translateX(-50%)",
            width: isMobile ? 22 : 28,
            height: isMobile ? 22 : 28,
            borderRadius: "50%",
            border: "2px solid #fff",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 4,
            transform: "translateX(-50%)",
            width: isMobile ? 40 : 52,
            height: isMobile ? 30 : 40,
            borderTopLeftRadius: 999,
            borderTopRightRadius: 999,
            border: "2px solid #fff",
            borderBottom: "none",
          }}
        />
      </div>
    </motion.div>
  );
}

function HoverDetail({
  open,
  lines,
  isMobile,
}: {
  open: boolean;
  lines: string[];
  isMobile: boolean;
}) {
  return (
    <div
      style={{
        maxHeight: open ? (isMobile ? 280 : 220) : 0,
        opacity: open ? 1 : 0,
        overflow: "hidden",
        transition: "all 0.4s ease",
        marginTop: open ? 16 : 0,
      }}
    >
      <div
        style={{
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.10)",
          background: "rgba(0,0,0,0.28)",
          padding: isMobile ? 14 : 16,
          fontSize: isMobile ? 13 : 14,
          lineHeight: 1.8,
          color: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(8px)",
        }}
      >
        {lines.map((line) => (
          <p key={line} style={{ margin: 0 }}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

function HeroButtons() {
  const [hovered, setHovered] = useState<string | null>(null);

  const buttons = [
    { label: "ABOUT", desc: "Know about my journey", href: "#intro" },
    {
      label: "EDUCATION",
      desc: "View my academic background",
      href: "#education",
    },
    { label: "CONTACT", desc: "Get in touch with me", href: "#contact" },
  ];

  return (
    <div
      style={{
        marginTop: 34,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 14,
      }}
    >
      {buttons.map((btn) => (
        <div
          key={btn.label}
          style={{ position: "relative" }}
          onMouseEnter={() => setHovered(btn.label)}
          onMouseLeave={() => setHovered(null)}
        >
          <a href={btn.href} style={BASE.button}>
            {btn.label}
          </a>
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              marginTop: 10,
              width: 180,
              background: "rgba(0,0,0,0.58)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 14,
              padding: "10px 12px",
              fontSize: 12,
              color: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(8px)",
              opacity: hovered === btn.label ? 1 : 0,
              pointerEvents: "none",
              transition: "opacity 0.25s ease",
              textAlign: "center",
              zIndex: 10,
            }}
          >
            {btn.desc}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredEdu, setHoveredEdu] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredExp, setHoveredExp] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    const onResize = () => setIsMobile(window.innerWidth < 768);

    onResize();
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollY / 400);
  const heroTranslate = Math.min(scrollY * 0.35, 140);
  const heroScale = Math.max(0.78, 1 - scrollY / 1400);

  const sectionAnim = useMemo(
    () => ({
      initial: { opacity: 0, y: 50 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.75 },
      viewport: { once: true },
    }),
    []
  );

  const educationItems: EducationItem[] = [
    {
      title: "M.Voc Media Technology",
      short: "Postgraduate • 2024",
      details: [
        "Indira Gandhi National Tribal University, Amarkantak (M.P.)",
        "Passing: Aug 2024",
        "CGPA: 7.18 / 10",
      ],
    },
    {
      title: "B.Voc Theatre, Stagecraft, Film Production & Media Technology",
      short: "Undergraduate • 2022",
      details: [
        "Indira Gandhi National Tribal University, Amarkantak (M.P.)",
        "Passing: July 2022",
        "CGPA: 7.09 / 10",
      ],
    },
    {
      title: "12th Commerce",
      short: "Senior Secondary • 2019",
      details: [
        "Bharti Niketan SS Sr Sec, Sri Dungargarh (Bikaner)",
        "Passing: 2019",
        "Percentage: 50.80%",
      ],
    },
    {
      title: "10th",
      short: "Secondary • 2017",
      details: [
        "Bharti Niketan SS Sr Sec, Sri Dungargarh (Bikaner)",
        "Passing: 2017",
        "Percentage: 55.17%",
      ],
    },
  ];

  const skillCards: SkillItem[] = [
    {
      title: "Video Editing",
      desc: "Experienced in editing news and creative content using Adobe Premiere Pro, CapCut, and VN.",
      points: ["Adobe Premiere Pro", "CapCut", "VN Editor", "Editing workflow"],
    },
    {
      title: "Computer Knowledge",
      desc: "Good understanding of computer hardware, operating systems, and troubleshooting.",
      points: [
        "Hardware basics",
        "Operating systems",
        "Troubleshooting",
        "System handling",
      ],
    },
    {
      title: "MS Office",
      desc: "Comfortable with Word, Excel, and PowerPoint for documentation and presentations.",
      points: ["Word", "Excel", "PowerPoint", "Documentation"],
    },
    {
      title: "Teamwork & Communication",
      desc: "Comfortable in team environments with strong communication and coordination skills.",
      points: [
        "Team coordination",
        "Communication",
        "Adaptability",
        "Workplace comfort",
      ],
    },
  ];

  const projects: ProjectItem[] = [
    {
      title: "News Video Editing",
      desc: "Edited news packages with proper cuts, timing balance, and publishing-ready output.",
    },
    {
      title: "Studio Workflow Handling",
      desc: "Worked with studio-based media operations and practical production support.",
    },
    {
      title: "Creative Editing Practice",
      desc: "Used Adobe Premiere Pro, CapCut, and VN for creative edits and storytelling structure.",
    },
    {
      title: "Media Technology Learning",
      desc: "Built academic and practical knowledge in theatre, stagecraft, film production, and media technology.",
    },
  ];

  const styles = {
    section: {
      ...BASE.section,
      padding: isMobile ? "18px" : "24px",
    },
    stickyHero: {
      ...BASE.stickyHero,
      padding: isMobile ? "18px" : "24px",
    },
    sectionTitle: {
      fontSize: isMobile ? "28px" : "38px",
      fontWeight: 800,
      marginBottom: isMobile ? "18px" : "24px",
      textAlign: "center" as const,
    },
    introBox: {
      width: "100%",
      maxWidth: 920,
      textAlign: "center" as const,
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.10)",
      borderRadius: isMobile ? 22 : 30,
      padding: isMobile ? 24 : 38,
      backdropFilter: "blur(10px)",
      boxSizing: "border-box" as const,
    },
    cardWrap: {
      width: "100%",
      maxWidth: isMobile ? "100%" : 1100,
      boxSizing: "border-box" as const,
    },
    grid2: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : "repeat(auto-fit, minmax(280px, 1fr))",
      gap: isMobile ? 18 : 24,
      marginTop: 28,
      alignItems: "stretch",
    },
    card: {
      width: "100%",
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.10)",
      borderRadius: isMobile ? 18 : 24,
      padding: isMobile ? 18 : 24,
      backdropFilter: "blur(10px)",
      transition: "all 0.35s ease",
      boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
      boxSizing: "border-box" as const,
    },
    muted: {
      color: "rgba(255,255,255,0.78)",
      lineHeight: 1.8,
      fontSize: isMobile ? 15 : 16,
    },
  };

  return (
    <div style={BASE.page}>
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          background:
            "radial-gradient(circle at top, rgba(34,211,238,0.14), transparent 28%), radial-gradient(circle at bottom, rgba(59,130,246,0.12), transparent 24%)",
        }}
      />

      <section style={styles.stickyHero}>
        <motion.div
          style={{
            transform: `translateY(-${heroTranslate}px) scale(${heroScale})`,
            opacity: heroOpacity,
            ...BASE.centered,
          }}
        >
          <ProfileIcon isMobile={isMobile} />

          <div
            style={{
              marginTop: 34,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {"PAWAN SHARMA".split("").map((char, i) => (
              <NameLetter
                key={`${char}-${i}`}
                char={char}
                index={i}
                isMobile={isMobile}
              />
            ))}
          </div>

          <motion.div
            style={{ marginTop: 42, ...BASE.centered }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div
              style={{
                height: 48,
                width: 28,
                border: "1px solid rgba(255,255,255,0.9)",
                borderRadius: 999,
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: 6,
              }}
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: "#ffffff",
                }}
              />
            </div>

            <p
              style={{
                marginTop: 16,
                color: "rgba(255,255,255,0.72)",
                fontSize: isMobile ? 11 : 13,
                letterSpacing: isMobile ? "0.22em" : "0.35em",
              }}
            >
              SCROLL FOR MORE
            </p>
            <p
              style={{
                marginTop: 2,
                color: "rgba(255,255,255,0.18)",
                fontSize: isMobile ? 11 : 13,
                letterSpacing: isMobile ? "0.22em" : "0.35em",
                filter: "blur(1px)",
              }}
            >
              SCROLL FOR MORE
            </p>
          </motion.div>

          <HeroButtons />
        </motion.div>
      </section>

      <section id="intro" style={styles.section}>
        <motion.div {...sectionAnim} style={styles.introBox}>
          <h2 style={styles.sectionTitle}>My Academic Journey</h2>
          <p style={{ ...styles.muted, fontSize: isMobile ? 17 : 20 }}>
            A motivated and hardworking postgraduate with a background in Media
            Technology. Skilled in video editing, computer systems, and media
            production, with practical exposure to studio workflows and creative
            work.
          </p>
        </motion.div>
      </section>

      <section id="education" style={styles.section}>
        <motion.div {...sectionAnim} style={styles.cardWrap}>
          <h2 style={styles.sectionTitle}>Education</h2>

          <div style={styles.grid2}>
            {educationItems.map((item) => {
              const open = hoveredEdu === item.title;
              return (
                <div
                  key={item.title}
                  style={{
                    ...styles.card,
                    transform: open ? "scale(1.04)" : "scale(1)",
                    background: open
                      ? "rgba(255,255,255,0.10)"
                      : "rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={() => setHoveredEdu(item.title)}
                  onMouseLeave={() => setHoveredEdu(null)}
                >
                  <p
                    style={{
                      fontSize: isMobile ? 20 : 24,
                      fontWeight: 700,
                      margin: 0,
                    }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{
                      color: "rgba(103,232,249,0.88)",
                      fontSize: 14,
                      marginTop: 10,
                    }}
                  >
                    {item.short}
                  </p>

                  <HoverDetail
                    open={open}
                    lines={item.details}
                    isMobile={isMobile}
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      <section style={styles.section}>
        <motion.div {...sectionAnim} style={styles.cardWrap}>
          <h2 style={styles.sectionTitle}>Skills</h2>

          <div style={styles.grid2}>
            {skillCards.map((skill) => {
              const open = hoveredSkill === skill.title;
              return (
                <div
                  key={skill.title}
                  style={{
                    ...styles.card,
                    transform: open ? "scale(1.04)" : "scale(1)",
                    background: open
                      ? "rgba(255,255,255,0.10)"
                      : "rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={() => setHoveredSkill(skill.title)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <h3
                    style={{
                      fontSize: isMobile ? 20 : 22,
                      fontWeight: 700,
                      marginTop: 0,
                      marginBottom: 10,
                    }}
                  >
                    {skill.title}
                  </h3>
                  <p style={styles.muted}>{skill.desc}</p>

                  <HoverDetail
                    open={open}
                    lines={skill.points}
                    isMobile={isMobile}
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      <section style={styles.section}>
        <motion.div
          {...sectionAnim}
          style={{ ...styles.cardWrap, maxWidth: 860 }}
        >
          <h2 style={styles.sectionTitle}>Experience</h2>

          <div
            style={{
              ...styles.card,
              transform: hoveredExp ? "scale(1.03)" : "scale(1)",
              background: hoveredExp
                ? "rgba(255,255,255,0.10)"
                : "rgba(255,255,255,0.06)",
            }}
            onMouseEnter={() => setHoveredExp(true)}
            onMouseLeave={() => setHoveredExp(false)}
          >
            <h3
              style={{
                fontSize: isMobile ? 24 : 30,
                fontWeight: 700,
                margin: 0,
              }}
            >
              Video / News Editor
            </h3>

            <p style={{ color: "rgba(103,232,249,0.9)", marginTop: 10 }}>
              Vande Bharat News, Indore
            </p>
            <p style={{ color: "rgba(255,255,255,0.55)", marginTop: 6 }}>
              May 2025 – March 2026
            </p>

            <div
              style={{
                marginTop: 24,
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.8,
                fontSize: isMobile ? 15 : 16,
              }}
            >
              <p>
                • Edited daily news content with proper timing, transitions, and
                clarity.
              </p>
              <p>• Worked on studio-based production and media workflows.</p>
              <p>• Managed video formatting and output for publishing.</p>
              <p>
                • Collaborated with team members for content delivery and
                improvements.
              </p>
            </div>

            <HoverDetail
              open={hoveredExp}
              isMobile={isMobile}
              lines={[
                "Studio-based production handling",
                "News video editing workflow",
                "Publishing-ready output management",
                "Team coordination in media environment",
              ]}
            />
          </div>
        </motion.div>
      </section>

      <section style={styles.section}>
        <motion.div
          {...sectionAnim}
          style={{ ...styles.cardWrap, maxWidth: 1000 }}
        >
          <h2 style={styles.sectionTitle}>Projects</h2>

          <div style={styles.grid2}>
            {projects.map((project) => (
              <div key={project.title} style={styles.card}>
                <h3
                  style={{
                    fontSize: isMobile ? 20 : 22,
                    fontWeight: 700,
                    marginTop: 0,
                    marginBottom: 10,
                  }}
                >
                  {project.title}
                </h3>
                <p style={styles.muted}>{project.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="contact" style={styles.section}>
        <motion.div
          {...sectionAnim}
          style={{ ...styles.introBox, maxWidth: 720 }}
        >
          <h2 style={styles.sectionTitle}>Contact</h2>

          <p
            style={{
              ...styles.muted,
              fontSize: isMobile ? 18 : 20,
              marginBottom: 8,
            }}
          >
            +91 9352273024
          </p>
          <p
            style={{
              ...styles.muted,
              fontSize: isMobile ? 16 : 18,
              marginBottom: 8,
            }}
          >
            sharmapawan93066@gmail.com
          </p>
          <p
            style={{
              ...styles.muted,
              fontSize: isMobile ? 16 : 18,
              marginBottom: 18,
            }}
          >
            Bikaner, Rajasthan
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 12,
              marginTop: 10,
            }}
          >
            <a
              href="mailto:sharmapawan93066@gmail.com"
              style={{ ...BASE.button, background: "rgba(255,255,255,0.08)" }}
            >
              EMAIL ME
            </a>

            <a
              href="https://wa.me/918103585021"
              target="_blank"
              rel="noreferrer"
              style={{ ...BASE.button, background: "rgba(255,255,255,0.08)" }}
            >
              WHATSAPP
            </a>

            <a
              href="/resume.pdf"
              download
              style={{ ...BASE.button, background: "rgba(255,255,255,0.08)" }}
            >
              DOWNLOAD RESUME
            </a>
          </div>
        </motion.div>
      </section>

      <section style={styles.section}>
        <motion.div
          {...sectionAnim}
          style={{ ...styles.introBox, maxWidth: 900 }}
        >
          <h2 style={styles.sectionTitle}>Social & Channel</h2>

          <p
            style={{
              ...styles.muted,
              fontSize: isMobile ? 16 : 18,
              marginBottom: 18,
            }}
          >
            Add your LinkedIn, YouTube channel, or portfolio links here to make
            your profile even stronger.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              style={styles.button}
            >
              LINKEDIN
            </a>

            <a
              href="https://www.youtube.com/@heritageacrossborders"
              target="_blank"
              rel="noreferrer"
              style={styles.button}
            >
              YOUTUBE
            </a>

            <a href="#contact" style={styles.button}>
              HIRE ME
            </a>
          </div>
        </motion.div>
      </section>

      <div
        style={{
          position: "fixed",
          bottom: 12,
          right: 16,
          fontSize: 12,
          color: "rgba(255,255,255,0.4)",
          zIndex: 20,
        }}
      >
        ©Designed by Pawan Sharma.
      </div>
    </div>
  );
}
