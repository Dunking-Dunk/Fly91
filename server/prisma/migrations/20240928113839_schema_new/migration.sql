/*
  Warnings:

  - The `origin` column on the `FlightRequest` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `destination` column on the `FlightRequest` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "FlightRequest" DROP COLUMN "origin",
ADD COLUMN     "origin" TEXT[],
DROP COLUMN "destination",
ADD COLUMN     "destination" TEXT[];
