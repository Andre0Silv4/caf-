import { useEffect, useRef, useState } from 'react'
import { ShoppingBag, ArrowRight, ArrowUpRight } from '@phosphor-icons/react'

const CAFES = [
  { nome: 'Sol de Minas', origem: 'Cerrado Mineiro, Brasil', notas: 'Caramelo, cacau, laranja', altitude: '1.100 m', processo: 'Natural', preco: 'R$ 68', seed: 'aura-minas' },
  { nome: 'Névoa', origem: 'Huila, Colômbia', notas: 'Pêssego, mel, jasmim', altitude: '1.750 m', processo: 'Lavado', preco: 'R$ 74', seed: 'aura-huila' },
  { nome: 'Yirga', origem: 'Yirgacheffe, Etiópia', notas: 'Bergamota, limão, florais', altitude: '2.000 m', processo: 'Lavado', preco: 'R$ 82', seed: 'aura-yirga' },
  { nome: 'Antígua', origem: 'Antígua, Guatemala', notas: 'Chocolate, avelã, cereja', altitude: '1.500 m', processo: 'Honey', preco: 'R$ 76', seed: 'aura-antigua' },
]

const SABORES = {
  Frutado: ['Laranja', 'Pêssego', 'Cereja', 'Bergamota'],
  Floral: ['Jasmim', 'Lavanda', 'Rosa', 'Camomila'],
  Achocolatado: ['Cacau', 'Avelã', 'Caramelo', 'Mel'],
}

const MARQUEE = ['Caramelo', 'Jasmim', 'Bergamota', 'Cacau', 'Pêssego', 'Mel', 'Cereja', 'Lavanda', 'Laranja', 'Avelã']

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('in')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.18 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useReveal()
  return (
    <Tag ref={ref} className={'reveal ' + className} style={{ transitionDelay: delay + 'ms' }}>
      {children}
    </Tag>
  )
}

function img(seed, w, h, gray) {
  return 'https://picsum.photos/seed/' + seed + '/' + w + '/' + h + (gray ? '?grayscale' : '')
}

function Nav({ count }) {
  const links = [
    ['Cafés', '#cafes'],
    ['Origem', '#origem'],
    ['Notas', '#notas'],
    ['A marca', '#marca'],
  ]
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-paper/95 border-b border-ink/10">
      <nav className="max-w-[1400px] mx-auto h-[68px] px-5 md:px-10 flex items-center justify-between">
        <a href="#topo" className="flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-tight">AURA</span>
          <span className="hidden sm:inline text-[10px] uppercase tracking-widest2 text-ink-muted">Coffee Co.</span>
        </a>
        <ul className="hidden md:flex items-center gap-9 text-[13px] uppercase tracking-[0.14em] text-ink-soft">
          {links.map(([label, href]) => (
            <li key={label}>
              <a href={href} className="underline-grow">{label}</a>
            </li>
          ))}
        </ul>
        <button
          className="flex items-center gap-2 text-sm active:translate-y-[1px] transition-transform"
          aria-label={'Sacola, ' + count + ' itens'}
        >
          <ShoppingBag size={22} weight="light" />
          <span className="min-w-[1.2rem] text-center tabular-nums">{count}</span>
        </button>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section id="topo" className="relative min-h-[100dvh] pt-[68px]">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center min-h-[calc(100dvh-68px)]">
        <div className="lg:col-span-7 lg:pr-10 pt-10 lg:pt-0">
          <Reveal>
            <p className="text-[12px] uppercase tracking-widest2 text-clay mb-7">Cafés de origem única</p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="font-display font-500 text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              A alma do grão em<br />cada <span className="italic">gole.</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-8 max-w-[46ch] text-ink-muted text-lg leading-relaxed">
              Selecionamos microlotes de pequenos produtores e torramos em pequenas quantidades, para preservar tudo o que o terroir tem a dizer.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-11 flex flex-wrap items-center gap-5">
              <a
                href="#cafes"
                className="group inline-flex items-center gap-3 bg-clay text-paper px-8 py-4 text-[14px] uppercase tracking-[0.16em] hover:bg-clay-soft active:translate-y-[1px] transition-all"
              >
                Ver os cafés
                <ArrowRight size={18} weight="light" className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#marca" className="underline-grow text-[14px] uppercase tracking-[0.16em] text-ink-soft">
                A marca
              </a>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-5 lg:pt-24">
          <Reveal delay={140} className="relative">
            <div className="overflow-hidden">
              <img
                src={img('aura-hero-pour', 1000, 1300)}
                alt="Preparo de café especial"
                loading="eager"
                className="w-full h-[52vh] lg:h-[78vh] object-cover"
              />
            </div>
            <p className="mt-4 text-[12px] uppercase tracking-[0.16em] text-ink-muted">
              Torra da semana, safra 2025
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Cafes({ onAdd }) {
  return (
    <section id="cafes" className="py-28 md:py-40">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <Reveal className="max-w-[60ch]">
          <h2 className="font-display text-3xl md:text-5xl tracking-tight">A coleção</h2>
          <p className="mt-5 text-ink-muted text-lg leading-relaxed">
            Quatro perfis distintos, cada um com sua geografia e seu caráter. Role para percorrer.
          </p>
        </Reveal>

        <div className="mt-14 -mx-5 md:-mx-10 px-5 md:px-10 overflow-x-auto no-scrollbar">
          <div className="flex gap-6 md:gap-8 w-max">
            {CAFES.map((c, i) => (
              <Reveal
                key={c.nome}
                delay={i * 80}
                className={'group w-[78vw] sm:w-[360px] shrink-0 ' + (i % 2 === 1 ? 'md:mt-14' : '')}
              >
                <div className="overflow-hidden">
                  <img
                    src={img(c.seed, 760, 940)}
                    alt={'Café ' + c.nome}
                    loading="lazy"
                    className="w-full h-[460px] object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="flex items-baseline justify-between mt-6">
                  <h3 className="font-display text-2xl tracking-tight">{c.nome}</h3>
                  <span className="font-display text-xl">{c.preco}</span>
                </div>
                <p className="mt-1 text-[13px] uppercase tracking-[0.14em] text-clay">{c.origem}</p>
                <p className="mt-3 text-ink-muted">{c.notas}</p>
                <div className="mt-3 flex gap-6 text-[12px] uppercase tracking-[0.12em] text-ink-muted/80">
                  <span>{c.altitude}</span>
                  <span>{c.processo}</span>
                </div>
                <button
                  onClick={() => onAdd(c.nome)}
                  className="mt-6 w-full bg-ink text-paper py-3.5 text-[13px] uppercase tracking-[0.16em] hover:bg-ink-soft active:translate-y-[1px] transition-all"
                >
                  Adicionar
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Origem() {
  const stats = [
    { num: '12', label: 'lotes na safra atual' },
    { num: '6', label: 'países de origem' },
    { num: '48h', label: 'da torra ao envio' },
  ]
  return (
    <section id="origem" className="bg-ink text-paper">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[52vh] lg:min-h-[88vh] overflow-hidden order-1 lg:order-none">
          <img
            src={img('aura-terroir-farm', 1200, 1500)}
            alt="Plantação de café em altitude"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center px-5 md:px-14 lg:px-20 py-24 lg:py-0">
          <div className="max-w-[52ch]">
            <Reveal>
              <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-[1.08]">
                Onde o grão <span className="italic">nasce.</span>
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="mt-8 text-sand-muted text-lg leading-relaxed">
                Altitude, sombra, chuva e o tempo certo de colheita. O terroir define o sabor muito antes da torra. Por isso trabalhamos lado a lado com quem cultiva.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-sand-muted text-lg leading-relaxed">
                Cada lote chega com nome, região e produtor. Rastreável do pé à xícara, sem intermediários anônimos.
              </p>
            </Reveal>
            <Reveal delay={230}>
              <div className="mt-14 grid grid-cols-3 gap-6 border-t border-paper/15 pt-10">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-4xl md:text-5xl">{s.num}</div>
                    <div className="mt-2 text-[12px] uppercase tracking-[0.12em] text-sand-muted leading-snug">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function Notas() {
  return (
    <section id="notas" className="py-28 md:py-40">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <Reveal className="max-w-[60ch]">
          <p className="text-[12px] uppercase tracking-widest2 text-clay mb-6">Notas sensoriais</p>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight">O vocabulário do sabor</h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-y-14 md:gap-x-16">
          {Object.entries(SABORES).map(([familia, itens], i) => (
            <Reveal key={familia} delay={i * 90} className="border-t border-ink/15 pt-8">
              <h3 className="font-display text-2xl tracking-tight text-clay">{familia}</h3>
              <ul className="mt-6 space-y-3">
                {itens.map((it) => (
                  <li key={it} className="font-display text-3xl md:text-4xl leading-tight tracking-tight">
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-24 border-y border-ink/15 py-8 overflow-hidden">
        <div className="marquee-track">
          {[0, 1].map((rep) => (
            <div key={rep} className="flex shrink-0" aria-hidden={rep === 1}>
              {MARQUEE.map((w, i) => (
                <span key={rep + '-' + i} className="font-display text-2xl md:text-3xl italic px-8 text-ink-soft">
                  {w}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Marca() {
  return (
    <section id="marca" className="py-28 md:py-40">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-[12px] uppercase tracking-widest2 text-ink-muted mb-8">A marca</p>
            <blockquote className="font-display text-3xl md:text-4xl lg:text-[3.4rem] leading-[1.14] tracking-tight">
              Café especial é agricultura, geografia e tempo reunidos numa <span className="italic">xícara.</span>
            </blockquote>
          </Reveal>
          <Reveal delay={120} className="mt-12 grid sm:grid-cols-2 gap-8 max-w-[70ch]">
            <p className="text-ink-muted text-lg leading-relaxed">
              A AURA nasceu de uma ideia simples: quem cultiva merece ser nomeado, e quem bebe merece saber de onde veio.
            </p>
            <p className="text-ink-muted text-lg leading-relaxed">
              Compramos direto, pagamos com transparência e torramos em pequenos lotes toda semana. Nada de estoque parado, nada de pressa na torra.
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-5 lg:mt-16">
          <Reveal delay={90} className="overflow-hidden">
            <img
              src={img('aura-roaster-portrait', 900, 1150, true)}
              alt="Torra artesanal em pequenos lotes"
              loading="lazy"
              className="w-full h-[60vh] object-cover"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const [email, setEmail] = useState('')
  const [ok, setOk] = useState(false)
  const submit = () => {
    if (email.trim()) setOk(true)
  }
  return (
    <footer className="bg-paper-dim border-t border-ink/15">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-20 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <span className="font-display text-3xl tracking-tight">AURA</span>
          <p className="mt-5 max-w-[38ch] text-ink-muted leading-relaxed">
            Cafés especiais de origem única, torrados em pequenos lotes.
          </p>
        </div>

        <div className="md:col-span-4">
          <label htmlFor="nl" className="block text-[13px] uppercase tracking-[0.14em] text-ink-soft">
            Receba nossas próximas safras
          </label>
          {ok ? (
            <p className="mt-4 text-clay">Inscrição confirmada. Até a próxima torra.</p>
          ) : (
            <div className="mt-4 flex items-center border-b border-ink/40 focus-within:border-clay transition-colors">
              <input
                id="nl"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="flex-1 bg-transparent py-3 outline-none placeholder:text-ink-muted/70"
              />
              <button
                onClick={submit}
                aria-label="Inscrever"
                className="p-2 hover:text-clay active:translate-y-[1px] transition-all"
              >
                <ArrowRight size={20} weight="light" />
              </button>
            </div>
          )}
        </div>

        <nav className="md:col-span-3 flex flex-col gap-3 text-[14px] uppercase tracking-[0.12em] text-ink-soft">
          <a href="#cafes" className="underline-grow w-fit">Cafés</a>
          <a href="#origem" className="underline-grow w-fit">Origem</a>
          <a href="#notas" className="underline-grow w-fit">Notas</a>
          <a href="#marca" className="underline-grow w-fit">A marca</a>
          <a href="mailto:contato@auracoffee.co" className="underline-grow w-fit inline-flex items-center gap-1">
            Contato <ArrowUpRight size={14} weight="light" />
          </a>
        </nav>
      </div>
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 pb-10 flex flex-col sm:flex-row justify-between gap-3 text-[12px] uppercase tracking-[0.12em] text-ink-muted">
        <span>© 2025 AURA Coffee Co.</span>
        <span>Torrado em pequenos lotes</span>
      </div>
    </footer>
  )
}

export default function App() {
  const [count, setCount] = useState(0)
  const add = () => setCount((c) => c + 1)
  return (
    <div className="min-h-[100dvh]">
      <div className="grain" aria-hidden="true" />
      <Nav count={count} />
      <main>
        <Hero />
        <Cafes onAdd={add} />
        <Origem />
        <Notas />
        <Marca />
      </main>
      <Footer />
    </div>
  )
}
