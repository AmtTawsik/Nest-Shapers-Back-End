/*
  Warnings:

  - You are about to drop the column `availableServiceId` on the `slot` table. All the data in the column will be lost.
  - You are about to drop the column `weekDay` on the `slot` table. All the data in the column will be lost.
  - You are about to drop the column `heading` on the `website_content` table. All the data in the column will be lost.
  - You are about to drop the column `subHeading` on the `website_content` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[startTime,serviceTeamId]` on the table `slot` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,serviceTeamId]` on the table `team_member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slots` to the `available_sevice` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `service` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "slot" DROP CONSTRAINT "slot_availableServiceId_fkey";

-- DropIndex
DROP INDEX "slot_startTime_weekDay_serviceTeamId_key";

-- DropIndex
DROP INDEX "team_member_serviceTeamId_key";

-- AlterTable
ALTER TABLE "available_sevice" ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "price" DOUBLE PRECISION,
ADD COLUMN     "serviceName" TEXT,
ADD COLUMN     "slots" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "service" DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "slot" DROP COLUMN "availableServiceId",
DROP COLUMN "weekDay";

-- AlterTable
ALTER TABLE "stats" ADD COLUMN     "totalServices" INTEGER DEFAULT 25;

-- AlterTable
ALTER TABLE "website_content" DROP COLUMN "heading",
DROP COLUMN "subHeading",
ADD COLUMN     "footerText" TEXT;

-- CreateTable
CREATE TABLE "team_notification" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "teamId" TEXT NOT NULL,
    "readStatus" BOOLEAN NOT NULL DEFAULT false,
    "message" TEXT NOT NULL,
    "type" "NotificationStatus" NOT NULL,

    CONSTRAINT "team_notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "website_header_content" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "headingOne" TEXT,
    "subHeadingOne" TEXT,
    "imageUrlOne" TEXT,
    "headingTwo" TEXT,
    "subHeadingTwo" TEXT,
    "imageUrlTwo" TEXT,
    "headingThree" TEXT,
    "subHeadingThree" TEXT,
    "imageUrlThree" TEXT,

    CONSTRAINT "website_header_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "privacy_policy" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "policyName" TEXT NOT NULL,

    CONSTRAINT "privacy_policy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "slot_startTime_serviceTeamId_key" ON "slot"("startTime", "serviceTeamId");

-- CreateIndex
CREATE UNIQUE INDEX "team_member_userId_serviceTeamId_key" ON "team_member"("userId", "serviceTeamId");

-- AddForeignKey
ALTER TABLE "team_notification" ADD CONSTRAINT "team_notification_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "service_team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
