import { html, define, property, render } from 'hybrids';
import { StreamStore } from '../stores';

interface App extends HTMLElement {
  store: StreamStore | undefined;
}

async function onInitStream(host: HTMLElement & App): Promise<void> {
  const { constraints } = host.store;
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  const videoTracks = stream.getVideoTracks();
  host.querySelector('video').srcObject = stream;
  StreamStore.set((store) => ({ ...store, stream, videoTracks }));
}

const App = {
  store: property(StreamStore.get()),
  render: render(
    (host: App) => {
      StreamStore.subscribe((store) => (host.store = store));
      return html`
        <div>
          <div>
            <video autoplay playsinline></video>
            <button onclick=${onInitStream}>Join</button>
          </div>
        </div>
      `;
    },
    { shadowRoot: false }
  ),
};

define('webrtc-app', App);
