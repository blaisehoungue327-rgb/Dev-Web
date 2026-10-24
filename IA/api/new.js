const ALLOWED = new Set([
  'www.france24.com',
  'www.rfi.fr',
  'feeds.bbci.co.uk',
  'www.aljazeera.com'
]);

module.exports = async (req, res) => {
  try {
    const u = new URL(String(req.query.url || ''));
    if (u.protocol !== 'https:' || !ALLOWED.has(u.hostname)) {
      res.status(400).send('Adresse non autorisée');
      return;
    }
    const r = await fetch(u.href, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MondeActu/1.0)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*'
      },
      redirect: 'follow'
    });
    if (!r.ok) {
      res.status(502).send('Source indisponible');
      return;
    }
    const xml = await r.text();
    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).send(xml);
  } catch (e) {
    res.status(500).send('Erreur');
  }
};