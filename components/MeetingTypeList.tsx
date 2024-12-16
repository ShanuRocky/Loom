'use client'
import React from 'react'
import HomeCard from './HomeCard'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { useToast } from "@/hooks/use-toast"
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { Textarea } from './ui/textarea'
import ReactDatePicker from 'react-datepicker'
import { Input } from './ui/input'

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<'isSchedilingMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: ''
  })
  const [callDetails, setCallDetails] = useState<Call>();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({ title: "please select date and time" });
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) {
        throw new Error('Failed to create call');
      }
      const startAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'instant meeting';

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description
          }
        }
      })

      setCallDetails(call);

      if (meetingState === 'isInstantMeeting') 
      {
        router.push(`/meeting/${call.id}`)
        toast({ title: "meeting created", })
      }
    } catch (error) {
      console.log(error);
      toast({ title: "Failed to create meeting", })
    }
  };

  const { toast } = useToast()
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard
        img='/icons/add-meeting.svg'
        title='New Meeting'
        description='Set up a new meeting'
        handleClick={() => setMeetingState('isInstantMeeting')}
        className='bg-orange-1'
      />
      <HomeCard
        img='/icons/join-meeting.svg'
        title='Join Meeting'
        description='Via invitation link'
        handleClick={() => setMeetingState('isJoiningMeeting')}
        className='bg-blue-1'
      />
      <HomeCard
        img='/icons/schedule.svg'
        title='Schedule Meeting'
        description='Plan your meeting'
        handleClick={() => setMeetingState('isSchedilingMeeting')}
        className='bg-purple-1'
      />
      <HomeCard
        img='/icons/recordings.svg'
        title='View Recordings'
        description='Meeting recordings'
        handleClick={() => router.push('/recordings')}
        className='bg-yellow-1'
      />
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => { setMeetingState(undefined) }}
        title='Start an instant Meeting'
        className='text-center'
        buttonText='Start Meeting'
        handleClick={createMeeting}
      />
      {
        !callDetails ? (
          <MeetingModal
            isOpen={meetingState === 'isSchedilingMeeting'}
            onClose={() => { setMeetingState(undefined) }}
            title='Schedule Meeting'
            handleClick={createMeeting}>
            <div className='flex flex-col gap-2.5'>
              <label className='text-base text-normal leading-[22px] text-sky-200'>Add a discription</label>
              <Textarea className='bg-dark-2'
                onChange={(e) => {
                  setValues({ ...values, description: e.target.value })
                }} />
            </div>
            <div className='flex w-full flex-col gap-2'>
            <label className='text-base text-normal leading-[22px] text-sky-200'>Select Date and time</label>
            <ReactDatePicker selected={values.dateTime} 
            onChange={(date) => setValues({...values,dateTime: date!})}
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={15}
            timeCaption='time'
            dateFormat='MMMM d, yyyy h:mm aa'
            className='w-full rounded bg-dark-2 p-2 focus:outline-none'/>
            </div>
          </MeetingModal>
        ) : (
          <MeetingModal
            isOpen={meetingState === 'isSchedilingMeeting'}
            onClose={() => { setMeetingState(undefined);
              setCallDetails(undefined);
             }}
            title='Meeting created'
            handleClick={() => {
              navigator.clipboard.writeText(meetingLink);
              toast({title: 'link copied'})
            }}
            className='flex flex-col items-center justify-center'
            image='/icons/checked.svg'
            buttonIcon='/icons/copy.svg'
            buttonText='copy meeting link'
          />
          
          )}
          <MeetingModal
            isOpen={meetingState === 'isJoiningMeeting'}
            onClose={() => { setMeetingState(undefined);
             }}
            title='Type the Link here'
            className='text-center'
            buttonText='Join Meeting'
            handleClick={() => {
              router.push(values.link)
            }}>
              <Input className='text-white border-none bg-dark-2 focus-visible:ring-0'
              placeholder='Meeting Link'
              onChange={(e) => setValues({...values,link:e.target.value})}/>
            </MeetingModal>
    </section>
  )
}

export default MeetingTypeList
