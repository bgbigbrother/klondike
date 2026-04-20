// @ts-expect-error — no type declarations for deep asset import in @rse/soundlp
import spriteMp3Url from '@rse/soundlp/soundlp.data-sprite.mp3?url';
import spriteJson from '@rse/soundlp/soundlp.data-sprite.json';
import { t } from '../i18n';

/** [offsetMs, durationMs, loop] */
type SpriteEntry = [number, number, boolean];
type SpriteMap = Record<string, SpriteEntry>;

const SPRITE: SpriteMap = ((spriteJson as unknown) as { sprite: SpriteMap }).sprite;

export interface MusicPlayerOptions {
  /** Container element to append the popup to (defaults to #app) */
  container?: HTMLElement;
  /** Initial volume 0–100 (default 70) */
  initialVolume?: number;
}

interface MusicPlayerState {
  /** Index of the currently selected track (0-based) */
  selectedTrack: number;
  /** Whether audio is currently playing */
  isPlaying: boolean;
  /** Volume level 0–100 */
  volume: number;
  /** Volume level before mute was activated (restored on unmute) */
  premuteVolume: number;
  /** Whether audio is currently muted via the Volume_Icon */
  muted: boolean;
  /** Whether AudioContext has been initialised (requires user gesture) */
  initialised: boolean;
  /** Whether the popup is currently visible */
  popupVisible: boolean;
}

const VIZ_BAR_COUNT = 7;

/** Ordered list of track IDs from SoundLP sprite */
const TRACK_IDS: string[] = [
  'cello1', 'drum1', 'drum2', 'flute1', 'guitar1', 'guitar2', 'guitar3',
  'jazz1', 'nature1', 'nature2', 'nature3', 'nature4', 'nature5', 'nature6',
  'orchester1', 'piano1', 'piano2', 'piano3', 'piano4', 'piano5', 'piano6',
  'piano7', 'piano8', 'synth1', 'synth2', 'synth3', 'violin1',
];

/** Human-readable display names for each track — sourced from the active locale */
function getTrackNames(): string[] { return t().trackNames; }

/** Speaker SVG icon (unmuted state) */
const SPEAKER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
</svg>`;

/** Muted-speaker SVG icon (muted state) */
const MUTED_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
</svg>`;

export class MusicPlayer {
  private options: MusicPlayerOptions;
  private state: MusicPlayerState;
  private popupEl: HTMLElement | null = null;

  /** Web Audio API context (created on first user gesture) */
  private audioCtx: AudioContext | null = null;
  /** Decoded sprite buffer (loaded once) */
  private spriteBuffer: AudioBuffer | null = null;
  /** Currently playing source node */
  private sourceNode: AudioBufferSourceNode | null = null;
  /** Gain node for volume control */
  private gainNode: GainNode | null = null;
  /** Duration (in seconds) of the current track */
  private currentTrackDuration = 0;
  /** AudioContext time when the current track started playing */
  private playStartTime = 0;
  /** Accumulated playback position before a pause (seconds into the track) */
  private pausePosition = 0;

  // Bound listener references for cleanup
  private _onMusicBtnClick: (() => void) | null = null;
  private _onDocumentClick: ((e: MouseEvent) => void) | null = null;
  private _onDocumentKeydown: ((e: KeyboardEvent) => void) | null = null;
  private _onPopupKeydown: ((e: KeyboardEvent) => void) | null = null;

  constructor(_toolbarEl: HTMLElement, options?: MusicPlayerOptions) {
    this.options = options ?? {};
    this.state = {
      selectedTrack: 0,
      isPlaying: false,
      volume: this.options.initialVolume ?? 70,
      premuteVolume: this.options.initialVolume ?? 70,
      muted: false,
      initialised: false,
      popupVisible: false,
    };
    this.popupEl = this.createPopup();
    const container =
      this.options.container ??
      (document.querySelector('#app') as HTMLElement | null) ??
      document.body;
    container.appendChild(this.popupEl);
  }

  // ─── Task 4.1: Lazy AudioContext initialisation ─────────────────────────────

  /**
   * Initialise AudioContext and decode the sprite on first user gesture.
   * Requirements: 7.5, 3.6, 2.6
   */
  private ensureInitialised(): void {
    if (this.state.initialised) return;
    this.state.initialised = true;

    this.audioCtx = new AudioContext();
    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.value = this.state.volume / 100;
    this.gainNode.connect(this.audioCtx.destination);

    fetch(spriteMp3Url)
      .then((r) => r.arrayBuffer())
      .then((buf) => this.audioCtx!.decodeAudioData(buf))
      .then((decoded) => {
        this.spriteBuffer = decoded;
      })
      .catch((err) => console.error('[MusicPlayer] sprite load error:', err));
  }

  // ─── Task 4.2: Play, pause, resume ──────────────────────────────────────────

  /**
   * Play the pre-selected track (Idle → Playing) or resume a paused track
   * (Paused → Playing). Requirements: 4.1, 4.2, 7.2
   */
  private play(): void {
    this.ensureInitialised();
    if (this.state.isPlaying) return;

    if (this.pausePosition > 0) {
      // Resume from paused position
      this.startSource(this.state.selectedTrack, this.pausePosition);
    } else {
      this.loadAndPlay(this.state.selectedTrack);
    }
  }

  /**
   * Pause the currently playing track (Playing → Paused).
   * Requirements: 4.3, 7.2
   */
  private pause(): void {
    if (!this.state.isPlaying || !this.sourceNode || !this.audioCtx) return;
    // Record how far into the track we are
    this.pausePosition = (this.audioCtx.currentTime - this.playStartTime) % this.currentTrackDuration;
    this.stopSource();
    this.state.isPlaying = false;
    this.syncPlaybackButtons();
    this.syncVisualizer();
  }

  // ─── Task 4.3: Track selection ───────────────────────────────────────────────

  /**
   * Load and play the chosen track from the beginning; update active styling.
   * Requirements: 3.1, 3.2, 3.3
   */
  private selectTrack(index: number): void {
    this.ensureInitialised();
    this.pausePosition = 0;
    this.state.selectedTrack = index;
    this.loadAndPlay(index);
  }

  /**
   * Stop any current source node and start the track at `index` from `offsetSecs` into the track.
   */
  private startSource(index: number, offsetSecs = 0): void {
    if (!this.audioCtx || !this.spriteBuffer || !this.gainNode) return;

    const trackId = TRACK_IDS[index];
    const entry = SPRITE[trackId];
    if (!entry) return;

    const [startMs, durationMs, loop] = entry;
    const startSec = startMs / 1000;
    const durationSec = durationMs / 1000;

    this.currentTrackDuration = durationSec;

    const source = this.audioCtx.createBufferSource();
    source.buffer = this.spriteBuffer;
    source.loop = loop;
    if (loop) {
      source.loopStart = startSec;
      source.loopEnd = startSec + durationSec;
    }
    source.connect(this.gainNode);

    this.sourceNode = source;
    this.playStartTime = this.audioCtx.currentTime - offsetSecs;
    source.start(0, startSec + offsetSecs, loop ? undefined : durationSec - offsetSecs);

    if (!loop) {
      source.onended = () => this.onTrackEnded();
    }

    this.state.isPlaying = true;
    this.state.selectedTrack = index;
    this.syncTrackButtons();
    this.syncPlaybackButtons();
    this.restartVisualizer();
  }

  /** Stop and discard the current source node. */
  private stopSource(): void {
    if (this.sourceNode) {
      this.sourceNode.onended = null;
      try { this.sourceNode.stop(); } catch { /* already stopped */ }
      this.sourceNode.disconnect();
      this.sourceNode = null;
    }
  }

  /**
   * Load and play the track at `index` from the beginning.
   * If the sprite buffer isn't ready yet, waits for it.
   */
  private loadAndPlay(index: number): void {
    this.stopSource();
    this.pausePosition = 0;

    if (!this.audioCtx) {
      this.ensureInitialised();
    }

    if (this.spriteBuffer) {
      this.startSource(index, 0);
    } else {
      // Buffer still decoding — poll until ready
      const wait = setInterval(() => {
        if (this.spriteBuffer) {
          clearInterval(wait);
          this.startSource(index, 0);
        }
      }, 100);
    }
  }

  // ─── Task 4.4: Auto-advance ──────────────────────────────────────────────────

  /**
   * When a track ends, load and play the next track; wrap around after the last.
   * Requirements: 3.4, 3.5
   */
  private onTrackEnded(): void {
    if (!this.state.isPlaying) return;
    const nextIndex = (this.state.selectedTrack + 1) % TRACK_IDS.length;
    this.state.selectedTrack = nextIndex;
    this.loadAndPlay(nextIndex);
  }

  // ─── DOM sync helpers ────────────────────────────────────────────────────────

  /** Update active class on track selector buttons and now-playing label. */
  private syncTrackButtons(): void {
    if (!this.popupEl) return;
    this.popupEl.querySelectorAll<HTMLButtonElement>('.track-btn').forEach((btn) => {
      const trackIndex = Number(btn.dataset.track);
      btn.classList.toggle('track-btn--active', trackIndex === this.state.selectedTrack);
    });
    const nameEl = this.popupEl.querySelector<HTMLElement>('.music-popup__track-name');
    if (nameEl) nameEl.textContent = getTrackNames()[this.state.selectedTrack] ?? TRACK_IDS[this.state.selectedTrack];
  }

  /** Update active/highlighted state on play and pause buttons, and disc spin. */
  private syncPlaybackButtons(): void {
    if (!this.popupEl) return;
    const playBtn = this.popupEl.querySelector<HTMLButtonElement>('#music-btn-play');
    const pauseBtn = this.popupEl.querySelector<HTMLButtonElement>('#music-btn-pause');
    if (playBtn) playBtn.classList.toggle('music-btn--active', !this.state.isPlaying);
    if (pauseBtn) pauseBtn.classList.toggle('music-btn--active', this.state.isPlaying);
    const disc = this.popupEl.querySelector<HTMLElement>('.music-popup__disc');
    if (disc) disc.classList.toggle('music-popup__disc--spinning', this.state.isPlaying);
  }

  /** Start or stop the visualizer animation based on playback state. */
  private syncVisualizer(): void {
    if (!this.popupEl) return;
    const viz = this.popupEl.querySelector<HTMLElement>('.music-popup__visualizer');
    if (viz) {
      viz.classList.toggle('music-popup__visualizer--playing', this.state.isPlaying);
    }
  }

  /** Update the volume icon button to reflect the current muted state. Requirements: 5.5 */
  private syncVolumeIcon(): void {
    if (!this.popupEl) return;
    const btn = this.popupEl.querySelector<HTMLButtonElement>('#music-volume-icon');
    if (!btn) return;
    btn.innerHTML = this.state.muted ? MUTED_SVG : SPEAKER_SVG;
    btn.setAttribute('aria-label', this.state.muted ? t().musicUnmute : t().musicMute);
  }

  /**
   * Toggle mute state.
   * - Muting: store current volume as premuteVolume, set volume to 0. Req 5.6
   * - Unmuting: restore volume from premuteVolume. Req 5.7
   */
  private toggleMute(): void {
    if (!this.state.muted) {
      // Mute
      this.state.premuteVolume = this.state.volume;
      this.state.volume = 0;
      this.state.muted = true;
      if (this.gainNode) this.gainNode.gain.value = 0;
      const slider = this.popupEl?.querySelector<HTMLInputElement>('#music-volume');
      if (slider) { slider.value = '0'; slider.style.setProperty('--vol', '0'); }
    } else {
      // Unmute
      this.state.volume = this.state.premuteVolume;
      this.state.muted = false;
      if (this.gainNode) this.gainNode.gain.value = this.state.volume / 100;
      const slider = this.popupEl?.querySelector<HTMLInputElement>('#music-volume');
      if (slider) { slider.value = String(this.state.volume); slider.style.setProperty('--vol', String(this.state.volume)); }
    }
    this.syncVolumeIcon();
    const label = this.popupEl?.querySelector<HTMLElement>('#music-volume-label');
    if (label) label.textContent = `${this.state.volume}%`;
  }

  /**
   * Restart the visualizer animation from the beginning (Req 6.5).
   * Removes the playing class, forces a reflow, then re-adds it so the
   * CSS animation restarts from frame 0.
   */
  private restartVisualizer(): void {
    if (!this.popupEl) return;
    const viz = this.popupEl.querySelector<HTMLElement>('.music-popup__visualizer');
    if (!viz) return;
    viz.classList.remove('music-popup__visualizer--playing');
    // Force reflow so the browser registers the class removal before re-adding
    void viz.offsetWidth;
    viz.classList.add('music-popup__visualizer--playing');
  }

  // ─── Popup DOM creation ──────────────────────────────────────────────────────

  /** Build and return the popup DOM element (not yet visible). */
  private createPopup(): HTMLElement {
    const trackCount = TRACK_IDS.length;

    const popup = document.createElement('div');
    popup.id = 'music-popup';
    popup.className = 'music-popup music-popup--hidden';
    popup.setAttribute('role', 'dialog');
    popup.setAttribute('aria-label', t().musicPlayerAriaLabel);

    // ── Now Playing section ──────────────────────────────────────────────────
    const nowPlaying = document.createElement('div');
    nowPlaying.className = 'music-popup__now-playing';

    const trackInfo = document.createElement('div');
    trackInfo.className = 'music-popup__track-info';

    const disc = document.createElement('div');
    disc.className = 'music-popup__disc';

    const meta = document.createElement('div');
    meta.className = 'music-popup__meta';

    const trackName = document.createElement('div');
    trackName.className = 'music-popup__track-name';
    trackName.textContent = getTrackNames()[0];

    const trackSub = document.createElement('div');
    trackSub.className = 'music-popup__track-sub';
    trackSub.textContent = t().musicSolitaireRadio;

    meta.appendChild(trackName);
    meta.appendChild(trackSub);
    trackInfo.appendChild(disc);
    trackInfo.appendChild(meta);

    // Visualizer (inside now-playing section)
    const visualizer = document.createElement('div');
    visualizer.className = 'music-popup__visualizer';
    visualizer.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < VIZ_BAR_COUNT; i++) {
      const bar = document.createElement('span');
      bar.className = 'viz-bar';
      visualizer.appendChild(bar);
    }

    nowPlaying.appendChild(trackInfo);
    nowPlaying.appendChild(visualizer);
    popup.appendChild(nowPlaying);

    // ── Controls ────────────────────────────────────────────────────────────
    const controls = document.createElement('div');
    controls.className = 'music-popup__controls';

    const playBtn = document.createElement('button');
    playBtn.id = 'music-btn-play';
    playBtn.className = 'music-ctrl-btn music-ctrl-btn--primary music-btn--active';
    playBtn.setAttribute('aria-label', t().musicPlay);
    playBtn.textContent = '▶';

    const pauseBtn = document.createElement('button');
    pauseBtn.id = 'music-btn-pause';
    pauseBtn.className = 'music-ctrl-btn';
    pauseBtn.setAttribute('aria-label', t().musicPause);
    pauseBtn.textContent = '⏸';

    controls.appendChild(playBtn);
    controls.appendChild(pauseBtn);
    popup.appendChild(controls);

    // ── Track selector ───────────────────────────────────────────────────────
    const tracksSection = document.createElement('div');
    tracksSection.className = 'music-popup__tracks-section';

    const tracksLabel = document.createElement('div');
    tracksLabel.className = 'music-popup__section-label';
    tracksLabel.textContent = t().musicTracksLabel;

    const tracks = document.createElement('div');
    tracks.className = 'music-popup__tracks';
    tracks.setAttribute('role', 'group');
    tracks.setAttribute('aria-label', t().musicTracksAriaLabel);

    for (let i = 0; i < trackCount; i++) {
      const btn = document.createElement('button');
      btn.className = i === 0 ? 'track-btn track-btn--active' : 'track-btn';
      btn.setAttribute('aria-label', t().musicTrackAriaLabel(i + 1, getTrackNames()[i]));
      btn.setAttribute('data-track', String(i));
      btn.textContent = String(i + 1);
      tracks.appendChild(btn);
    }

    tracksSection.appendChild(tracksLabel);
    tracksSection.appendChild(tracks);
    popup.appendChild(tracksSection);

    // ── Volume ───────────────────────────────────────────────────────────────
    const volumeSection = document.createElement('div');
    volumeSection.className = 'music-popup__volume-section';

    const volumeLabel2 = document.createElement('div');
    volumeLabel2.className = 'music-popup__section-label';
    volumeLabel2.textContent = t().musicVolumeLabel;

    const volumeRow = document.createElement('div');
    volumeRow.className = 'music-popup__volume';

    const volumeIconBtn = document.createElement('button');
    volumeIconBtn.id = 'music-volume-icon';
    volumeIconBtn.className = 'volume-icon-btn';
    volumeIconBtn.setAttribute('aria-label', t().musicMute);
    volumeIconBtn.innerHTML = SPEAKER_SVG;
    volumeRow.appendChild(volumeIconBtn);

    const volumeInput = document.createElement('input');
    volumeInput.type = 'range';
    volumeInput.id = 'music-volume';
    volumeInput.min = '0';
    volumeInput.max = '100';
    volumeInput.value = String(this.state.volume);
    volumeInput.setAttribute('aria-label', t().musicVolumeAriaLabel);
    volumeInput.style.setProperty('--vol', String(this.state.volume));
    volumeRow.appendChild(volumeInput);

    const volumeLabel = document.createElement('span');
    volumeLabel.id = 'music-volume-label';
    volumeLabel.className = 'volume-label';
    volumeLabel.setAttribute('aria-live', 'polite');
    volumeLabel.textContent = `${this.state.volume}%`;
    volumeRow.appendChild(volumeLabel);

    volumeSection.appendChild(volumeLabel2);
    volumeSection.appendChild(volumeRow);
    popup.appendChild(volumeSection);

    return popup;
  }

  /** Show or hide the popup based on popupVisible state. */
  private syncPopupVisibility(): void {
    if (!this.popupEl) return;
    if (this.state.popupVisible) {
      this.popupEl.classList.remove('music-popup--hidden');
      this.positionPopup();
      // Move focus to the first focusable element when popup opens (Req 8.2)
      const focusable = this.getFocusableElements();
      if (focusable.length > 0) focusable[0].focus();
    } else {
      this.popupEl.classList.add('music-popup--hidden');
    }
  }

  /** Position the popup near the music button. */
  private positionPopup(): void {
    if (!this.popupEl) return;
    const musicBtn = document.querySelector<HTMLElement>('#btn-music');
    if (!musicBtn) return;

    const btnRect = musicBtn.getBoundingClientRect();
    const popupWidth = 280;
    const gap = 8;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Temporarily show to measure height
    this.popupEl.style.visibility = 'hidden';
    this.popupEl.style.top = '-9999px';
    this.popupEl.style.bottom = '';
    this.popupEl.style.left = '';
    this.popupEl.style.right = '';
    const popupHeight = this.popupEl.offsetHeight;
    this.popupEl.style.visibility = '';

    // Prefer opening below the button; fall back to above if not enough space
    let top: number;
    if (btnRect.bottom + gap + popupHeight <= viewportHeight) {
      top = btnRect.bottom + gap;
    } else {
      top = Math.max(gap, btnRect.top - gap - popupHeight);
    }

    // Align right edge with button right edge; clamp to viewport
    let left = btnRect.right - popupWidth;
    if (left < gap) left = gap;
    if (left + popupWidth > viewportWidth - gap) left = viewportWidth - gap - popupWidth;

    this.popupEl.style.top = `${top}px`;
    this.popupEl.style.bottom = '';
    this.popupEl.style.left = `${left}px`;
    this.popupEl.style.right = '';
  }

  // ─── Focus trap ──────────────────────────────────────────────────────────────

  /**
   * Return the ordered list of focusable elements inside the popup.
   * Requirements: 8.2
   */
  private getFocusableElements(): HTMLElement[] {
    if (!this.popupEl) return [];
    return Array.from(
      this.popupEl.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input[type="range"]'
      )
    );
  }

  /**
   * Handle Tab / Shift+Tab inside the popup to cycle focus within it.
   * Requirements: 8.2
   */
  private handleFocusTrap(e: KeyboardEvent): void {
    if (e.key !== 'Tab') return;
    const focusable = this.getFocusableElements();
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement as HTMLElement;

    if (e.shiftKey) {
      // Shift+Tab: if focus is on first element, wrap to last
      if (active === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      // Tab: if focus is on last element, wrap to first
      if (active === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  // ─── Public API ──────────────────────────────────────────────────────────────

  /** Attach DOM event listeners. Call once after construction. */
  attach(): void {
    const musicBtn = document.querySelector<HTMLElement>('#btn-music');

    // Toggle popup on music button click (first gesture also initialises SoundLP)
    this._onMusicBtnClick = () => {
      this.state.popupVisible = !this.state.popupVisible;
      this.syncPopupVisibility();
      // Lazy init on first user gesture (Req 7.5)
      if (!this.state.initialised) {
        this.ensureInitialised();
      }
    };
    musicBtn?.addEventListener('click', this._onMusicBtnClick);

    // Wire play button
    this.popupEl?.querySelector('#music-btn-play')?.addEventListener('click', () => {
      this.play();
    });

    // Wire pause button
    this.popupEl?.querySelector('#music-btn-pause')?.addEventListener('click', () => {
      this.pause();
    });

    // Wire track selector buttons
    this.popupEl?.querySelector('.music-popup__tracks')?.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-track]');
      if (!btn || btn.disabled) return;
      const index = Number(btn.dataset.track);
      this.selectTrack(index);
    });

    // Wire volume slider
    this.popupEl?.querySelector('#music-volume')?.addEventListener('input', (e) => {
      const val = Number((e.target as HTMLInputElement).value);
      this.state.volume = val;
      this.state.muted = false;
      if (this.gainNode) this.gainNode.gain.value = val / 100;
      const label = this.popupEl?.querySelector<HTMLElement>('#music-volume-label');
      if (label) label.textContent = `${val}%`;
      const slider = e.target as HTMLInputElement;
      slider.style.setProperty('--vol', String(val));
      this.syncVolumeIcon();
    });

    // Wire volume icon (mute toggle) — stop propagation so the document
    // click handler doesn't see a detached target (innerHTML swap in syncVolumeIcon)
    // and incorrectly close the popup.
    this.popupEl?.querySelector('#music-volume-icon')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMute();
    });

    // Close popup when clicking outside both popup and music button
    this._onDocumentClick = (e: MouseEvent) => {
      if (!this.state.popupVisible) return;
      const target = e.target as Node;
      const insidePopup = this.popupEl?.contains(target) ?? false;
      const insideBtn = musicBtn?.contains(target) ?? false;
      if (!insidePopup && !insideBtn) {
        this.state.popupVisible = false;
        this.syncPopupVisibility();
      }
    };
    document.addEventListener('click', this._onDocumentClick);

    // Escape key closes popup and returns focus to music button
    this._onDocumentKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.state.popupVisible) {
        this.state.popupVisible = false;
        this.syncPopupVisibility();
        musicBtn?.focus();
      }
    };
    document.addEventListener('keydown', this._onDocumentKeydown);

    // Focus trap: intercept Tab/Shift-Tab inside the popup (Req 8.2)
    this._onPopupKeydown = (e: KeyboardEvent) => {
      if (this.state.popupVisible) {
        this.handleFocusTrap(e);
      }
    };
    this.popupEl?.addEventListener('keydown', this._onPopupKeydown);
  }

  /** Detach all listeners and destroy the popup. */
  detach(): void {
    const musicBtn = document.querySelector<HTMLElement>('#btn-music');

    if (this._onMusicBtnClick) {
      musicBtn?.removeEventListener('click', this._onMusicBtnClick);
      this._onMusicBtnClick = null;
    }
    if (this._onDocumentClick) {
      document.removeEventListener('click', this._onDocumentClick);
      this._onDocumentClick = null;
    }
    if (this._onDocumentKeydown) {
      document.removeEventListener('keydown', this._onDocumentKeydown);
      this._onDocumentKeydown = null;
    }
    if (this._onPopupKeydown) {
      this.popupEl?.removeEventListener('keydown', this._onPopupKeydown);
      this._onPopupKeydown = null;
    }

    if (this.sourceNode) {
      this.stopSource();
    }
    if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
    }
    this.spriteBuffer = null;
    this.gainNode = null;

    this.popupEl?.remove();
    this.popupEl = null;
  }
}
