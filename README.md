**ViewSheet**

Minimalist spreadsheet file previewer built with React + TypeScript and Tailwind CSS. Designed to quickly preview CSV, TSV and JSON files with a clean, neutral UI and useful controls (column selection, wrap text, pagination, dark mode).

**Quick Start**

- **Install:** Install dependencies (run once)

```bash
npm install
npm install react-router-dom papaparse lucide-react clsx
npm install -D @types/papaparse
```

- **Run (development):**

```bash
npm run dev
```

- **Build:**

```bash
npm run build
```

**Tech Stack**

- **Framework:** React (Vite) + TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **Parsing:** PapaParse for CSV/TSV
- **Icons:** Lucide React
- **State:** React Context API (file handling, theme)

**Main Features**

- Drag & drop file upload (CSV / TSV / JSON)
- Fast parsing and preview of tabular data
- Column selector (show/hide columns + select/deselect all)
- Row index column toggle
- Wrap text toggle and sensible min-widths to enable horizontal scrolling
- Pagination for large datasets (defaults to 50 rows/page)
- Dark / light theme with persistence in `localStorage`

**Project Structure (key folders)**

- `src/components` — shared UI components (ui, layout, common)
- `src/features/file-viewer` — file viewer feature: components + hooks
- `src/context` — global providers (FileContext, ThemeProvider)
- `src/pages` — routed pages (`Home`, `Preview`)
- `src/utils` — helpers

**Important files**

- `src/context/ThemeProvider.tsx` — theme provider + `useTheme` hook (persists to `localStorage`)
- `src/context/FileContext.tsx` — file parsing provider
- `src/features/file-viewer/components/FileUploader.tsx` — drag/drop input
- `src/features/file-viewer/components/DataGrid.tsx` — table + pagination + column selector
- `src/components/ui/Table.tsx` — table rendering (supports wrap and index column)

**Notes & UX decisions**

- The table uses `min-w` and horizontal scrolling so selecting many columns does not compress content into unreadable widths.
- Text wrapping is opt-in and can be toggled per preview to accomodate very long text fields (e.g. scraped `full_text`).
- Theme is stored under `localStorage.theme` and initialized synchronously to avoid flash/overwrite on refresh.

**Troubleshooting**

- If theme resets on refresh, ensure `src/context/ThemeProvider.tsx` initializes theme from `localStorage` synchronously (the project includes that logic).
- If CSV parsing fails for malformed files, PapaParse returns errors; the UI surface shows an alert with the parse error.

**Next Improvements (suggested)**

- Persist visible column selection and wrap preference to `localStorage` per file
- Add CSV export of currently visible subset
- Add column resizing
