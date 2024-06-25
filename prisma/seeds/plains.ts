import { PrismaClient } from "@prisma/client";
import { createInitialBenefits } from "./benefits";

export async function createInitialPlains(prisma : PrismaClient) {

  await prisma.plains.createMany({
    data: [
      {
        visibleName: "360MB",
        internalName: "360MB ",
        price: "119,90",
        discountPrice: "99,90"
      },
      {
        visibleName: "440MB",
        internalName: "440MB",
        price: "149,90",
        discountPrice: "129,90"
      },
      {
        visibleName: "600MB",
        internalName: "600MB",
        price: "189,90",
        discountPrice: "149,90"
      },
      {
        visibleName: "100MB",
        internalName: "100MB - Interior",
        price: "119,90",
        discountPrice: "99,90"
      },
      {
        visibleName: "200MB",
        internalName: "200MB - Interior",
        price: "149,90",
        discountPrice: "129,90"
      },
      {
        visibleName: "300MB",
        internalName: "300MB - Interior",
        price: "189,90",
        discountPrice: "149,90"
      },
    ]
  });

}
