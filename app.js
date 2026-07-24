/* ==========================================================================
   Wahyu's Plan — Notion Style Application Logic with Private Login Gate
   ========================================================================== */

const STORAGE_KEY_TASKS = "wahyu_plan_tasks_v1";
const STORAGE_KEY_NOTES = "wahyu_plan_notes_v1";
const STORAGE_KEY_THEME = "wahyu_plan_theme_v1";
const STORAGE_KEY_AUTH = "wahyu_plan_user_email";

const TARGET_EMAIL = "handoyotriwahyu@gmail.com";

// Actual Starter Data for Kak Wahyu
const DEFAULT_TASKS = [
    {
        id: "task_rpl_untan_upload",
        title: "Upload Berkas RPL Lomba Esai UNTAN 2025 ke PDPT UNY",
        category: "Akademik",
        priority: "high",
        status: "todo",
        dueDate: "2026-07-28",
        desc: "Unggah 4 berkas PDF (< 1MB) Juara 1 Gebyar HIMEPA XXXI FEB UNTAN (TRASHURE-SPHERE) untuk konversi Penilaian Pembelajaran Vokasional."
    },
    {
        id: "task_rpl_inesco_upload",
        title: "Upload Berkas RPL Lomba Essay INESCO UMP 2025 ke PDPT UNY",
        category: "Akademik",
        priority: "high",
        status: "todo",
        dueDate: "2026-07-28",
        desc: "Unggah 4 berkas PDF (< 1MB) Juara 1 INESCO UMP 2025 (SEACIRCLE) untuk konversi Ergonomika Industri."
    },
    {
        id: "task_rpl_panco_upload",
        title: "Upload Berkas RPL Lomba PANCO FISIP UNY 2025 ke PDPT UNY",
        category: "Akademik",
        priority: "high",
        status: "todo",
        dueDate: "2026-07-28",
        desc: "Unggah 4 berkas PDF (< 1MB) Juara 2 PANCO FISIP UNY 2025 (SEAWARE) untuk konversi Kecerdasan Buatan."
    },
    {
        id: "task_siakad_pem_techno",
        title: "Input Sertifikat Transporter Technocorner UGM 2026 ke SIAKAD PEM",
        category: "Akademik",
        priority: "medium",
        status: "todo",
        dueDate: "2026-08-05",
        desc: "Input sertifikat Peserta Transporter Technocorner UGM 2026 (KMTETI UGM, 27 Juni 2026) untuk memperoleh poin ekstra-kurikuler."
    },
    {
        id: "task_skripsi_drafting",
        title: "Drafting Bab IV & V Skripsi (Hasil & Pembahasan)",
        category: "Robotics",
        priority: "high",
        status: "inprogress",
        dueDate: "2026-08-15",
        desc: "Penyusunan analisis data, implementasi robot transporter, dan hasil pengujian lapangan skripsi."
    },
    {
        id: "task_disk_cleanup_zoom",
        title: "Pindahkan/Hapus Rekaman ZOOM Pembelajaran Mikro (Disk Space)",
        category: "General",
        priority: "low",
        status: "todo",
        dueDate: "2026-08-02",
        desc: "Kosongkan ruang disk dari file rekaman Zoom kuliah Pembelajaran Mikro di Semester 6 (~600MB)."
    },
    {
        id: "task_siakad_inesco_check",
        title: "Cek Status Sinkronisasi RPL INESCO 2025 di SIPRES SIAKAD",
        category: "Akademik",
        priority: "low",
        status: "inprogress",
        dueDate: "2026-07-25",
        desc: "Verifikasi status persetujuan ekuivalensi INESCO (status sebelumnya: Diterima di SIPRES)."
    },
    {
        id: "task_done_dhs_khs",
        title: "Organisasi & Rename File DHS & KHS Semester 1 s.d. 8",
        category: "Akademik",
        priority: "medium",
        status: "done",
        dueDate: "2026-07-21",
        desc: "Semua KHS dan DHS telah dikelompokkan ke folder DHS & KHS dengan penamaan rapi dan ukuran PDF di bawah 1MB."
    },
    {
        id: "task_done_rpl_untan_prep",
        title: "Organisasi Berkas Ekuivalensi RPL UNTAN 2025 (Juara 1)",
        category: "Akademik",
        priority: "medium",
        status: "done",
        dueDate: "2026-07-22",
        desc: "Penyusunan berkas Word & PDF Laporan Kegiatan, Surat Tugas, Sertifikat, dan Foto Bukti di folder FIX Juara 1 Lomba Esai UNTAN 2025."
    },
    {
        id: "task_done_rpl_inesco_prep",
        title: "Organisasi Berkas Ekuivalensi RPL INESCO UMP 2025 (Juara 1)",
        category: "Akademik",
        priority: "medium",
        status: "done",
        dueDate: "2026-07-22",
        desc: "Penyusunan berkas Word & PDF Laporan Kegiatan, Surat Tugas, Sertifikat, dan Foto Bukti di folder FIX Juara 1 Lomba Essay INESCO UMP 2025."
    },
    {
        id: "task_done_rpl_panco_prep",
        title: "Organisasi Berkas Ekuivalensi RPL PANCO FISIP UNY 2025 (Juara 2)",
        category: "Akademik",
        priority: "medium",
        status: "done",
        dueDate: "2026-07-22",
        desc: "Penyusunan berkas Word & PDF Laporan Kegiatan, Surat Tugas, Sertifikat, dan Foto Bukti di folder FIX Juara 2 Lomba PANCO FISIP UNY 2025."
    }
];

const DEFAULT_NOTES = [
    {
        id: "note_capstone_summary",
        icon: "🎓",
        title: "Jurnal Pembelajaran Capstone & Portfolio Skill",
        content: `<h1>Jurnal Pembelajaran Capstone & Experiential Learning Kak Wahyu</h1>
<p>Rangkuman domain keahlian dan proyek yang telah diselesaikan selama perkuliahan dan riset mandiri:</p>

<h2>1. Embedded Robotics & Hardware Control</h2>
<ul>
  <li><strong>Robot Transporter Technocorner 2026:</strong> Implementasi sistem mikrokontroler STM32/ESP32, sensor IMU 9-axis, rotary encoder high resolution, dan motor driver MOSFET.</li>
  <li><strong>Kinematika Robot Omni:</strong> Pemrograman matriks pergerakan roda omni-directional untuk manuver cepat dan presisi di arena perlombaan.</li>
</ul>

<h2>2. Telemetry, CDP WebSocket & Automation</h2>
<ul>
  <li><strong>Chrome DevTools Protocol (CDP) Bridge:</strong> Komunikasi tingkat rendah berbasis WebSocket tanpa dependensi Selenium/Puppeteer.</li>
  <li><strong>Telegram Mirroring Bot:</strong> Notifikasi real-time ke perangkat HP untuk kontrol jarak jauh dan pemantauan status tugas.</li>
</ul>

<h2>3. Administrasi Akademik & Ekuivalensi RPL</h2>
<ul>
  <li><strong>Konversi Matakuliah SKS:</strong> Penyusunan berkas ekuivalensi prestasi Lomba Esai UNTAN 2025 (Vokasional), INESCO UMP 2025 (Ergonomi), dan PANCO FISIP UNY 2025 (AI).</li>
  <li><strong>Pengelolaan Berkas DHS/KHS:</strong> Kompresi & penataan 12+ berkas PDF sesuai standar ukuran portal PDPT UNY (&lt; 1000 KB).</li>
</ul>`
    },
    {
        id: "note_rpl_links",
        icon: "🔗",
        title: "Daftar Link Dokumentasi Instagram Prestasi Lomba",
        content: `<h1>Link Dokumentasi Resmi Instagram</h1>
<p>Berikut adalah tautan publikasi resmi panitia lomba di Instagram yang digunakan sebagai dokumen pendukung ekuivalensi RPL:</p>
<ul>
  <li><strong>Juara 1 Lomba Essay INESCO UMP 2025:</strong><br><a href="https://www.instagram.com/p/DTAPSM_CUQW/" target="_blank">https://www.instagram.com/p/DTAPSM_CUQW/</a></li>
  <li><strong>Juara 2 Lomba PANCO FISIP UNY 2025:</strong><br><a href="https://www.instagram.com/p/DL6251vSzCx/?img_index=3" target="_blank">https://www.instagram.com/p/DL6251vSzCx/?img_index=3</a></li>
  <li><strong>Juara 1 Lomba Esai Nasional UNTAN 2025:</strong><br><a href="https://www.instagram.com/p/DJO03qcpuaf/?img_index=2" target="_blank">https://www.instagram.com/p/DJO03qcpuaf/?img_index=2</a></li>
</ul>
<p>Catatan: Screenshot postingan Instagram ini sudah dikompresi di bawah 1MB dan tersimpan di folder masing-masing dengan nama <code>4_Dokumen_Pendukung_Lain.pdf</code>.</p>`
    },
    {
        id: "note_rpl_mapping",
        icon: "📋",
        title: "Pemetaan Konversi RPL Nilai SKS",
        content: `<h1>Pemetaan Konversi Nilai RPL Prestasi Akademik</h1>
<p>Rincian ekuivalensi prestasi lomba ke mata kuliah target:</p>
<ol>
  <li><strong>Juara 1 Lomba Esai Nasional Gebyar HIMEPA XXXI FEB UNTAN 2025</strong>
    <ul>
      <li>Inovasi: <em>TRASHURE-SPHERE</em></li>
      <li>Mata Kuliah Target: <strong>Penilaian Pembelajaran Vokasional</strong> (Mengubah Nilai C menjadi A)</li>
    </ul>
  </li>
  <li><strong>Juara 1 Lomba Essay Ilmiah INESCO ACC OF UMP 2025 VOL 2.0</strong>
    <ul>
      <li>Inovasi: <em>SEACIRCLE</em></li>
      <li>Mata Kuliah Target: <strong>Ergonomika Industri</strong> (Mengubah Nilai C menjadi A)</li>
    </ul>
  </li>
  <li><strong>Juara 2 Public Administration Competition (PANCO) FISIP UNY 2025</strong>
    <ul>
      <li>Inovasi: <em>SEAWARE</em></li>
      <li>Mata Kuliah Target: <strong>Kecerdasan Buatan</strong> (Mengubah Nilai B- menjadi A/A-)</li>
    </ul>
  </li>
</ol>
<p>Status: Laporan Kegiatan, Surat Tugas, Sertifikat, dan Dokumen Pendukung lainnya sudah 100% lengkap dan siap upload.</p>`
    }
];

// App State
let state = {
    tasks: JSON.parse(localStorage.getItem(STORAGE_KEY_TASKS)) || DEFAULT_TASKS,
    notes: JSON.parse(localStorage.getItem(STORAGE_KEY_NOTES)) || DEFAULT_NOTES,
    currentView: "dashboard",
    activeNoteId: null,
    kanbanFilter: "all",
    isAuthenticated: false
};

let currentUserEmail = null;

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initAuth();
    initNavigation();
    initKanban();
    initNotesEditor();
    initModals();
    initGlobalSearch();
    initImportExport();
});

// Save Data
function saveState() {
    localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(state.tasks));
    localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(state.notes));
    renderAll();
}

// Google Authentication & Private Lock Gate Logic
function initAuth() {
    const savedEmail = sessionStorage.getItem(STORAGE_KEY_AUTH) || localStorage.getItem(STORAGE_KEY_AUTH);
    if (savedEmail === TARGET_EMAIL) {
        currentUserEmail = savedEmail;
        showAppWorkspace(savedEmail);
    } else {
        showLoginGate();
    }

    document.getElementById("btn-logout")?.addEventListener("click", handleLogout);
    
    // Direct Login Fallback Button for Kak Wahyu
    document.getElementById("directLoginBtn")?.addEventListener("click", () => {
        currentUserEmail = TARGET_EMAIL;
        sessionStorage.setItem(STORAGE_KEY_AUTH, TARGET_EMAIL);
        localStorage.setItem(STORAGE_KEY_AUTH, TARGET_EMAIL);
        showAppWorkspace(TARGET_EMAIL);
    });
}

function showLoginGate(errorMsg = null) {
    state.isAuthenticated = false;
    document.getElementById("login-gate").style.display = "flex";
    document.getElementById("app").style.display = "none";

    const alertBox = document.getElementById("gate-error-alert");
    if (errorMsg) {
        alertBox.classList.remove("hidden");
        document.getElementById("gate-error-msg").textContent = errorMsg;
    } else {
        alertBox.classList.add("hidden");
    }
}

function showAppWorkspace(email, payload = null) {
    state.isAuthenticated = true;
    document.getElementById("login-gate").style.display = "none";
    document.getElementById("app").style.display = "flex";

    const avatarImg = document.getElementById("user-avatar");
    const emailSpan = document.getElementById("user-email");

    if (avatarImg) {
        avatarImg.src = payload && payload.picture ? payload.picture : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
    }
    if (emailSpan) {
        emailSpan.textContent = email;
    }

    renderAll();
}

window.handleCredentialResponse = function(response) {
    try {
        const responsePayload = decodeJwtResponse(response.credential);
        const email = responsePayload.email;

        if (email === TARGET_EMAIL) {
            currentUserEmail = email;
            sessionStorage.setItem(STORAGE_KEY_AUTH, email);
            localStorage.setItem(STORAGE_KEY_AUTH, email);
            showAppWorkspace(email, responsePayload);
        } else {
            showLoginGate(`Akses Ditolak! Akun ${email} tidak memiliki izin. Hanya handoyotriwahyu@gmail.com yang diizinkan.`);
        }
    } catch (e) {
        console.error("JWT decoding error:", e);
        showLoginGate("Gagal memproses login Google. Silakan coba lagi.");
    }
};

function handleLogout() {
    currentUserEmail = null;
    sessionStorage.removeItem(STORAGE_KEY_AUTH);
    localStorage.removeItem(STORAGE_KEY_AUTH);
    showLoginGate();
}

function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
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
    
    // Notes Back Button in Mobile view
    document.getElementById("mobileBackToNotesListBtn")?.addEventListener("click", () => {
        document.getElementById("notesSidebar").classList.remove("hidden-mobile");
        document.getElementById("editorContainer").classList.remove("active-mobile");
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
        today: "Hari Ini & Focus List",
        capstone: "Capstone & Learning Investment"
    };
    document.getElementById("pageTitleHeading").textContent = titles[viewName] || "Dashboard";
    
    if (viewName !== "notes") {
        document.getElementById("notesSidebar")?.classList.remove("hidden-mobile");
        document.getElementById("editorContainer")?.classList.remove("active-mobile");
    }
}

// Render All Views
function renderAll() {
    if (!state.isAuthenticated) return;
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
    const todayTasks = state.tasks.filter(t => t.status === "inprogress" || t.status === "todo").slice(0, 5);
    const container = document.getElementById("dashTodayChecklist");
    if (!container) return;

    const completed = state.tasks.filter(t => t.status === "done").length;
    const pct = state.tasks.length > 0 ? (completed / state.tasks.length) * 100 : 0;
    document.getElementById("todayProgressBar").style.width = `${pct}%`;

    if (todayTasks.length === 0) {
        container.innerHTML = '<li class="checklist-item" style="color:var(--text-dim);">Tidak ada target berjalan hari ini.</li>';
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

// Kanban Board Rendering
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

// Notes Editor
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
        container.innerHTML = '<div style="color:var(--text-dim); font-size:0.85rem; padding: 10px;">Belum ada dokumen.</div>';
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
    
    // Mobile navigation view swap
    if (window.innerWidth <= 768) {
        document.getElementById("notesSidebar")?.classList.add("hidden-mobile");
        document.getElementById("editorContainer")?.classList.add("active-mobile");
    }
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
