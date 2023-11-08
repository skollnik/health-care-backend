/*
  Warnings:

  - Added the required column `date` to the `AppointmentEntity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `appointmententity` ADD COLUMN `date` DATETIME(3) NOT NULL;
