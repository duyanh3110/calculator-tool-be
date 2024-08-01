import { readdir } from "node:fs/promises";
import { writeFileSync } from "node:fs";

export function formatDate() {
    var d = new Date(),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("");
}

export async function createDataFile(dir, fileName) {
    try {
        const files = await readdir(dir);
        for (const file of files) {
            if (file.endsWith(fileName)) {
                return;
            }
        }

        await writeFileSync(
            `./db/${fileName}`,
            JSON.stringify([], null, 2),
            "utf8",
        );
    } catch (err) {
        console.error(err);
    }
}
