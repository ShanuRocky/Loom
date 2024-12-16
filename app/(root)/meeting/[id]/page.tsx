'use client'
import MeetingSetUp from '@/components/MeetingSetUp';
import MeetingRoom from '@/components/MeetingRoom';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useState } from 'react';
import { useGetCallById } from '@/hooks/useGetCallById';
import Loader from '@/components/Loader';

// Type for dynamic route params
interface MeetingPageProps {
  params: {
    id: string;
  };
}

const Meeting: React.FC<MeetingPageProps> = ({ params }) => {
  const { isLoaded } = useUser();
  const [isSetUpComplete, setIsSetUpComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(params.id);

  if (!isLoaded || isCallLoading) return <Loader />;

  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {
            !isSetUpComplete ? <MeetingSetUp setIsSetUpComplete={setIsSetUpComplete} /> : <MeetingRoom />
          }
        </StreamTheme>
      </StreamCall>
    </main>
  );
}

export default Meeting;
