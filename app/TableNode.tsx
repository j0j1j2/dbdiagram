import React from 'react'

export interface Column {
  name: string;
  type: string;
  nulalble?: boolean;
  default?: string;
  primary?: boolean;
}

export default function TableNode({ data }: { data: { title: string, columns: Column[] } }) {
  return (
    <>
      <div className='bg-sky-800 text-white font-bold px-3 py-1'>{data.title}</div>
      {data.columns.map((column, index) => (
        <div key={index} className='bg-gray-100 flex px-3 py-2 justify-between'>
          <div className='text-gray-600 pr-20 text-sm'>
            <p className={column.primary ? 'font-bold' : ''}>{column.name}</p>
          </div>
          <div className='text-gray-500 pl-5 text-sm'>{column.type}</div>
        </div>
      ))}
    </>
  )
}
