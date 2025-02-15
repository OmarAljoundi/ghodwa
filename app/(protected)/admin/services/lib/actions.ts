"use server";

import { db } from "@/db.server";

export async function updateServicesOrder(
  newOrder: { id: number; order: number }[]
): Promise<void> {
  try {
    await db.$transaction(async (tx) => {
      for (const service of newOrder) {
        await tx.service.update({
          where: { id: service.id },
          data: { order: service.order },
        });
      }
    });
    console.log("service order updated successfully");
  } catch (error) {
    console.error("Error updating service order:", error);
    throw error;
  }
}
