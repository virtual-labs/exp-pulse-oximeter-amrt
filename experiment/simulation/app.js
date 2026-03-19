/* =========================================
   Pulse Oximeter Virtual Lab — Application Controller (Improved Setup Interactivity)
   ========================================= */

function createDefaultState() {
    return {
        currentStep: 0,
        completedSteps: new Set(),
        equipmentExplored: new Set(),
        selectedCondition: 'healthy',
        isMonitoring: false,
        isPaused: false,
        recordedMeasurements: [],
        engine: null,
        setupCompleted: {
            power: true,
            clean: false,
            attach: false,
            verify: false
        },
        waveformInterval: null,
        dataInterval: null,
        attachmentComplete: false,

        // New interactive setup state
        cleaningProgress: 0,
        isCleaning: false,
        cleaningWithCloth: false,
        setupGuideStep: 'clean',
        attachmentScore: 0,
        attachmentThreshold: 60,
        dragOffsetX: 0,
        dragOffsetY: 0,
        draggingAttachment: false,
        pendingVerifyTimeout: null,

        // Waveform control state
        waveformSpeed: 2, // default matches HTML selected
        waveformScale: 2,

        // Monitoring rest mode
        isResting: false,
        restIntensity: 0,
        isGlossaryOpen: false
    };
}

// Global State
const state = createDefaultState();
let lastGlossaryTrigger = null;


// Equipment Data
const equipmentData = {
    'oximeter-device': {
        name: 'Pulse Oximeter Device',
        image: `<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg" class="equip-illustration">
  <rect x="20" y="10" width="200" height="140" rx="20" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
  <rect x="35" y="25" width="170" height="90" rx="8" fill="#0f172a" stroke="#1e40af" stroke-width="1.5"/>
  <text x="50" y="68" font-family="monospace" font-size="36" fill="#4ade80" font-weight="bold">98</text>
  <text x="118" y="68" font-family="monospace" font-size="18" fill="#4ade80">%</text>
  <text x="50" y="86" font-family="monospace" font-size="11" fill="#94a3b8">SpO₂</text>
  <line x1="140" y1="30" x2="140" y2="108" stroke="#1e40af" stroke-width="1" stroke-dasharray="3,2"/>
  <text x="148" y="68" font-family="monospace" font-size="28" fill="#f87171" font-weight="bold">72</text>
  <text x="148" y="86" font-family="monospace" font-size="11" fill="#94a3b8">bpm</text>
  <polyline points="38,100 50,100 58,84 66,116 74,90 82,106 90,100 105,100" stroke="#4ade80" stroke-width="2" fill="none"/>
  <rect x="152" y="98" width="5" height="4" fill="#3b82f6" rx="1"/>
  <rect x="160" y="93" width="5" height="9" fill="#3b82f6" rx="1"/>
  <rect x="168" y="87" width="5" height="15" fill="#3b82f6" rx="1"/>
  <rect x="176" y="81" width="5" height="21" fill="#3b82f6" rx="1"/>
  <circle cx="200" cy="120" r="7" fill="#22c55e"/>
  <circle cx="200" cy="120" r="4" fill="#4ade80"/>
  <rect x="38" y="128" width="24" height="12" rx="3" fill="#374151"/>
  <rect x="42" y="131" width="16" height="6" rx="1" fill="#1f2937"/>
  <text x="75" y="148" font-family="sans-serif" font-size="9" fill="#64748b">Fingertip Pulse Oximeter</text>
</svg>`,
        content: `
            <p>The pulse oximeter is a non-invasive medical device that measures oxygen saturation (SpO2) and pulse rate using photoplethysmography.</p>
            <ul>
                <li><strong>Display:</strong> Digital LCD showing SpO2, pulse rate, and signal strength</li>
                <li><strong>Processor:</strong> Microcontroller for signal analysis and calculations</li>
                <li><strong>Power:</strong> Battery-operated for portability</li>
                <li><strong>Alarms:</strong> Audio/visual alerts for abnormal readings</li>
                <li><strong>Memory:</strong> Stores recent measurements and trends</li>
            </ul>
            <p>Modern pulse oximeters provide continuous monitoring with high accuracy in most clinical conditions.</p>
        `
    },
    'sensor-probe': {
        name: 'Sensor Probe',
        image: `<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg" class="equip-illustration">
  <path d="M10,140 Q45,118 85,98 Q105,88 112,78" stroke="#6b7280" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M10,140 Q45,118 85,98 Q105,88 112,78" stroke="#9ca3af" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M102,18 Q155,13 202,20 L200,80 Q155,85 104,80 Z" fill="#bfdbfe" stroke="#93c5fd" stroke-width="1.5"/>
  <path d="M102,88 Q155,84 202,90 L200,142 Q155,148 104,142 Z" fill="#60a5fa" stroke="#3b82f6" stroke-width="1.5"/>
  <rect x="148" y="79" width="8" height="14" fill="#1d4ed8" rx="2"/>
  <circle cx="132" cy="44" r="11" fill="#ef4444"/>
  <circle cx="132" cy="44" r="6" fill="#fca5a5"/>
  <text x="120" y="66" font-family="sans-serif" font-size="9" fill="#1e3a8a" font-weight="bold">660nm</text>
  <circle cx="170" cy="44" r="11" fill="#7c3aed"/>
  <circle cx="170" cy="44" r="6" fill="#c4b5fd"/>
  <text x="158" y="66" font-family="sans-serif" font-size="9" fill="#1e3a8a" font-weight="bold">940nm</text>
  <line x1="132" y1="88" x2="132" y2="102" stroke="#fca5a5" stroke-width="1.5" stroke-dasharray="2,1"/>
  <line x1="170" y1="88" x2="170" y2="102" stroke="#c4b5fd" stroke-width="1.5" stroke-dasharray="2,1"/>
  <text x="88" y="158" font-family="sans-serif" font-size="10" fill="#374151">Clip-on Finger Sensor Probe</text>
</svg>`,
        content: `
            <p>The sensor probe contains the optical components that measure blood oxygenation through transmitted light.</p>
            <ul>
                <li><strong>Design:</strong> Clip-on finger probe for easy application</li>
                <li><strong>Materials:</strong> Medical-grade plastic with soft padding</li>
                <li><strong>Cable:</strong> Flexible cable connecting to main unit</li>
                <li><strong>Positioning:</strong> Designed to align LEDs and photodetector optimally</li>
                <li><strong>Comfort:</strong> Spring-loaded clip provides gentle pressure</li>
            </ul>
            <p>Proper sensor placement is critical for accurate readings and patient comfort during monitoring.</p>
        `
    },
    'led-system': {
        name: 'LED Light Sources',
        image: `<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg" class="equip-illustration">
  <rect x="5" y="5" width="230" height="150" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
  <circle cx="80" cy="75" r="36" fill="#ef4444" opacity="0.12"/>
  <circle cx="80" cy="75" r="24" fill="#ef4444" opacity="0.25"/>
  <path d="M70,75 L70,106 L90,106 L90,75 Q80,59 70,75 Z" fill="#ef4444"/>
  <path d="M70,106 L90,106 L88,122 L72,122 Z" fill="#dc2626"/>
  <rect x="76" y="122" width="4" height="18" fill="#9ca3af"/>
  <rect x="84" y="122" width="4" height="12" fill="#9ca3af"/>
  <line x1="80" y1="57" x2="72" y2="33" stroke="#fca5a5" stroke-width="2" opacity="0.9"/>
  <line x1="80" y1="57" x2="92" y2="38" stroke="#fca5a5" stroke-width="2" opacity="0.9"/>
  <line x1="80" y1="57" x2="104" y2="52" stroke="#fca5a5" stroke-width="2" opacity="0.9"/>
  <text x="52" y="148" font-family="sans-serif" font-size="13" fill="#ef4444" font-weight="bold">660 nm</text>
  <text x="60" y="160" font-family="sans-serif" font-size="9" fill="#6b7280">Red LED</text>
  <circle cx="165" cy="75" r="36" fill="#7c3aed" opacity="0.10"/>
  <circle cx="165" cy="75" r="24" fill="#7c3aed" opacity="0.22"/>
  <path d="M155,75 L155,106 L175,106 L175,75 Q165,59 155,75 Z" fill="#7c3aed"/>
  <path d="M155,106 L175,106 L173,122 L157,122 Z" fill="#6d28d9"/>
  <rect x="161" y="122" width="4" height="18" fill="#9ca3af"/>
  <rect x="169" y="122" width="4" height="12" fill="#9ca3af"/>
  <line x1="165" y1="57" x2="157" y2="33" stroke="#c4b5fd" stroke-width="2" opacity="0.7"/>
  <line x1="165" y1="57" x2="177" y2="38" stroke="#c4b5fd" stroke-width="2" opacity="0.7"/>
  <line x1="165" y1="57" x2="189" y2="52" stroke="#c4b5fd" stroke-width="2" opacity="0.7"/>
  <text x="133" y="148" font-family="sans-serif" font-size="13" fill="#7c3aed" font-weight="bold">940 nm</text>
  <text x="137" y="160" font-family="sans-serif" font-size="9" fill="#6b7280">Infrared LED</text>
  <rect x="128" y="14" width="88" height="16" rx="4" fill="#7c3aed" opacity="0.15"/>
  <text x="132" y="25" font-family="sans-serif" font-size="9" fill="#7c3aed">Invisible to human eye</text>
</svg>`,
        content: `
            <p>Dual wavelength LEDs enable differentiation between oxygenated and deoxygenated hemoglobin.</p>
            <ul>
                <li><strong>Red LED (660nm):</strong> Absorbed more by deoxygenated hemoglobin</li>
                <li><strong>Infrared LED (940nm):</strong> Absorbed more by oxygenated hemoglobin</li>
                <li><strong>Timing:</strong> LEDs pulse alternately hundreds of times per second</li>
                <li><strong>Intensity:</strong> Controlled to ensure safe exposure levels</li>
                <li><strong>Calibration:</strong> Factory calibrated for accurate measurements</li>
            </ul>
            <p>The Beer-Lambert law governs how light absorption relates to hemoglobin concentrations.</p>
        `
    },
    'photodetector': {
        name: 'Photodetector',
        image: `<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg" class="equip-illustration">
  <rect x="20" y="20" width="200" height="120" rx="8" fill="#064e3b" stroke="#065f46" stroke-width="2"/>
  <line x1="58" y1="20" x2="58" y2="52" stroke="#d4a017" stroke-width="1.5"/>
  <line x1="78" y1="20" x2="78" y2="52" stroke="#d4a017" stroke-width="1.5"/>
  <line x1="98" y1="20" x2="98" y2="52" stroke="#d4a017" stroke-width="1.5"/>
  <line x1="58" y1="108" x2="58" y2="140" stroke="#d4a017" stroke-width="1.5"/>
  <line x1="78" y1="108" x2="78" y2="140" stroke="#d4a017" stroke-width="1.5"/>
  <rect x="44" y="50" width="152" height="60" rx="5" fill="#111827"/>
  <circle cx="120" cy="80" r="26" fill="#0d9488" opacity="0.85"/>
  <circle cx="120" cy="80" r="20" fill="#0f172a"/>
  <circle cx="120" cy="80" r="13" fill="#1d4ed8"/>
  <circle cx="120" cy="80" r="7" fill="#1e40af"/>
  <circle cx="113" cy="73" r="3" fill="white" opacity="0.4"/>
  <line x1="198" y1="46" x2="158" y2="68" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4,2"/>
  <polygon points="158,68 165,64 163,73" fill="#fbbf24"/>
  <line x1="198" y1="80" x2="154" y2="80" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4,2"/>
  <polygon points="154,80 161,76 161,84" fill="#fbbf24"/>
  <text x="48" y="120" font-family="monospace" font-size="8" fill="#4ade80">PD-SL1</text>
  <rect x="56" y="108" width="4" height="14" fill="#d4a017" rx="1"/>
  <rect x="66" y="108" width="4" height="14" fill="#d4a017" rx="1"/>
  <rect x="76" y="108" width="4" height="14" fill="#d4a017" rx="1"/>
  <rect x="86" y="108" width="4" height="14" fill="#d4a017" rx="1"/>
  <text x="150" y="115" font-family="sans-serif" font-size="9" fill="#6ee7b7">Silicon Photodiode</text>
  <text x="150" y="128" font-family="sans-serif" font-size="8" fill="#4ade80">Sensitive: 400–1100 nm</text>
</svg>`,
        content: `
            <p>The photodetector measures the intensity of light transmitted through the finger tissue.</p>
            <ul>
                <li><strong>Type:</strong> Silicon photodiode sensitive to both red and IR light</li>
                <li><strong>Function:</strong> Converts light intensity to electrical signals</li>
                <li><strong>Processing:</strong> Signals are amplified and digitized</li>
                <li><strong>Filtering:</strong> Electronic filters remove noise and artifacts</li>
                <li><strong>Analysis:</strong> Ratio calculation determines SpO2 percentage</li>
            </ul>
            <p>The photodetector must accurately measure both AC (pulsatile) and DC (baseline) components.</p>
        `
    }
};

// Learning Objectives
const learningObjectives = [
    'Understand pulse oximetry principles and Beer-Lambert law',
    'Demonstrate proper sensor placement and setup',
    'Interpret SpO2 and pulse rate measurements',
    'Recognize normal vs. abnormal readings',
    'Identify factors affecting measurement accuracy',
    'Assess perfusion index and signal quality'
];

// Initialize Application
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

function initializeApp() {
    console.log('Initializing Pulse Oximeter Virtual Lab...');

    // Initialize engine
    state.engine = new PulseOximeterEngine();

    // Show loading screen and initialize
    showLoadingScreen();

    // Setup event listeners
    setupEventListeners();

    // Initialize drag and drop + setup interactions
    initializeDragAndDrop();
    initializeCleaningInteraction();

    // Load initial content
    setTimeout(() => {
        hideLoadingScreen();
        updateNavigationState();
        updateLearningObjectives();
        renderSetupStepUI(); // ensure UI matches state if user lands on setup
    }, 3000);
}

function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadFill = document.getElementById('load-progress');

    if (loadingScreen) {
        loadingScreen.style.display = 'flex';

        // Animate loading bar
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
            }
            if (loadFill) {
                loadFill.style.width = progress + '%';
            }
        }, 200);
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const app = document.getElementById('app');

    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
    if (app) {
        app.classList.remove('hidden');
    }
}

function setupEventListeners() {
    // Navigation
    document.addEventListener('click', handleNavigation);

    // Equipment explorer
    const equipmentItems = document.querySelectorAll('.equipment-item');
    equipmentItems.forEach(item => {
        item.addEventListener('click', () => showEquipmentDetails(item.dataset.equipment));
    });

    // Patient condition selector
    const conditionOptions = document.querySelectorAll('.condition-option');
    conditionOptions.forEach(option => {
        option.addEventListener('click', () => selectCondition(option.dataset.condition));
    });

    // Monitoring controls
    const startBtn = document.getElementById('start-monitoring-btn');
    const pauseBtn = document.getElementById('pause-monitoring-btn');
    const restBtn = document.getElementById('rest-monitoring-btn');
    const stopBtn = document.getElementById('stop-monitoring-btn');

    if (startBtn) startBtn.addEventListener('click', startMonitoring);
    if (pauseBtn) pauseBtn.addEventListener('click', pauseMonitoring);
    if (restBtn) restBtn.addEventListener('click', toggleRestMode);
    if (stopBtn) stopBtn.addEventListener('click', stopMonitoring);

    // Record measurement
    const recordBtn = document.getElementById('record-measurement-btn');
    if (recordBtn) recordBtn.addEventListener('click', recordMeasurement);

    // Glossary drawer controls
    const glossaryToggles = getGlossaryToggleButtons();
    const glossaryModal = document.getElementById('glossary-modal');
    const closeGlossaryBtn = document.getElementById('close-glossary-modal');
    const glossarySearch = document.getElementById('glossary-search');
    const resetButtons = document.querySelectorAll('[data-action="reset-lab"]');
    const helpModal = document.getElementById('help-modal');
    const closeHelpBtn = document.getElementById('close-help-modal');

    glossaryToggles.forEach((toggle) => {
        toggle.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            lastGlossaryTrigger = toggle;
            if (isGlossaryVisible()) {
                closeGlossary();
            } else {
                openGlossary();
            }
        });
    });

    if (closeGlossaryBtn) closeGlossaryBtn.addEventListener('click', closeGlossary);
    if (glossaryModal) {
        glossaryModal.addEventListener('click', (e) => {
            if (e.target === glossaryModal) closeGlossary();
        });
    }
    if (glossarySearch) glossarySearch.addEventListener('input', filterGlossaryTerms);
    resetButtons.forEach((button) => {
        button.addEventListener('click', resetLabExperience);
    });

    if (closeHelpBtn) {
        closeHelpBtn.addEventListener('click', () => hideModal('help-modal'));
    }
    if (helpModal) {
        helpModal.addEventListener('click', (e) => {
            if (e.target === helpModal) hideModal('help-modal');
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isGlossaryVisible()) {
            closeGlossary();
        }
    });

    // Glossary button is handled by direct listener above.

    // Generate report
    const reportBtn = document.getElementById('generate-report-btn');
    if (reportBtn) reportBtn.addEventListener('click', generateReport);

    // Complete lab
    const completeBtn = document.getElementById('complete-lab-btn');
    if (completeBtn) completeBtn.addEventListener('click', completeLab);

    // Waveform controls (now functional)
    const speedSel = document.getElementById('waveform-speed');
    const scaleSel = document.getElementById('waveform-scale');
    if (speedSel) {
        speedSel.addEventListener('change', (e) => {
            state.waveformSpeed = Number(e.target.value) || 1;
        });
    }
    if (scaleSel) {
        scaleSel.addEventListener('change', (e) => {
            state.waveformScale = Number(e.target.value) || 1;
        });
    }
}

function getStepElement(stepNumber) {
    return document.getElementById(`step-${stepNumber}`)
        || document.querySelector(`.step-content[data-step="${stepNumber}"]`);
}

function isStepUnlocked(stepNumber) {
    const targetStep = Number(stepNumber);
    if (!Number.isInteger(targetStep) || targetStep < 0) {
        return false;
    }

    return Boolean(getStepElement(targetStep));
}

function handleNavigation(event) {
    const origin = event.target;
    if (!(origin instanceof Element)) {
        return;
    }

    // Don't interfere with glossary button click
    const glossaryBtn = origin.closest('#btn-glossary, .btn-glossary, [data-action="toggle-glossary"]');
    if (glossaryBtn) {
        return;
    }

    const startButton = origin.closest('#start-lab-btn');
    if (startButton) {
        event.preventDefault();
        startLabExperience();
        return;
    }

    // Step navigation - prevent navigation to steps that haven't been unlocked
    const navStep = origin.closest('.nav-step');
    if (navStep) {
        event.preventDefault();
        const stepNumber = Number(navStep.dataset.step);
        if (Number.isInteger(stepNumber)) {
            // Can only navigate to completed steps, current step, or step 0
            if (stepNumber === 0 || stepNumber === state.currentStep || state.completedSteps.has(stepNumber)) {
                navigateToStep(stepNumber);
            } else if (stepNumber === state.currentStep + 1 && state.completedSteps.has(state.currentStep)) {
                // Can navigate to next step if current is completed
                navigateToStep(stepNumber);
            } else {
                showNotification('Complete the current section first.', 'warning');
            }
        }
    }

    // Next/Previous buttons
    const nextButton = origin.closest('.next-step');
    if (nextButton) {
        event.preventDefault();
        if (nextButton.disabled) {
            showNotification('Complete all required tasks in this section first.', 'warning');
            return;
        }

        state.completedSteps.add(state.currentStep);
        updateNavigationState();

        const nextStepAttr = nextButton.dataset.next;
        if (nextStepAttr !== undefined) {
            const nextStep = Number(nextStepAttr);
            if (Number.isInteger(nextStep)) {
                navigateToStep(nextStep);
            }
        }
    }

    const prevButton = origin.closest('.prev-step');
    if (prevButton) {
        event.preventDefault();
        const prevStepAttr = prevButton.dataset.prev;
        if (prevStepAttr !== undefined) {
            const prevStep = Number(prevStepAttr);
            if (Number.isInteger(prevStep)) {
                navigateToStep(prevStep);
            }
        }
    }
}

function navigateToStep(stepNumber) {
    const targetStep = Number(stepNumber);

    // Guard against invalid navigation input.
    if (!Number.isInteger(targetStep) || targetStep < 0) {
        return;
    }

    const targetStepElement = getStepElement(targetStep);
    if (!targetStepElement) {
        return;
    }

    // Validate step progression: can't skip ahead
    // Can go backward or stay on current step, or move to next completed step
    if (targetStep > state.currentStep) {
        // Moving forward: check if current step is completed
        if (!state.completedSteps.has(state.currentStep) && state.currentStep !== 0) {
            showNotification('Complete the current section first.', 'warning');
            return;
        }
    }

    // Hide current step
    const currentStepElement = getStepElement(state.currentStep);
    if (currentStepElement) currentStepElement.classList.remove('active');

    // Show new step
    targetStepElement.classList.add('active', 'fadeIn');

    // Update state
    state.currentStep = targetStep;

    updateNavigationState();
    initializeStepContent(targetStep);

    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function updateNavigationState() {
    const navSteps = document.querySelectorAll('.nav-step');

    navSteps.forEach((step, index) => {
        step.classList.remove('active', 'completed', 'locked');

        if (index === state.currentStep) step.classList.add('active');
        else if (state.completedSteps.has(index)) step.classList.add('completed');
    });
}

function initializeStepContent(stepNumber) {
    switch (stepNumber) {
        case 2:
            initializeSetupStep();
            break;
        case 3:
            initializeMonitoringStep();
            break;
        case 4:
            initializeAnalysisStep();
            break;
        default:
            break;
    }
}

function initializeSetupStep() {
    renderSetupStepUI();
    updateDeviceStatus();
}

function initializeMonitoringStep() {
    setupWaveformCanvas();
    updateConditionDisplay();

    if (state.attachmentComplete) {
        setTimeout(startMonitoring, 800);
    }
}

function updateConditionDisplay() {
    const options = document.querySelectorAll('.condition-option');
    options.forEach(option => {
        option.classList.toggle('active', option.dataset.condition === state.selectedCondition);
    });
}

function initializeAnalysisStep() {
    updateAnalysisResults();
    setupAnalysisChart();
}

// Equipment Explorer
function showEquipmentDetails(equipmentId) {
    const equipment = equipmentData[equipmentId];
    const infoPanel = document.getElementById('equipment-info');

    if (equipment && infoPanel) {
        infoPanel.innerHTML = `
            <div class="equipment-detail-content">
                <div class="equip-image-wrap">${equipment.image}</div>
                <h4>${equipment.name}</h4>
                ${equipment.content}
            </div>
        `;

        state.equipmentExplored.add(equipmentId);

        const equipmentItem = document.querySelector(`.equipment-item[data-equipment="${equipmentId}"]`);
        if (equipmentItem) equipmentItem.classList.add('explored');

        if (state.equipmentExplored.size >= Object.keys(equipmentData).length) {
            enableStepProgression(1);
        }
    }
}

/* =========================================
   Setup Step — NEW Interactive Cleaning
   ========================================= */

function initializeCleaningInteraction() {
    // The cleaning zone is inside the oximeter clip bottom in step 2.
    document.addEventListener('pointerdown', onCleanPointerDown);
    document.addEventListener('pointermove', onCleanPointerMove);
    document.addEventListener('pointerup', onCleanPointerUp);
    document.addEventListener('pointercancel', onCleanPointerUp);
}

function onCleanPointerDown(e) {
    if (state.currentStep !== 2) return;
    if (state.setupCompleted.clean) return;

    // Never intercept touches on the sidebar — let them reach their click handlers.
    if (e.target instanceof Element && e.target.closest('#sidebar-nav')) return;

    const zone = document.getElementById('cleaning-zone');
    const cloth = document.getElementById('cleaning-cloth');
    if (!zone) return;

    const downOnCloth = cloth && (e.target === cloth || cloth.contains(e.target));
    const downOnZone = e.target === zone || zone.contains(e.target);

    if (downOnCloth || downOnZone) {
        state.isCleaning = true;
        state.cleaningWithCloth = Boolean(downOnCloth);
        setSetupLiveMessage('Nice! Keep swiping to clean the sensor.', 'info');
        zone.classList.add('cleaning-active');
        if (cloth) cloth.classList.toggle('active', downOnCloth);
    }
}

function onCleanPointerMove(e) {
    if (!state.isCleaning) return;
    if (state.currentStep !== 2) return;
    if (state.setupCompleted.clean) return;

    const zone = document.getElementById('cleaning-zone');
    const cloth = document.getElementById('cleaning-cloth');
    if (!zone) return;

    if (cloth && state.cleaningWithCloth) {
        const parentRect = cloth.parentElement?.getBoundingClientRect();
        if (parentRect) {
            const left = e.clientX - parentRect.left - (cloth.offsetWidth / 2);
            const top = e.clientY - parentRect.top - (cloth.offsetHeight / 2);
            cloth.style.transform = `translate(${left}px, ${top}px)`;
        }
    }

    // Only count motion while pointer is inside zone
    const inside = isPointerInsideElement(e.clientX, e.clientY, zone);
    if (!inside) return;

    // Add progress based on movement
    state.cleaningProgress = Math.min(100, state.cleaningProgress + 1.2);
    updateCleaningUI();

    if (state.cleaningProgress >= 100) {
        state.isCleaning = false;
        state.cleaningWithCloth = false;
        zone.classList.remove('cleaning-active');
        if (cloth) {
            cloth.classList.remove('active');
            cloth.style.transform = '';
        }
        markSetupStepCompleted('clean');
        setSetupLiveMessage('Great job! Sensor cleaned. Now drag the clip to the fingertip.', 'success');
        showNotification('Sensor cleaned successfully. Great infection control practice.', 'success');
    }
}

function onCleanPointerUp() {
    state.isCleaning = false;
    state.cleaningWithCloth = false;
    const zone = document.getElementById('cleaning-zone');
    const cloth = document.getElementById('cleaning-cloth');
    if (zone) zone.classList.remove('cleaning-active');
    if (cloth) {
        cloth.classList.remove('active');
        cloth.style.transform = '';
    }
}

function isPointerInsideElement(x, y, element) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

function updateCleaningUI() {
    const bar = document.getElementById('clean-progress-fill');
    const txt = document.getElementById('clean-progress-text');
    if (bar) bar.style.width = `${state.cleaningProgress}%`;
    if (txt) txt.textContent = `${Math.round(state.cleaningProgress)}%`;

    const encouragement = document.getElementById('setup-encouragement');
    if (encouragement && !state.setupCompleted.clean) {
        encouragement.textContent = state.cleaningProgress >= 70
            ? 'Almost there!'
            : 'Keep swiping...';
    }
}

function renderSetupStepUI() {
    // Update instruction steps based on state without re-triggering logic.
    Object.keys(state.setupCompleted).forEach(stepId => {
        setInstructionStepVisual(stepId, state.setupCompleted[stepId]);
    });

    // Update clean interaction UI
    updateCleaningUI();

    // Determine current guided step (clean -> attach -> verify)
    state.setupGuideStep = !state.setupCompleted.clean
        ? 'clean'
        : !state.setupCompleted.attach
            ? 'attach'
            : 'verify';

    updateSetupGuideUI();
    updateSetupOverallProgress();

    // Keep instruction list focused on current action to reduce cognitive load.
    document.querySelectorAll('.instruction-step[data-step="clean"], .instruction-step[data-step="attach"], .instruction-step[data-step="verify"]').forEach(stepEl => {
        const stepId = stepEl.getAttribute('data-step');
        const isCurrent = stepId === state.setupGuideStep;
        const isCompleted = stepId === 'clean'
            ? state.setupCompleted.clean
            : stepId === 'attach'
                ? state.setupCompleted.attach
                : state.setupCompleted.verify;

        stepEl.classList.toggle('current', isCurrent);
        stepEl.classList.toggle('dimmed-step', !isCurrent && !isCompleted);
    });

    // Gate attachment until clean completed
    const guide = document.getElementById('attachment-guide');
    if (guide) {
        const canAttach = state.setupCompleted.clean;
        guide.classList.toggle('disabled-guide', !canAttach);
        guide.querySelector('p')?.replaceChildren();
        guide.querySelector('p')?.insertAdjacentHTML(
            'afterbegin',
            canAttach
                ? '<strong>Step 3:</strong> Drag the oximeter to the fingertip. Aim for a high alignment score.'
                : '<strong>Step 2:</strong> Use the cloth to wipe the marked sensor zone first.'
        );
    }

    // Continue button
    const continueBtn = document.getElementById('setup-continue-btn');
    const canContinue = Object.values(state.setupCompleted).every(Boolean);
    if (continueBtn) continueBtn.disabled = !canContinue;
}

function updateSetupGuideUI() {
    const chips = document.querySelectorAll('.setup-step-chip');
    chips.forEach(chip => {
        const guideStep = chip.getAttribute('data-guide-step');
        const isCurrent = guideStep === state.setupGuideStep;
        const isCompleted = guideStep === 'clean'
            ? state.setupCompleted.clean
            : guideStep === 'attach'
                ? state.setupCompleted.attach
                : state.setupCompleted.verify;

        chip.classList.toggle('active', isCurrent);
        chip.classList.toggle('completed', isCompleted);
        chip.classList.toggle('dimmed', !isCurrent && !isCompleted);
    });

    const actionText = document.getElementById('setup-action-text');
    const encouragement = document.getElementById('setup-encouragement');
    const wipeHint = document.getElementById('wipe-direction-hint');
    const ghostPlacement = document.getElementById('ghost-placement');

    if (state.setupGuideStep === 'clean') {
        if (actionText) actionText.textContent = 'Step 1: Swipe to clean sensor.';
        if (encouragement) encouragement.textContent = 'Use smooth swipes with the cloth.';
        if (wipeHint) wipeHint.style.display = 'flex';
        if (ghostPlacement) ghostPlacement.classList.remove('visible');
        if (!state.setupCompleted.clean) setSetupLiveMessage('Ready when you are. Start by swiping to clean.', 'info');
    } else if (state.setupGuideStep === 'attach') {
        if (actionText) actionText.textContent = 'Step 2: Drag device to fingertip.';
        if (encouragement) encouragement.textContent = 'Aim for green alignment (>= 60%).';
        if (wipeHint) wipeHint.style.display = 'none';
        if (ghostPlacement) ghostPlacement.classList.add('visible');
        if (!state.setupCompleted.attach) setSetupLiveMessage('Now drag the clip. Green means good alignment.', 'info');
    } else {
        if (actionText) actionText.textContent = 'Step 3: Hold still to verify signal.';
        if (encouragement) encouragement.textContent = 'Perfect placement. Waiting for signal confirmation.';
        if (wipeHint) wipeHint.style.display = 'none';
        if (ghostPlacement) ghostPlacement.classList.remove('visible');
        if (!state.setupCompleted.verify) setSetupLiveMessage('Almost done. Hold steady for verification.', 'info');
    }
}

function updateSetupOverallProgress() {
    const completedCount = [state.setupCompleted.clean, state.setupCompleted.attach, state.setupCompleted.verify]
        .filter(Boolean).length;
    const overallText = document.getElementById('setup-overall-text');
    const overallFill = document.getElementById('setup-overall-fill');
    const successBadge = document.getElementById('setup-success-badge');

    if (overallText) overallText.textContent = `${completedCount} / 3 complete`;
    if (overallFill) overallFill.style.width = `${(completedCount / 3) * 100}%`;

    document.getElementById('milestone-clean')?.classList.toggle('achieved', state.setupCompleted.clean);
    document.getElementById('milestone-attach')?.classList.toggle('achieved', state.setupCompleted.attach);
    document.getElementById('milestone-verify')?.classList.toggle('achieved', state.setupCompleted.verify);

    if (successBadge) {
        successBadge.classList.toggle('visible', state.setupCompleted.verify);
    }
}

function setSetupLiveMessage(message, tone = 'info') {
    const liveMsg = document.getElementById('setup-live-message');
    if (!liveMsg) return;
    liveMsg.textContent = message;
    liveMsg.dataset.tone = tone;
}

function setInstructionStepVisual(stepId, completed) {
    const step = document.querySelector(`.instruction-step[data-step="${stepId}"]`);
    if (!step) return;

    if (completed) step.classList.add('completed');
    else step.classList.remove('completed');

    const status = step.querySelector('.step-status');
    if (!status) return;

    // For clean step, we override the content (no inline onclick button anymore)
    if (stepId === 'clean') {
        status.innerHTML = completed
            ? `<i class="fas fa-check"></i><span>Completed</span>`
            : `<span class="pending"><i class="fas fa-hand-sparkles"></i> Wipe the sensor zone</span>`;
        return;
    }

    if (completed) {
        status.innerHTML = '<i class="fas fa-check"></i><span>Completed</span>';
        status.classList.add('completed');
    } else {
        status.classList.remove('completed');
    }
}

function markSetupStepCompleted(stepId) {
    if (!state.setupCompleted.hasOwnProperty(stepId)) return;

    state.setupCompleted[stepId] = true;
    setInstructionStepVisual(stepId, true);

    // If everything is done, enable progression
    const allCompleted = Object.values(state.setupCompleted).every(Boolean);
    if (allCompleted) enableStepProgression(2);

    renderSetupStepUI();
    updateDeviceStatus();
}

/* =========================================
   Drag & Drop Attachment (Improved)
   ========================================= */

function initializeDragAndDrop() {
    const oximeter = document.getElementById('draggable-oximeter');
    const finger = document.getElementById('target-finger');
    if (!oximeter || !finger) return;

    let startX = 0, startY = 0;
    // Delta during current drag gesture
    let lastDx = 0, lastDy = 0;

    oximeter.style.cursor = 'grab';

    oximeter.addEventListener('mousedown', startDrag);
    oximeter.addEventListener('touchstart', (e) => {
        if (state.currentStep !== 2) return; // Don't block touch on other steps
        const t = e.touches && e.touches[0];
        if (t) startDrag({ clientX: t.clientX, clientY: t.clientY });
        e.preventDefault();
    }, { passive: false });

    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', (e) => {
        // Only block scroll/tap when actually dragging the oximeter — never block sidebar touches globally.
        if (!state.draggingAttachment) return;
        const t = e.touches && e.touches[0];
        if (t) drag({ clientX: t.clientX, clientY: t.clientY, preventDefault: () => {} });
        e.preventDefault();
    }, { passive: false });

    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    function startDrag(e) {
        if (state.currentStep !== 2) return;
        if (!state.setupCompleted.clean) {
            showNotification('Clean the sensor surface before attaching.', 'warning');
            return;
        }

        state.draggingAttachment = true;
        lastDx = 0;
        lastDy = 0;
        startX = e.clientX;
        startY = e.clientY;
        oximeter.style.zIndex = '1000';
        oximeter.style.cursor = 'grabbing';
        setSetupLiveMessage('Drag toward the fingertip target.', 'info');
    }

    function drag(e) {
        if (!state.draggingAttachment) return;
        e.preventDefault?.();

        lastDx = e.clientX - startX;
        lastDy = e.clientY - startY;
        // Use transform: translate so we never break out of normal flow
        oximeter.style.transform = `translate(${state.dragOffsetX + lastDx}px, ${state.dragOffsetY + lastDy}px)`;

        const score = computeAttachmentScore(oximeter, finger);
        state.attachmentScore = score;
        updateAttachmentUI(score);
        finger.classList.toggle('target-active', score > 0);
    }

    function endDrag() {
        if (!state.draggingAttachment) return;
        state.draggingAttachment = false;
        oximeter.style.cursor = 'grab';
        finger.classList.remove('target-active');

        const score = computeAttachmentScore(oximeter, finger);

        if (score >= state.attachmentThreshold) {
            state.dragOffsetX += lastDx;
            state.dragOffsetY += lastDy;
            completeAttachment();
        } else {
            if (score > 0 || lastDx !== 0 || lastDy !== 0) {
                showNotification(`Alignment too low (${Math.round(score)}%). Try centering on the fingertip.`, 'warning');
                setSetupLiveMessage('Try again. Move the clip until score turns green.', 'warning');
            }
            // Snap back to last committed position
            lastDx = 0;
            lastDy = 0;
            oximeter.style.transform = (state.dragOffsetX !== 0 || state.dragOffsetY !== 0)
                ? `translate(${state.dragOffsetX}px, ${state.dragOffsetY}px)`
                : '';
            updateAttachmentUI(0);
        }
    }
}

function computeAttachmentScore(oximeterEl, fingerEl) {
    if (!oximeterEl || !fingerEl) return 0;

    const oRect = oximeterEl.getBoundingClientRect();
    const fRect = fingerEl.getBoundingClientRect();

    // Score based on distance between centers
    const ox = oRect.left + oRect.width / 2;
    const oy = oRect.top + oRect.height / 2;

    const fx = fRect.left + fRect.width / 2;
    const fy = fRect.top + fRect.height / 4; // closer to fingertip

    const dx = ox - fx;
    const dy = oy - fy;

    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 260; // generous detection range

    const raw = Math.max(0, 1 - dist / maxDist);
    return raw * 100;
}

function updateAttachmentUI(score) {
    const scoreEl = document.getElementById('alignment-score');
    const meterFill = document.getElementById('alignment-meter-fill');
    const alignmentFeedback = document.getElementById('alignment-feedback');
    const oximeter = document.getElementById('draggable-oximeter');
    const finger = document.getElementById('target-finger');

    const safeScore = Math.max(0, Math.min(100, score || 0));
    if (scoreEl) scoreEl.textContent = `${Math.round(safeScore)}%`;
    if (meterFill) meterFill.style.width = `${safeScore}%`;

    // Color coding
    if (meterFill) {
        meterFill.dataset.level =
            safeScore >= state.attachmentThreshold ? 'good' :
                safeScore >= 50 ? 'mid' : 'low';
    }

    let feedbackClass = 'low';
    let feedbackText = 'Poor alignment - move closer';
    let tone = 'warning';
    if (safeScore >= state.attachmentThreshold) {
        feedbackClass = 'good';
        feedbackText = 'Excellent alignment - release to snap';
        tone = 'success';
    } else if (safeScore >= 50) {
        feedbackClass = 'mid';
        feedbackText = 'Good attempt - adjust a little';
        tone = 'info';
    }

    if (alignmentFeedback) {
        alignmentFeedback.dataset.level = feedbackClass;
        alignmentFeedback.innerHTML = `<i class="fas fa-circle"></i> ${feedbackText}`;
    }

    if (oximeter && finger) {
        const isGood = safeScore >= state.attachmentThreshold;
        oximeter.classList.toggle('alignment-good', isGood);
        finger.classList.toggle('alignment-good', isGood);
    }

    if (safeScore > 0) {
        setSetupLiveMessage(
            safeScore >= state.attachmentThreshold
                ? 'Good job! Release now for auto placement.'
                : safeScore >= 50
                    ? 'Almost there. Nudge it a bit more.'
                    : 'Try again and center the clip on fingertip.',
            tone
        );
    }
}

function completeAttachment() {
    const oximeter = document.getElementById('draggable-oximeter');
    const finger = document.getElementById('target-finger');
    const guide = document.getElementById('attachment-guide');

    if (oximeter && finger) {
        // Snap to finger by computing the remaining offset from current bounding rect
        const oRect = oximeter.getBoundingClientRect();
        const fRect = finger.getBoundingClientRect();
        const snapDx = (fRect.left + fRect.width / 2) - (oRect.left + oRect.width / 2);
        const snapDy = (fRect.top + fRect.height / 4) - (oRect.top + oRect.height / 2);

        const transformStr = oximeter.style.transform || '';
        const match = transformStr.match(/translate\((-?[\d.]+)px,\s*(-?[\d.]+)px\)/);
        const curTx = match ? parseFloat(match[1]) : 0;
        const curTy = match ? parseFloat(match[2]) : 0;

        oximeter.style.transform = `translate(${curTx + snapDx}px, ${curTy + snapDy}px) rotate(-10deg)`;
        oximeter.style.cursor = 'default';

        if (guide) guide.style.display = 'none';

        state.attachmentComplete = true;
        markSetupStepCompleted('attach');
        setSetupLiveMessage('Perfect placement! Verifying signal...', 'success');

        const displayScreen = oximeter.querySelector('.display-text');
        if (displayScreen) displayScreen.textContent = '98';

        state.pendingVerifyTimeout = setTimeout(() => {
            markSetupStepCompleted('verify');
            updateDeviceStatus();
            setSetupLiveMessage('Setup complete. Excellent work!', 'success');
            state.pendingVerifyTimeout = null;
        }, 1200);

        showNotification('Pulse oximeter attached with good alignment!', 'success');
    }
}

function updateDeviceStatus() {
    const connectionStatus = document.getElementById('connection-status');
    const sensorStatus = document.getElementById('sensor-status');
    const signalStatus = document.getElementById('signal-status');

    if (connectionStatus && state.setupCompleted.power) {
        connectionStatus.classList.add('connected');
        connectionStatus.querySelector('.status-text').textContent = 'Connected';
    }

    if (sensorStatus) {
        if (state.attachmentComplete) {
            sensorStatus.classList.add('connected');
            sensorStatus.querySelector('.status-text').textContent = 'Attached';
        } else {
            sensorStatus.classList.remove('connected');
            sensorStatus.querySelector('.status-text').textContent = 'Not Attached';
        }
    }

    if (signalStatus) {
        if (state.setupCompleted.verify) {
            signalStatus.classList.add('connected');
            signalStatus.querySelector('.status-text').textContent = 'Good Signal';
        } else {
            signalStatus.classList.remove('connected');
            signalStatus.querySelector('.status-text').textContent = 'No Signal';
        }
    }
}

/* =========================================
   Monitoring
   ========================================= */

function selectCondition(conditionId) {
    const options = document.querySelectorAll('.condition-option');
    options.forEach(opt => opt.classList.remove('active'));

    const selectedOption = document.querySelector(`.condition-option[data-condition="${conditionId}"]`);
    if (selectedOption) selectedOption.classList.add('active');

    state.selectedCondition = conditionId;

    if (state.engine) {
        const result = state.engine.updateCondition(conditionId);
        if (result) {
            showNotification(`Patient condition changed to: ${result.condition}`, 'info');

            if (state.isMonitoring) updateDisplayValues(state.engine.getCurrentReadings());
        }
    }
}

function startLabExperience(event) {
    event?.preventDefault?.();

    state.completedSteps.add(0);
    updateNavigationState();
    navigateToStep(1);
}

function startMonitoring() {
    if (!state.attachmentComplete) {
        showNotification('Please attach the sensor first.', 'warning');
        return;
    }

    if (state.engine) {
        state.engine.startMonitoring();
        state.isMonitoring = true;
        state.isPaused = false;

        const _startBtn = document.getElementById('start-monitoring-btn');
        const _pauseBtn = document.getElementById('pause-monitoring-btn');
        const _restBtn  = document.getElementById('rest-monitoring-btn');
        const _stopBtn  = document.getElementById('stop-monitoring-btn');
        if (_startBtn) _startBtn.style.display = 'none';
        if (_pauseBtn) _pauseBtn.style.display = 'inline-flex';
        if (_restBtn)  _restBtn.style.display  = 'inline-flex';
        if (_stopBtn)  _stopBtn.style.display  = 'inline-flex';
        updateRestButton();

        // Use speed to control waveform refresh
        const waveformMs = Math.max(15, Math.round(60 / state.waveformSpeed));
        state.dataInterval = setInterval(updateMonitoringData, 100);
        state.waveformInterval = setInterval(updateWaveform, waveformMs);

        showNotification('Monitoring started', 'success');
    }
}

function pauseMonitoring() {
    if (state.engine) {
        state.engine.pauseMonitoring();
        state.isPaused = true;

        if (state.dataInterval) clearInterval(state.dataInterval);
        if (state.waveformInterval) clearInterval(state.waveformInterval);
        state.dataInterval = null;
        state.waveformInterval = null;

        const startBtn = document.getElementById('start-monitoring-btn');
        const pauseBtn = document.getElementById('pause-monitoring-btn');
        const restBtn  = document.getElementById('rest-monitoring-btn');
        if (startBtn) startBtn.style.display = 'inline-flex';
        if (pauseBtn) pauseBtn.style.display = 'none';
        if (restBtn)  restBtn.style.display  = 'none';

        showNotification('Monitoring paused', 'info');
    }
}

function stopMonitoring() {
    if (state.engine) {
        state.engine.stopMonitoring();
        state.isMonitoring = false;
        state.isPaused = false;

        if (state.dataInterval) clearInterval(state.dataInterval);
        if (state.waveformInterval) clearInterval(state.waveformInterval);
        state.dataInterval = null;
        state.waveformInterval = null;

        const startBtn = document.getElementById('start-monitoring-btn');
        const pauseBtn = document.getElementById('pause-monitoring-btn');
        const restBtn  = document.getElementById('rest-monitoring-btn');
        const stopBtn  = document.getElementById('stop-monitoring-btn');
        if (startBtn) startBtn.style.display = 'inline-flex';
        if (pauseBtn) pauseBtn.style.display = 'none';
        if (restBtn)  restBtn.style.display  = 'none';
        if (stopBtn)  stopBtn.style.display  = 'none';

        state.isResting = false;
        state.restIntensity = 0;
        updateRestButton();

        const spo2El  = document.getElementById('spo2-value');
        const pulseEl = document.getElementById('pulse-value');
        const piEl    = document.getElementById('pi-value');
        if (spo2El)  spo2El.textContent  = '--';
        if (pulseEl) pulseEl.textContent = '--';
        if (piEl)    piEl.textContent    = '-.-';

        showNotification('Monitoring stopped', 'info');
    }
}

function toggleRestMode() {
    if (!state.isMonitoring) {
        showNotification('Start monitoring before using Rest mode.', 'warning');
        return;
    }

    state.isResting = !state.isResting;
    updateRestButton();

    if (state.isResting) {
        showNotification('Rest mode enabled: pulse should settle and oxygen saturation stabilizes.', 'info');
    } else {
        showNotification('Rest mode disabled.', 'info');
    }
}

function updateRestButton() {
    const restBtn = document.getElementById('rest-monitoring-btn');
    if (!restBtn) return;

    restBtn.classList.toggle('active', state.isResting);
    restBtn.innerHTML = state.isResting
        ? '<i class="fas fa-person-walking"></i> End Rest'
        : '<i class="fas fa-bed"></i> Rest';
}

function updateMonitoringData() {
    if (!state.engine || !state.isMonitoring) return;

    let dataPoint = state.engine.generateDataPoint();
    if (dataPoint) {
        state.restIntensity = state.isResting
            ? Math.min(1, state.restIntensity + 0.08)
            : Math.max(0, state.restIntensity - 0.08);

        dataPoint = applyRestingEffect(dataPoint, state.restIntensity);
        updateDisplayValues(dataPoint);
        updateSignalQuality(dataPoint.signalQuality);
    }
}

function applyRestingEffect(dataPoint, intensity) {
    if (!dataPoint || intensity <= 0) return dataPoint;

    const spo2Boost = 1.1 * intensity;
    const pulseDrop = 10 * intensity;
    const perfusionBoost = 0.25 * intensity;
    const signalBoost = 0.05 * intensity;

    return {
        ...dataPoint,
        spo2: Math.min(100, Number((dataPoint.spo2 + spo2Boost).toFixed(1))),
        pulseRate: Math.max(45, Math.round(dataPoint.pulseRate - pulseDrop)),
        perfusionIndex: Math.max(0.1, Number((dataPoint.perfusionIndex + perfusionBoost).toFixed(2))),
        signalQuality: Math.min(1, Number((dataPoint.signalQuality + signalBoost).toFixed(2)))
    };
}

function updateDisplayValues(data) {
    const spo2El  = document.getElementById('spo2-value');
    const pulseEl = document.getElementById('pulse-value');
    const piEl    = document.getElementById('pi-value');
    if (spo2El)  spo2El.textContent  = data.spo2;
    if (pulseEl) pulseEl.textContent = data.pulseRate;
    if (piEl)    piEl.textContent    = data.perfusionIndex.toFixed(1);

    const pulseIcon = document.getElementById('pulse-icon');
    if (pulseIcon) {
        pulseIcon.classList.remove('beating');
        setTimeout(() => pulseIcon.classList.add('beating'), 10);
    }
}

function updateSignalQuality(quality) {
    const signalBars = document.querySelectorAll('.signal-bars .bar');
    const activeCount = Math.ceil(quality * 5);

    signalBars.forEach((bar, index) => {
        bar.classList.toggle('active', index < activeCount);
    });
}

function setupWaveformCanvas() {
    const canvas = document.getElementById('waveform-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 200;
    canvas.ctx = ctx;

    drawWaveformGrid(ctx, canvas.width, canvas.height);
}

function updateWaveform() {
    const canvas = document.getElementById('waveform-canvas');
    if (!canvas || !canvas.ctx || !state.engine) return;

    const ctx = canvas.ctx;
    const waveformData = state.engine.getWaveformData();
    if (waveformData.length === 0) return;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawWaveformGrid(ctx, canvas.width, canvas.height);

    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.beginPath();

    const maxPoints = Math.min(waveformData.length, canvas.width);
    const xStep = canvas.width / maxPoints;

    const scale = state.waveformScale || 1;

    waveformData.slice(-maxPoints).forEach((point, index) => {
        const x = index * xStep;
        const y = canvas.height / 2 - ((point.amplitude * scale) * canvas.height / 4);

        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });

    ctx.stroke();
}

function drawWaveformGrid(ctx, width, height) {
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;

    for (let x = 0; x <= width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }

    for (let y = 0; y <= height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
}

/* =========================================
   Measurement Log / Analysis / Report (unchanged logic)
   ========================================= */

function recordMeasurement() {
    if (!state.engine || !state.isMonitoring) {
        showNotification('Start monitoring before recording measurements.', 'warning');
        return;
    }

    const readings = state.engine.getCurrentReadings();
    const timestamp = new Date();

    const measurement = {
        timestamp: timestamp,
        time: timestamp.toLocaleTimeString(),
        spo2: readings.spo2,
        pulseRate: readings.pulseRate,
        perfusionIndex: readings.perfusionIndex,
        condition: readings.condition,
        conditionName: readings.condition.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
    };

    state.recordedMeasurements.push(measurement);
    addMeasurementToLog(measurement);
    enableStepProgression(3);
    showNotification('Measurement recorded successfully!', 'success');
}

function addMeasurementToLog(measurement) {
    const logEntries = document.getElementById('measurement-log-entries');
    if (!logEntries) return;

    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `
        <span>${measurement.time}</span>
        <span>${measurement.spo2}%</span>
        <span>${measurement.pulseRate} bpm</span>
        <span>${measurement.perfusionIndex}%</span>
        <span>${measurement.conditionName}</span>
    `;

    logEntries.appendChild(entry);
    logEntries.scrollTop = logEntries.scrollHeight;
}

function updateAnalysisResults() {
    if (state.recordedMeasurements.length === 0) {
        showNotification('No measurements recorded yet. Record some measurements first.', 'info');
        return;
    }

    const stats = state.engine.calculateStatistics(state.recordedMeasurements);
    if (!stats) return;

    document.getElementById('avg-spo2').textContent = stats.spo2.mean.toFixed(1);
    document.getElementById('avg-pulse').textContent = Math.round(stats.pulse.mean);
    document.getElementById('avg-pi').textContent = stats.perfusionIndex.mean.toFixed(1);
    document.getElementById('total-measurements').textContent = stats.count;

    updateClinicalAssessments(stats);
}

function updateClinicalAssessments(stats) {
    const assessments = state.engine.assessReadings({
        spo2: stats.spo2.mean,
        pulseRate: stats.pulse.mean,
        perfusionIndex: stats.perfusionIndex.mean
    });

    const spo2Assessment = document.getElementById('spo2-assessment');
    if (spo2Assessment && assessments.spo2) {
        spo2Assessment.className = `assessment-result ${assessments.spo2.level}`;
        spo2Assessment.innerHTML = `
            <div class="assessment-icon">
                <i class="fas ${assessments.spo2.icon}"></i>
            </div>
            <div class="assessment-text">
                <p>${assessments.spo2.message}</p>
            </div>
        `;
    }

    const pulseAssessment = document.getElementById('pulse-assessment');
    if (pulseAssessment && assessments.pulse) {
        pulseAssessment.className = `assessment-result ${assessments.pulse.level}`;
        pulseAssessment.innerHTML = `
            <div class="assessment-icon">
                <i class="fas ${assessments.pulse.icon}"></i>
            </div>
            <div class="assessment-text">
                <p>${assessments.pulse.message}</p>
            </div>
        `;
    }

    const perfusionAssessment = document.getElementById('perfusion-assessment');
    if (perfusionAssessment && assessments.perfusion) {
        perfusionAssessment.className = `assessment-result ${assessments.perfusion.level}`;
        perfusionAssessment.innerHTML = `
            <div class="assessment-icon">
                <i class="fas ${assessments.perfusion.icon}"></i>
            </div>
            <div class="assessment-text">
                <p>${assessments.perfusion.message}</p>
            </div>
        `;
    }
}

function setupAnalysisChart() {
    const canvas = document.getElementById('summary-chart');
    if (!canvas || state.recordedMeasurements.length === 0) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 200;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 2;
    ctx.beginPath();

    const measurements = state.recordedMeasurements;
    if (measurements.length < 2) return;
    const xStep = canvas.width / (measurements.length - 1);

    measurements.forEach((measurement, index) => {
        const x = index * xStep;
        const y = canvas.height - ((measurement.spo2 - 85) / 15 * canvas.height);

        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });

    ctx.stroke();

    ctx.fillStyle = '#888';
    ctx.font = '12px monospace';
    ctx.fillText('SpO2 Trend', 10, 20);
    ctx.fillText('100%', 10, 30);
    ctx.fillText('85%', 10, canvas.height - 5);
}

function enableStepProgression(stepNumber) {
    state.completedSteps.add(stepNumber);
    updateNavigationState();

    const continueBtn = getStepElement(stepNumber)?.querySelector('.next-step');
    if (continueBtn) {
        continueBtn.disabled = false;
        continueBtn.classList.add('pulse');
    }
}

function updateLearningObjectives() {
    const objectivesList = document.getElementById('completed-objectives');
    if (!objectivesList) return;

    objectivesList.innerHTML = '';

    learningObjectives.forEach((objective, index) => {
        const li = document.createElement('li');
        li.textContent = objective;

        if (state.currentStep > index || state.completedSteps.has(index)) {
            li.classList.add('completed');
        }

        objectivesList.appendChild(li);
    });
}

function updatePerformanceMetrics() {
    document.getElementById('equipment-explored').textContent =
        `${state.equipmentExplored.size}/${Object.keys(equipmentData).length}`;
    document.getElementById('setup-completed').textContent =
        `${Object.values(state.setupCompleted).filter(Boolean).length}/${Object.keys(state.setupCompleted).length}`;
    document.getElementById('measurements-taken').textContent =
        state.recordedMeasurements.length;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;

    if (!document.querySelector('.notification-styles')) {
        const styles = document.createElement('style');
        styles.className = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--bg-card);
                border: 1px solid var(--border);
                border-radius: var(--radius);
                padding: 1rem;
                box-shadow: var(--shadow-lg);
                z-index: 10000;
                animation: slideInRight 0.3s ease-out;
            }
            .notification.success { border-left: 4px solid var(--success); }
            .notification.warning { border-left: 4px solid var(--warning); }
            .notification.danger { border-left: 4px solid var(--danger); }
            .notification.info { border-left: 4px solid var(--accent); }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--text-primary);
                font-size: 0.875rem;
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => {
            notification.parentNode?.removeChild(notification);
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        warning: 'fa-exclamation-triangle',
        danger: 'fa-times-circle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
}

function isGlossaryVisible() {
    const glossaryModal = document.getElementById('glossary-modal');
    return Boolean(glossaryModal) && !glossaryModal.classList.contains('hidden');
}

function getGlossaryToggleButtons() {
    return Array.from(document.querySelectorAll('#btn-glossary, [data-action="toggle-glossary"]'));
}

function openGlossary() {
    try {
        const glossaryModal = document.getElementById('glossary-modal');
        const glossaryToggles = getGlossaryToggleButtons();
        if (!glossaryModal) {
            console.warn('Glossary modal not found');
            return;
        }

        glossaryModal.classList.remove('hidden');
        state.isGlossaryOpen = isGlossaryVisible();
        glossaryModal.setAttribute('aria-hidden', 'false');
        glossaryToggles.forEach((toggle) => toggle.setAttribute('aria-expanded', 'true'));

        const searchInput = document.getElementById('glossary-search');
        if (searchInput) {
            searchInput.value = '';
            filterGlossaryTerms();
            // Focus search input for better UX
            setTimeout(() => searchInput.focus(), 0);
        }
    } catch (error) {
        console.error('Error opening glossary:', error);
        showNotification('Could not open glossary', 'warning');
    }
}

function closeGlossary() {
    try {
        const glossaryModal = document.getElementById('glossary-modal');
        const glossaryToggles = getGlossaryToggleButtons();

        if (!glossaryModal) return;

        // Restore focus to the glossary button before closing modal
        // This prevents accessibility warning about hidden focused element
        if (document.activeElement?.closest('#glossary-modal')) {
            const fallbackToggle = glossaryToggles[0] || null;
            (lastGlossaryTrigger || fallbackToggle)?.focus();
        }

        glossaryModal.classList.add('hidden');
        state.isGlossaryOpen = isGlossaryVisible();
        glossaryModal.setAttribute('aria-hidden', 'true');
        glossaryToggles.forEach((toggle) => toggle.setAttribute('aria-expanded', 'false'));
    } catch (error) {
        console.error('Error closing glossary:', error);
    }
}

function filterGlossaryTerms() {
    const searchInput = document.getElementById('glossary-search');
    const query = (searchInput?.value || '').trim().toLowerCase();
    const glossaryItems = document.querySelectorAll('.glossary-item');
    const emptyState = document.getElementById('glossary-no-results');
    let visibleCount = 0;

    glossaryItems.forEach((item) => {
        const searchableText = `${item.dataset.term || ''} ${item.textContent || ''}`.toLowerCase();
        const isVisible = searchableText.includes(query);
        item.style.display = isVisible ? '' : 'none';
        if (isVisible) visibleCount += 1;
    });

    if (emptyState) {
        emptyState.hidden = visibleCount > 0;
    }
}

function resetLabExperience(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const shouldReset = confirm('Reset the lab progress and recorded measurements?');
    if (!shouldReset) return;

    if (isGlossaryVisible()) closeGlossary();
    if (state.isMonitoring || state.isPaused) stopMonitoring();

    const resetButtons = document.querySelectorAll('[data-action="reset-lab"]');
    resetButtons.forEach((button) => {
        button.classList.add('is-loading');
        button.setAttribute('aria-busy', 'true');
        button.disabled = true;
    });

    showNotification('Resetting lab session...', 'info');

    // Reload to restore the entire interactive scene and state cleanly.
    setTimeout(() => {
        window.location.reload();
    }, 180);
}

function generateReport() {
    updatePerformanceMetrics();
    updateLearningObjectives();

    const reportData = {
        timestamp: new Date().toLocaleString(),
        measurements: state.recordedMeasurements,
        performance: {
            equipmentExplored: state.equipmentExplored.size,
            setupCompleted: Object.values(state.setupCompleted).filter(Boolean).length,
            measurementsTaken: state.recordedMeasurements.length
        }
    };

    const reportContent = generateReportContent(reportData);
    downloadReport(reportContent, 'pulse-oximeter-lab-report.html');

    showNotification('Lab report generated successfully!', 'success');
}

function generateReportContent(data) {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Pulse Oximeter Lab Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .header { text-align: center; margin-bottom: 30px; }
        .section { margin: 20px 0; }
        .measurements { border-collapse: collapse; width: 100%; }
        .measurements th, .measurements td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .measurements th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Pulse Oximeter Virtual Lab Report</h1>
        <p>Generated: ${data.timestamp}</p>
    </div>

    <div class="section">
        <h2>Lab Performance</h2>
        <ul>
            <li>Equipment Explored: ${data.performance.equipmentExplored}/4</li>
            <li>Setup Steps Completed: ${data.performance.setupCompleted}/4</li>
            <li>Measurements Recorded: ${data.performance.measurementsTaken}</li>
        </ul>
    </div>

    <div class="section">
        <h2>Recorded Measurements</h2>
        <table class="measurements">
            <thead>
                <tr>
                    <th>Time</th>
                    <th>SpO2 (%)</th>
                    <th>Pulse (bpm)</th>
                    <th>PI (%)</th>
                    <th>Condition</th>
                </tr>
            </thead>
            <tbody>
                ${data.measurements.map(m => `
                    <tr>
                        <td>${m.time}</td>
                        <td>${m.spo2}</td>
                        <td>${m.pulseRate}</td>
                        <td>${m.perfusionIndex}</td>
                        <td>${m.conditionName}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2>Learning Objectives</h2>
        <ul>
            ${learningObjectives.map(obj => `<li>${obj}</li>`).join('')}
        </ul>
    </div>
</body>
</html>
    `;
}

function downloadReport(content, filename) {
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function completeLab() {
    updatePerformanceMetrics();

    const completionStats = {
        equipmentExplored: state.equipmentExplored.size >= Object.keys(equipmentData).length,
        allStepsCompleted: state.currentStep >= 3,
        measurementsTaken: state.recordedMeasurements.length > 0
    };

    const allCompleted = Object.values(completionStats).every(Boolean);

    let message = 'Lab completed! ';
    message += allCompleted
        ? 'Excellent work - you have successfully completed all objectives.'
        : 'Consider exploring remaining components and recording more measurements for complete experience.';

    showNotification(message, allCompleted ? 'success' : 'info');

    setTimeout(() => {
        if (confirm('Would you like to download your lab report?')) {
            generateReport();
        }
    }, 1000);
}