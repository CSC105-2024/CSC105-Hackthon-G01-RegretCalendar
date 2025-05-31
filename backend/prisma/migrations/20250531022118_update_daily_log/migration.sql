/*
  Warnings:

  - You are about to drop the column `date` on the `DailyLog` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DailyLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reflection" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "DailyLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DailyLog" ("createdAt", "id", "reflection", "updatedAt", "userId") SELECT "createdAt", "id", "reflection", "updatedAt", "userId" FROM "DailyLog";
DROP TABLE "DailyLog";
ALTER TABLE "new_DailyLog" RENAME TO "DailyLog";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
