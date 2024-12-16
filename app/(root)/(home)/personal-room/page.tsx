'use client'
import { useUser } from '@clerk/nextjs'
import React from 'react'
import Meeting from '../../meeting/[id]/page'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useGetCallById } from '@/hooks/useGetCallById'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'

const Table = ({ title, description }: { title: string, description: string }) => (
  <div className='flex flex-col items-start gap-2 xl:flex-row'>
    <h1 className='text-base font-medium text-sky-50 lg:text-xl xl:min-w-14 '>{title}:</h1>
    <h1 className='truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl'>{description}:</h1>
  </div>
)

const Personal_room = () => {
  const user = useUser();
  const meetingId = user.user?.id;
  const { call } = useGetCallById(meetingId!);
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`
  const { toast } = useToast();
  const client = useStreamVideoClient();
  const router = useRouter();

  const startRoom = async () => {
    if (!user || !client) return;

    if (!call) {
      const newCall = client.call('default', meetingId!)

      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString()
        }
      })
    }
    router.push(`/meeting/${meetingId}?personal=true`)
  }

  return (
    <section className='flex flex-col size-full gap-10 text-white'>
      <h1 className='text-3xl font-bold'>Personal-room</h1>
      <div className='flex w-full flex-col gap-8 xl:max-w-[900px]'>
        <Table title='Topic' description={`${user?.user?.username?.toUpperCase()}'s Meeting Room`} />
        <Table title='Meeting ID' description={meetingId!} />
        <Table title='Invite Link' description={meetingLink} />
      </div>
      <div className='flex gap-5'>
        <Button className='bg-blue-1'
          onClick={startRoom}>
          Start Meeting
        </Button >
        <Button className='bg-slate-500 text-white'
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'link copied' })
          }}>
          Copy Invitation
        </Button>
      </div>
    </section>
  )
}

export default Personal_room
