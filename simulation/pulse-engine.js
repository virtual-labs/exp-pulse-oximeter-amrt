/* =========================================
   Pulse Oximetry Signal Engine — SpO2 & Pulse Simulation
   ========================================= */

class PulseOximeterEngine {
    constructor() {
        // Default parameters
        this.sampleRate = 100; // Hz (lower than ECG for pulse oximetry)
        this.time = 0;
        
        // Current monitoring state
        this.isMonitoring = false;
        this.currentCondition = 'healthy';
        
        // Signal generation parameters
        this.pulseAmplitude = 0.5;
        this.noiseLevel = 0.02;
        
        // Condition-specific parameters
        this.conditions = {
            healthy: {
                spo2: { mean: 98.5, variation: 1.0 },
                pulseRate: { mean: 72, variation: 8 },
                perfusionIndex: { mean: 2.5, variation: 0.8 },
                signalQuality: 0.95,
                description: 'Normal healthy adult with good circulation'
            },
            'mild-hypoxia': {
                spo2: { mean: 92, variation: 2.0 },
                pulseRate: { mean: 88, variation: 12 },
                perfusionIndex: { mean: 1.8, variation: 0.6 },
                signalQuality: 0.85,
                description: 'Mild oxygen desaturation with compensatory response'
            },
            'moderate-hypoxia': {
                spo2: { mean: 87, variation: 3.0 },
                pulseRate: { mean: 105, variation: 15 },
                perfusionIndex: { mean: 1.2, variation: 0.5 },
                signalQuality: 0.75,
                description: 'Moderate hypoxemia requiring medical attention'
            },
            'poor-circulation': {
                spo2: { mean: 96, variation: 1.5 },
                pulseRate: { mean: 78, variation: 10 },
                perfusionIndex: { mean: 0.6, variation: 0.3 },
                signalQuality: 0.45,
                description: 'Poor peripheral circulation affecting signal quality'
            }
        };
        
        // Current values
        this.currentSpo2 = 0;
        this.currentPulseRate = 0;
        this.currentPI = 0;
        this.currentSignalQuality = 0;
        
        // Waveform data
        this.waveformData = [];
        this.maxWaveformLength = 500; // Points to keep for display
        
        // Beat detection
        this.lastBeatTime = 0;
        this.rrIntervals = [];
        
        // Initialize
        this.updateCondition(this.currentCondition);
    }

    updateCondition(condition) {
        if (this.conditions[condition]) {
            this.currentCondition = condition;
            const params = this.conditions[condition];
            
            // Generate stable baseline values for this condition
            this.baselineSpo2 = this.gaussianRandom(params.spo2.mean, params.spo2.variation);
            this.baselinePulseRate = this.gaussianRandom(params.pulseRate.mean, params.pulseRate.variation);
            this.baselinePI = this.gaussianRandom(params.perfusionIndex.mean, params.perfusionIndex.variation);
            this.baselineSignalQuality = params.signalQuality;
            
            // Ensure values are within realistic bounds
            this.baselineSpo2 = Math.max(70, Math.min(100, this.baselineSpo2));
            this.baselinePulseRate = Math.max(40, Math.min(180, this.baselinePulseRate));
            this.baselinePI = Math.max(0.1, Math.min(10, this.baselinePI));
            
            return {
                condition: condition,
                description: params.description,
                spo2: Math.round(this.baselineSpo2 * 10) / 10,
                pulseRate: Math.round(this.baselinePulseRate),
                pi: Math.round(this.baselinePI * 10) / 10,
                signalQuality: this.baselineSignalQuality
            };
        }
        return null;
    }

    startMonitoring() {
        this.isMonitoring = true;
        this.time = 0;
        this.waveformData = [];
        this.rrIntervals = [];
        return true;
    }

    stopMonitoring() {
        this.isMonitoring = false;
        return true;
    }

    pauseMonitoring() {
        this.isMonitoring = false;
        return true;
    }

    generateDataPoint() {
        if (!this.isMonitoring) {
            return null;
        }

        const dt = 1 / this.sampleRate;
        this.time += dt;

        // Generate photoplethysmographic (PPG) waveform
        const ppgSignal = this.generatePPGWaveform();
        
        // Update current measurements with some temporal variation
        this.updateCurrentMeasurements();
        
        // Detect beats in the PPG signal
        this.detectBeat(ppgSignal);
        
        // Store waveform data point
        const waveformPoint = {
            time: this.time,
            amplitude: ppgSignal,
            timestamp: Date.now()
        };
        
        this.waveformData.push(waveformPoint);
        
        // Limit waveform data length
        if (this.waveformData.length > this.maxWaveformLength) {
            this.waveformData.shift();
        }

        return {
            timestamp: Date.now(),
            spo2: Math.round(this.currentSpo2 * 10) / 10,
            pulseRate: Math.round(this.currentPulseRate),
            perfusionIndex: Math.round(this.currentPI * 100) / 100,
            signalQuality: Math.round(this.currentSignalQuality * 100) / 100,
            waveform: ppgSignal,
            condition: this.currentCondition
        };
    }

    generatePPGWaveform() {
        const params = this.conditions[this.currentCondition];
        
        // Base pulse frequency (convert BPM to Hz)
        const pulseFreq = this.baselinePulseRate / 60;
        
        // Generate primary pulse component (fundamental frequency)
        const primaryPulse = Math.sin(2 * Math.PI * pulseFreq * this.time);
        
        // Add harmonic components for realistic PPG shape
        const secondHarmonic = 0.3 * Math.sin(2 * Math.PI * 2 * pulseFreq * this.time + Math.PI/4);
        const thirdHarmonic = 0.1 * Math.sin(2 * Math.PI * 3 * pulseFreq * this.time + Math.PI/2);
        
        // Create dicrotic notch effect (characteristic of arterial pulse)
        const dicroticPhase = 2 * Math.PI * pulseFreq * this.time;
        const dicroticNotch = -0.15 * Math.exp(-Math.pow((dicroticPhase % (2 * Math.PI) - Math.PI), 2) * 2);
        
        // Combine components
        let ppgSignal = (primaryPulse + secondHarmonic + thirdHarmonic + dicroticNotch) * this.pulseAmplitude;
        
        // Add respiratory variation (0.2-0.4 Hz)
        const respiratoryFreq = 0.3; // ~18 breaths per minute
        const respiratoryModulation = 0.1 * Math.sin(2 * Math.PI * respiratoryFreq * this.time);
        ppgSignal += respiratoryModulation;
        
        // Add noise based on signal quality
        const noiseAmplitude = this.noiseLevel * (1 - this.baselineSignalQuality);
        const noise = (Math.random() - 0.5) * 2 * noiseAmplitude;
        ppgSignal += noise;
        
        // Add motion artifacts for poor signal quality
        if (this.baselineSignalQuality < 0.7) {
            const motionFreq = 0.5 + Math.random() * 2; // 0.5-2.5 Hz
            const motionArtifact = 0.2 * (1 - this.baselineSignalQuality) * Math.sin(2 * Math.PI * motionFreq * this.time);
            ppgSignal += motionArtifact;
        }
        
        // Normalize and offset
        ppgSignal = ppgSignal * 0.8 + 0.1; // Keep between -0.7 and 0.9
        
        return Math.max(-1, Math.min(1, ppgSignal));
    }

    updateCurrentMeasurements() {
        const params = this.conditions[this.currentCondition];
        
        // Add small temporal variations to make readings realistic
        const timeVariation = 0.1; // 10% variation over time
        
        // SpO2 variation
        const spo2Noise = this.gaussianRandom(0, params.spo2.variation * timeVariation);
        this.currentSpo2 = Math.max(70, Math.min(100, this.baselineSpo2 + spo2Noise));
        
        // Pulse rate variation
        const pulseNoise = this.gaussianRandom(0, params.pulseRate.variation * timeVariation);
        this.currentPulseRate = Math.max(40, Math.min(180, this.baselinePulseRate + pulseNoise));
        
        // Perfusion index variation
        const piNoise = this.gaussianRandom(0, params.perfusionIndex.variation * timeVariation);
        this.currentPI = Math.max(0.1, Math.min(10, this.baselinePI + piNoise));
        
        // Signal quality can vary slightly
        const qualityNoise = this.gaussianRandom(0, 0.05);
        this.currentSignalQuality = Math.max(0, Math.min(1, this.baselineSignalQuality + qualityNoise));
    }

    detectBeat(ppgSignal) {
        // Simple peak detection for beat detection
        const threshold = 0.3;
        const minBeatInterval = 0.4; // Minimum 150 BPM
        
        if (ppgSignal > threshold && (this.time - this.lastBeatTime) > minBeatInterval) {
            // Check if this is a true peak (signal was below threshold recently)
            const recentData = this.waveformData.slice(-5);
            const hadLowPoint = recentData.some(point => point?.amplitude < 0);
            
            if (hadLowPoint) {
                const rrInterval = this.time - this.lastBeatTime;
                if (this.lastBeatTime > 0) {
                    this.rrIntervals.push(rrInterval * 1000); // Convert to milliseconds
                    
                    // Keep only recent RR intervals for analysis
                    if (this.rrIntervals.length > 20) {
                        this.rrIntervals.shift();
                    }
                    
                    // Update pulse rate based on recent RR intervals
                    if (this.rrIntervals.length >= 3) {
                        const avgRR = this.rrIntervals.reduce((a, b) => a + b) / this.rrIntervals.length;
                        const instantPulseRate = 60000 / avgRR; // Convert ms to BPM
                        
                        // Smooth the pulse rate update
                        this.currentPulseRate = this.currentPulseRate * 0.8 + instantPulseRate * 0.2;
                    }
                }
                this.lastBeatTime = this.time;
                return true;
            }
        }
        return false;
    }

    getWaveformData() {
        return this.waveformData;
    }

    getCurrentReadings() {
        return {
            spo2: Math.round(this.currentSpo2 * 10) / 10,
            pulseRate: Math.round(this.currentPulseRate),
            perfusionIndex: Math.round(this.currentPI * 100) / 100,
            signalQuality: Math.round(this.currentSignalQuality * 100) / 100,
            condition: this.currentCondition,
            isMonitoring: this.isMonitoring
        };
    }

    getConditionInfo(condition) {
        return this.conditions[condition] || null;
    }

    getAllConditions() {
        return Object.keys(this.conditions).map(key => ({
            id: key,
            name: key.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
            ...this.conditions[key]
        }));
    }

    // Generate assessment based on current readings
    assessReadings(readings = null) {
        const data = readings || this.getCurrentReadings();
        
        const assessments = {
            spo2: this.assessSpO2(data.spo2),
            pulse: this.assessPulseRate(data.pulseRate),
            perfusion: this.assessPerfusion(data.perfusionIndex, data.signalQuality)
        };
        
        return assessments;
    }

    assessSpO2(spo2) {
        if (spo2 >= 95) {
            return {
                level: 'normal',
                message: `SpO2 of ${spo2}% is within normal range (95-100%). Adequate oxygen saturation.`,
                icon: 'fa-check-circle',
                color: 'success'
            };
        } else if (spo2 >= 90) {
            return {
                level: 'mild',
                message: `SpO2 of ${spo2}% indicates mild hypoxemia. Monitor closely and consider supplemental oxygen.`,
                icon: 'fa-exclamation-triangle',
                color: 'warning'
            };
        } else if (spo2 >= 85) {
            return {
                level: 'moderate',
                message: `SpO2 of ${spo2}% indicates moderate hypoxemia. Immediate oxygen therapy recommended.`,
                icon: 'fa-exclamation-circle',
                color: 'danger'
            };
        } else {
            return {
                level: 'severe',
                message: `SpO2 of ${spo2}% indicates severe hypoxemia. Emergency intervention required.`,
                icon: 'fa-times-circle',
                color: 'danger'
            };
        }
    }

    assessPulseRate(pulseRate) {
        if (pulseRate >= 60 && pulseRate <= 100) {
            return {
                level: 'normal',
                message: `Pulse rate of ${pulseRate} bpm is within normal range (60-100 bpm).`,
                icon: 'fa-check-circle',
                color: 'success'
            };
        } else if (pulseRate > 100 && pulseRate <= 150) {
            return {
                level: 'mild',
                message: `Pulse rate of ${pulseRate} bpm indicates tachycardia. May be compensatory or stress-related.`,
                icon: 'fa-exclamation-triangle',
                color: 'warning'
            };
        } else if (pulseRate < 60 && pulseRate >= 50) {
            return {
                level: 'mild',
                message: `Pulse rate of ${pulseRate} bpm indicates mild bradycardia. Monitor for symptoms.`,
                icon: 'fa-exclamation-triangle',
                color: 'warning'
            };
        } else {
            return {
                level: 'critical',
                message: `Pulse rate of ${pulseRate} bpm is outside normal range. Requires immediate evaluation.`,
                icon: 'fa-times-circle',
                color: 'danger'
            };
        }
    }

    assessPerfusion(pi, signalQuality) {
        if (pi >= 1.0 && signalQuality >= 0.8) {
            return {
                level: 'normal',
                message: `Perfusion index of ${pi}% with good signal quality indicates adequate peripheral circulation.`,
                icon: 'fa-check-circle',
                color: 'success'
            };
        } else if (pi >= 0.5 || signalQuality >= 0.6) {
            return {
                level: 'mild',
                message: `Perfusion index of ${pi}% indicates reduced peripheral circulation. Consider warming extremity.`,
                icon: 'fa-exclamation-triangle',
                color: 'warning'
            };
        } else {
            return {
                level: 'poor',
                message: `Perfusion index of ${pi}% indicates poor peripheral circulation. Signal may be unreliable.`,
                icon: 'fa-times-circle',
                color: 'danger'
            };
        }
    }

    // Utility function for Gaussian random numbers
    gaussianRandom(mean = 0, std = 1) {
        let u = 0, v = 0;
        while(u === 0) u = Math.random(); // Converting [0,1) to (0,1)
        while(v === 0) v = Math.random();
        
        const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
        return z * std + mean;
    }

    // Calculate statistics from measurement history
    calculateStatistics(measurements) {
        if (!measurements || measurements.length === 0) {
            return null;
        }

        const spo2Values = measurements.map(m => m.spo2);
        const pulseValues = measurements.map(m => m.pulseRate);
        const piValues = measurements.map(m => m.perfusionIndex);

        return {
            spo2: {
                mean: this.calculateMean(spo2Values),
                std: this.calculateStd(spo2Values),
                min: Math.min(...spo2Values),
                max: Math.max(...spo2Values)
            },
            pulse: {
                mean: this.calculateMean(pulseValues),
                std: this.calculateStd(pulseValues),
                min: Math.min(...pulseValues),
                max: Math.max(...pulseValues)
            },
            perfusionIndex: {
                mean: this.calculateMean(piValues),
                std: this.calculateStd(piValues),
                min: Math.min(...piValues),
                max: Math.max(...piValues)
            },
            count: measurements.length
        };
    }

    calculateMean(values) {
        return values.reduce((a, b) => a + b, 0) / values.length;
    }

    calculateStd(values) {
        const mean = this.calculateMean(values);
        const squaredDiffs = values.map(value => Math.pow(value - mean, 2));
        const avgSquaredDiff = this.calculateMean(squaredDiffs);
        return Math.sqrt(avgSquaredDiff);
    }

    // Reset engine to initial state
    reset() {
        this.time = 0;
        this.isMonitoring = false;
        this.waveformData = [];
        this.rrIntervals = [];
        this.lastBeatTime = 0;
        this.updateCondition(this.currentCondition);
        
        return {
            status: 'reset',
            condition: this.currentCondition,
            message: 'Pulse oximeter engine reset successfully'
        };
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PulseOximeterEngine;
}