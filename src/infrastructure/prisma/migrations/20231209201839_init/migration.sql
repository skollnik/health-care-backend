/*
  Warnings:

  - You are about to drop the column `medicalRecordEntityId` on the `medicationentity` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `medicationentity` DROP FOREIGN KEY `MedicationEntity_medicalRecordEntityId_fkey`;

-- AlterTable
ALTER TABLE `medicationentity` DROP COLUMN `medicalRecordEntityId`;

-- CreateTable
CREATE TABLE `_MedicalRecordEntityToMedicationEntity` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MedicalRecordEntityToMedicationEntity_AB_unique`(`A`, `B`),
    INDEX `_MedicalRecordEntityToMedicationEntity_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_MedicalRecordEntityToMedicationEntity` ADD CONSTRAINT `_MedicalRecordEntityToMedicationEntity_A_fkey` FOREIGN KEY (`A`) REFERENCES `MedicalRecordEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MedicalRecordEntityToMedicationEntity` ADD CONSTRAINT `_MedicalRecordEntityToMedicationEntity_B_fkey` FOREIGN KEY (`B`) REFERENCES `MedicationEntity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
