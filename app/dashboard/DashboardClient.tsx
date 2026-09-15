"use client";

import { motion, Variants } from "motion/react";
import GradesChart from "./GradesChart";

interface DashboardClientProps {
  student: any;
  attendanceUnlocked: boolean;
  feeProgress: number;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function DashboardClient({ student, attendanceUnlocked, feeProgress }: DashboardClientProps) {
  return (
    <div className="min-h-screen bg-neutral-50 p-6 md:p-12 font-sans selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-6xl mx-auto">
        {/* Dashboard Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4"
        >
          <div>
            <p className="text-blue-600 font-semibold mb-1 tracking-wide uppercase text-sm">Student Portal</p>
            <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight">Welcome, {student.name}</h1>
          </div>
          <div>
            <a 
              href="/api/auth/signout" 
              className="inline-flex items-center justify-center text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors bg-white px-5 py-2.5 border border-neutral-200 rounded-lg shadow-sm hover:shadow-md hover:border-neutral-300 active:scale-95 duration-200"
            >
              Sign out
            </a>
          </div>
        </motion.header>

        {/* Dashboard Grid Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
        >
          {/* Attendance Card */}
          <motion.div 
            variants={itemVariants}
            className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl border border-neutral-100 flex flex-col transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Attendance</h2>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            
            <div className="flex items-baseline gap-3 mb-8">
              <p className="text-6xl font-black text-neutral-900 tracking-tighter group-hover:text-blue-600 transition-colors">{student.attendancePercentage}%</p>
            </div>
            
            <div className="mt-auto">
              {attendanceUnlocked ? (
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200/50 text-sm px-4 py-2 rounded-full font-bold shadow-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Hackathon Bounty UNLOCKED ✅
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 border border-rose-200/50 text-sm px-4 py-2 rounded-full font-bold shadow-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  LOCKED 🔒
                </span>
              )}
            </div>
          </motion.div>

          {/* Fees Overview Card */}
          <motion.div 
            variants={itemVariants}
            className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl border border-neutral-100 flex flex-col transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Fees Overview</h2>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-8">
              <p className="text-5xl font-black text-neutral-900 tracking-tighter group-hover:text-blue-600 transition-colors">
                ${student.feesPaid?.toLocaleString() || 0}
              </p>
              <p className="text-lg font-semibold text-neutral-400">/ ${student.totalFees?.toLocaleString() || 0}</p>
            </div>
            
            <div className="mt-auto">
              <div className="flex justify-between text-sm font-semibold text-neutral-500 mb-3">
                <span>Payment Progress</span>
                <span className="text-neutral-900">{feeProgress.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-3 overflow-hidden shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${feeProgress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  className="bg-blue-600 h-full rounded-full" 
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Full-width Chart Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl border border-neutral-100 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-6">
             <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
             <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Academic Performance</h2>
          </div>
          <GradesChart data={student.grades || []} />
        </motion.div>
        
      </div>
    </div>
  );
}
