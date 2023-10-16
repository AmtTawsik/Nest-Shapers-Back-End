/*
  Warnings:

  - A unique constraint covering the columns `[serviceTeamId]` on the table `team_member` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "team_member_serviceTeamId_key" ON "team_member"("serviceTeamId");
