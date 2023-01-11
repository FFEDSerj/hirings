/*
  Warnings:

  - You are about to drop the column `address_id` on the `companies` table. All the data in the column will be lost.
  - You are about to drop the column `company_id` on the `hirings` table. All the data in the column will be lost.
  - Added the required column `addressId` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `hirings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_address_id_fkey";

-- DropForeignKey
ALTER TABLE "hirings" DROP CONSTRAINT "hirings_company_id_fkey";

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "address_id",
ADD COLUMN     "addressId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "hirings" DROP COLUMN "company_id",
ADD COLUMN     "companyId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "companies_addressId_idx" ON "companies"("addressId");

-- CreateIndex
CREATE INDEX "hirings_companyId_idx" ON "hirings"("companyId");

-- AddForeignKey
ALTER TABLE "hirings" ADD CONSTRAINT "hirings_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
