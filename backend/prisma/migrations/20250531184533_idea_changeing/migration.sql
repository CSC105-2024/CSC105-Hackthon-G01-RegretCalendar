-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Idea" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "regret" TEXT NOT NULL,
    "reframed_regret" TEXT,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT,
    "saved" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Idea_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Idea" ("createdAt", "id", "reframed_regret", "regret", "saved", "updatedAt", "userId") SELECT "createdAt", "id", "reframed_regret", "regret", "saved", "updatedAt", "userId" FROM "Idea";
DROP TABLE "Idea";
ALTER TABLE "new_Idea" RENAME TO "Idea";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
