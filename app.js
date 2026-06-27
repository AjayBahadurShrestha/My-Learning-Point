/* ============================================================
 * My Learning Point — Client-side state & interactivity engine
 * ========================================================== */

const state = {
  user: null,
  progress: 0,
  completedLessons: new Set(),
  certificates: [],
  skills: ["HTML", "Tailwind", "JavaScript"],
  joinedProjects: new Set(),
  quiz: { step: 0, answers: [] }
};

/* -------- Router -------- */
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  const el = document.getElementById("page-" + pageId);
  if (el) {
    el.classList.remove("hidden");
    // restart fade-in
    el.style.animation = "none";
    void el.offsetWidth;
    el.style.animation = "";
  }
  if (pageId === "courses") renderCourse(currentCourse);
  if (pageId === "projects") renderProjects();
  if (pageId === "portfolio") renderPortfolio();
  if (pageId === "dashboard") renderDashboard();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* -------- Auth -------- */
function handleRegister(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const name = data.get("name");
  state.user = { name, email: data.get("email") };
  document.getElementById("authBtn").classList.add("hidden");
  const chip = document.getElementById("userChip");
  chip.classList.remove("hidden");
  chip.classList.add("flex");
  document.getElementById("userChipName").textContent = name.split(" ")[0];
  toast(`Welcome, ${name.split(" ")[0]}! Your workspace is ready.`);
  e.target.reset();
  showPage("dashboard");
}

/* -------- Toast -------- */
function toast(msg) {
  const t = document.getElementById("toast");
  document.getElementById("toastMsg").textContent = msg;
  t.classList.remove("hidden");
  clearTimeout(window.__toast);
  window.__toast = setTimeout(() => t.classList.add("hidden"), 2800);
}

/* -------- Courses -------- */
const courses = {
  html: {
    title: "Web Structure Basics (HTML)",
    icon: "fa-brands fa-html5",
    body: `
      <p class="text-slate-500">Learn how every webpage is built — using simple structural tags that the browser understands.</p>
      <h3>What is HTML?</h3>
      <p>HTML stands for <strong>HyperText Markup Language</strong>. It describes the structure of a webpage using tags wrapped in angle brackets.</p>
      <h4>Basic structural tags</h4>
      <ul>
        <li><strong>&lt;h1&gt; – &lt;h6&gt;</strong> — Headings, from largest to smallest.</li>
        <li><strong>&lt;p&gt;</strong> — A paragraph of text.</li>
        <li><strong>&lt;div&gt;</strong> — A generic container for grouping content.</li>
        <li><strong>&lt;a&gt;</strong> — A clickable hyperlink.</li>
      </ul>
      <h4>Example</h4>
      <pre class="code-block"><span class="tag">&lt;h1&gt;</span>My Learning Point<span class="tag">&lt;/h1&gt;</span>
<span class="tag">&lt;p&gt;</span>Welcome to your first lesson.<span class="tag">&lt;/p&gt;</span>
<span class="tag">&lt;div&gt;</span>
  <span class="tag">&lt;a</span> <span class="attr">href</span>=<span class="str">"#"</span><span class="tag">&gt;</span>Get Started<span class="tag">&lt;/a&gt;</span>
<span class="tag">&lt;/div&gt;</span></pre>
      <h4>Why it matters</h4>
      <p>Without structure, browsers can't understand what's a heading, what's a button, or how to make your page accessible to screen readers and search engines.</p>
    `
  },
  tailwind: {
    title: "UI Styling Layouts (Tailwind CSS)",
    icon: "fa-solid fa-palette",
    body: `
      <p class="text-slate-500">Tailwind is a utility-first CSS framework. Instead of writing CSS, you compose styles by adding short class names directly in your HTML.</p>
      <h3>The utility-first idea</h3>
      <p>Each class does <em>one</em> small thing. You combine them to build any design.</p>
      <h4>Common utilities</h4>
      <ul>
        <li><strong>p-4</strong> — padding of 1rem on all sides</li>
        <li><strong>text-indigo-600</strong> — sets text color</li>
        <li><strong>bg-white</strong> — white background</li>
        <li><strong>grid grid-cols-3 gap-4</strong> — a 3-column grid with spacing</li>
      </ul>
      <h4>Example</h4>
      <pre class="code-block"><span class="tag">&lt;div</span> <span class="attr">class</span>=<span class="str">"p-4 bg-indigo-600 text-white rounded-lg"</span><span class="tag">&gt;</span>
  Stylish card built with utilities only.
<span class="tag">&lt;/div&gt;</span></pre>
      <h4>Why students love it</h4>
      <p>You can iterate visually without ever leaving your HTML — perfect for prototypes, landing pages, and dashboards.</p>
    `
  },
  js: {
    title: "Dynamic Client Scripts (JavaScript)",
    icon: "fa-brands fa-js",
    body: `
      <p class="text-slate-500">JavaScript brings web pages to life — it lets you respond to clicks, change content, and store state in the browser.</p>
      <h3>Functions & events</h3>
      <p>A <strong>function</strong> is a reusable block of code. An <strong>event</strong> is something the user does — like clicking a button.</p>
      <h4>Example</h4>
      <pre class="code-block"><span class="kw">function</span> <span class="attr">greet</span>() {
  <span class="com">// change a heading on the page</span>
  <span class="kw">const</span> el = document.getElementById(<span class="str">"title"</span>);
  el.textContent = <span class="str">"Hello, learner!"</span>;
}

document
  .getElementById(<span class="str">"btn"</span>)
  .addEventListener(<span class="str">"click"</span>, greet);</pre>
      <h4>DOM in plain words</h4>
      <p>The <strong>DOM</strong> is the page seen as a tree of objects. JavaScript can read it, change it, and add new branches.</p>
      <ul>
        <li><strong>document.getElementById</strong> — find one element</li>
        <li><strong>element.textContent</strong> — change displayed text</li>
        <li><strong>element.addEventListener</strong> — react to user actions</li>
      </ul>
    `
  },
  css: {
    title: "Responsive Web Design (CSS)",
    icon: "fa-brands fa-css3-alt",
    body: `
      <p class="text-slate-500">CSS controls how web pages look — colors, spacing, fonts, and layouts that adapt to any screen size.</p>
      <h3>Selectors & properties</h3>
      <p>A <strong>selector</strong> picks the HTML element you want to style. A <strong>property</strong> changes a specific visual trait.</p>
      <h4>Core concepts</h4>
      <ul>
        <li><strong>Box model</strong> — content, padding, border, and margin define every element's space.</li>
        <li><strong>Flexbox</strong> — one-dimensional layout for aligning rows or columns.</li>
        <li><strong>Grid</strong> — two-dimensional layout for complex page structures.</li>
        <li><strong>Media queries</strong> — change styles based on screen width.</li>
      </ul>
      <h4>Example</h4>
      <pre class="code-block"><span class="tag">.card</span> {
  <span class="attr">display</span>: <span class="str">flex</span>;
  <span class="attr">flex-direction</span>: <span class="str">column</span>;
  <span class="attr">padding</span>: <span class="str">1.5rem</span>;
  <span class="attr">border-radius</span>: <span class="str">0.75rem</span>;
  <span class="attr">background</span>: <span class="str">#ffffff</span>;
}

<span class="kw">@media</span> (<span class="attr">min-width</span>: <span class="str">768px</span>) {
  <span class="tag">.card</span> { <span class="attr">flex-direction</span>: <span class="str">row</span>; }
}</pre>
      <h4>Why it matters</h4>
      <p>Clean CSS separates structure from presentation, making your sites beautiful, responsive, and maintainable across devices.</p>
    `
  },
  react: {
    title: "Interactive UI Components (React)",
    icon: "fa-brands fa-react",
    body: `
      <p class="text-slate-500">React is a library for building user interfaces from reusable pieces called components.</p>
      <h3>Components & JSX</h3>
      <p>A <strong>component</strong> is a function that returns UI markup. <strong>JSX</strong> lets you write HTML-like syntax directly inside JavaScript.</p>
      <h4>Key ideas</h4>
      <ul>
        <li><strong>Props</strong> — pass data into child components.</li>
        <li><strong>State</strong> — store data that changes over time.</li>
        <li><strong>Hooks</strong> — reuse logic; useState and useEffect are the most common.</li>
        <li><strong>Re-rendering</strong> — React updates only the parts of the DOM that changed.</li>
      </ul>
      <h4>Example</h4>
      <pre class="code-block"><span class="kw">import</span> { useState } <span class="kw">from</span> <span class="str">"react"</span>;

<span class="kw">function</span> <span class="attr">Counter</span>() {
  <span class="kw">const</span> [count, setCount] = useState(<span class="str">0</span>);
  <span class="kw">return</span> (
    <span class="tag">&lt;button</span> <span class="attr">onClick</span>={() => setCount(count + <span class="str">1</span>)}<span class="tag">&gt;</span>
      Clicked {count} times
    <span class="tag">&lt;/button&gt;</span>
  );
}</pre>
      <h4>Why students love it</h4>
      <p>React's component model makes large apps easier to reason about, test, and scale — and it's the foundation of most modern frontend jobs.</p>
    `
  },
  git: {
    title: "Version Control with Git",
    icon: "fa-brands fa-git-alt",
    body: `
      <p class="text-slate-500">Git tracks every change in your code, so you can experiment safely, collaborate with teams, and undo mistakes.</p>
      <h3>Repositories & commits</h3>
      <p>A <strong>repository</strong> is a project folder managed by Git. A <strong>commit</strong> is a saved snapshot of your files at a specific moment.</p>
      <h4>Essential commands</h4>
      <ul>
        <li><strong>git init</strong> — start a new repository</li>
        <li><strong>git add .</strong> — stage your changes</li>
        <li><strong>git commit -m "message"</strong> — save a snapshot</li>
        <li><strong>git push</strong> — upload commits to a remote host</li>
        <li><strong>git pull</strong> — download teammates' updates</li>
      </ul>
      <h4>Example</h4>
      <pre class="code-block"><span class="com"># create a feature branch and switch to it</span>
<span class="kw">git</span> checkout -b feature/login-page

<span class="com"># make changes, then save them</span>
<span class="kw">git</span> add .
<span class="kw">git</span> commit -m <span class="str">"Add login form and validation"</span>

<span class="com"># merge back to the main branch</span>
<span class="kw">git</span> checkout main
<span class="kw">git</span> merge feature/login-page</pre>
      <h4>Why it matters</h4>
      <p>Version control is a non-negotiable skill in software careers. It protects your work and enables smooth teamwork.</p>
    `
  },
  python: {
    title: "Python Programming Foundations",
    icon: "fa-brands fa-python",
    body: `
      <p class="text-slate-500">Python is a friendly, readable language used in web development, data science, automation, and AI.</p>
      <h3>Variables, loops & functions</h3>
      <p>Python programs use <strong>variables</strong> to store data, <strong>loops</strong> to repeat work, and <strong>functions</strong> to organize code.</p>
      <h4>Core building blocks</h4>
      <ul>
        <li><strong>Lists</strong> — ordered collections of items</li>
        <li><strong>Dictionaries</strong> — key-value pairs for structured data</li>
        <li><strong>Conditionals</strong> — if/else logic for decisions</li>
        <li><strong>Modules</strong> — reuse code written by others</li>
      </ul>
      <h4>Example</h4>
      <pre class="code-block"><span class="com"># A simple grade analyzer</span>
<span class="attr">scores</span> = [72, 85, 91, 68, 88]
<span class="attr">average</span> = sum(scores) / len(scores)

<span class="kw">if</span> average >= 80:
    <span class="kw">print</span>(<span class="str">f"Great work! Average: {average}"</span>)
<span class="kw">else</span>:
    <span class="kw">print</span>(<span class="str">f"Keep practicing. Average: {average}"</span>)</pre>
      <h4>Why it matters</h4>
      <p>Python is often the first language recommended to beginners because it reads like English and has libraries for almost every domain.</p>
    `
  },
  nodejs: {
    title: "Backend Basics with Node.js",
    icon: "fa-brands fa-node",
    body: `
      <p class="text-slate-500">Node.js lets you run JavaScript on a server, so you can build APIs, handle databases, and power full-stack applications.</p>
      <h3>Servers, routes & APIs</h3>
      <p>A <strong>server</strong> listens for requests. A <strong>route</strong> defines what happens at a specific URL. An <strong>API</strong> sends data, not HTML pages.</p>
      <h4>Key concepts</h4>
      <ul>
        <li><strong>HTTP methods</strong> — GET, POST, PUT, DELETE</li>
        <li><strong>JSON</strong> — the standard data format for APIs</li>
        <li><strong>Middleware</strong> — functions that process requests</li>
        <li><strong>npm</strong> — package manager for Node libraries</li>
      </ul>
      <h4>Example</h4>
      <pre class="code-block"><span class="com">// A tiny Express server</span>
<span class="kw">const</span> express = require(<span class="str">"express"</span>);
<span class="kw">const</span> app = express();

app.get(<span class="str">"/api/hello"</span>, (req, res) => {
  res.json({ message: <span class="str">"Hello from the server!"</span> });
});

app.listen(<span class="str">3000</span>, () => {
  <span class="kw">console</span>.log(<span class="str">"Server running on port 3000"</span>);
});</pre>
      <h4>Why it matters</h4>
      <p>Understanding the backend completes your web stack and lets you build complete products from database to browser.</p>
    `
  },
  database: {
    title: "Database Design & SQL",
    icon: "fa-solid fa-database",
    body: `
      <p class="text-slate-500">Databases store application data reliably. SQL is the language used to query, insert, update, and organize that data.</p>
      <h3>Tables, rows & relationships</h3>
      <p>A <strong>table</strong> is like a spreadsheet. Each <strong>row</strong> is one record, and <strong>columns</strong> define the data shape.</p>
      <h4>Core SQL commands</h4>
      <ul>
        <li><strong>SELECT</strong> — read data from a table</li>
        <li><strong>INSERT</strong> — add new records</li>
        <li><strong>UPDATE</strong> — change existing records</li>
        <li><strong>DELETE</strong> — remove records</li>
        <li><strong>JOIN</strong> — combine data from multiple tables</li>
      </ul>
      <h4>Example</h4>
      <pre class="code-block"><span class="com">-- Find all students who completed a course</span>
<span class="kw">SELECT</span> students.name, courses.title
<span class="kw">FROM</span> students
<span class="kw">JOIN</span> enrollments <span class="kw">ON</span> students.id = enrollments.student_id
<span class="kw">JOIN</span> courses <span class="kw">ON</span> courses.id = enrollments.course_id
<span class="kw">WHERE</span> enrollments.status = <span class="str">'completed'</span>;</pre>
      <h4>Why it matters</h4>
      <p>Data is at the heart of every application. Knowing how to model and query databases is essential for backend and full-stack roles.</p>
    `
  }
};

let currentCourse = "html";
function selectCourse(key) { currentCourse = key; renderCourse(key); }

function renderCourse(key) {
  const c = courses[key];
  if (!c) return;
  const container = document.getElementById("courseContent");
  const isDone = state.completedLessons.has(key);
  container.innerHTML = `
    <div class="fade-in lesson">
      <div class="flex items-center gap-3">
        <span class="w-10 h-10 rounded-lg bg-brand-50 text-brand-700 grid place-items-center"><i class="${c.icon}"></i></span>
        <h2 class="text-2xl font-bold text-slate-900">${c.title}</h2>
      </div>
      ${c.body}
      <div class="mt-8 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-6">
        <button onclick="completeLesson('${key}')" ${isDone ? "disabled" : ""} class="inline-flex items-center gap-2 ${isDone ? "bg-green-600" : "bg-brand-600 hover:bg-brand-700"} text-white font-semibold px-5 py-2.5 rounded-lg transition-all duration-300">
          <i class="fa-solid ${isDone ? "fa-check" : "fa-circle-check"}"></i>
          ${isDone ? "Completed" : "Mark Complete & Continue"}
        </button>
        <span class="text-sm text-slate-500">Earns a verified certificate.</span>
      </div>
    </div>
  `;
  document.querySelectorAll(".course-tab").forEach(b => {
    b.classList.toggle("active", b.dataset.course === key);
  });
}

function completeLesson(key) {
  if (state.completedLessons.has(key)) return;
  state.completedLessons.add(key);
  const cert = courses[key].title;
  if (!state.certificates.includes(cert)) state.certificates.push(cert);
  state.progress = Math.min(100, Math.round((state.completedLessons.size / Object.keys(courses).length) * 100));
  toast(`Certificate awarded: ${cert}`);
  renderCourse(key);
  renderDashboard();
}

/* -------- Projects -------- */
const projects = [
  { id: "ecom",  title: "E-Commerce UI Platform", tag: "Web App", members: 4, desc: "Build a modern storefront UI with cart, product cards, and checkout flow." },
  { id: "study", title: "Study Buddy Mobile App", tag: "UX Design", members: 3, desc: "Design and prototype a peer-learning app for university students." },
  { id: "data",  title: "Climate Data Dashboard", tag: "Data Viz", members: 5, desc: "Visualize public climate datasets with interactive charts." },
  { id: "ai",    title: "AI Resume Reviewer", tag: "AI Tooling", members: 2, desc: "Build a client-side tool that gives instant feedback on a resume." },
  { id: "cms",   title: "Community Newsletter CMS", tag: "Full Stack", members: 4, desc: "A lightweight publishing tool for student-run newsletters." },
  { id: "game",  title: "Browser Mini-Game", tag: "Game Dev", members: 3, desc: "Ship a small canvas game in a 2-week sprint." }
];

function renderProjects() {
  const grid = document.getElementById("projectGrid");
  grid.innerHTML = projects.map(p => {
    const joined = state.joinedProjects.has(p.id);
    return `
      <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">${p.tag}</span>
          <span class="text-xs text-slate-500"><i class="fa-solid fa-users"></i> <span id="count-${p.id}">${p.members}</span> joined</span>
        </div>
        <h3 class="mt-3 font-semibold text-slate-900 text-lg">${p.title}</h3>
        <p class="text-sm text-slate-600 mt-2">${p.desc}</p>
        <button onclick="joinProject('${p.id}')" id="btn-${p.id}" class="mt-5 w-full inline-flex items-center justify-center gap-2 ${joined ? "bg-green-600 text-white" : "bg-brand-600 hover:bg-brand-700 text-white"} font-semibold py-2.5 rounded-lg transition-all duration-300">
          <i class="fa-solid ${joined ? "fa-check" : "fa-user-plus"}"></i> ${joined ? "Joined" : "Join Project Team"}
        </button>
      </div>
    `;
  }).join("");
}

function joinProject(id) {
  if (state.joinedProjects.has(id)) return;
  state.joinedProjects.add(id);
  const proj = projects.find(p => p.id === id);
  proj.members += 1;
  document.getElementById("count-" + id).textContent = proj.members;
  const btn = document.getElementById("btn-" + id);
  btn.className = "mt-5 w-full inline-flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-300";
  btn.innerHTML = '<i class="fa-solid fa-check"></i> Joined';
  toast(`You joined ${proj.title}`);
}

/* -------- Portfolio -------- */
function renderPortfolio() {
  const name = state.user?.name || "Future Student";
  document.getElementById("portfolioName").textContent = name;
  document.getElementById("portfolioAvatar").textContent = name.charAt(0).toUpperCase();
  document.getElementById("certPreviewName").textContent = name;
  // skill tags
  document.getElementById("skillTags").innerHTML = state.skills
    .map(s => `<span class="skill-tag"><i class="fa-solid fa-check"></i> ${s}</span>`).join("");
  // certificates
  const list = document.getElementById("certList");
  if (state.certificates.length === 0) {
    list.innerHTML = `<li class="text-sm text-slate-500 italic p-3 rounded-lg bg-slate-50 border border-dashed border-slate-200">No certificates yet — complete a course to earn one.</li>`;
  } else {
    list.innerHTML = state.certificates.map(c => `
      <li class="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
        <span class="flex items-center gap-2 text-slate-700"><i class="fa-solid fa-medal text-brand-600"></i> ${c}</span>
        <button onclick="openCertificate('${c.replace(/'/g, "\\'")}')" class="text-brand-700 text-xs font-semibold hover:underline">View</button>
      </li>
    `).join("");
  }
}

/* -------- Dashboard -------- */
function renderDashboard() {
  const logged = !!state.user;
  document.getElementById("dashboardLocked").classList.toggle("hidden", logged);
  document.getElementById("dashboardContent").classList.toggle("hidden", !logged);
  if (!logged) return;
  document.getElementById("dashName").textContent = state.user.name.split(" ")[0];
  document.getElementById("progressPct").textContent = state.progress;
  document.getElementById("progressBar").style.width = state.progress + "%";
  document.getElementById("certCount").textContent = state.certificates.length;
  // skill matrix
  const matrix = document.getElementById("skillMatrix");
  const a = state.quiz.answers;
  if (a.length === 3) {
    matrix.innerHTML = `
      <div class="flex justify-between"><span>Frontend</span><span class="font-semibold text-brand-700">${a[0]}</span></div>
      <div class="flex justify-between"><span>Design</span><span class="font-semibold text-brand-700">${a[1]}</span></div>
      <div class="flex justify-between"><span>Logic</span><span class="font-semibold text-brand-700">${a[2]}</span></div>
    `;
  }
}

/* -------- Quiz -------- */
const quiz = [
  { q: "How comfortable are you with HTML?", opts: ["Beginner", "Intermediate", "Advanced"] },
  { q: "How would you rate your design eye?", opts: ["Learning", "Confident", "Strong"] },
  { q: "Have you written JavaScript before?", opts: ["Never", "Some", "Often"] }
];

function openQuiz() {
  state.quiz = { step: 0, answers: [] };
  document.getElementById("quizModal").classList.remove("hidden");
  renderQuizStep();
}
function closeQuiz() { document.getElementById("quizModal").classList.add("hidden"); }
function renderQuizStep() {
  const i = state.quiz.step;
  if (i >= quiz.length) {
    document.getElementById("quizBody").innerHTML = `
      <div class="text-center py-4 fade-in">
        <span class="w-14 h-14 rounded-full bg-green-100 text-green-600 grid place-items-center mx-auto text-2xl"><i class="fa-solid fa-check"></i></span>
        <h3 class="mt-3 font-semibold text-slate-900 text-lg">Skill Profile Updated!</h3>
        <p class="text-sm text-slate-500 mt-1">Your dashboard now reflects your new skill matrix.</p>
        <button onclick="finishQuiz()" class="mt-5 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-all duration-300">View Dashboard</button>
      </div>
    `;
    document.getElementById("quizProgress").style.width = "100%";
    return;
  }
  document.getElementById("quizProgress").style.width = ((i / quiz.length) * 100 + 10) + "%";
  const q = quiz[i];
  document.getElementById("quizBody").innerHTML = `
    <div class="fade-in">
      <div class="text-xs font-semibold uppercase tracking-wider text-brand-700">Question ${i + 1} of ${quiz.length}</div>
      <h4 class="mt-2 text-lg font-semibold text-slate-900">${q.q}</h4>
      <div class="mt-4 space-y-2">
        ${q.opts.map(o => `
          <button onclick="answerQuiz('${o}')" class="w-full text-left px-4 py-3 rounded-lg border border-slate-200 hover:border-brand-500 hover:bg-brand-50 transition-all duration-300 font-medium text-slate-800">${o}</button>
        `).join("")}
      </div>
    </div>
  `;
}
function answerQuiz(opt) {
  state.quiz.answers.push(opt);
  state.quiz.step += 1;
  setTimeout(renderQuizStep, 180);
}
function finishQuiz() {
  closeQuiz();
  alert("Skill Profile Updated!");
  renderDashboard();
}

/* -------- Certificate Modal -------- */
function openCertificate(courseTitle) {
  document.getElementById("certName").textContent = state.user?.name || "Future Student";
  document.getElementById("certCourse").textContent = courseTitle;
  const today = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  document.getElementById("certDate").textContent = today;
  document.getElementById("certModal").classList.remove("hidden");
}
function closeCertificate() { document.getElementById("certModal").classList.add("hidden"); }

/* -------- Contact -------- */
function handleContact(e) {
  e.preventDefault();
  e.target.reset();
  toast("Thanks! Your message has been received.");
}

/* -------- Init -------- */
document.addEventListener("DOMContentLoaded", () => {
  // course list click
  document.querySelectorAll(".course-tab").forEach(b => {
    b.addEventListener("click", () => selectCourse(b.dataset.course));
  });
  renderCourse("html");
  renderProjects();
  renderPortfolio();
  renderDashboard();
  showPage("home");
});
