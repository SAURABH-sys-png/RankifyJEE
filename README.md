# JEE Mains Rank Predictor 2026

A data-driven web application that predicts JEE Mains Ranks and Percentiles based on Marks and Shift Difficulty. Built with vanilla HTML, CSS, and JavaScript.

##Features
* **Shift-wise Normalization:** Uses historical data (2024-2025 trends) to adjust predictions based on "Easy", "Moderate", or "Hard" shifts.
* **Linear Interpolation Algorithm:** Calculates precise rank estimates rather than broad ranges.
* **Dark Mode:** Fully responsive dark theme with persistence (saves preference).
* **College Trends:** Includes detailed cutoff data for Top NITs.
* **Monetization Ready:** Integrated sections for Amazon Affiliates and Google AdSense.

##Tech Stack
* **Frontend:** HTML5, CSS3 (CSS Variables, Flexbox/Grid)
* **Logic:** Vanilla JavaScript (No frameworks used for lightweight performance)
* **Design:** Custom "Midnight Blue" & "Royal Slate" theme

##How It Works
1.  User inputs expected marks (0-300).
2.  Selects shift difficulty (Easy/Moderate/Hard).
3.  The JS engine finds the two nearest data points from the `rankData` array.
4.  Applies **Linear Interpolation**: `Y = Y1 + (X - X1) * ((Y2 - Y1) / (X2 - X1))` to find the exact percentile.
5.  Converts Percentile to Rank assuming ~14.5 Lakh candidates.