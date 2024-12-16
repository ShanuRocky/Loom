'use client'
import { useGetCalls } from '@/lib/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard';
import Loader from './Loader';

const CallList = ({ type }: { type: 'previous' | 'upcoming' | 'recordings' }) => {
    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
    const router = useRouter();
    const [recordings, setRecordings] = useState<CallRecording[]>([]);
    const getCalls = () => {
        switch (type) {
            case 'previous':
                return endedCalls;
            case 'upcoming':
                return upcomingCalls;
            case 'recordings':
                return recordings;
            default:
                throw new Error(`Invalid call type: ${type}`);
        }
    };
    
    const getNOCallsMessage = () => {
        switch (type) {
            case 'previous': return 'no previous Calls';
            case 'upcoming': return 'no upcoming Calls';
            case 'recordings': return 'no call Recordings';
            default: return '';
        }
    }

    useEffect(() => {
        const fetchRecordings = async () => {
            const callData = await Promise.all(
                callRecordings?.map(async (meeting) => {
                    return await meeting?.queryRecordings();
                }) ?? []
            );
            const recordingss = await callData.filter((call) => call?.recordings.length > 0).flatMap(call => call.recordings);
            setRecordings(recordingss);
        }
        if (type === 'recordings') fetchRecordings();
    }, [type, callRecordings])
    const calls = getCalls();
    const Nocalls = getNOCallsMessage();
    if (isLoading) return <Loader />
    return (
        <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
            {
                (calls && calls.length > 0) ? calls.map((meeting: Call | CallRecording) => (
                    <MeetingCard
                        key={(meeting as Call)?.id}
                        icon={
                            type == 'previous' ? '/icons/previous.svg' : type === 'recordings' ? '/icons/recordings.svg' : '/icons/upcoming.svg'
                        }
                        title={(meeting as Call).state?.custom?.description?.substring(0, 20) || meeting?.filename?.substring(0,20) ||'Personal Meeting'}
                        date={(meeting as Call).state?.startsAt
                            ? new Date((meeting as Call)?.state?.startsAt).toLocaleString()
                            : (meeting as CallRecording)?.start_time
                                ? new Date((meeting as CallRecording).start_time).toLocaleString()
                                : 'No date available'}
                        isPreviousMeeting={type === 'previous'}
                        buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
                        buttonText={type === 'recordings' ? 'Play' : 'Start'}
                        handleClick={type === 'recordings' ? () => router.push(`${meeting.url}`) : () => router.push(`/meeting/${meeting?.id}`)}
                        link={type === 'recordings' ? (meeting)?.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting?.id}`}
                    />
                )) :
                    (
                        <h1>{Nocalls}</h1>
                    )}
        </div>
    )
}

export default CallList
