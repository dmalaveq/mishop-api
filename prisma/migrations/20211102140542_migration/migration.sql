-- CreateTable
CREATE TABLE "Ejemplo" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL DEFAULT E'',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,

    CONSTRAINT "Ejemplo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ejemplo" ADD CONSTRAINT "Ejemplo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
