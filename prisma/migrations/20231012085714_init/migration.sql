/*
  Warnings:

  - A unique constraint covering the columns `[userId,date,serviceId]` on the table `booking` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "booking_userId_date_serviceId_key" ON "booking"("userId", "date", "serviceId");
