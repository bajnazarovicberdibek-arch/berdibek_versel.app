import { useEffect, useState } from 'react';
import Favicon from 'react-favicon';

export default function FaviconHelper({ isPoweredOn }) {
  const [faviconUrl, setFaviconUrl] = useState(
    'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%25%22 y=%2250%25%22 font-size=%2290%22 text-anchor=%22middle%22 alignment-baseline=%22central%22>💻</text></svg>'
  );

  useEffect(() => {
    if (!isPoweredOn) {
      setFaviconUrl(
        'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%25%22 y=%2250%25%22 font-size=%2290%22 text-anchor=%22middle%22 alignment-baseline=%22central%22>💻</text></svg>'
      );
    } else {
      setFaviconUrl(
        'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%25%22 y=%2250%25%22 font-size=%2290%22 text-anchor=%22middle%22 alignment-baseline=%22central%22>👩🏻‍💻</text></svg>'
      );
    }
  }, [isPoweredOn]);

  return <Favicon url={faviconUrl} />;
}
