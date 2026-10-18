Apple Note message alert: https://github.com/extratone/macOSsystemsounds/blob/main/mp3/Note.mp3 — downloaded unchanged. Played quietly after a visitor gesture; stopped when the phone leaves view or a dialog opens.
Boom / Socials sequence: boom-socials-voice.wav preserves the existing social-boom-voice.wav word, followed by a 180ms gap and Microsoft David Desktop saying Socials at rate -3. Both words share the existing browser pitch, bass and reverb processing. socials-word.wav retains the new source recording.





Oh yeah: cleaned excerpt from the user-provided recording. Trimmed surrounding silence, reduced background noise and normalized dynamics. Browser playback at .86 preserves the recorded inflection while lowering the pitch, with bass and reverb matching the socials sequence.

The sustained "yeah" was shortened using waveform-synchronous overlap/add; the first 1.05 source seconds remain unchanged. The new source is 1.748 seconds, reducing playback by 0.7 seconds at the existing .86 playback rate.

GPS navigation: gps-recalculating.wav uses Microsoft Zira Desktop saying Now lost, followed by a pause and Recalculating. Preloaded and played through the gesture-unlocked Web Audio context, including when the legend scrolls before opening GPS. Voice gain is 1.8 with compression, independent of the shorter startup chime. Stopped on close or page hide; HTML audio is retained as a fallback.

October 16: lengthened the sustained "yeah" by 0.5 seconds at the existing .86 playback rate. Rebuilt the tail from the original cleaned recording with waveform-synchronous overlap/add to avoid stretching an already processed tail. Current source: 2.178005 seconds; playback: 2.532563 seconds. The first 1.05 source seconds are byte-for-byte unchanged from the previous version. The reveal continues to follow the audio source end event.

October 16 polish: the same user-recorded OH YEAH now uses a subtle playback pitch contour (deeper opening, brighter lift, relaxed finish), a 65 Hz low cut, reduced bass boost, and a presence lift. Shortened the room tail to 1.05 seconds and reduced its mix to keep the voice forward and clear. The recording itself is unchanged. Visual title holds for two seconds, followed by a 300 ms electric sweep. No commercial character audio was added.
