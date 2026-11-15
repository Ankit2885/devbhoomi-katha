// हिंदी और Hinglish दोनों रूप एक साथ रखता है; जो भाषा चुनी है वही दिखती है
export default function T({ hi, hg, as: Tag = "span", className = "", html = false }) {
  const alt = hg || hi;
  if (html) {
    return (
      <>
        <Tag className={`l-hi ${className}`} dangerouslySetInnerHTML={{ __html: hi }} />
        <Tag className={`l-hg ${className}`} dangerouslySetInnerHTML={{ __html: alt }} />
      </>
    );
  }
  return (
    <>
      <Tag className={`l-hi ${className}`}>{hi}</Tag>
      <Tag className={`l-hg ${className}`}>{alt}</Tag>
    </>
  );
}
