export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        Designed & Built by <strong>Soujanya Bheemappa Arakeri</strong>
      </p>
      <p className="languages">
        Languages: English, Kannada, Hindi
      </p>
      <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
        &copy; {currentYear} All Rights Reserved
      </p>
    </footer>
  );
}
