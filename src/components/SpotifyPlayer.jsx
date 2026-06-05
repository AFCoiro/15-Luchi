const SpotifyPlayer = ({ spotify }) => {
  return (
    <section className="spotify-player">
      <h2 className="spotify-player__title">La playlist de la noche</h2>
      {/* TODO: lazy load the iframe to improve initial page performance */}
      <iframe
        title="Spotify playlist"
        src={spotify.playlistEmbed}
        width="100%"
        height="352"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={{ borderRadius: '12px' }}
      />
    </section>
  )
}

export default SpotifyPlayer
