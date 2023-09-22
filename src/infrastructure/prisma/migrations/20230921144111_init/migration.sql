-- CreateTable
CREATE TABLE `UserEntity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMINISTRATOR', 'DOCTOR', 'PATIENT') NOT NULL,
    `avatar` VARCHAR(191) NULL,

    UNIQUE INDEX `UserEntity_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DoctorEntity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `specialty` ENUM('CARDIOLOGY', 'DERMATOLOGY', 'ENDOCRINOLOGY', 'GASTROENTEROLOGY', 'HEMATOLOGY', 'NEUROLOGY', 'OBSTETRICS_GYNECOLOGY', 'ONCOLOGY', 'OPHTHALMOLOGY', 'ORTHOPEDICS', 'OTOLARYNGOLOGY', 'PEDIATRICS', 'PSYCHIATRY', 'RADIOLOGY', 'UROLOGY') NOT NULL,

    UNIQUE INDEX `DoctorEntity_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PatientEntity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,

    UNIQUE INDEX `PatientEntity_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AppointmentEntity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `doctorId` INTEGER NULL,
    `patientId` INTEGER NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'CANCELED') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MedicalRecordEntity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patientId` INTEGER NOT NULL,
    `doctorId` INTEGER NOT NULL,
    `appointmentId` INTEGER NOT NULL,
    `diagnosis` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `MedicalRecordEntity_appointmentId_key`(`appointmentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MedicationEntity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `medicalRecordId` INTEGER NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DoctorEntity` ADD CONSTRAINT `DoctorEntity_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PatientEntity` ADD CONSTRAINT `PatientEntity_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `UserEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AppointmentEntity` ADD CONSTRAINT `AppointmentEntity_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `DoctorEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AppointmentEntity` ADD CONSTRAINT `AppointmentEntity_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `PatientEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedicalRecordEntity` ADD CONSTRAINT `MedicalRecordEntity_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `PatientEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedicalRecordEntity` ADD CONSTRAINT `MedicalRecordEntity_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `DoctorEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedicalRecordEntity` ADD CONSTRAINT `MedicalRecordEntity_appointmentId_fkey` FOREIGN KEY (`appointmentId`) REFERENCES `AppointmentEntity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedicationEntity` ADD CONSTRAINT `MedicationEntity_medicalRecordId_fkey` FOREIGN KEY (`medicalRecordId`) REFERENCES `MedicalRecordEntity`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
