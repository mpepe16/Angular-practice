/*
  Warnings:

  - The primary key for the `Caveman` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Caveman` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Caveman` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Caveman` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Caveman" DROP CONSTRAINT "Caveman_pkey",
ADD COLUMN     "userId" UUID NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Caveman_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Inventory" (
    "id" UUID NOT NULL,
    "durability" INTEGER NOT NULL,
    "caveman_id" UUID NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "durability" INTEGER NOT NULL,
    "inventory_id" UUID NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillTree" (
    "id" UUID NOT NULL,
    "caveman_id" UUID NOT NULL,

    CONSTRAINT "SkillTree_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "dependencies" TEXT[],
    "skill_tree_id" UUID NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_id_key" ON "Inventory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_caveman_id_key" ON "Inventory"("caveman_id");

-- CreateIndex
CREATE UNIQUE INDEX "Item_id_key" ON "Item"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SkillTree_id_key" ON "SkillTree"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SkillTree_caveman_id_key" ON "SkillTree"("caveman_id");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_id_key" ON "Skill"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Caveman_id_key" ON "Caveman"("id");

-- AddForeignKey
ALTER TABLE "Caveman" ADD CONSTRAINT "Caveman_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_caveman_id_fkey" FOREIGN KEY ("caveman_id") REFERENCES "Caveman"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillTree" ADD CONSTRAINT "SkillTree_caveman_id_fkey" FOREIGN KEY ("caveman_id") REFERENCES "Caveman"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_skill_tree_id_fkey" FOREIGN KEY ("skill_tree_id") REFERENCES "SkillTree"("id") ON DELETE CASCADE ON UPDATE CASCADE;
