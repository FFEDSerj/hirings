/*
  Warnings:

  - The primary key for the `addresses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `addresses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `address_id` on the `companies` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_address_id_fkey";

-- AlterTable
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "addresses_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "companies" DROP COLUMN "address_id",
ADD COLUMN     "address_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
