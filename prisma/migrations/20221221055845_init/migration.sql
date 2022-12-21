-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SHAREHOLDER', 'ADMIN');

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portfolios" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "registered" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Portfolios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shares" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Shares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserShares" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "amount" INTEGER NOT NULL,
    "portfolioId" UUID NOT NULL,

    CONSTRAINT "UserShares_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Portfolios_userId_key" ON "Portfolios"("userId");

-- AddForeignKey
ALTER TABLE "Portfolios" ADD CONSTRAINT "Portfolios_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserShares" ADD CONSTRAINT "UserShares_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
