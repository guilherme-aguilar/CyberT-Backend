import { PrismaClient } from "@prisma/client";

export async function createInitialShops(prisma : PrismaClient) {
  await prisma.shop.createMany({
    data: [
      {
        address: "R. Sophia Fortini Costa, 303 - Nova Era, Juiz de Fora - MG",
        location:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1853.4770230728006!2d-43.42395956095267!3d-21.704509112092435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x989e8b6e136957%3A0x9db4b86773bc4984!2sINTERNET%20CYBER%20TELECOM!5e0!3m2!1spt-BR!2sbr!4v1718726302173!5m2!1spt-BR!2sbr",
        main_point:  true,
        phone: "(32) 98823-6790",
        shopName: "Loja Nova Era",
        whatsapp: "https://api.whatsapp.com/send?phone=32988236790",
      }
    ]
  });
}
