import * as vscode from 'vscode';

interface Student {
  id: number;
  name: string;
  className: string;
  attendance: number;
  progress: number;
  status: 'On Track' | 'Needs Help' | 'At Risk';
}

interface Assignment {
  id: number;
  title: string;
  subject: string;
  due: string;
  completed: number;
  total: number;
}

interface Announcement {
  id: number;
  title: string;
  detail: string;
  level: 'Info' | 'Warning' | 'Critical';
}

class LiveSchoolPanel {
  public static currentPanel: LiveSchoolPanel | undefined;

  private readonly panel: vscode.WebviewPanel;
  private readonly extensionUri: vscode.Uri;

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this.panel = panel;
    this.extensionUri = extensionUri;

    this.panel.webview.html = this.getHtml();

    this.panel.onDidDispose(() => {
      LiveSchoolPanel.currentPanel = undefined;
    }, null);
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    if (LiveSchoolPanel.currentPanel) {
      LiveSchoolPanel.currentPanel.panel.reveal(column);
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      'liveSchoolSystem',
      'Live School System',
      { viewColumn: column ?? vscode.ViewColumn.One, preserveFocus: false },
      {
        enableScripts: true,
        localResourceRoots: []
      }
    );

    LiveSchoolPanel.currentPanel = new LiveSchoolPanel(panel, extensionUri);
  }

  private getHtml(): string {
    const data = {
      overview: {
        onlineTeachers: 24,
        activeStudents: 432,
        classesRunning: 18,
        alerts: 3,
        attendanceRate: 96,
        satisfaction: 91
      },
      students: [
        { id: 1, name: 'Amina Yusuf', className: 'Grade 9-A', attendance: 98, progress: 88, status: 'On Track' },
        { id: 2, name: 'David Mensah', className: 'Grade 8-C', attendance: 91, progress: 72, status: 'On Track' },
        { id: 3, name: 'Grace Okafor', className: 'Grade 10-B', attendance: 87, progress: 64, status: 'Needs Help' },
        { id: 4, name: 'Kofi Boateng', className: 'Grade 12-A', attendance: 94, progress: 90, status: 'On Track' },
        { id: 5, name: 'Sarah Tetteh', className: 'Grade 11-C', attendance: 82, progress: 58, status: 'At Risk' },
        { id: 6, name: 'Emmanuel Adjei', className: 'Grade 9-D', attendance: 96, progress: 83, status: 'On Track' }
      ] as Student[],
      assignments: [
        { id: 1, title: 'Biology Lab Report', subject: 'Science', due: 'Today, 5:00 PM', completed: 38, total: 48 },
        { id: 2, title: 'Algebra Quiz Review', subject: 'Mathematics', due: 'Tomorrow, 9:00 AM', completed: 25, total: 32 },
        { id: 3, title: 'Essay Draft', subject: 'English', due: 'Wed, 3:00 PM', completed: 18, total: 27 },
        { id: 4, title: 'World History Notes', subject: 'History', due: 'Thu, 11:00 AM', completed: 33, total: 40 }
      ] as Assignment[],
      announcements: [
        { id: 1, title: 'School Assembly', detail: 'Senior assembly begins at 9:15 AM in the main hall.', level: 'Info' },
        { id: 2, title: 'Science Lab Maintenance', detail: 'Room B-12 will be closed for equipment checks after lunch.', level: 'Warning' },
        { id: 3, title: 'Weather Alert', detail: 'Heavy rainfall may affect school transport after 3:00 PM.', level: 'Critical' }
      ] as Announcement[],
      schedule: [
        { time: '08:00', subject: 'Assembly', room: 'Hall A', status: 'Upcoming' },
        { time: '09:00', subject: 'Mathematics', room: 'Room 4', status: 'Live' },
        { time: '10:30', subject: 'Biology', room: 'Lab 2', status: 'Live' },
        { time: '12:00', subject: 'Lunch', room: 'Cafeteria', status: 'Pending' }
      ]
    };

    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Live School System</title>
        <style>
          :root {
            --bg: #0f172a;
            --panel: #111827;
            --card: #1f2937;
            --soft: #374151;
            --text: #e5e7eb;
            --muted: #9ca3af;
            --primary: #38bdf8;
            --secondary: #34d399;
            --warning: #fbbf24;
            --danger: #f87171;
            --purple: #a78bfa;
          }

          * { box-sizing: border-box; }

          body {
            margin: 0;
            font-family: Segoe UI, sans-serif;
            background: linear-gradient(135deg, #0f172a, #111827);
            color: var(--text);
          }

          .app {
            padding: 24px;
          }

          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 12px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.18);
          }

          .title-group h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
          }

          .title-group p {
            margin: 4px 0 0;
            color: var(--muted);
          }

          .live-pill {
            background: rgba(52, 211, 153, 0.16);
            color: #bbf7d0;
            border: 1px solid rgba(52, 211, 153, 0.4);
            border-radius: 999px;
            padding: 8px 12px;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(6, minmax(120px, 1fr));
            gap: 16px;
            margin-bottom: 22px;
          }

          .stat-card {
            background: rgba(17, 24, 39, 0.8);
            border: 1px solid rgba(148, 163, 184, 0.15);
            border-radius: 16px;
            padding: 18px;
            box-shadow: 0 6px 18px rgba(15, 23, 42, 0.18);
          }

          .stat-label {
            font-size: 12px;
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 0.06em;
          }

          .stat-value {
            margin-top: 10px;
            font-size: 28px;
            font-weight: 700;
          }

          .stat-trend {
            margin-top: 6px;
            color: var(--secondary);
            font-size: 12px;
          }

          .main-grid {
            display: grid;
            grid-template-columns: 1.8fr 1fr;
            gap: 18px;
          }

          .panel {
            background: rgba(17, 24, 39, 0.8);
            border: 1px solid rgba(148, 163, 184, 0.15);
            border-radius: 18px;
            padding: 18px;
          }

          .panel-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
          }

          .panel-header h2 {
            margin: 0;
            font-size: 19px;
          }

          .subtle {
            color: var(--muted);
            font-size: 12px;
          }

          .schedule-list,
          .student-list,
          .assignment-list,
          .announcement-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .schedule-item,
          .student-row,
          .assignment-row,
          .announcement-item {
            background: rgba(31, 41, 55, 0.85);
            border: 1px solid rgba(148, 163, 184, 0.1);
            border-radius: 12px;
            padding: 12px 14px;
          }

          .schedule-item {
            display: grid;
            grid-template-columns: 90px 1.2fr 1fr 110px;
            gap: 12px;
            align-items: center;
          }

          .time {
            font-weight: 700;
            color: var(--primary);
          }

          .status-tag {
            justify-self: end;
            border-radius: 999px;
            padding: 6px 10px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
          }

          .status-live { background: rgba(34, 197, 94, 0.12); color: #bbf7d0; }
          .status-upcoming { background: rgba(59, 130, 246, 0.12); color: #bfdbfe; }
          .status-pending { background: rgba(148, 163, 184, 0.12); color: #e2e8f0; }

          .student-row {
            display: grid;
            grid-template-columns: 1.5fr 1fr 0.8fr 0.8fr;
            gap: 10px;
            align-items: center;
          }

          .student-name {
            font-weight: 600;
          }

          .meta {
            color: var(--muted);
            font-size: 12px;
          }

          .mini-progress {
            width: 100%;
            height: 8px;
            background: rgba(148, 163, 184, 0.18);
            border-radius: 999px;
            overflow: hidden;
          }

          .mini-progress > span {
            display: block;
            height: 100%;
            border-radius: inherit;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
          }

          .status-pill {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 600;
            padding: 6px 10px;
          }

          .status-ontrack { background: rgba(52, 211, 153, 0.12); color: #bbf7d0; }
          .status-needshelp { background: rgba(245, 158, 11, 0.12); color: #fcd34d; }
          .status-atrisk { background: rgba(248, 113, 113, 0.12); color: #fca5a5; }

          .assignment-row {
            display: grid;
            grid-template-columns: 1.2fr 1fr 0.9fr;
            gap: 12px;
            align-items: center;
          }

          .count {
            color: var(--muted);
            font-size: 12px;
          }

          .announcement-item {
            border-left: 4px solid var(--primary);
          }

          .announcement-item.warning { border-left-color: var(--warning); }
          .announcement-item.critical { border-left-color: var(--danger); }

          .alert-badge {
            display: inline-block;
            margin-top: 8px;
            border-radius: 8px;
            font-size: 10px;
            padding: 5px 8px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-weight: 700;
          }

          .alert-info { background: rgba(59,130,246,0.16); color: #bfdbfe; }
          .alert-warning { background: rgba(245,158,11,0.16); color: #fde68a; }
          .alert-critical { background: rgba(239,68,68,0.16); color: #fecaca; }

          .right-column {
            display: flex;
            flex-direction: column;
            gap: 18px;
          }

          .attendance-box {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 170px;
            background: radial-gradient(circle at center, rgba(59,130,246,0.18), rgba(17,24,39,0.7) 55%);
            border: 1px solid rgba(59,130,246,0.24);
            border-radius: 16px;
            padding: 18px;
          }

          .ring {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: conic-gradient(var(--primary) 0 96%, rgba(148, 163, 184, 0.17) 96% 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
          }

          .ring::before {
            content: "";
            position: absolute;
            inset: 12px;
            border-radius: 50%;
            background: rgba(17,24,39,0.95);
          }

          .ring-value {
            position: relative;
            z-index: 1;
            font-size: 26px;
            font-weight: 700;
          }

          .donut-label {
            margin-top: 10px;
            text-align: center;
            color: var(--muted);
          }

          @media (max-width: 1100px) {
            .stats-grid { grid-template-columns: repeat(3, minmax(120px, 1fr)); }
            .main-grid { grid-template-columns: 1fr; }
          }

          @media (max-width: 700px) {
            .stats-grid { grid-template-columns: repeat(2, minmax(120px, 1fr)); }
            .schedule-item { grid-template-columns: 1fr; }
            .student-row { grid-template-columns: 1fr; }
            .assignment-row { grid-template-columns: 1fr; }
          }
        </style>
      </head>
      <body>
        <div class="app">
          <div class="header">
            <div class="title-group">
              <h1>School Operations</h1>
              <p>Live campus control center</p>
            </div>
            <div class="live-pill">System Live</div>
          </div>

          <div class="stats-grid" id="statsGrid"></div>

          <div class="main-grid">
            <div class="panel">
              <div class="panel-header">
                <h2>Class Schedule</h2>
                <span class="subtle">Updated 2 mins ago</span>
              </div>
              <div class="schedule-list" id="scheduleList"></div>
            </div>

            <div class="right-column">
              <div class="panel">
                <div class="panel-header">
                  <h2>Attendance</h2>
                </div>
                <div class="attendance-box">
                  <div>
                    <div class="ring"><span class="ring-value">96%</span></div>
                    <div class="donut-label">Average attendance</div>
                  </div>
                </div>
              </div>

              <div class="panel">
                <div class="panel-header">
                  <h2>Announcements</h2>
                </div>
                <div class="announcement-list" id="announcementList"></div>
              </div>
            </div>
          </div>

          <div class="main-grid" style="margin-top: 18px;">
            <div class="panel">
              <div class="panel-header">
                <h2>Student Progress</h2>
                <span class="subtle">Across all grades</span>
              </div>
              <div class="student-list" id="studentList"></div>
            </div>

            <div class="panel">
              <div class="panel-header">
                <h2>Assignments</h2>
                <span class="subtle">Due this week</span>
              </div>
              <div class="assignment-list" id="assignmentList"></div>
            </div>
          </div>
        </div>

        <script>
          const stats = ${JSON.stringify(data.overview)};
          const schedule = ${JSON.stringify(data.schedule)};
          const students = ${JSON.stringify(data.students)};
          const assignments = ${JSON.stringify(data.assignments)};
          const announcements = ${JSON.stringify(data.announcements)};

          const statConfig = [
            { label: 'Teachers Online', value: stats.onlineTeachers, trend: '+4%' },
            { label: 'Active Students', value: stats.activeStudents, trend: '+12%' },
            { label: 'Classes Running', value: stats.classesRunning, trend: '+3%' },
            { label: 'Open Alerts', value: stats.alerts, trend: '-2%' },
            { label: 'Attendance', value: stats.attendanceRate + '%', trend: '+1.2%' },
            { label: 'Satisfaction', value: stats.satisfaction + '%', trend: '+6%' }
          ];

          function renderStats() {
            const statsGrid = document.getElementById('statsGrid');
            statsGrid.innerHTML = statConfig.map(item => `
              <div class="stat-card">
                <div class="stat-label">${item.label}</div>
                <div class="stat-value">${item.value}</div>
                <div class="stat-trend">${item.trend} vs yesterday</div>
              </div>
            `).join('');
          }

          function renderSchedule() {
            const el = document.getElementById('scheduleList');
            el.innerHTML = schedule.map(item => `
              <div class="schedule-item">
                <div class="time">${item.time}</div>
                <div>
                  <strong>${item.subject}</strong>
                  <div class="meta">Room ${item.room}</div>
                </div>
                <div class="meta">On-site</div>
                <div class="status-tag ${item.status === 'Live' ? 'status-live' : item.status === 'Upcoming' ? 'status-upcoming' : 'status-pending'}">${item.status}</div>
              </div>
            `).join('');
          }

          function renderStudents() {
            const el = document.getElementById('studentList');
            el.innerHTML = students.map(student => {
              const statusClass = student.status === 'On Track' ? 'status-ontrack' : student.status === 'Needs Help' ? 'status-needshelp' : 'status-atrisk';
              return `
                <div class="student-row">
                  <div>
                    <div class="student-name">${student.name}</div>
                    <div class="meta">${student.className}</div>
                  </div>
                  <div>
                    <div class="meta">Attendance</div>
                    <div><strong>${student.attendance}%</strong></div>
                  </div>
                  <div>
                    <div class="meta">Progress</div>
                    <div class="mini-progress"><span style="width:${student.progress}%"></span></div>
                  </div>
                  <div class="status-pill ${statusClass}">${student.status}</div>
                </div>
              `;
            }).join('');
          }

          function renderAssignments() {
            const el = document.getElementById('assignmentList');
            el.innerHTML = assignments.map(item => `
              <div class="assignment-row">
                <div>
                  <strong>${item.title}</strong>
                  <div class="meta">${item.subject}</div>
                </div>
                <div>
                  <div class="count">Due: ${item.due}</div>
                  <div class="mini-progress"><span style="width:${(item.completed / item.total) * 100}%"></span></div>
                </div>
                <div class="count">${item.completed}/${item.total} complete</div>
              </div>
            `).join('');
          }

          function renderAnnouncements() {
            const el = document.getElementById('announcementList');
            el.innerHTML = announcements.map(item => {
              const levelClass = item.level === 'Info' ? 'alert-info' : item.level === 'Warning' ? 'alert-warning' : 'alert-critical';
              const cardClass = item.level === 'Info' ? '' : item.level === 'Warning' ? 'warning' : 'critical';
              return `
                <div class="announcement-item ${cardClass}">
                  <strong>${item.title}</strong>
                  <div class="meta">${item.detail}</div>
                  <span class="alert-badge ${levelClass}">${item.level}</span>
                </div>
              `;
            }).join('');
          }

          renderStats();
          renderSchedule();
          renderStudents();
          renderAssignments();
          renderAnnouncements();

          setInterval(() => {
            const randomStudent = students[Math.floor(Math.random() * students.length)];
            randomStudent.attendance = Math.max(72, Math.min(99, randomStudent.attendance + (Math.random() > 0.5 ? 1 : -1)));
            randomStudent.progress = Math.max(45, Math.min(96, randomStudent.progress + (Math.random() > 0.5 ? 2 : -2)));
            renderStudents();
          }, 3000);
        </script>
      </body>
      </html>`;
  }
}

export function activate(context: vscode.ExtensionContext) {
  const command = vscode.commands.registerCommand('liveSchoolSystem.openDashboard', () => {
    LiveSchoolPanel.createOrShow(context.extensionUri);
  });

  context.subscriptions.push(command);

  vscode.window.setStatusBarMessage('Live School System activated', 2500);
}

export function deactivate() {
  // no-op
}


































































































































































