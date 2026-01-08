import React from 'react'
import dayjs from 'dayjs';
import { date } from 'zod';
import { Database } from 'lucide-react';
import Image from "next/image";
import {getRandomInterviewCover} from '@/lib/utils'


const InterviewCard = ({interviewId,userId,role,type,techstack,createdAt}:InterviewCardProps) => {
 const feedback = null as Feedback | null
 const normolizedType = /mix/gi.test(type) ? 'Mixed' : 'type'; 
 const formatedDate = dayjs(feedback?.createdAt||createdAt||Date.now()).format('MMM D,YYYY')
    return (
    <div className='card-border w-[360] mx-sm:w-full min-h-96'>
      <div className='card-interview'>
        <div>
          <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600' >
<p className='badge-text'>{normolizedType}</p>
          </div>
          <Image src={getRandomInterviewCover()} alt='cover Image' width={90} height={90} className='rounded-full
          object-fit size-[90px]'/>
          <h3 className='mt-5 capitalize'>{role} interview</h3>
          <div className='flex flex-row gap-5 mt-3'>
            <div className='flex flex-row gap-2'>
             <Image src='calendar.svg' alt='calender' width={22} height={22}/>
            </div>
          </div>

        </div>
      </div></div>
  )
}

export default InterviewCard