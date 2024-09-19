
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export  function Landing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-purple-50 dark:bg-purple-900">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-purple-200 dark:border-purple-700">
        <Link className="flex items-center justify-center" to="#">
          <MountainIcon className="h-6 w-6 text-purple-600 dark:text-purple-300" />
          <span className="sr-only">Acme Inc</span>
        </Link>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <motion.div
            className="container px-4 md:px-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div className="space-y-2" variants={itemVariants}>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-purple-800 dark:text-purple-100">
                  Welcome to Our Platform
                </h1>
                <p className="mx-auto max-w-[700px] text-purple-600 md:text-xl dark:text-purple-200">
                  Choose your login option to get started with our services.
                </p>
              </motion.div>
              <motion.div className="space-x-4" variants={itemVariants}>
                <Button asChild  variant={"admin"}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/admin/login">Login as Admin</Link>
                  </motion.div>
                </Button>
                <Button asChild variant="student" className="border-purple-600  hover:bg-purple-100 dark:border-purple-400 dark:text-purple-100 dark:hover:bg-purple-800 text-white">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/user/login">Login as User</Link>
                  </motion.div>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-purple-200 dark:border-purple-700">
        <p className="text-xs text-purple-600 dark:text-purple-300">
          © {new Date().getFullYear()} Acme Inc. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

function MountainIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}