-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "ceo" TEXT,
ALTER COLUMN "budget" DROP NOT NULL,
ALTER COLUMN "staff" DROP NOT NULL;

-- AlterTable
ALTER TABLE "hirings" ALTER COLUMN "description" DROP NOT NULL;
