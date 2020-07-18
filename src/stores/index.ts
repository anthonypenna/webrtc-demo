import { writable } from 'writable-store';

export type StreamStore = {
  stream: MediaStream | null;
  videoTracks: MediaStreamTrack[] | null;
  constraints: {
    audio: boolean;
    video: boolean;
  };
};

export const StreamStore = writable<StreamStore>({
  stream: null,
  videoTracks: null,
  constraints: {
    audio: true,
    video: true,
  },
});
