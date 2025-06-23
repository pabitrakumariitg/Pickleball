import { redirect } from "next/navigation"

export default function HomePage() {
  // Redirect to business login page
  redirect("/businessess/auth/login")
}
