/*
  Warnings:

  - A unique constraint covering the columns `[login]` on the table `UserAuth` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserAuth_login_key" ON "UserAuth"("login");
