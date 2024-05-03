"use server";
import { getTask } from '@/db/quires';
import { LinkToAddTask } from '../_components/link-to-addtask';
import TableModule from '../_components/tableModule';
import { columns } from '../_components/columns';
import { ExportToExcel } from '../_components/exportToExcel';
import Image from 'next/image';


const TaskPage = async () => {

  const todo = (await getTask()) as unknown as [];

  return (
    <div className='h-full w-full flex flex-col justify-center items-center gap-y-4 overflow-scroll'>
      <div className='flex flex-col'>

        <LinkToAddTask />
      </div>
      {todo?.length > 0 && todo != undefined ? <ExportToExcel data={todo} /> : <></>}
      {todo?.length > 0 && todo != undefined ? <TableModule columns={columns} data={todo} />
        : <>
          <div className='flex flex-col items-center justify-center gap-y-5'>
            <Image src="/task.svg" alt='task' width={200} height={200} />
            <h1 className='text-4xl'>No Data</h1>
          </div>
        </>
      }
    </div>
  )
}

export default TaskPage