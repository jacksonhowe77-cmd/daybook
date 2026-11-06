Daybook keeps track of your classes, important dates, and study sessions. It can be installed on a phone and keeps your data on your device.

## Importing a class schedule

On the Classes tab, choose **Import JSON** and select a schedule file. Imported classes are added to the existing schedule. The file can be a JSON array of classes, an object with a `classes` array, or a Daybook backup.

Each class needs a `name`, `start`, `end`, and non-empty `days` array. Times can use 24-hour format (`"08:30"`) or AM/PM (`"8:30 AM"`). Days may be numbers from `0` (Sunday) to `6` (Saturday), or day names/abbreviations. `room` and `group` are optional.

See [classes-example.json](./classes-example.json) for a sample. Invalid files are rejected without partially importing their classes.
