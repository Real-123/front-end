import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { sanityClient } from "@/lib/sanity";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user?.email) {
    redirect("/");
  }

  let student = null;
  let fetchError = false;

  try {
    // Fetch the logged-in student's data directly via GROQ
    const query = `*[_type == "student" && email == $email][0]`;
    student = await sanityClient.fetch(query, { email: session.user.email });
  } catch (error) {
    console.error("Dashboard sanity fetch error:", error);
    fetchError = true;
  }

  if (fetchError || !student) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-8">
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-neutral-100 text-center max-w-md">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
             <svg className="w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
             </svg>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2 tracking-tight">
            {fetchError ? "Connection Error" : "Record Not Found"}
          </h2>
          <p className="text-neutral-500 font-medium mb-6">
            {fetchError 
              ? "Could not connect to the Sanity database. Please check your environment variables (NEXT_PUBLIC_SANITY_PROJECT_ID)."
              : "No matching student record found in the database. Please check with administration."}
          </p>
          <a 
            href="/api/auth/signout" 
            className="inline-block bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Sign out and try again
          </a>
        </div>
      </div>
    );
  }

  const attendanceUnlocked = student.attendancePercentage > 85;
  const feeProgress = Math.min(100, ((student.feesPaid || 0) / (student.totalFees || 1)) * 100);

  return (
    <DashboardClient 
      student={student} 
      attendanceUnlocked={attendanceUnlocked} 
      feeProgress={feeProgress} 
    />
  );
}
