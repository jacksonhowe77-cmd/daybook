# Daybook

A lightweight, offline-first class schedule notebook, calendar, and study timer. Runs entirely in the browser with local data storage.

## Features

- **Class Timetable:** Track weekly classes with room info, group tags, and 12h/24h time formatting.
- **Today Dashboard:** Real-time class countdowns, progress bars, and daily schedule overview.
- **Calendar & Tasks:** Schedule tests, track assignment deadlines, and manage to-dos.
- **Study Timer:** Configurable focus and break timer.
- **PWA & Offline:** Works offline and supports installation as a web app.
- **Import & Export:** Batch import class schedules via JSON, export calendar to `.ics`, and download full JSON data backups.

## Usage

Daybook is built with static HTML, CSS, and Vanilla JavaScript. No build steps or package managers required.

1. Clone or download the repository.
2. Open `index.html` in any browser.

To enable PWA features (offline caching and device notifications), serve over HTTP:

```bash
# Python
python3 -m http.server 8000

# Node.js
npx http-server . -p 8000
```

## JSON Schedule Import Format

Import a `.json` file on the **Classes** tab using **Import JSON**.

```json
{
  "classes": [
    {
      "name": "Biology",
      "room": "Room 204",
      "group": "Science",
      "start": "08:30",
      "end": "09:20",
      "days": ["Monday", "Wednesday", "Friday"]
    },
    {
      "name": "History",
      "room": "Room 118",
      "group": "Humanities",
      "start": "10:15 AM",
      "end": "11:05 AM",
      "days": [2, 4]
    }
  ]
}
```

### Schema

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | Yes | Class name (1–60 characters). |
| `start` | `string` | Yes | Start time (e.g., `"08:30"`, `"8:30 AM"`). |
| `end` | `string` | Yes | End time (must be after `start`). |
| `days` | `array` | Yes | Array of day names (`"Mon"`, `"Monday"`) or numbers (`0` = Sun, `6` = Sat). |
| `room` | `string` | No | Room number or teacher name. |
| `group` | `string` | No | Subject/category tag. |

See [`classes-example.json`](./classes-example.json) for a sample file.

## Data Export

- **iCalendar (.ics):** Export events from the Calendar tab for Apple Calendar, Google Calendar, or Outlook.
- **JSON Backup:** Download a full data snapshot from **Settings > Download Daybook backup**.

## License

[MIT](LICENSE)
