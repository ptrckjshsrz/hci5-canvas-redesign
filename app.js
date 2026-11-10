// Cross-Course Board prototype. All data is made up for illustration.
// State is mirrored in the URL hash (e.g. #filter=all&course=HCI&sel=hci-m2&tab=rubric)
// so any state can be opened directly — handy for importing each one into Figma.

const ASSIGNMENTS = [
  {
    id: "hci-m2", course: "HCI", title: "Milestone 2 Report", status: "upcoming",
    due: "Wed Nov 11, 11:59 PM", dueShort: "Wed Nov 11",
    changed: { was: "Fri Nov 13", when: "2 days ago" },
    path: "Modules › Week 11 › Milestone 2", submit: "One PDF upload · 50 pts",
    instructions: [
      "Milestone 2: Design Alternatives",
      "Each member creates three meaningfully different design alternatives addressing the team's problem statement.",
      "For each design: show a low-fidelity sketch, explain the main idea, connect it to at least two pieces of Milestone 1 evidence, and list one strength, one limitation, and one open question.",
      "As a team, compare the alternatives and choose one direction for Milestone 3."
    ],
    rubric: [["Design goals", 10], ["Individual alternatives", 20], ["Evidence links", 10], ["Comparison & selection", 10]]
  },
  {
    id: "ai-proj", course: "AI", title: "Search Algorithms Project", status: "upcoming",
    due: "Thu Nov 12, 11:59 PM", dueShort: "Thu Nov 12",
    path: "Assignments › Projects", submit: "Zip of source code + README · 100 pts",
    instructions: [
      "Project 2: Search Algorithms",
      "Implement BFS, DFS, and A* to solve the provided maze files.",
      "Report the nodes expanded and path cost for each algorithm on every maze.",
      "Include a short README explaining your heuristic for A*."
    ],
    rubric: [["BFS / DFS correct", 30], ["A* correct", 30], ["Heuristic explanation", 20], ["Code quality", 20]]
  },
  {
    id: "hci-q7", course: "HCI", title: "Reading Quiz 7", status: "upcoming",
    due: "Fri Nov 13, 9:00 AM", dueShort: "Fri Nov 13",
    path: "Quizzes", submit: "Online quiz · 10 pts",
    instructions: [
      "Reading Quiz 7: Prototyping",
      "Covers the chapter on low- and high-fidelity prototyping.",
      "10 multiple choice questions, 15 minute time limit, one attempt."
    ],
    rubric: [["10 questions × 1 pt", 10]]
  },
  {
    id: "fin-budget", course: "Finance", title: "Budget Worksheet", status: "upcoming",
    due: "Mon Nov 16, 11:59 PM", dueShort: "Mon Nov 16",
    path: "Assignments › Worksheets", submit: "One .xlsx upload · 25 pts",
    instructions: [
      "Personal Budget Worksheet",
      "Fill in the template with a realistic monthly student budget.",
      "Calculate savings rate and explain one change you would make."
    ],
    rubric: [["Complete template", 10], ["Correct calculations", 10], ["Reflection", 5]]
  },
  {
    id: "prog-hw4", course: "Prog.", title: "Homework 4: Linked Lists", status: "upcoming",
    due: "Wed Nov 18, 11:59 PM", dueShort: "Wed Nov 18",
    path: "Modules › Week 11 › Homework 4", submit: "Upload .java files · 40 pts",
    instructions: [
      "Homework 4: Linked Lists",
      "Implement a singly linked list with insert, delete, and reverse.",
      "All provided unit tests must pass."
    ],
    rubric: [["Insert / delete", 15], ["Reverse", 15], ["Tests pass", 10]]
  },
  {
    id: "db-lab4", course: "Database", title: "Lab 4: Joins", status: "nodate", isNew: true,
    path: "Modules › Week 11 › Lab 4", submit: "One .sql file · 20 pts",
    instructions: [
      "Lab 4: Joins",
      "Write queries using INNER, LEFT, and FULL joins on the provided university schema.",
      "No due date is listed in Canvas. Check with your instructor."
    ],
    rubric: [["Inner joins", 8], ["Outer joins", 8], ["Formatting", 4]]
  },
  {
    id: "db-lab3", course: "Database", title: "Lab 3: Indexes", status: "nodate",
    path: "Modules › Week 9 › Lab 3", submit: "One .sql file · 20 pts",
    instructions: [
      "Lab 3: Indexes",
      "Create indexes for the three slow queries and compare run times before and after.",
      "No due date is listed in Canvas. Check with your instructor."
    ],
    rubric: [["Indexes created", 10], ["Timing comparison", 10]]
  },
  {
    id: "ai-ps5", course: "AI", title: "Practice Set 5", status: "nodate",
    path: "Modules › Week 10 › Practice", submit: "Online practice · ungraded",
    instructions: [
      "Practice Set 5: Probability",
      "Ten practice problems on Bayes' rule. Answers are released after the next lecture."
    ],
    rubric: [["Completion only", 0]]
  },
  {
    id: "ai-q4", course: "AI", title: "Quiz 4", status: "completed",
    due: "Wed Nov 4", submitted: "Submitted Nov 3", grade: "9 / 10",
    path: "Quizzes", submit: "Online quiz · 10 pts",
    instructions: ["Quiz 4: Informed Search", "Covers heuristics and admissibility."],
    rubric: [["10 questions × 1 pt", 10]]
  },
  {
    id: "hci-m1", course: "HCI", title: "Milestone 1 Report", status: "completed",
    due: "Mon Oct 12", submitted: "Submitted Oct 12", grade: "46 / 50",
    path: "Modules › Week 6 › Milestone 1", submit: "One PDF upload · 50 pts",
    instructions: ["Milestone 1: Problem Definition", "Interview five users and complete a cognitive walkthrough."],
    rubric: [["Interviews", 20], ["Walkthrough", 20], ["Problem statement", 10]]
  },
  {
    id: "hci-q6", course: "HCI", title: "Reading Quiz 6", status: "completed",
    due: "Fri Nov 6", submitted: "Submitted Nov 5", grade: "8 / 10",
    path: "Quizzes", submit: "Online quiz · 10 pts",
    instructions: ["Reading Quiz 6: Evaluation", "Covers heuristic evaluation and cognitive walkthroughs."],
    rubric: [["10 questions × 1 pt", 10]]
  },
  {
    id: "prog-hw3", course: "Prog.", title: "Homework 3: Recursion", status: "completed",
    due: "Wed Nov 4", submitted: "Submitted Nov 4", grade: "Not graded yet",
    path: "Modules › Week 10 › Homework 3", submit: "Upload .java files · 40 pts",
    instructions: ["Homework 3: Recursion", "Solve five problems recursively."],
    rubric: [["5 problems × 8 pts", 40]]
  },
  {
    id: "db-lab2", course: "Database", title: "Lab 2: Normalization", status: "completed",
    due: "No due date", submitted: "Submitted Oct 28", grade: "18 / 20",
    path: "Modules › Week 7 › Lab 2", submit: "One PDF upload · 20 pts",
    instructions: ["Lab 2: Normalization", "Normalize the given schema to 3NF."],
    rubric: [["1NF / 2NF", 10], ["3NF", 10]]
  },
  {
    id: "fin-quiz2", course: "Finance", title: "Quiz 2", status: "completed",
    due: "Mon Nov 2", submitted: "Submitted Nov 2", grade: "14 / 15",
    path: "Quizzes", submit: "Online quiz · 15 pts",
    instructions: ["Quiz 2: Interest", "Simple and compound interest."],
    rubric: [["15 questions × 1 pt", 15]]
  }
];

const COLUMNS = {
  upcoming:  { label: "UPCOMING",    dashed: false },
  nodate:    { label: "NO DUE DATE", dashed: true },
  completed: { label: "COMPLETED",   dashed: false }
};

const VIEWS = {
  incomplete: ["upcoming", "nodate"],
  completed:  ["completed"],
  all:        ["upcoming", "nodate", "completed"]
};

const state = { filter: "incomplete", course: "all", sel: "hci-m2", tab: "instructions" };

// ---------- URL hash <-> state ----------
function readHash() {
  const p = new URLSearchParams(location.hash.slice(1));
  if (VIEWS[p.get("filter")]) state.filter = p.get("filter");
  if (p.get("course")) state.course = p.get("course");
  if (p.has("sel")) state.sel = p.get("sel") || null;
  if (p.get("tab") === "rubric" || p.get("tab") === "instructions") state.tab = p.get("tab");
}
function writeHash() {
  const p = new URLSearchParams({
    filter: state.filter, course: state.course, sel: state.sel || "", tab: state.tab
  });
  history.replaceState(null, "", "#" + p.toString());
}

// ---------- helpers ----------
function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}
function visible() {
  return ASSIGNMENTS.filter(a => state.course === "all" || a.course === state.course);
}

// ---------- board ----------
function renderBoard() {
  document.querySelectorAll("[data-filter]").forEach(b => {
    b.classList.toggle("on", b.dataset.filter === state.filter);
    b.setAttribute("aria-pressed", b.dataset.filter === state.filter);
  });
  document.getElementById("course").value = state.course;

  const cols = document.getElementById("cols");
  const keys = VIEWS[state.filter];
  cols.className = "cols n" + keys.length;
  cols.innerHTML = "";

  const items = visible();
  keys.forEach(key => {
    const list = items.filter(a => a.status === key);
    const col = el("section", "col" + (COLUMNS[key].dashed ? " dashed" : ""));
    const head = el("div", "col-head");
    head.append(el("span", null, COLUMNS[key].label), el("span", null, String(list.length)));
    const body = el("div", "col-body");

    if (!list.length) body.append(el("div", "empty", "Nothing here."));
    list.forEach(a => body.append(card(a)));

    if (key === "nodate" && list.length) {
      body.append(el("div", "hint", "Undated ≠ optional. Check with your instructor."));
    }
    if (key === "nodate" && state.filter === "incomplete") {
      const hidden = items.filter(a => a.status === "completed").length;
      if (hidden) body.append(el("div", "hint", hidden + " completed items hidden — switch to Completed to see them."));
    }

    col.append(head, body);
    cols.append(col);
  });
}

function card(a) {
  const b = el("button", "card" + (a.status === "completed" ? " done" : "") + (a.id === state.sel ? " sel" : ""));
  b.type = "button";
  b.append(el("div", "t", a.course + " · " + a.title));
  if (a.status === "upcoming") b.append(el("div", "m", "Due " + a.dueShort + " · Pending"));
  if (a.status === "nodate") {
    b.append(el("div", "m", "No date listed in Canvas"));
    b.append(el("div", "m", a.path.split(" › ").slice(0, 2).join(" › ")));
  }
  if (a.status === "completed") b.append(el("div", "m", a.submitted + " · " + a.grade));
  if (a.changed) b.append(el("div", "tag", "▲ Date changed"));
  if (a.isNew) b.append(el("div", "tag new", "● New"));
  if (a.status === "completed") b.append(el("div", "tag done", "✓ Completed"));
  b.addEventListener("click", () => { state.sel = a.id; state.tab = "instructions"; render(); });
  return b;
}

// ---------- details panel ----------
function renderPanel() {
  const panel = document.getElementById("panel");
  panel.innerHTML = "";
  const a = visible().find(x => x.id === state.sel && VIEWS[state.filter].includes(x.status));

  if (!a) {
    panel.append(el("div", "k", "SELECTED"));
    panel.append(el("div", "panel-empty", "Select an assignment to see its details."));
    return;
  }

  panel.append(el("div", "k", "SELECTED"));
  panel.append(el("div", "ptitle", a.course + " · " + a.title));

  if (a.changed) {
    const box = el("div", "changebox");
    box.append(el("div", "bold", "Deadline changed · " + a.changed.when));
    box.append(el("div", "strike", "Was: " + a.changed.was));
    box.append(el("div", "bold", "Now: " + a.due));
    panel.append(box);
  }

  const due = el("div");
  due.append(el("div", "k", "DUE"));
  due.append(el("div", "row", a.status === "nodate" ? "No date listed in Canvas" : a.due));
  panel.append(due);

  const found = el("div");
  found.append(el("div", "k", "FOUND IN"));
  found.append(el("div", "row", a.path));
  panel.append(found);

  // tabs + preview
  const wrap = el("div");
  const tabs = el("div", "tabs");
  tabs.setAttribute("role", "tablist");
  [["instructions", "Instructions.pdf"], ["rubric", "Rubric"]].forEach(([key, label]) => {
    const t = el("button", "tab" + (state.tab === key ? " on" : ""), label);
    t.type = "button";
    t.setAttribute("role", "tab");
    t.setAttribute("aria-selected", state.tab === key);
    t.addEventListener("click", () => { state.tab = key; render(); });
    tabs.append(t);
  });
  const prev = el("div", "preview");
  if (state.tab === "instructions") {
    prev.append(el("div", "doc-h", a.instructions[0]));
    a.instructions.slice(1).forEach(p => prev.append(el("div", null, p)));
  } else {
    const table = el("table", "rubric");
    const hr = el("tr");
    hr.append(el("th", null, "Criterion"), el("th", null, "Points"));
    table.append(hr);
    let total = 0;
    a.rubric.forEach(([c, pts]) => {
      total += pts;
      const tr = el("tr");
      tr.append(el("td", null, c), el("td", null, String(pts)));
      table.append(tr);
    });
    const tr = el("tr");
    tr.append(el("th", null, "Total"), el("th", null, String(total)));
    table.append(tr);
    prev.append(table);
  }
  wrap.append(tabs, prev);
  panel.append(wrap);

  const sub = el("div");
  sub.append(el("div", "k", "SUBMIT"));
  sub.append(el("div", "row", a.submit));
  panel.append(sub);

  const st = el("div");
  st.append(el("div", "k", "STATUS"));
  st.append(el("div", "row", a.status === "completed"
    ? a.submitted + " · Grade: " + a.grade
    : "Pending — not submitted in Canvas"));
  panel.append(st);

  const cta = el("a", "cta" + (a.status === "completed" ? " secondary" : ""),
    a.status === "completed" ? "View submission in Canvas" : "Open in Canvas to submit");
  cta.href = "#";
  cta.addEventListener("click", e => e.preventDefault());
  panel.append(cta);
}

function render() { renderBoard(); renderPanel(); writeHash(); }

// ---------- wiring ----------
document.querySelectorAll("[data-filter]").forEach(b =>
  b.addEventListener("click", () => { state.filter = b.dataset.filter; render(); }));
document.getElementById("course").addEventListener("change", e => { state.course = e.target.value; render(); });

readHash();
render();