// --- STEP 1: THE DATASET ---
// This includes the specific range data you provided for 2026 predictions.
const rankData = [
    {
        "min": 0,
        "max": 10,
        "easy": 1.5,
        "moderate": 2.0,
        "hard": 3.0
    },
    {
        "min": 11,
        "max": 20,
        "easy": 21.0,
        "moderate": 24.0,
        "hard": 29.0
    },
    {
        "min": 21,
        "max": 30,
        "easy": 47.2,
        "moderate": 55.1,
        "hard": 62.62
    },
    {
        "min": 31,
        "max": 40,
        "easy": 50.2,
        "moderate": 57.1,
        "hard": 68.62
    },
    {
        "min": 41,
        "max": 50,
        "easy": 75.22,
        "moderate": 77.03,
        "hard": 80.5
    },
    {
        "min": 51,
        "max": 60,
        "easy": 81.88,
        "moderate": 84.206,
        "hard": 86.7
    },
    {
        "min": 61,
        "max": 70,
        "easy": 84.8,
        "moderate": 86.6,
        "hard": 87.98
    },
    {
        "min": 71,
        "max": 80,
        "easy": 86.86,
        "moderate": 88.58,
        "hard": 90.93
    },
    {
        "min": 81,
        "max": 90,
        "easy": 90.1,
        "moderate": 91.51,
        "hard": 92.9
    },
    {
        "min": 91,
        "max": 100,
        "easy": 91.84,
        "moderate": 92.92,
        "hard": 95.2
    },
    {
        "min": 101,
        "max": 110,
        "easy": 93.26,
        "moderate": 94.54,
        "hard": 96.24
    },
    {
        "min": 111,
        "max": 120,
        "easy": 94.158,
        "moderate": 95.4,
        "hard": 96.87
    },
    {
        "min": 121,
        "max": 130,
        "easy": 95.13,
        "moderate": 96.44,
        "hard": 97.67
    },
    {
        "min": 131,
        "max": 140,
        "easy": 96.34,
        "moderate": 97.3,
        "hard": 98.26
    },
    {
        "min": 141,
        "max": 150,
        "easy": 97.13,
        "moderate": 97.88,
        "hard": 98.55
    },
    {
        "min": 151,
        "max": 160,
        "easy": 97.45,
        "moderate": 98.4,
        "hard": 98.98
    },
    {
        "min": 161,
        "max": 170,
        "easy": 98.09,
        "moderate": 98.64,
        "hard": 99.17
    },
    {
        "min": 171,
        "max": 180,
        "easy": 98.55,
        "moderate": 98.96,
        "hard": 99.32
    },
    {
        "min": 181,
        "max": 190,
        "easy": 98.97,
        "moderate": 99.14,
        "hard": 99.41
    },
    {
        "min": 191,
        "max": 200,
        "easy": 99.15,
        "moderate": 99.28,
        "hard": 99.49
    },
    {
        "min": 201,
        "max": 210,
        "easy": 99.23,
        "moderate": 99.42,
        "hard": 99.6
    },
    {
        "min": 211,
        "max": 220,
        "easy": 99.33,
        "moderate": 99.512,
        "hard": 99.69
    },
    {
        "min": 221,
        "max": 230,
        "easy": 99.42,
        "moderate": 99.6,
        "hard": 99.76
    },
    {
        "min": 231,
        "max": 240,
        "easy": 99.506,
        "moderate": 99.6,
        "hard": 99.83
    },
    {
        "min": 241,
        "max": 250,
        "easy": 99.7,
        "moderate": 99.8,
        "hard": 99.9
    },
    {
        "min": 251,
        "max": 260,
        "easy": 99.8,
        "moderate": 99.901,
        "hard": 99.998
    },
    {
        "min": 261,
        "max": 270,
        "easy": 99.85,
        "moderate": 99.95,
        "hard": 99.98
    },
    {
        "min": 271,
        "max": 280,
        "easy": 99.9,
        "moderate": 99.99,
        "hard": 99.9995
    },
    {
        "min": 281,
        "max": 290,
        "easy": 99.989,
        "moderate": 99.99995,
        "hard": 99.99999
    },
    {
        "min": 291,
        "max": 300,
        "easy": 99.99999,
        "moderate": 99.99999999,
        "hard": 100.0
    }
];

// --- STEP 2: THE LOGIC ---
// Total Candidates for 2026 (Estimate)
const TOTAL_CANDIDATES = 1450000;

function calculateRank() {
    const marksInput = document.getElementById("marks").value;
    const difficulty = document.getElementById("difficulty").value;
    const resultBox = document.getElementById("result-box");
    const percentileDisplay = document.getElementById("percentile-display");
    const rankDisplay = document.getElementById("rank-display");

    const score = parseFloat(marksInput);

    // Validation
    if (isNaN(score) || score < 0 || score > 300) {
        alert("Please enter a valid score between 0 and 300.");
        return;
    }

    // 1. Sort data to ensure correct order (0 -> 300)
    const sortedData = rankData.sort((a, b) => a.min - b.min);

    // 2. Find Lower and Upper Blocks for Interpolation
    let lowerBlock = null;
    let upperBlock = null;

    // Check for exact match first
    const exactMatch = sortedData.find(d => d.min === score);
    if (exactMatch) {
        displayResult(exactMatch[difficulty], resultBox, percentileDisplay, rankDisplay);
        return;
    }

    // Loop to find where the score fits
    for (let i = 0; i < sortedData.length; i++) {
        if (score > sortedData[i].min) {
            lowerBlock = sortedData[i];
            // The next block is our target upper bound
            upperBlock = sortedData[i + 1]; 
        }
    }

    // --- EDGE CASE HANDLING ---
    
    // Case A: Score is lower than the lowest data point (0-10 range typically)
    if (!lowerBlock) {
         lowerBlock = { min: 0, easy: 0, moderate: 0, hard: 0 };
         upperBlock = sortedData[0];
    }

    // Case B: Score is higher than the last block (e.g., >291)
    if (!upperBlock) {
        // If we are at the very top, interpolate towards perfect 100
        upperBlock = { min: 300, easy: 100, moderate: 100, hard: 100 };
    }

    // --- LINEAR INTERPOLATION CALCULATION ---
    // This finds the exact value between two known points
    
    const x = score;
    const x1 = lowerBlock.min;
    
    // Safety check: ensure upperBlock exists to prevent crash
    const x2 = upperBlock ? upperBlock.min : 300; 
    
    const y1 = lowerBlock[difficulty];
    const y2 = upperBlock ? upperBlock[difficulty] : 100;

    // Prevent division by zero if range is 0 (unlikely but safe)
    if (x2 === x1) {
        displayResult(y1, resultBox, percentileDisplay, rankDisplay);
        return;
    }

    // The Maths:
    const fraction = (x - x1) / (x2 - x1);
    const calculatedPercentile = y1 + (fraction * (y2 - y1));

    // Display
    displayResult(calculatedPercentile, resultBox, percentileDisplay, rankDisplay);
}

function displayResult(percentile, box, pDisp, rDisp) {
    // Cap percentile at 100 max
    if (percentile > 100) percentile = 100;
    
    // Rank Formula: ((100 - Percentile) * Total Candidates) / 100
    let rank = ((100 - percentile) * TOTAL_CANDIDATES) / 100;
    
    // Ensure Rank is at least 1
    if (rank < 1) rank = 1;

    // Update the HTML
    pDisp.innerText = percentile.toFixed(6); // Shows 6 decimal places (e.g. 98.452100)
    rDisp.innerText = Math.round(rank).toLocaleString(); // Adds commas (e.g. 14,500)
    
    // Show the box
    box.classList.remove("hidden");
}