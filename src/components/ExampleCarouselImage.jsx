export default function ExampleCarouselImage({ src, alt = '' }) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        margin: 0,
        padding: 0
      }}
    />
  );
}