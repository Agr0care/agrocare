-- CreateTable
CREATE TABLE "Register" (
    "id" STRING NOT NULL,
    "temperature" STRING NOT NULL,
    "weather" STRING NOT NULL,
    "soilMoisture" STRING NOT NULL,
    "airHumidity" STRING NOT NULL,
    "batteryLevel" STRING NOT NULL,
    "brightness" STRING NOT NULL,

    CONSTRAINT "Register_pkey" PRIMARY KEY ("id")
);
