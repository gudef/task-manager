"use server";

import { getOneTask } from "@/db/quires";
import { EditModule } from "../_components/editModule";



const EditTaskPage = async({ params }: { params: { slug: string } }) => {

    const oldData = await getOneTask(params.slug);

   
    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
        {oldData && !('error' in oldData) && <EditModule text={oldData.text} />}
        </div>
        
    )
}

export default EditTaskPage