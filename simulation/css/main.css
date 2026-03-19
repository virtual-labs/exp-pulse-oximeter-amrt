/* =========================================
   Pulse Oximeter Virtual Lab — Clinical Design Stylesheet
   ========================================= */

/* --- CSS Variables / Theme --- */
:root {
    /* Light clinical theme */
    --bg-primary: #f8fafc;
    --bg-secondary: #ffffff;
    --bg-sidebar: #f1f5f9;
    --bg-card: #ffffff;
    --bg-card-hover: #f8fafc;
    
    /* Accent colors - oxygen/pulse oximeter red theme */
    --accent: #dc2626;
    --accent-light: #fef2f2;
    --accent-dark: #991b1b;
    --accent-border: #fca5a5;
    
    /* Secondary accent - oxygen blue */
    --accent-secondary: #2563eb;
    --accent-secondary-light: #eff6ff;
    
    /* SpO2 Colors */
    --spo2-normal: #059669;
    --spo2-mild: #d97706;
    --spo2-moderate: #dc2626;
    --spo2-severe: #7c2d12;
    
    /* Status colors */
    --success: #10b981;
    --success-light: #d1fae5;
    --warning: #f59e0b;
    --warning-light: #fef3c7;
    --danger: #ef4444;
    --danger-light: #fee2e2;
    
    /* Text colors */
    --text-primary: #1e293b;
    --text-secondary: #64748b;
    --text-muted: #94a3b8;
    
    /* Border colors */
    --border: #e2e8f0;
    --border-light: #f1f5f9;
    
    /* Shadows */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    
    /* Radius */
    --radius: 8px;
    --radius-sm: 6px;
    --radius-lg: 12px;
    
    /* Transitions */
    --transition: all 0.2s ease;
    --transition-slow: all 0.3s ease;
    
    /* Typography */
    --font-sans: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
    --font-mono: 'Fira Code', 'Consolas', monospace;
}

/* --- Reset & Base --- */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: var(--font-sans);
    background: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.6;
    overflow-x: hidden;
    min-height: 100vh;
    font-size: 15px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.hidden {
    display: none !important;
}

/* --- Loading Screen --- */
#loading-screen {
    position: fixed;
    inset: 0;
    background: linear-gradient(135deg, #fef2f2 0%, #ffffff 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.loader-content {
    text-align: center;
    max-width: 400px;
    padding: 2rem;
}

.loader-spinner {
    margin: 0 auto 2rem;
    width: 64px;
    height: 64px;
}

.spinner-svg {
    width: 100%;
    height: 100%;
    animation: spin 1s linear infinite;
}

.spinner-circle {
    animation: pulse-dash 1.5s ease-in-out infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

@keyframes pulse-dash {
    0% { stroke-dashoffset: 60; }
    50% { stroke-dashoffset: 20; }
    100% { stroke-dashoffset: 60; }
}

.loader-content h1 {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.loader-content p {
    color: var(--text-secondary);
    margin-bottom: 2rem;
    font-size: 1rem;
}

.load-bar {
    width: 100%;
    height: 4px;
    background: var(--border-light);
    border-radius: 2px;
    overflow: hidden;
}

.load-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent) 0%, var(--accent-secondary) 100%);
    border-radius: 2px;
    animation: loading-progress 3s ease-in-out;
    width: 0%;
}

@keyframes loading-progress {
    0% { width: 0%; }
    50% { width: 60%; }
    100% { width: 100%; }
}

/* --- Main Layout --- */
#app {
    min-height: 100vh;
    width: 100%;
}

/* --- Sidebar Navigation --- */
#sidebar-nav {
    background: var(--bg-sidebar);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    width: 320px;
    height: 100vh;
    overflow-y: auto;
    z-index: 2000;
}

.sidebar-header {
    padding: 2rem 1.5rem;
    border-bottom: 1px solid var(--border);
    text-align: center;
}

.sidebar-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
}

.logo-image {
    max-width: 100%;
    max-height: 60px;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: var(--radius);
}

.lab-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 0.25rem;
}

.lab-icon {
    color: var(--accent);
    font-size: 1.5rem;
}

.lab-title h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
}

.lab-subtitle {
    color: var(--text-secondary);
    font-size: 0.875rem;
}

/* --- Navigation Steps --- */
.nav-steps-vertical {
    flex: 1;
    padding: 1.5rem 0;
}

.nav-step {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem 1.5rem;
    cursor: pointer;
    transition: var(--transition);
    border-left: 4px solid transparent;
}

.nav-step:hover {
    background: var(--bg-card-hover);
}

.nav-step.active {
    background: var(--accent-light);
    border-left-color: var(--accent);
}

.nav-step.locked {
    opacity: 0.55;
}

.nav-step.locked:hover {
    background: transparent;
}

.nav-step.completed .step-indicator {
    background: var(--success);
    color: white;
}

.step-indicator {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    font-weight: 600;
    transition: var(--transition);
}

.nav-step.active .step-indicator {
    background: var(--accent);
    color: white;
}

.step-indicator i {
    font-size: 0.9rem;
    color: var(--text-muted);
}

.nav-step.active .step-indicator i,
.nav-step.completed .step-indicator i {
    color: white;
}

.step-check {
    display: none;
}

.nav-step.completed .step-check {
    display: flex;
    position: absolute;
    inset: 0;
    align-items: center;
    justify-content: center;
}

.nav-step .step-content {
    flex: 1;
}

.step-label {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-secondary);
}

.nav-step.active .step-label {
    color: var(--accent-dark);
    font-weight: 600;
}

.sidebar-footer {
    padding: 1rem 1.25rem 1.5rem;
    border-top: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
}

.btn-glossary {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: 1px solid var(--border);
    background: var(--bg-card);
    color: var(--text-secondary);
    border-radius: var(--radius);
    padding: 0.65rem 0.9rem;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
}

.btn-glossary:hover {
    background: var(--bg-card-hover);
    color: var(--text-primary);
}

.btn-reset-lab {
    border-color: #fecaca;
    color: #b91c1c;
    background: #fef2f2;
}

.btn-reset-lab:hover {
    background: #fee2e2;
    color: #991b1b;
}

.btn-reset-lab.is-loading {
    opacity: 0.7;
    cursor: wait;
}

.top-right-actions {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 120;
    display: flex;
    align-items: center;
    gap: 0.6rem;
}

.top-action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    border: 1px solid var(--border);
    background: rgba(255, 255, 255, 0.94);
    color: var(--text-secondary);
    border-radius: var(--radius);
    padding: 0.55rem 0.8rem;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.1);
    backdrop-filter: blur(3px);
}

.top-action-btn:hover {
    background: #ffffff;
    color: var(--text-primary);
}

.top-action-btn.btn-reset-lab {
    border-color: #fecaca;
    color: #b91c1c;
    background: #fff5f5;
}

.top-action-btn.btn-reset-lab:hover {
    background: #fee2e2;
    color: #991b1b;
}

.top-action-btn.is-loading {
    opacity: 0.75;
    cursor: wait;
}

/* --- Step Header Enhancements --- */
.step-objectives {
    background: var(--accent-light);
    border: 1px solid var(--accent-border);
    border-radius: var(--radius);
    padding: 1.5rem;
    margin-top: 1.5rem;
    text-align: left;
}

.step-objectives h4 {
    color: var(--accent-dark);
    margin: 0 0 1rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
}

.step-objectives ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.step-objectives li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.45rem 0;
    color: var(--text-primary);
    font-size: 0.875rem;
}

.step-objectives li::before {
    content: '\2713';
    color: var(--success);
    font-weight: bold;
    flex-shrink: 0;
}

/* --- Placement Tips --- */
.placement-tips {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-light);
}

.tip-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
    padding: 0.75rem;
    background: var(--bg-card);
    border-radius: var(--radius-sm);
    border-left: 3px solid var(--accent);
}

.tip-item:last-child {
    margin-bottom: 0;
    border-left-color: var(--warning);
}

.tip-item i {
    color: var(--accent);
    margin-top: 0.125rem;
    font-size: 0.875rem;
}

.tip-item:last-child i {
    color: var(--warning);
}

.tip-item span {
    color: var(--text-secondary);
    font-size: 0.875rem;
    line-height: 1.3;
}

.nav-step .step-content h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
}

.nav-step .step-content p {
    font-size: 0.75rem;
    color: var(--text-secondary);
    line-height: 1.4;
}

/* --- Lab Info Panel --- */
.lab-info-panel {
    margin: 1.5rem;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.25rem;
}

.info-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.info-header i {
    color: var(--accent);
}

.info-header h4 {
    font-size: 0.875rem;
    font-weight: 600;
}

.info-content p {
    font-size: 0.8125rem;
    color: var(--text-secondary);
    line-height: 1.5;
    margin-bottom: 1rem;
}

.info-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
}

.stat {
    text-align: center;
}

.stat-label {
    display: block;
    font-size: 0.6875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    margin-bottom: 0.25rem;
}

.stat-value {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--accent);
}

/* --- Main Content --- */
/* --- Main Content Area --- */
#main-content {
    margin-left: 320px;
    height: 100vh;
    overflow-y: auto;
    padding: 24px;
    padding-bottom: 48px;
    scroll-behavior: smooth;
}

/* --- Lab Steps --- */
.lab-step {
    display: none;
    width: 100%;
}

.lab-step.active {
    display: block;
}

.step-container {
    max-width: 100%;
    width: 100%;
    margin: 0;
    padding-bottom: 2rem;
}

/* --- Welcome / Start Step --- */
.welcome-card {
    text-align: center;
    padding: 48px 32px;
    margin-bottom: 32px;
}

.welcome-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, var(--accent-light) 0%, #ffffff 100%);
    border: 1px solid var(--accent-border);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
}

.welcome-icon i {
    font-size: 2rem;
    color: var(--accent);
}

.welcome-card h2 {
    font-size: 1.85rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 10px;
    letter-spacing: -0.02em;
}

.welcome-subtitle {
    color: var(--text-secondary);
    font-size: 1.05rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

/* Info Grid */
.info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 32px;
}

.info-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 28px;
    box-shadow: var(--shadow);
    transition: var(--transition);
    position: relative;
    overflow: hidden;
}

.info-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--accent) 0%, var(--accent-dark) 100%);
    opacity: 0;
    transition: var(--transition);
}

.info-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--accent-border);
}

.info-card:hover::before {
    opacity: 1;
}

.info-card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border);
}

.info-card-header i {
    width: 44px;
    height: 44px;
    background: linear-gradient(135deg, var(--accent-light) 0%, #ffffff 100%);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    color: var(--accent);
    box-shadow: 0 2px 8px rgba(220, 38, 38, 0.15);
    transition: var(--transition);
}

.info-card:hover .info-card-header i {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.25);
}

.info-card-header h3 {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.01em;
}

.info-card p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.6;
}

.info-card ul {
    list-style: none;
    padding: 0;
}

.info-card ul li {
    padding: 8px 0;
    padding-left: 20px;
    position: relative;
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.info-card ul li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%);
    border-radius: 50%;
    box-shadow: 0 0 0 3px var(--accent-light);
}

/* Science Section Card */
.science-section-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 32px;
    margin-bottom: 32px;
    box-shadow: var(--shadow);
    position: relative;
}

.science-section-card::after {
    content: '';
    position: absolute;
    top: 20px;
    right: 20px;
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, var(--accent-light) 0%, transparent 100%);
    border-radius: 50%;
    opacity: 0.5;
    pointer-events: none;
}

.science-section-card > h3 {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 28px;
    padding-bottom: 18px;
    border-bottom: 2px solid var(--border);
    letter-spacing: -0.01em;
}

.science-section-card > h3 i {
    color: var(--accent);
    font-size: 1.3rem;
}

.science-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
}

.science-item {
    padding: 24px;
    background: linear-gradient(145deg, var(--bg-primary) 0%, #ffffff 100%);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
    transition: var(--transition);
    position: relative;
    overflow: hidden;
}

.science-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(180deg, var(--accent) 0%, var(--accent-dark) 100%);
    opacity: 0;
    transition: var(--transition);
}

.science-item:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
    border-color: var(--accent-border);
}

.science-item:hover::before {
    opacity: 1;
}

.science-item h4 {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 12px;
}

.science-item h4 i {
    color: var(--accent);
    font-size: 1.1rem;
}

.science-item p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.6;
}

.signal-specs {
    list-style: none;
    padding: 0;
    margin: 0;
}

.signal-specs li {
    padding: 6px 0;
    color: var(--text-secondary);
    font-size: 0.85rem;
}

.signal-specs strong {
    color: var(--text-primary);
}

/* MUAP Visualization */
.muap-visualization {
    margin-bottom: 32px;
    text-align: center;
}

#muap-canvas {
    max-width: 100%;
    height: auto;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--bg-card);
    padding: 20px;
    margin-bottom: 12px;
}

.canvas-caption {
    color: var(--text-secondary);
    font-size: 0.9rem;
    font-style: italic;
}

/* --- Header --- */
.main-header {
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border);
    padding: 1.5rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 50;
}

.page-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
}

.breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.breadcrumb-item.current {
    color: var(--accent);
}

.header-controls {
    display: flex;
    gap: 0.75rem;
}

.header-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    color: var(--text-secondary);
    font-size: 0.875rem;
    cursor: pointer;
    transition: var(--transition);
}

.header-btn:hover {
    background: var(--bg-card-hover);
    color: var(--text-primary);
}

.header-btn.primary {
    background: var(--accent);
    color: white;
    border-color: var(--accent);
}

.header-btn.primary:hover {
    background: var(--accent-dark);
}

/* --- Buttons --- */
/* Primary Button */
.btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 14px 28px;
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%);
    color: white;
    border: none;
    border-radius: var(--radius-lg);
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    box-shadow: 0 4px 14px rgba(220, 38, 38, 0.35);
    position: relative;
    overflow: hidden;
}

.btn-primary::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: 0.5s;
}

.btn-primary:hover::before {
    left: 100%;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(220, 38, 38, 0.45);
}

.btn-primary:active {
    transform: translateY(0);
}

.btn-primary.btn-lg {
    padding: 18px 42px;
    font-size: 1.05rem;
    border-radius: 50px;
}

/* Secondary Button */
.btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--text-secondary);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
}

.btn:hover {
    background: var(--bg-card-hover);
    color: var(--text-primary);
    border-color: var(--accent-border);
}

/* --- Section Headers --- */
.section-header {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--border);
}

.section-header i {
    width: 48px;
    height: 48px;
    background: var(--accent-light);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    color: var(--accent);
    flex-shrink: 0;
}

.section-header h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 4px;
}

.section-header p {
    color: var(--text-secondary);
    font-size: 0.95rem;
}

/* --- Content Container --- */
.content-container {
    flex: 1;
    padding: 2rem;
}

/* --- Step Content --- */
.content-container > .step-content {
    display: none;
}

.content-container > .step-content.active {
    display: block;
}

.step-header {
    margin-bottom: 2rem;
    text-align: center;
}

.step-badge {
    display: inline-block;
    background: var(--accent-light);
    color: var(--accent-dark);
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
}

.step-header h2 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.step-header p {
    color: var(--text-secondary);
    font-size: 1.125rem;
}

/* --- Content Grid --- */
.content-grid {
    display: grid;
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.equipment-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
}

.setup-grid {
    grid-template-columns: 2fr 1fr;
    grid-template-rows: auto auto;
}

.monitoring-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto;
}

.analysis-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
}

.equipment-layout-grid {
    grid-template-columns: 1fr 1.5fr;
}

/* --- Lab Illustration (Start Section) --- */
.lab-illustration {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 32px 0 24px;
    padding: 24px;
    background: linear-gradient(135deg, var(--accent-light) 0%, var(--accent-secondary-light) 100%);
    border: 1px solid var(--accent-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
}

.lab-illustration svg {
    max-width: 600px;
    width: 100%;
    height: auto;
}

/* --- Content Cards --- */
.content-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    transition: var(--transition);
}

.content-card:hover {
    box-shadow: var(--shadow);
}

.card-header {
    padding: 1.25rem 1.5rem;
    background: var(--bg-card);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.card-header i {
    color: var(--accent);
    margin-right: 0.5rem;
}

.card-header h3 {
    flex: 1;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
}

.card-header p {
    color: var(--text-secondary);
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

.card-content {
    padding: 1.25rem 1.5rem;
}

.card-content ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.card-content ul li {
    position: relative;
    padding: 0.35rem 0 0.35rem 1rem;
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.card-content ul li::before {
    content: '\2022';
    position: absolute;
    left: 0;
    color: var(--accent);
}

/* --- Equipment Explorer --- */
.equipment-list {
    padding: 1.5rem;
}

.equipment-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: var(--transition);
    margin-bottom: 0.75rem;
}

.equipment-item:hover {
    background: var(--bg-card-hover);
}

.equipment-item.explored {
    background: var(--success-light);
    border: 1px solid var(--success);
}

.equipment-icon {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    background: var(--accent-light);
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent);
    font-size: 1.25rem;
}

.equipment-details {
    flex: 1;
}

.equipment-details h4 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
}

.equipment-details p {
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.equipment-status {
    color: var(--text-muted);
}

/* --- Equipment Details Panel --- */
.equipment-detail-panel {
    display: flex;
    flex-direction: column;
}

.equipment-detail-panel .card-header {
    flex-shrink: 0;
}

.equipment-info {
    padding: 1.5rem;
    min-height: 300px;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.info-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    min-height: 260px;
    color: var(--text-muted);
    text-align: center;
    gap: 0.75rem;
    padding: 2rem;
    border: 2px dashed var(--border);
    border-radius: var(--radius);
    margin: 0.5rem;
}

.info-placeholder i {
    font-size: 2rem;
    margin-bottom: 1rem;
}

/* Equipment illustration in detail panel */
.equipment-detail-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.equipment-detail-content h4 {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
}

.equip-image-wrap {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.equip-illustration {
    width: 100%;
    max-width: 280px;
    height: auto;
    display: block;
}

/* SVG thumbnails inside equipment list icons */
.equipment-icon svg {
    width: 100%;
    height: 100%;
}

/* --- Theory Panel --- */
.theory-content {
    padding: 1.5rem;
}

.theory-content h4 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.75rem;
}

.theory-content p {
    color: var(--text-secondary);
    margin-bottom: 1rem;
    line-height: 1.6;
}

.theory-formula {
    background: var(--bg-primary);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 1rem;
    margin: 1rem 0;
}

.formula-box {
    text-align: center;
}

.formula {
    display: block;
    font-family: var(--font-mono);
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--accent);
    margin-bottom: 0.5rem;
}

.formula-desc {
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.concept-list {
    list-style: none;
    padding: 0;
}

.concept-list li {
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border-light);
    font-size: 0.875rem;
}

.concept-list li:last-child {
    border-bottom: none;
}

/* --- Setup Animation --- */
.setup-animation-card {
    grid-column: 1 / 3;
}

.setup-animation-card .card-header {
    display: block;
}

.setup-animation-card .card-header > i {
    display: none; /* icon already visible in animation area */
}

.setup-animation-card .card-header h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.15rem;
}

.setup-animation-card .card-header > p {
    margin: 0 0 0.75rem 0;
    line-height: 1.6;
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.setup-animation-card .placement-tips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding: 0.75rem;
    background: var(--accent-light);
    border-radius: var(--radius-sm);
    border: none;
    margin-top: 0;
    padding-top: 0.75rem;
}

.setup-animation-card .placement-tips .tip-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: var(--text-secondary);
    background: var(--bg-card);
    border-radius: var(--radius-sm);
    padding: 0.4rem 0.75rem;
    border: 1px solid var(--border);
}

.setup-animation-container {
    padding: 1.5rem 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 1.5rem;
    background: linear-gradient(135deg, var(--bg-primary) 0%, var(--accent-light) 100%);
    position: relative;
}

/* Interactive stage: finger + oximeter side by side */
.setup-stage {
    grid-column: 1 / 3;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
    padding: 2rem 0;
    position: relative;
    min-height: 220px;
}

.finger-container {
    position: relative;
}

.hand-illustration {
    position: relative;
}

.finger {
    width: 80px;
    height: 120px;
    background: #fdbcb4;
    border-radius: 40px 40px 20px 20px;
    position: relative;
    cursor: pointer;
    box-shadow: var(--shadow-md);
}

.fingertip {
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 60px;
    background: #f8a397;
    border-radius: 50%;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.finger-joint {
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    width: 70px;
    height: 4px;
    background: #e69189;
    border-radius: 2px;
}

.hand-palm {
    position: absolute;
    bottom: -20px;
    left: 10px;
    width: 60px;
    height: 40px;
    background: #fdbcb4;
    border-radius: 0 0 20px 20px;
}

.oximeter-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    order: 1;
    flex: 1;
}

.finger-container {
    order: 2;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.pulse-oximeter {
    width: 190px;
    height: 122px;
    background: linear-gradient(150deg, #2f3a4f 0%, #111827 100%);
    border: 1px solid #334155;
    border-radius: 18px 18px 12px 12px;
    position: relative;
    cursor: grab;
    box-shadow: var(--shadow-lg);
    transition: box-shadow 0.2s, transform 0.15s;
    user-select: none;
    touch-action: none;
}

.pulse-oximeter:hover {
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3), var(--shadow-lg);
}

.pulse-oximeter:active {
    cursor: grabbing;
    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.4), var(--shadow-lg);
}

.oximeter-top {
    background: #1a202c;
    border-radius: 18px 18px 0 0;
    padding: 0.5rem 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
}

.display-screen {
    background: #000;
    color: #0f0;
    border: 2px solid #333;
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    min-width: 60px;
    text-align: center;
}

.status-led {
    width: 8px;
    height: 8px;
    background: #dc2626;
    border-radius: 50%;
    animation: pulse-led 1s infinite;
}

@keyframes pulse-led {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
}

.oximeter-clip {
    position: relative;
    height: 50px;
    margin-top: -1px;
    overflow: hidden;
}

.clip-top, .clip-bottom {
    background: linear-gradient(180deg, #4b5563 0%, #374151 100%);
    position: relative;
}

.clip-top {
    height: 22px;
    border-radius: 0 0 14px 14px;
    transform: translateY(-2px);
}

.clip-bottom {
    height: 28px;
    border-radius: 14px 14px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 0.5rem;
}

.oximeter-clip::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 14px;
    width: 16px;
    height: 16px;
    transform: translateX(-50%);
    border-radius: 50%;
    border: 2px solid #94a3b8;
    background: radial-gradient(circle, #475569 0%, #1f2937 70%);
    z-index: 3;
}

.stage-hint {
    font-size: 0.74rem;
    color: var(--text-muted);
    text-align: center;
    max-width: 220px;
}

.cleaning-cloth {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.65rem;
    border-radius: 999px;
    border: 1px solid #67e8f9;
    background: linear-gradient(120deg, #cffafe 0%, #ecfeff 100%);
    color: #0f766e;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: grab;
    user-select: none;
    box-shadow: var(--shadow-sm);
    transition: transform 0.1s ease, box-shadow 0.2s ease;
}

.cleaning-cloth i {
    font-size: 0.68rem;
    transform: rotate(45deg);
}

.cleaning-cloth.active {
    cursor: grabbing;
    box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.3);
}

.led-indicator {
    width: 6px;
    height: 6px;
    border-radius: 50%;
}

.red-led {
    background: #dc2626;
    box-shadow: 0 0 6px #dc2626;
}

.ir-led {
    background: #7c2d12;
    box-shadow: 0 0 6px #7c2d12;
}

.photodetector {
    width: 8px;
    height: 8px;
    background: #374151;
    border: 1px solid #6b7280;
    border-radius: 2px;
}

.attachment-guide {
    grid-column: 1 / 3;
    text-align: center;
    background: var(--bg-card);
    padding: 0.75rem 1.25rem;
    border-radius: var(--radius);
    box-shadow: var(--shadow-md);
    border: 2px solid var(--accent-border);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
}

.guide-arrow {
    font-size: 1.5rem;
    color: var(--accent);
}

.animated-pulse {
    animation: pulseGlow 2s ease-in-out infinite;
}

@keyframes pulseGlow {
    0%, 100% { 
        color: var(--accent);
        transform: scale(1);
    }
    50% { 
        color: var(--accent-dark);
        transform: scale(1.1);
    }
}

.attachment-guide p {
    margin: 0;
    color: var(--text-primary);
    font-weight: 500;
    font-size: 0.875rem;
}

.guide-hint {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
    font-size: 0.75rem;
}

.guide-hint i {
    color: var(--accent);
}

/* --- Instructions Panel --- */
.instructions-content {
    padding: 1.5rem;
}

.instruction-step {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.5rem;
    border-radius: var(--radius);
    margin-bottom: 1rem;
    border: 1px solid var(--border);
    background: var(--bg-card);
    transition: var(--transition);
}

.instruction-step.completed {
    background: var(--success-light);
    border: 1px solid var(--success);
}

.instruction-step.current {
    background: var(--accent-light);
    border: 1px solid var(--accent);
    box-shadow: var(--shadow-sm);
}

.instruction-step .step-text {
    flex: 1;
}

.instruction-step .step-text h4 {
    margin: 0 0 0.5rem 0;
    color: var(--text-primary);
    font-size: 1rem;
}

.instruction-step .step-text p {
    margin: 0 0 0.5rem 0;
    color: var(--text-secondary);
    font-size: 0.875rem;
    line-height: 1.4;
}

.instruction-step .step-text small {
    display: block;
    margin-top: 0.5rem;
    color: var(--text-secondary);
    font-style: italic;
    font-size: 0.8rem;
    line-height: 1.3;
}

.instruction-step .step-text small strong {
    color: var(--accent-dark);
    font-weight: 600;
}

.instruction-step .step-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 120px;
    justify-content: flex-end;
}

.instruction-step .step-status.completed {
    color: var(--success);
    font-weight: 500;
    font-size: 0.875rem;
}

.instruction-step .step-status.pending {
    color: var(--text-secondary);
    font-size: 0.875rem;
}

.complete-step-btn {
    background: var(--accent);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: var(--transition);
}

.complete-step-btn:hover {
    background: var(--accent-dark);
    transform: translateY(-1px);
}

.step-icon {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    background: var(--bg-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
}

.instruction-step.completed .step-icon {
    background: var(--success);
    color: white;
}

.instruction-step.active .step-icon {
    background: var(--accent);
    color: white;
}

.step-text {
    flex: 1;
}

.step-text h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
}

.step-text p {
    font-size: 0.8125rem;
    color: var(--text-secondary);
}

.step-status {
    flex-shrink: 0;
    font-size: 0.75rem;
}

.complete-step-btn {
    padding: 0.25rem 0.75rem;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    cursor: pointer;
    transition: var(--transition);
}

.complete-step-btn:hover {
    background: var(--accent-dark);
}

.step-status .pending {
    color: var(--text-muted);
}

/* --- Device Status Panel --- */
.device-status-content {
    padding: 1.5rem;
}

.status-indicator {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: var(--radius-sm);
    margin-bottom: 0.75rem;
    background: var(--bg-primary);
}

.status-indicator.connected {
    background: var(--success-light);
}

.status-indicator.warning {
    background: var(--warning-light);
}

.status-indicator.error {
    background: var(--danger-light);
}

.status-icon {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    background: var(--bg-card);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
}

.status-indicator.connected .status-icon {
    background: var(--success);
    color: white;
}

.status-info {
    flex: 1;
}

.status-info h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
}

.status-text {
    font-size: 0.8125rem;
    color: var(--text-secondary);
}

/* --- Main Display Panel --- */
.monitoring-controls {
    display: flex;
    gap: 0.5rem;
}

.monitoring-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
    cursor: pointer;
    transition: var(--transition);
}

.monitoring-btn:hover {
    background: var(--accent-dark);
}

.monitoring-btn:disabled {
    background: var(--text-muted);
    cursor: not-allowed;
}

.monitoring-btn-rest {
    background: #0f766e;
}

.monitoring-btn-rest:hover {
    background: #115e59;
}

.monitoring-btn-rest.active {
    background: #0ea5a4;
    box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.2);
}

.oximeter-display {
    padding: 2rem;
    background: #1a1a1a;
    color: white;
    border-radius: var(--radius-sm);
    margin: 1.5rem;
}

.display-main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
}

.spo2-display, .pulse-display {
    text-align: center;
    background: #000;
    border: 2px solid #333;
    border-radius: var(--radius);
    padding: 1.5rem;
}

.display-label {
    font-size: 0.875rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
}

.display-value {
    font-size: 3rem;
    font-weight: 700;
    font-family: var(--font-mono);
    color: #0f0;
    margin-bottom: 0.25rem;
    line-height: 1;
}

.spo2-display .display-value {
    color: #0ff;
}

.display-unit {
    font-size: 1rem;
    color: #888;
}

.pulse-icon {
    margin-left: 0.5rem;
    color: #f00;
}

.pulse-icon.beating {
    animation: heartbeat 1s infinite;
}

@keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
}

.display-secondary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
}

.perfusion-index, .signal-strength {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.signal-bars {
    display: flex;
    gap: 2px;
}

.signal-bars .bar {
    width: 6px;
    height: 12px;
    background: #333;
    border-radius: 1px;
}

.signal-bars .bar.active {
    background: #0f0;
}

/* --- Waveform Panel --- */
.waveform-controls {
    display: flex;
    gap: 1rem;
}

.control-label {
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.control-label select {
    margin-left: 0.5rem;
    padding: 0.25rem 0.5rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    font-size: 0.8125rem;
}

.waveform-container {
    padding: 1.5rem;
    position: relative;
    background: #1a1a1a;
    border-radius: var(--radius-sm);
    margin: 1.5rem;
}

#waveform-canvas {
    width: 100%;
    height: 200px;
    background: #000;
    border: 1px solid #333;
    border-radius: var(--radius-sm);
}

/* --- Patient Condition Selector --- */
.condition-selector {
    padding: 1.5rem;
}

.condition-option {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border: 2px solid transparent;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: var(--transition);
    margin-bottom: 0.75rem;
}

.condition-option:hover {
    background: var(--bg-card-hover);
}

.condition-option.active {
    background: var(--accent-light);
    border-color: var(--accent);
}

.condition-icon {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    background: var(--bg-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: var(--text-secondary);
}

.condition-option.active .condition-icon {
    background: var(--accent);
    color: white;
}

.condition-info h4 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
}

.condition-info p {
    font-size: 0.8125rem;
    color: var(--text-secondary);
    line-height: 1.4;
}

/* --- Measurement Log --- */
.log-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--success);
    color: white;
    border: none;
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
    cursor: pointer;
    transition: var(--transition);
}

.log-btn:hover {
    background: var(--success-light);
    color: var(--success);
}

.log-content {
    padding: 1.5rem;
}

.log-header, .log-entry {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1.2fr;
    gap: 0.5rem;
    padding: 0.75rem 0;
    font-size: 0.875rem;
}

.log-header {
    font-weight: 600;
    color: var(--text-primary);
    border-bottom: 2px solid var(--border);
}

.log-entry {
    border-bottom: 1px solid var(--border-light);
    color: var(--text-secondary);
}

.log-entries {
    max-height: 300px;
    overflow-y: auto;
}

/* --- Analysis Grid --- */
.results-summary {
    grid-column: 1 / 3;
}

.summary-content {
    padding: 1.5rem;
}

.summary-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
}

.stat-box {
    text-align: center;
    background: var(--bg-primary);
    border-radius: var(--radius-sm);
    padding: 1rem;
}

.stat-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
}

.stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--accent);
    margin-bottom: 0.25rem;
}

.stat-unit {
    font-size: 0.875rem;
    color: var(--text-secondary);
}

.summary-chart {
    background: #1a1a1a;
    border-radius: var(--radius-sm);
    padding: 1rem;
}

#summary-chart {
    width: 100%;
    height: 200px;
}

/* --- Clinical Interpretation --- */
.interpretation-content {
    padding: 1.5rem;
}

.interpretation-section {
    margin-bottom: 1.5rem;
}

.interpretation-section h4 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.75rem;
}

.assessment-result {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    background: var(--bg-primary);
    border-radius: var(--radius-sm);
}

.assessment-result.normal {
    background: var(--success-light);
    border-left: 4px solid var(--success);
}

.assessment-result.warning {
    background: var(--warning-light);
    border-left: 4px solid var(--warning);
}

.assessment-result.critical {
    background: var(--danger-light);
    border-left: 4px solid var(--danger);
}

.assessment-icon {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
}

.assessment-result.normal .assessment-icon {
    color: var(--success);
}

.assessment-result.warning .assessment-icon {
    color: var(--warning);
}

.assessment-result.critical .assessment-icon {
    color: var(--danger);
}

.assessment-text {
    flex: 1;
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.5;
}

/* --- Reference Panel --- */
.reference-content {
    padding: 1.5rem;
}

.reference-table {
    background: var(--bg-primary);
    border-radius: var(--radius-sm);
    overflow: hidden;
    margin-bottom: 1.5rem;
}

.table-header, .table-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
}

.table-header {
    background: var(--accent-light);
    font-weight: 600;
    color: var(--accent-dark);
}

.table-row {
    border-bottom: 1px solid var(--border-light);
}

.table-row:last-child {
    border-bottom: none;
}

.param-name {
    font-weight: 600;
    color: var(--text-primary);
}

.normal-range {
    color: var(--success);
    font-weight: 500;
}

.critical-value {
    color: var(--danger);
    font-weight: 500;
}

.clinical-notes h4 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.75rem;
}

.clinical-notes ul {
    list-style: none;
    padding: 0;
}

.clinical-notes li {
    padding: 0.25rem 0;
    font-size: 0.875rem;
    color: var(--text-secondary);
    position: relative;
    padding-left: 1rem;
}

.clinical-notes li::before {
    content: '•';
    color: var(--accent);
    position: absolute;
    left: 0;
}

/* --- Lab Report --- */
.report-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
    cursor: pointer;
    transition: var(--transition);
}

.report-btn:hover {
    background: var(--accent-dark);
}

.report-content {
    padding: 1.5rem;
}

.report-section {
    margin-bottom: 1.5rem;
}

.report-section h4 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.75rem;
}

.report-section p {
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.6;
}

.objectives-list {
    list-style: none;
    padding: 0;
}

.objectives-list li {
    padding: 0.5rem 0;
    font-size: 0.875rem;
    color: var(--text-secondary);
    position: relative;
    padding-left: 2rem;
}

.objectives-list li.completed::before {
    content: '✓';
    color: var(--success);
    font-weight: 600;
    position: absolute;
    left: 0;
}

.objectives-list li:not(.completed)::before {
    content: '○';
    color: var(--text-muted);
    position: absolute;
    left: 0;
}

.metrics-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.metric {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background: var(--bg-primary);
    border-radius: var(--radius-sm);
    padding: 1rem;
}

.metric-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
}

.metric-value {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--accent);
}

/* --- Step Actions --- */
.step-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 2rem;
    border-top: 1px solid var(--border);
}

.btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: var(--radius);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    text-decoration: none;
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.btn-primary {
    background: var(--accent);
    color: white;
}

.btn-primary:hover:not(:disabled) {
    background: var(--accent-dark);
}

.btn-secondary {
    background: var(--bg-card);
    color: var(--text-secondary);
    border: 1px solid var(--border);
}

.btn-secondary:hover {
    background: var(--bg-card-hover);
    color: var(--text-primary);
}

.btn-success {
    background: var(--success);
    color: white;
}

.btn-success:hover {
    background: #059669;
}

/* --- Modal --- */
.modal {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 2rem;
}

.modal.active {
    display: flex;
}

.modal-content {
    background: var(--bg-card);
    border-radius: var(--radius-lg);
    max-width: 600px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: var(--shadow-lg);
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    border-bottom: 1px solid var(--border);
}

.modal-header h3 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
}

.modal-header i {
    color: var(--accent);
}

.modal-close {
    width: 32px;
    height: 32px;
    background: none;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    cursor: pointer;
    transition: var(--transition);
}

.modal-close:hover {
    background: var(--bg-card-hover);
    color: var(--text-primary);
}

.modal-body {
    padding: 1.5rem;
}

.help-section {
    margin-bottom: 1.5rem;
}

.help-section h4 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.75rem;
}

.help-section p {
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 0.5rem;
}

.help-section ul {
    list-style: none;
    padding: 0;
}

.help-section li {
    padding: 0.25rem 0;
    font-size: 0.875rem;
    color: var(--text-secondary);
    position: relative;
    padding-left: 1rem;
}

.help-section li::before {
    content: '•';
    color: var(--accent);
    position: absolute;
    left: 0;
}

/* --- Glossary Modal (Centered) --- */
.glossary-drawer-modal {
    display: flex;
    justify-content: center;
    padding: 2rem;
    background: rgba(0, 0, 0, 0.5);
}

.glossary-drawer-modal.hidden {
    display: none !important;
}

.glossary-drawer-content {
    margin: 0;
    width: 100%;
    max-width: 600px;
    max-height: 80vh;
    border-radius: var(--radius-lg);
    border: 1px solid var(--border);
    transform: translateY(8px);
    opacity: 0;
    transition: transform 0.22s ease, opacity 0.22s ease;
    display: flex;
    flex-direction: column;
}

.glossary-drawer-modal:not(.hidden) .glossary-drawer-content {
    transform: translateY(0);
    opacity: 1;
}

.glossary-body {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.glossary-search-wrap {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.65rem 0.8rem;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--bg-primary);
}

.glossary-search-wrap i {
    color: var(--text-muted);
}

#glossary-search {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: var(--text-primary);
    font-size: 0.9rem;
}

.glossary-list {
    overflow-y: auto;
    display: grid;
    gap: 0.75rem;
    padding-right: 0.2rem;
}

.glossary-item {
    background: var(--bg-primary);
    border: 1px solid var(--border-light);
    border-radius: 10px;
    padding: 0.9rem;
}

.glossary-item h4 {
    margin-bottom: 0.4rem;
    font-size: 0.96rem;
    color: var(--text-primary);
}

.glossary-item p {
    margin: 0;
    font-size: 0.86rem;
    line-height: 1.5;
    color: var(--text-secondary);
}

.glossary-empty {
    margin: 0.25rem 0 0;
    font-size: 0.86rem;
    color: var(--text-muted);
    text-align: center;
    padding: 0.75rem;
    border: 1px dashed var(--border);
    border-radius: 10px;
    background: var(--bg-primary);
}

/* Floating glossary button for mobile when sidebar is hidden */
.floating-glossary-btn {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    z-index: 900;
    display: none;
    align-items: center;
    gap: 0.45rem;
    border: 1px solid var(--accent-border);
    background: var(--accent);
    color: #ffffff;
    border-radius: 999px;
    padding: 0.7rem 0.95rem;
    font-size: 0.85rem;
    font-weight: 700;
    box-shadow: var(--shadow-lg);
    cursor: pointer;
}

.floating-glossary-btn:hover {
    background: var(--accent-dark);
}

/* --- Responsive Design --- */
@media (max-width: 1200px) {
    .content-grid {
        grid-template-columns: 1fr !important;
    }
    
    .equipment-grid {
        grid-template-rows: auto auto auto;
    }
    
    .setup-grid {
        grid-template-rows: auto auto auto;
    }
    
    .monitoring-grid {
        grid-template-rows: repeat(5, auto);
    }
    
    .analysis-grid {
        grid-template-rows: repeat(4, auto);
    }

    /* nothing to override — card header already block */
}

@media (max-width: 768px) {
    #app {
        grid-template-columns: 1fr;
    }
    
    #sidebar-nav {
        display: none;
    }

    .floating-glossary-btn {
        display: inline-flex;
    }
    
    #main-content {
        margin-left: 0;
    }
    
    .main-header {
        padding: 1rem;
    }
    
    .page-title {
        font-size: 1.25rem;
    }
    
    .content-container {
        padding: 1rem;
    }
    
    .step-header h2 {
        font-size: 1.5rem;
    }

    .glossary-drawer-modal {
        padding: 1rem;
    }

    .glossary-drawer-content {
        max-width: 100%;
        width: 100%;
        max-height: calc(100vh - 2rem);
    }
    
    .step-header p {
        font-size: 1rem;
    }
    
    .summary-stats {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .metrics-grid {
        grid-template-columns: 1fr;
    }
    
    .display-main {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .monitoring-controls {
        flex-wrap: wrap;
    }

    .setup-stage {
        flex-direction: column;
        justify-content: center;
        gap: 1.5rem;
    }

    .oximeter-container,
    .finger-container {
        width: 100%;
        max-width: 300px;
        flex: none;
        order: initial;
    }
    
    .table-header, .table-row {
        grid-template-columns: 1fr;
        gap: 0.5rem;
        padding: 0.5rem;
        font-size: 0.8125rem;
    }
}

/* --- Animation Classes --- */
.fadeIn {
    animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.slideInLeft {
    animation: slideInLeft 0.3s ease-out;
}

@keyframes slideInLeft {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

.pulse {
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

/* --- Utility Classes --- */
.text-normal { color: var(--spo2-normal); }
.text-mild { color: var(--spo2-mild); }
.text-moderate { color: var(--spo2-moderate); }
.text-severe { color: var(--spo2-severe); }

.bg-normal { background: var(--success-light); }
.bg-mild { background: var(--warning-light); }
.bg-moderate { background: var(--danger-light); }

.border-normal { border-color: var(--spo2-normal); }
.border-mild { border-color: var(--spo2-mild); }
.border-moderate { border-color: var(--spo2-moderate); }
.border-severe { border-color: var(--spo2-severe); }









/* =========================================
   Setup Interactivity Add-ons
   ========================================= */

/* Stage labels above finger and oximeter */
.stage-label {
    font-size: 0.78rem;
    color: var(--text-secondary);
    text-align: center;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    font-weight: 500;
}

.finger.target-active {
    outline: 3px solid var(--accent);
    box-shadow: 0 0 0 6px rgba(220, 38, 38, 0.15), var(--shadow-lg);
}

.cleaning-zone {
    position: absolute;
    inset: 4px;
    border: 3px dashed rgba(255, 255, 255, 0.5);
    border-radius: 8px;
    display: grid;
    place-items: center;
    pointer-events: auto;
    cursor: crosshair;
}

.cleaning-zone .cleaning-overlay {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.75);
}

.cleaning-zone.cleaning-active {
    border-color: rgba(34, 197, 94, 0.8);
    background: rgba(34, 197, 94, 0.12);
}

.alignment-panel,
.clean-progress {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.75rem 1rem;
    box-shadow: var(--shadow-sm);
}

.alignment-row,
.clean-progress-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.4rem;
}

.alignment-label,
.clean-label {
    font-size: 0.8rem;
    color: var(--text-secondary);
    font-weight: 600;
}

.alignment-value,
.clean-value {
    font-family: var(--font-mono);
    color: var(--text-primary);
    font-weight: 700;
}

.alignment-meter,
.clean-progress-bar {
    height: 10px;
    background: var(--bg-primary);
    border: 1px solid var(--border);
    border-radius: 999px;
    overflow: hidden;
}

.alignment-meter-fill,
.clean-progress-fill {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, var(--danger) 0%, var(--warning) 45%, var(--success) 100%);
    transition: width 0.08s linear;
}

.alignment-meter-fill[data-level="good"] {
    filter: saturate(1.1);
}

.alignment-hint,
.clean-hint {
    display: block;
    margin-top: 0.35rem;
    font-size: 0.75rem;
    color: var(--text-muted);
}

.attachment-guide.disabled-guide {
    opacity: 0.85;
    border-color: var(--warning);
}

/* Guided setup redesign */
.setup-stepper {
    grid-column: 1 / 3;
    display: grid;
    grid-template-columns: repeat(3, minmax(140px, 1fr));
    gap: 0.6rem;
}

.setup-step-chip {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 0.45rem 0.7rem;
    background: #fff;
    color: var(--text-secondary);
    transition: var(--transition-slow);
    font-size: 0.84rem;
    min-height: 46px;
}

.setup-step-chip .step-dot {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--bg-primary);
    font-weight: 700;
    color: var(--text-secondary);
    font-size: 0.74rem;
}

.setup-step-chip .chip-text {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-weight: 700;
}

.setup-step-chip .chip-check {
    margin-left: auto;
    display: none;
    color: var(--success);
}

.setup-step-chip.active {
    border-color: #2563eb;
    background: #eff6ff;
    color: #1e40af;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.18);
}

.setup-step-chip.completed {
    border-color: #22c55e;
    background: #ecfdf5;
    color: #166534;
}

.setup-step-chip.completed .chip-check {
    display: inline-flex;
    animation: popIn 0.25s ease;
}

.setup-step-chip.dimmed {
    opacity: 0.58;
}

.setup-step-chip .fa-circle-info {
    color: #64748b;
    font-size: 0.8rem;
}

.setup-guidance-banner {
    grid-column: 1 / 3;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 0.95rem;
    border-radius: var(--radius);
    background: #f0f9ff;
    border: 1px solid #bae6fd;
}

.guidance-icon {
    width: 34px;
    height: 34px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: #dbeafe;
    color: #1d4ed8;
}

.guidance-text-wrap p {
    margin: 0;
    font-size: 0.98rem;
    font-weight: 700;
    color: #0f172a;
}

.guidance-text-wrap small {
    color: #1e40af;
    font-weight: 600;
}

.wipe-direction-hint {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.75rem;
    color: #0369a1;
    animation: swipeHint 1.2s ease-in-out infinite;
}

@keyframes swipeHint {
    0% { transform: translateX(-6px); opacity: 0.55; }
    50% { transform: translateX(6px); opacity: 1; }
    100% { transform: translateX(-6px); opacity: 0.55; }
}

.ghost-placement {
    margin-top: 0.8rem;
    border: 2px dashed #60a5fa;
    border-radius: 999px;
    color: #2563eb;
    padding: 0.35rem 0.65rem;
    display: none;
    align-items: center;
    gap: 0.35rem;
    background: rgba(219, 234, 254, 0.7);
    animation: ghostPulse 1.1s ease-in-out infinite;
}

.ghost-placement.visible {
    display: inline-flex;
}

@keyframes ghostPulse {
    0%, 100% { transform: scale(1); opacity: 0.65; }
    50% { transform: scale(1.04); opacity: 1; }
}

.instruction-step.dimmed-step {
    opacity: 0.55;
    filter: grayscale(0.08);
}

.alignment-feedback {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    margin-top: 0.4rem;
    font-size: 0.82rem;
    font-weight: 700;
}

.alignment-feedback[data-level="low"] {
    color: #b91c1c;
}

.alignment-feedback[data-level="mid"] {
    color: #92400e;
}

.alignment-feedback[data-level="good"] {
    color: #166534;
}

.alignment-meter-fill[data-level="low"] {
    background: #ef4444;
}

.alignment-meter-fill[data-level="mid"] {
    background: #f59e0b;
}

.alignment-meter-fill[data-level="good"] {
    background: #22c55e;
}

.pulse-oximeter.alignment-good,
.finger.alignment-good {
    animation: successGlow 0.8s ease-in-out infinite;
}

@keyframes successGlow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.28), var(--shadow-lg); }
    50% { box-shadow: 0 0 0 7px rgba(34, 197, 94, 0.12), var(--shadow-lg); }
}

.setup-metrics-panel {
    grid-column: 1 / 3;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 0.85rem 1rem;
    background: #fff;
    box-shadow: var(--shadow-sm);
}

.overall-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.83rem;
    font-weight: 700;
    color: var(--text-secondary);
    margin-bottom: 0.35rem;
}

.overall-bar {
    position: relative;
    height: 12px;
    border-radius: 999px;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    overflow: visible;
}

.overall-fill {
    height: 100%;
    width: 0%;
    border-radius: 999px;
    background: linear-gradient(90deg, #60a5fa 0%, #22c55e 100%);
    transition: width 0.25s ease;
}

.milestone {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 19px;
    height: 19px;
    border-radius: 50%;
    background: #e2e8f0;
    color: #64748b;
    font-size: 0.68rem;
    font-weight: 800;
    display: grid;
    place-items: center;
    border: 1px solid #cbd5e1;
}

.milestone.m1 { left: 33%; }
.milestone.m2 { left: 66%; }
.milestone.m3 { left: 100%; }

.milestone.achieved {
    background: #22c55e;
    color: #fff;
    border-color: #16a34a;
}

.setup-live-message {
    margin: 0.65rem 0 0;
    font-size: 0.88rem;
    font-weight: 700;
    color: #0f172a;
}

.setup-live-message[data-tone="warning"] { color: #b45309; }
.setup-live-message[data-tone="success"] { color: #166534; }
.setup-live-message[data-tone="info"] { color: #1d4ed8; }

.setup-success-badge {
    margin-top: 0.6rem;
    display: none;
    align-items: center;
    gap: 0.4rem;
    color: #166534;
    font-weight: 800;
    background: #ecfdf5;
    border: 1px solid #86efac;
    border-radius: 999px;
    padding: 0.35rem 0.7rem;
    width: fit-content;
}

.setup-success-badge.visible {
    display: inline-flex;
    animation: badgeDrop 0.35s ease;
}

@keyframes badgeDrop {
    from { transform: translateY(-8px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

@keyframes popIn {
    from { transform: scale(0.5); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}

/* Larger touch targets for mobile setup interactions */
@media (max-width: 768px) {
    .setup-stepper {
        grid-template-columns: 1fr;
    }

    .setup-guidance-banner {
        align-items: flex-start;
    }

    .pulse-oximeter {
        width: 220px;
        height: 140px;
    }

    .cleaning-cloth {
        min-height: 44px;
        padding: 0.6rem 0.85rem;
        font-size: 0.86rem;
    }

    .setup-live-message {
        font-size: 0.92rem;
    }
}