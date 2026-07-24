/* ==========================================================================
   Wahyu's Plan — Notion Style Application Logic
   ========================================================================== */

const STORAGE_KEY_TASKS = "wahyu_plan_tasks_v1";
const STORAGE_KEY_NOTES = "wahyu_plan_notes_v1";
const STORAGE_KEY_THEME = "wahyu_plan_theme_v1";

// Default Starter Data (Laporan PK, Konversi SKS, Technocorner 2026, Robotics)
const DEFAULT_TASKS = [
    {
        id: "task_pk_1",
        title: "Menyelesaikan Laporan PK (Praktik Kerja)",
        category: "Akademik",
        priority: "high",
        status: "inprogress",
        dueDate: "2026-07-31",
        desc: "Penyusunan bab laporan PK, dokumentasi kegiatan industri, dan revisi dosen pembimbing."
    },
    {
        id: "task_pk_2",
        title: "Pengurusan Konversi Matakuliah & SKS PK",
        category: "Akademik",
        priority: "medium",
        status: "todo",
        dueDate: "2026-08-10",
        desc: "Pengajuan berkas konversi nilai, pengakuan SKS kegiatan PK, dan administrasi jurusan."
    },
    {
        id: "task_1",
        title: "Testing Kinematics Sensor Robot Omni Technocorner 2026",
        category: "Technocorner",
        priority: "high",
        status: "inprogress",
        dueDate: "2026-07-28",
        desc: "Verifikasi gerakan motor DC & encoder dengan mikrokontroler STM32."
    },
    {
        id: "task_2",
        title: "Integrasi Telemetry Telegram Bridge ke Antigravity PC",
        category: "Robotics",
        priority: "high",
        status: "done",
        dueDate: "2026-07-24",
        desc: "Bypass CDP raw socket WebSocket & zero-delay mirror response ke Telegram HP."
    },
    {
        id: "task_3",
        title: "Desain UI Web App Dashboard Wahyu's Plan",
        category: "Personal",
        priority: "medium",
        status: "done",
        dueDate: "2026-07-24",
        desc: "Tampilan modern ala Notion dengan glassmorphism dark theme."
    },
    {
        id: "task_4",
        title: "Pengujian Algoritma Navigation Robot Transporter",
        category: "Technocorner",
        priority: "high",
        status: "todo",
        dueDate: "2026-08-05",
        desc: "Simulasi lintasan dan waypoint arena lomba Technocorner 2026."
    }
];

const DEFAULT_NOTES = [
    {
        id: "note_pk",
        icon: "📄",
        title: "Draft & Checklist Laporan PK & Konversi SKS",
        content: `<h1>Target Penyelesaian Laporan PK & Konversi SKS</h1>
<p>Dokumen kerja harian untuk penyusunan laporan Praktik Kerja (PK) dan pengurusan konversi SKS akademik Kak Wahyu.</p>
<blockquote>Fokus Utama: Selesaikan Laporan PK -> Bimbingan -> Pengajuan Konversi SKS</blockquote>

<h2>1. Checklist Laporan PK (Praktik Kerja)</h2>
<ul>
  <li>[x] Pendahuluan & Latar Belakang PK</li>
  <li>[x] Profil Tempat PK & Struktur Organisasi</li>
  <li>[/] Pembahasan Kegiatan & Hasil Implementasi Teknik</li>
  <li>[ ] Kesimpulan & Saran Laporan</li>
  <li>[ ] Lembar Pengesahan Dosen Pembimbing & Lapangan</li>
</ul>

<h2>2. Checklist Konversi Matakuliah & SKS</h2>
<ul>
  <li>[ ] Penyiapan Transkrip Nilai & Form Pengajuan Konversi</li>
  <li>[ ] Pemetaan Matakuliah PK yang Terkonversi</li>
  <li>[ ] Penyerahan Berkas ke Koordinator Akademik Jurusan</li>
</ul>`
    },
    {
        id: "note_1",
        icon: "🤖",
        title: "Spesifikasi Strategi Technocorner 2026",
        content: `<h1>Spesifikasi Strategi Robot Technocorner 2026</h1>
<p>Dokumen rincian strategi dan pengembangan sistem robotik.</p>
<blockquote>Target: Juara 1 Robot Transporter & Omni Navigation!</blockquote>
<h2>1. Hardware Architecture</h2>
<ul>
  <li>Mikrokontroler Utama: STM32F4 / ESP32</li>
  <li>Sensor: Gyro IMU 9-Axis + Rotary Encoder High Res</li>
  <li>Motor Driver: Dual Full-Bridge MOSFET Driver</li>
</ul>
<h2>2. Software & Telemetry</h2>
<p>Monitoring telemetry real-time terhubung ke dashboard web browser dan Telegram HP.</p>`
    },
    {
        id: "note_2",
        icon: "⚡",
        title: "Notion Workflow & Daily Routine",
        content: `<h1>Daily Routine & Productivity System</h1>
<p>Sistem manajemen waktu harian untuk riset robotika & pengembangan software.</p>
<ul>
  <li>Pagi: Review task board & status server</li>
  <li>Siang: Coding & pengujian simulasi robot</li>
  <li>Malam: Audit progress & update Wahyu's Plan</li>
</ul>`
    }
];

// App State
let state = {
    tasks: JSON.parse(localStorage.getItem(STORAGE_KEY_TASKS)) || DEFAULT_TASKS,
    notes: JSON.parse(localStorage.getItem(STORAGE_KEY_NOTES)) || DEFAULT_NOTES,
    currentView: "dashboard",
    activeNoteId: null,
    kanbanFilter: "all"
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initNavigation();
    initKanban();
    initNotesEditor();
    initModals();
    initGlobalSearch();
    initImportExport();
    renderAll();
});

// Save Data
function saveState() {
    localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(state.tasks));
    localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(state.notes));
    renderAll();
}

// Theme Handling
function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) || "dark";
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        document.body.classList.remove("dark-theme");
        document.getElementById("themeToggleBtn").innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
    document.getElementById("themeToggleBtn").addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        document.body.classList.toggle("dark-theme");
        const isLight = document.body.classList.contains("light-theme");
        localStorage.setItem(STORAGE_KEY_THEME, isLight ? "light" : "dark");
        document.getElementById("themeToggleBtn").innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    });
}

// Navigation & Views
function initNavigation() {
    const navItems = document.querySelectorAll(".nav-item[data-view]");
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            const viewName = item.getAttribute("data-view");
            switchView(viewName);
        });
    });

    document.getElementById("navToTodayBtn")?.addEventListener("click", () => switchView("today"));
    document.getElementById("navToNotesBtn")?.addEventListener("click", () => switchView("notes"));

    // Toggle Sidebar Mobile
    document.getElementById("mobileSidebarToggle")?.addEventListener("click", () => {
        document.getElementById("sidebar").classList.toggle("active");
    });
    document.getElementById("toggleSidebarBtn")?.addEventListener("click", () => {
        document.getElementById("sidebar").classList.toggle("collapsed");
    });
}

function switchView(viewName) {
    state.currentView = viewName;
    document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
    document.querySelector(`.nav-item[data-view="${viewName}"]`)?.classList.add("active");

    document.querySelectorAll(".view-panel").forEach(panel => panel.classList.remove("active"));
    const targetPanel = document.getElementById(`view-${viewName}`);
    if (targetPanel) targetPanel.classList.add("active");

    const titles = {
        dashboard: "Dashboard",
        kanban: "Kanban Board Plan",
        notes: "Notes & Docs (Notion Style)",
        today: "Hari Ini & Focus List"
    };
    document.getElementById("pageTitleHeading").textContent = titles[viewName] || "Dashboard";
}

// Render All Views
function renderAll() {
    renderStats();
    renderDashboard();
    renderKanban();
    renderNotesList();
    renderToday();
}

// Stats & Dashboard
function renderStats() {
    const total = state.tasks.length;
    const done = state.tasks.filter(t => t.status === "done").length;
    const inProgress = state.tasks.filter(t => t.status === "inprogress").length;

    document.getElementById("statTotalTasks").textContent = total;
    document.getElementById("statDoneTasks").textContent = done;
    document.getElementById("statInProgressTasks").textContent = inProgress;
}

function renderDashboard() {
    // Today progress
    const todayTasks = state.tasks.filter(t => t.dueDate === new Date().toISOString().split("T")[0] || t.status === "inprogress");
    const container = document.getElementById("dashTodayChecklist");
    if (!container) return;

    const completed = todayTasks.filter(t => t.status === "done").length;
    const pct = todayTasks.length > 0 ? (completed / todayTasks.length) * 100 : 0;
    document.getElementById("todayProgressBar").style.width = `${pct}%`;

    if (todayTasks.length === 0) {
        container.innerHTML = '<li class="checklist-item" style="color:var(--text-dim);">Tidak ada target spesifik untuk hari ini.</li>';
        return;
    }

    container.innerHTML = todayTasks.map(t => `
        <li class="checklist-item ${t.status === 'done' ? 'done' : ''}">
            <input type="checkbox" ${t.status === 'done' ? 'checked' : ''} onchange="toggleTaskDone('${t.id}')">
            <span style="flex:1;">${escapeHtml(t.title)}</span>
            <span class="card-tag priority-${t.priority}">${t.category}</span>
        </li>
    `).join("");

    // Recent Notes
    const notesContainer = document.getElementById("dashRecentNotesList");
    if (notesContainer) {
        notesContainer.innerHTML = state.notes.slice(0, 3).map(n => `
            <div class="note-item" onclick="openNoteFromDash('${n.id}')">
                <span>${n.icon}</span>
                <span style="flex:1; font-weight:600; color:var(--text-main);">${escapeHtml(n.title)}</span>
            </div>
        `).join("");
    }
}

// Kanban Board Rendering & Drag Drop
function initKanban() {
    const filters = document.querySelectorAll("#kanbanTagFilter .chip-btn");
    filters.forEach(btn => {
        btn.addEventListener("click", () => {
            filters.forEach(f => f.classList.remove("active"));
            btn.classList.add("active");
            state.kanbanFilter = btn.getAttribute("data-tag");
            renderKanban();
        });
    });

    document.querySelectorAll(".add-card-col-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const col = btn.getAttribute("data-col");
            openTaskModal(null, col);
        });
    });
}

function renderKanban() {
    const cols = ["todo", "inprogress", "review", "done"];
    cols.forEach(colId => {
        const container = document.getElementById(`col-${colId}-container`);
        if (!container) return;

        let filtered = state.tasks.filter(t => t.status === colId);
        if (state.kanbanFilter !== "all") {
            filtered = filtered.filter(t => t.category.toLowerCase() === state.kanbanFilter.toLowerCase());
        }

        document.getElementById(`count-${colId}`).textContent = filtered.length;

        container.innerHTML = filtered.map(t => `
            <div class="kanban-card" onclick="openTaskModal('${t.id}')">
                <div class="card-tags">
                    <span class="card-tag priority-${t.priority}">${t.priority.toUpperCase()}</span>
                    <span class="card-tag">${escapeHtml(t.category)}</span>
                </div>
                <div class="card-title">${escapeHtml(t.title)}</div>
                ${t.desc ? `<p style="font-size:0.8rem; color:var(--text-muted);">${escapeHtml(t.desc.substring(0, 80))}</p>` : ''}
                <div class="card-footer">
                    <span><i class="fa-regular fa-calendar"></i> ${t.dueDate || 'No Date'}</span>
                    <button class="icon-btn-sm" onclick="event.stopPropagation(); deleteTask('${t.id}')" title="Hapus"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `).join("");
    });
}

// Notion Style Notes Editor
function initNotesEditor() {
    document.getElementById("createNewNoteBtn")?.addEventListener("click", createNewNote);
    document.getElementById("deleteCurrentNoteBtn")?.addEventListener("click", deleteCurrentNote);

    const titleInput = document.getElementById("docTitleInput");
    const editorBody = document.getElementById("notionEditor");

    titleInput?.addEventListener("input", () => {
        if (!state.activeNoteId) return;
        const note = state.notes.find(n => n.id === state.activeNoteId);
        if (note) {
            note.title = titleInput.value;
            saveState();
        }
    });

    editorBody?.addEventListener("input", () => {
        if (!state.activeNoteId) return;
        const note = state.notes.find(n => n.id === state.activeNoteId);
        if (note) {
            note.content = editorBody.innerHTML;
            saveState();
        }
    });

    // Toolbar Buttons
    document.querySelectorAll(".fmt-btn[data-cmd]").forEach(btn => {
        btn.addEventListener("click", () => {
            const cmd = btn.getAttribute("data-cmd");
            const val = btn.getAttribute("data-val") || null;
            document.execCommand(cmd, false, val);
        });
    });
}

function renderNotesList() {
    const container = document.getElementById("notesListContainer");
    if (!container) return;

    if (state.notes.length === 0) {
        container.innerHTML = '<div style="color:var(--text-dim); font-size:0.85rem;">Belum ada dokumen.</div>';
        return;
    }

    if (!state.activeNoteId && state.notes.length > 0) {
        state.activeNoteId = state.notes[0].id;
    }

    container.innerHTML = state.notes.map(n => `
        <div class="note-item ${n.id === state.activeNoteId ? 'active' : ''}" onclick="selectNote('${n.id}')">
            <span>${n.icon}</span>
            <span style="flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${escapeHtml(n.title || 'Dokumen Tanpa Judul')}</span>
        </div>
    `).join("");

    // Load active note into editor
    const activeNote = state.notes.find(n => n.id === state.activeNoteId);
    if (activeNote) {
        document.getElementById("docIconPicker").textContent = activeNote.icon || "📝";
        document.getElementById("docTitleInput").value = activeNote.title || "";
        document.getElementById("notionEditor").innerHTML = activeNote.content || "";
    }
}

function selectNote(id) {
    state.activeNoteId = id;
    renderNotesList();
}

function createNewNote() {
    const newNote = {
        id: "note_" + Date.now(),
        icon: "📄",
        title: "Dokumen Plan Baru",
        content: `<h1>Dokumen Plan Baru</h1><p>Ketik rincian rencana projek atau ide di sini...</p>`
    };
    state.notes.unshift(newNote);
    state.activeNoteId = newNote.id;
    saveState();
}

function deleteCurrentNote() {
    if (!state.activeNoteId) return;
    if (confirm("Apakah Kak Wahyu yakin ingin menghapus dokumen ini?")) {
        state.notes = state.notes.filter(n => n.id !== state.activeNoteId);
        state.activeNoteId = state.notes.length > 0 ? state.notes[0].id : null;
        saveState();
    }
}

function openNoteFromDash(id) {
    switchView("notes");
    selectNote(id);
}

// Today View
function renderToday() {
    const container = document.getElementById("todayChecklistContainer");
    if (!container) return;

    container.innerHTML = state.tasks.map(t => `
        <div class="checklist-item ${t.status === 'done' ? 'done' : ''}">
            <input type="checkbox" ${t.status === 'done' ? 'checked' : ''} onchange="toggleTaskDone('${t.id}')">
            <div style="flex:1;">
                <span style="font-weight:600; display:block;">${escapeHtml(t.title)}</span>
                <span style="font-size:0.75rem; color:var(--text-dim);">${escapeHtml(t.desc || '')}</span>
            </div>
            <span class="card-tag priority-${t.priority}">${t.category}</span>
            <button class="icon-btn-sm" onclick="openTaskModal('${t.id}')"><i class="fa-solid fa-pen"></i></button>
        </div>
    `).join("");
}

function toggleTaskDone(id) {
    const t = state.tasks.find(x => x.id === id);
    if (t) {
        t.status = t.status === "done" ? "inprogress" : "done";
        saveState();
    }
}

function deleteTask(id) {
    if (confirm("Hapus plan ini?")) {
        state.tasks = state.tasks.filter(x => x.id !== id);
        saveState();
    }
}

// Modals Handling
function initModals() {
    document.getElementById("quickCreateTaskBtn")?.addEventListener("click", () => openTaskModal());
    document.getElementById("addTodayTaskBtn")?.addEventListener("click", () => openTaskModal());

    document.querySelectorAll(".closeModalBtn").forEach(btn => {
        btn.addEventListener("click", closeModal);
    });

    document.getElementById("taskForm")?.addEventListener("submit", (e) => {
        e.preventDefault();
        saveTaskFromModal();
    });
}

function openTaskModal(taskId = null, defaultCol = "todo") {
    const modal = document.getElementById("taskModal");
    modal.classList.add("active");

    if (taskId) {
        const t = state.tasks.find(x => x.id === taskId);
        if (t) {
            document.getElementById("modalTaskTitle").textContent = "Edit Plan";
            document.getElementById("taskIdHidden").value = t.id;
            document.getElementById("taskTitleInput").value = t.title;
            document.getElementById("taskCategorySelect").value = t.category;
            document.getElementById("taskPrioritySelect").value = t.priority;
            document.getElementById("taskStatusSelect").value = t.status;
            document.getElementById("taskDueDateInput").value = t.dueDate || "";
            document.getElementById("taskDescInput").value = t.desc || "";
        }
    } else {
        document.getElementById("modalTaskTitle").textContent = "Buat Plan Baru";
        document.getElementById("taskIdHidden").value = "";
        document.getElementById("taskTitleInput").value = "";
        document.getElementById("taskCategorySelect").value = "Technocorner";
        document.getElementById("taskPrioritySelect").value = "medium";
        document.getElementById("taskStatusSelect").value = defaultCol;
        document.getElementById("taskDueDateInput").value = new Date().toISOString().split("T")[0];
        document.getElementById("taskDescInput").value = "";
    }
}

function closeModal() {
    document.getElementById("taskModal")?.classList.remove("active");
}

function saveTaskFromModal() {
    const hiddenId = document.getElementById("taskIdHidden").value;
    const title = document.getElementById("taskTitleInput").value;
    const category = document.getElementById("taskCategorySelect").value;
    const priority = document.getElementById("taskPrioritySelect").value;
    const status = document.getElementById("taskStatusSelect").value;
    const dueDate = document.getElementById("taskDueDateInput").value;
    const desc = document.getElementById("taskDescInput").value;

    if (hiddenId) {
        const t = state.tasks.find(x => x.id === hiddenId);
        if (t) {
            t.title = title;
            t.category = category;
            t.priority = priority;
            t.status = status;
            t.dueDate = dueDate;
            t.desc = desc;
        }
    } else {
        const newTask = {
            id: "task_" + Date.now(),
            title, category, priority, status, dueDate, desc
        };
        state.tasks.unshift(newTask);
    }

    closeModal();
    saveState();
}

// Global Search
function initGlobalSearch() {
    const input = document.getElementById("globalSearchInput");
    input?.addEventListener("input", () => {
        const query = input.value.toLowerCase().trim();
        if (!query) {
            renderAll();
            return;
        }

        // Filter Kanban cards matching query
        document.querySelectorAll(".kanban-card").forEach(card => {
            const txt = card.textContent.toLowerCase();
            card.style.display = txt.includes(query) ? "flex" : "none";
        });
    });
}

// Export & Import Backup
function initImportExport() {
    document.getElementById("exportDataBtn")?.addEventListener("click", () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
        const a = document.createElement("a");
        a.setAttribute("href", dataStr);
        a.setAttribute("download", `Wahyus_Plan_Backup_${new Date().toISOString().split("T")[0]}.json`);
        document.body.appendChild(a);
        a.click();
        a.remove();
    });

    const fileInput = document.getElementById("importFileInput");
    document.getElementById("importDataBtn")?.addEventListener("click", () => fileInput.click());

    fileInput?.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const imported = JSON.parse(event.target.result);
                if (imported.tasks && imported.notes) {
                    state.tasks = imported.tasks;
                    state.notes = imported.notes;
                    saveState();
                    alert("Import backup Wahyu's Plan berhasil!");
                }
            } catch (err) {
                alert("Format file backup JSON tidak valid!");
            }
        };
        reader.readAsText(file);
    });
}

function escapeHtml(str) {
    return (str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
