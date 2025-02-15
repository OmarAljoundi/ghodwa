/*
  Warnings:

  - A unique constraint covering the columns `[section]` on the table `setting` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "setting_section_key" ON "setting"("section");
