import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  
  // Instantly redirect if an active session is detected
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-neutral-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-blue-600 text-white flex-col justify-between overflow-hidden p-16">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/edumanage/1920/1080')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-800/20 to-transparent"></div>
        
        <div className="relative z-10">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-8 border border-white/30 shadow-xl">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight leading-tight">
             Manage your<br/>academic journey.
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed font-medium max-w-md">
            Your all-in-one student dashboard for attendance tracking, fee management, and performance monitoring.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-blue-200 text-sm font-medium">
           <span>&copy; {new Date().getFullYear()} EduManage ERP</span>
           <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
           <span>Hackathon MVP</span>
        </div>
      </div>
      
      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-16 relative">
        <div className="absolute top-8 left-8 lg:hidden flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
             <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
             </svg>
          </div>
          <span className="font-bold text-neutral-900 tracking-tight">EduManage</span>
        </div>

        <div className="w-full max-w-md bg-white p-8 sm:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100/60 relative">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          <h2 className="text-3xl font-extrabold text-neutral-900 mb-2 tracking-tight">Welcome Back</h2>
          <p className="text-neutral-500 mb-8 font-medium">Please sign in to your student account.</p>
          
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
