import { cn } from "@/lib/utils";
import {
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  CancelCallButton,
  PaginatedGridLayout,
  RecordCallButton,
  ScreenShareButton,
  SpeakerLayout,
  SpeakingWhileMutedNotification,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";

type callLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const router = useRouter();
  const [layout, setLayout] = useState<callLayoutType>("speaker-left");
  const [showParticipent, setShowParticipent] = useState(false);

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  if (callingState !== CallingState.JOINED) return <Loader />;
  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="left" />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  const onLeave = () => {
    router.push("/");
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2 mr-2", {
            "show-block": showParticipent,
          })}
        >
          <CallParticipantsList
            onClose={() => {
              setShowParticipent(false);
              
            }}
          />
        </div>
        <div className="fixed bottom-2 flex w-full items-center justify-center gap-5 flex-wrap">
          <div className="str-video__call-controls">
            <SpeakingWhileMutedNotification>
              <ToggleAudioPublishingButton />
            </SpeakingWhileMutedNotification>
            <ToggleVideoPublishingButton />
            <CancelCallButton onLeave={onLeave} />
            <ScreenShareButton />
            <RecordCallButton />
          </div>
          <DropdownMenu>
            <div className="flex items-center">
              <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
                <LayoutList size={20} className="text-white" />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
              {["grid", "speaker-left", "speaker-right"].map((item, index) => (
                <div key={index}>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      setLayout(item.toLowerCase() as callLayoutType);
                    }}
                  >
                    {item}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="border-dark-1" />
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <CallStatsButton />
          <button onClick={() => setShowParticipent((prev) => !prev)}>
            <div className="cursor-pointer rounded-2xl  bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <Users size={20} className="text-white" />
            </div>
          </button>
          {<EndCallButton />}
        </div>
      </div>
    </section>
  );
};

export default MeetingRoom;
