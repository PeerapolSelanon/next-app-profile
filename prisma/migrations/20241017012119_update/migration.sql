/*
  Warnings:

  - You are about to drop the column `description` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the `RolePermission` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `desciption` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permission_id` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RolePermission" DROP CONSTRAINT "RolePermission_permission_id_fkey";

-- DropForeignKey
ALTER TABLE "RolePermission" DROP CONSTRAINT "RolePermission_role_id_fkey";

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "description",
ADD COLUMN     "desciption" TEXT NOT NULL,
ADD COLUMN     "permission_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "RolePermission";
