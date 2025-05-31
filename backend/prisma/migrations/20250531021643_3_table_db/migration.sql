/*
  Warnings:

  - The primary key for the `Idea` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `answer` on the `Idea` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `Idea` table. All the data in the column will be lost.
  - You are about to drop the column `starred` on the `Idea` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `regret` to the `Idea` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Idea` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "DailyLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reflection" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "DailyLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Idea" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "regret" TEXT NOT NULL,
    "reframed_regret" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Idea_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Idea" ("createdAt", "id") SELECT "createdAt", "id" FROM "Idea";
DROP TABLE "Idea";
ALTER TABLE "new_Idea" RENAME TO "Idea";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "id", "password", "username") SELECT "email", "id", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
