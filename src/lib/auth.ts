import "server-only";
import { getAdminSession } from "./session";
import { redirect } from "next/navigation";

export async function verifyAdmin(): Promise<void> {
  const session = await getAdminSession();
  if (!session || session.role !== "admin") {
    redirect("/admin/login");
  }
}
