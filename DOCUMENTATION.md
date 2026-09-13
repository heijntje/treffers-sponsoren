# Treffers Sponsoren - Project Documentation

## Overview
This repository contains a digital signage application for "De Treffers" sponsors, built with React. The application rotates through different categories of sponsors (e.g., Hoofdsponsor, stersponsoren, balsponsors) displaying their logos dynamically. It is intended to be used on a large screen or TV in a loop.

In addition to the React frontend, the repository contains a set of Python scripts in the `scratch/` directory used for data gathering and processing (scraping sponsor links, matching names, and generating JSON files).

## Architecture

### Frontend (React)
The frontend uses standard React principles and is bootstrapped with Create React App.

- **Routing:** The application uses `react-router-dom` to route between different sponsor categories (e.g., `/`, `/hoofdsponsor`, `/vijfster`, etc.).
- **Screen Rotation (`SponsorScreenRotator.js`):** This component acts as the main driver for the digital signage. It cycles through a defined sequence of routes (pages) at specific intervals.
- **Pages (`src/pages/`):** Each page corresponds to a specific tier or type of sponsor. They typically fetch data from a JSON file (in `public/`) and use layout components to display the logos.
- **Layout Components (`src/components/`):** Reusable layout grids (`OneBlock`, `TwoBlocks`, `FourBlocks`, `EightBlocks`) used by pages to display sponsor logos uniformly. `SponsorCarousel` is used for animating a large number of sponsors within a layout block.

### Data Management
- Sponsor data (names, logos, links) is stored in statically served JSON files located in the `public/` directory (e.g., `public/links.json`, `public/overige/overigesponsoren.json`).
- Images/logos are stored in the `public/images/` directory.
- The components use the standard `fetch` API to load these JSON files when they mount.

### Python Scripts (`scratch/`)
These scripts are utility tools for maintaining the sponsor data:
- `scrape_sponsor_links.py`: Scrapes the official website for sponsor URLs.
- `create_json_sponsors.py`: Generates the JSON structures used by the React frontend from local directories or data sources.
- `match_links.py`: Uses string matching (fuzzy matching/regex) to map scraped URLs to the sponsor names in the JSON files.
- `apply_links.py`: Applies the matched URLs directly into the JSON data files.

## Running the Application

To run the frontend locally:
```bash
npm install
npm start
```
The app will be available at `http://localhost:3000`.

## Building for Production

To create an optimized production build:
```bash
npm run build
```
The resulting `build/` directory can be served statically.
