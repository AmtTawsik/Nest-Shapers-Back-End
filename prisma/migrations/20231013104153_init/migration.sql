/*
  Warnings:

  - You are about to drop the column `slots` on the `available_sevice` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[startTime,serviceTeamId,availableServiceId]` on the table `slot` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `availableServiceId` to the `slot` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "slot_startTime_serviceTeamId_key";

-- AlterTable
ALTER TABLE "available_sevice" DROP COLUMN "slots";

-- AlterTable
ALTER TABLE "slot" ADD COLUMN     "availableServiceId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "slot_startTime_serviceTeamId_availableServiceId_key" ON "slot"("startTime", "serviceTeamId", "availableServiceId");

-- AddForeignKey
ALTER TABLE "slot" ADD CONSTRAINT "slot_availableServiceId_fkey" FOREIGN KEY ("availableServiceId") REFERENCES "available_sevice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
