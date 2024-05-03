import { getUserProgress } from "@/db/quires";
import { Navbar } from "./_components/navbar";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster"


type Props = {
    children: React.ReactNode; 
}

const TaskLayout = async({children}: Props) => {

   const userProgress = await getUserProgress();
    if (!userProgress) {
        redirect("/");
    }

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-40 bg-gradient-to-r from-blue-300 to-purple-200">
            <Navbar/>
        </div>
        <div className="w-full h-full bg-gradient-to-r from-purple-200 to-red-100">
            <Toaster />
            {children}
        </div>
    </div>
  )
}

export default TaskLayout