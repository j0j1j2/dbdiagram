import { Separator } from '@/components/ui/separator'
import useZoomStore from '@/stores/zoomStore'
import { ControlButton, useReactFlow } from '@xyflow/react'
import { MinusIcon, PlusIcon, WandIcon } from 'lucide-react'
import React, { useEffect } from 'react'

function DbmlControlButton({children, onClick}: {children: React.ReactNode, onClick?: () => void}) {
  return (
    <div className='pb-1 hover:bg-gray-100 rounded-sm cursor-pointer font-light w-[36px] h-[36px] flex justify-center items-center'
        onClick={onClick}
    >
        {children}
    </div>
  )
}

function DbmlControlInput({
  value,
  onChange,
}: {
  value: number,
  onChange: (value: number) => void,
}) {
  return (
    <div className='flex justfiy-ceneter items-center'>{value}%</div>
  )
}


export default function DbmlControls() {
  const {zoomTo} = useReactFlow();
  const {zoom} = useZoomStore();

  return (
    <div className='absolute bottom-0 -translate-y-4 left-1/2 -translate-x-1/2  bg-white shadow-md rounded-lg z-10 flex p-1 h-[44px] justify-center items-center'>
        <section className='flex'>
          <DbmlControlButton onClick={() => zoomTo(zoom * 1/1.05)}>
              <MinusIcon/>
          </DbmlControlButton>
          <DbmlControlInput value={(zoom * 100).toFixed(0)} onChange={()=>{}}></DbmlControlInput>
          <DbmlControlButton onClick={() => zoomTo(zoom * 1.05)}>
              <PlusIcon />
          </DbmlControlButton>
        </section>

        <Separator className='mx-2' orientation='vertical'/>

        <DbmlControlButton>
          <WandIcon></WandIcon>
        </DbmlControlButton>
    </div>
  )
}
