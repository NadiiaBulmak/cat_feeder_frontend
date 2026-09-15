import { AUTH_COPY } from '../../shared/constants/auth'

export function AuthStory() {
  return (
    <section className="relative isolate flex min-h-[38vh] flex-col justify-between overflow-hidden bg-[#26382f] p-6 text-[#f7f6ef] after:absolute after:-right-32 after:-bottom-28 after:size-80 after:rounded-full after:border after:border-[#d8ed75] after:opacity-[.55] after:shadow-[0_0_0_2rem_#26382f,0_0_0_2.1rem_#52634d,0_0_0_5rem_#26382f,0_0_0_5.1rem_#52634d] md:min-h-0 md:p-[clamp(2rem,5vw,5rem)] lg:p-20">
      <span className="text-[.68rem] font-extrabold tracking-[.16em] text-[#9aa894]">{AUTH_COPY.story.eyebrow}</span>
      <div className="relative z-10 mb-4 mt-16 max-w-xl md:mb-12 md:mt-auto">
        <p className="text-[.85rem] font-bold tracking-[.05em] text-[#d8ed75]">{AUTH_COPY.story.kicker}</p>
        <h1 className="my-3 max-w-[10ch] font-serif text-[clamp(2.6rem,12vw,4rem)] font-medium leading-[.92] tracking-[-.05em] text-[#f7f6ef] md:my-3 md:text-[clamp(3rem,6vw,5.8rem)]">{AUTH_COPY.story.heading}</h1>
        <p className="max-w-sm text-[.9rem] text-[#c6cec1]">{AUTH_COPY.story.description}</p>
      </div>
      <div className="relative z-10 text-6xl opacity-80 max-md:hidden" aria-hidden="true">🐾</div>
    </section>
  )
}
