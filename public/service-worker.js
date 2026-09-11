// Service Worker da Biblioteca do Paciente — Dra. Thais Marten
//
// A biblioteca é protegida pelo Cloudflare Access. Este arquivo existe
// apenas para tornar o site instalável como PWA (critério técnico exigido
// pelos navegadores). Ele NÃO armazena páginas, PDFs, imagens de produto
// ou qualquer conteúdo em cache.
//
// Por quê: se o Service Worker respondesse a partir do cache, essa
// resposta nunca passaria pelo Cloudflare Access de novo — ou seja, um
// paciente poderia continuar vendo conteúdo protegido mesmo depois de a
// sessão expirar ou de um logout. Para evitar esse risco, toda requisição
// é sempre repassada para a rede, sem interceptação alguma.
//
// Cada deploy novo é servido normalmente, sem versão antiga presa em
// cache — não há nada armazenado para "envelhecer".

const CACHE_VERSION = 'biblioteca-thais-shell-v1';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Remove qualquer cache de versões anteriores deste Service Worker,
      // caso uma estratégia de cache tenha sido usada no passado.
      const nomes = await caches.keys();
      await Promise.all(
        nomes
          .filter((nome) => nome !== CACHE_VERSION)
          .map((nome) => caches.delete(nome))
      );
      await self.clients.claim();
    })()
  );
});

// Sem "fetch" handler: todas as requisições seguem direto para a rede,
// exatamente como se não houvesse Service Worker nenhum. Isso mantém o
// site instalável sem abrir mão de nenhuma verificação do Cloudflare
// Access em nenhuma requisição.
