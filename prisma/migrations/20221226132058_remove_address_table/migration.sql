/*
  Warnings:

  - You are about to drop the column `addressId` on the `companies` table. All the data in the column will be lost.
  - You are about to alter the column `budget` on the `companies` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(6,2)`.
  - You are about to drop the `addresses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_addressId_fkey";

-- DropForeignKey
ALTER TABLE "hirings" DROP CONSTRAINT "hirings_companyId_fkey";

-- DropIndex
DROP INDEX "companies_addressId_idx";

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "addressId",
ALTER COLUMN "budget" SET DATA TYPE DECIMAL(6,2);

-- DropTable
DROP TABLE "addresses";

-- AddForeignKey
ALTER TABLE "hirings" ADD CONSTRAINT "hirings_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
