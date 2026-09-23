import Link from "next/link";

export default function ArchivePage() {
  return (
    <main className="utility-page archive-page">
      <header className="archive-page__header">
        <p className="eyebrow">Research</p>
        <h1>Archive</h1>
        <p className="archive-page__intro">
          Notes on the practice, the making of the work, and the evolving structure of <em>Fruiting Body</em>.
        </p>

        <nav className="archive-page__contents" aria-label="Archive contents">
          <a href="#artist-statement">Artist Statement</a>
          <a href="#fruiting-body">Fruiting Body</a>
          <a href="#process">Process</a>
          <a href="#bio">Bio</a>
        </nav>
      </header>

      <div className="archive-page__sections">
        <section id="artist-statement" className="archive-text" aria-labelledby="artist-statement-title">
          <p className="archive-text__eyebrow">Practice</p>
          <h2 id="artist-statement-title">Artist Statement</h2>

          <p>
            I use self-portraiture to investigate what it means to inhabit a body that is both singular and embedded within larger systems: ecological, relational, biological, inherited, and temporal.
          </p>

          <p>
            Across the work, the body becomes landscape, threshold, archive, membrane, and site of encounter. I am interested less in representing identity as a fixed condition than in watching it form, dissolve, and reorganize through contact with forces that cannot be entirely controlled: water, gravity, weather, grief, desire, lineage, motherhood, seasonality, and time. Figures repeatedly dissolve and reform—obscured by fabric, immersed in water, fragmented by framing, merged with landscape, or caught between recognizable states.
          </p>

          <p>
            The work repeatedly asks what forms of agency remain available within those conditions. I am interested in sovereignty that does not depend on mastery or separation, but can exist alongside vulnerability, dependence, biology, and change. Agency may appear as choosing, witnessing, tending, participating, remaining present, or deciding how to inhabit what cannot simply be escaped.
          </p>

          <p>
            Myth enters the work as a framework rather than an illustration. Figures such as Persephone and Eve allow me to reconsider inherited narratives of passivity, transgression, appetite, loss, and return. Landscape operates similarly: not as metaphor for the body, but as kin. Bodies and landscapes are acted upon by many of the same processes—gravity, erosion, growth, permeability, decay, and seasonal change.
          </p>

          <p>
            Making these photographs has paralleled my own movement toward a more integrated sense of self: one capable of holding motherhood, neurodivergence, artistic practice, embodiment, desire, grief, and repeated cycles of descent and emergence without requiring those identities to resolve into a single stable version of me.
          </p>
        </section>

        <section id="fruiting-body" className="archive-text" aria-labelledby="fruiting-body-title">
          <p className="archive-text__eyebrow">The museum</p>
          <h2 id="fruiting-body-title">Fruiting Body</h2>

          <p>
            <em>Fruiting Body</em> is an evolving digital exhibition and archive of my photographic work.
          </p>

          <p>
            The title refers to the visible, temporary structure through which a larger living system emerges. I think of the works similarly: as individual manifestations of longer processes involving embodiment, memory, ecology, relationship, and change.
          </p>

          <p>
            Rather than organizing the work only by chronology, <em>Fruiting Body</em> places different projects in relation to one another through recurring questions, visual forms, and states of transformation. Bodies, landscapes, water, thresholds, openings, cycles, and acts of witnessing recur across works made at different times and under different circumstances.
          </p>

          <p>
            The site is therefore both portfolio and constructed exhibition space: a way of allowing separate bodies of work to remain distinct while making their deeper relationships visible.
          </p>
        </section>

        <section id="process" className="archive-text" aria-labelledby="process-title">
          <p className="archive-text__eyebrow">Making</p>
          <h2 id="process-title">Process</h2>

          <p>Each body of work usually begins with a question.</p>

          <p>
            I spend time with that question before and during the making of the photographs, often using a material, location, gesture, or physical condition as a way of entering it through the body rather than trying to answer it intellectually. Fabric, water, flowers, fruit, masks, landscape, movement, and repetition become ways of thinking physically.
          </p>

          <p>
            I rarely previsualize individual photographs in detail. I often work with video, burst capture, or rapid sequences that allow the encounter to continue without stopping to compose each frame. The camera functions as both mirror and witness: it records what I am doing, but also returns something I could not fully perceive from inside the experience.
          </p>

          <p>
            Selection comes afterward. Looking through the images often gives me information or perspective I did not have when I entered the work. Photography functions less as illustration than as a method of discovery. The resulting images are traces of an encounter—evidence of a body moving through a question rather than pictures designed to explain one.
          </p>

          <p>
            When accidental blurs, distortions, light leaks, reflections, or other optical events align with the inquiry, I preserve them. These effects occur during capture rather than being artificially created in editing.
          </p>

          <p>
            Working with my own body this way has also changed how I perceive it. Through the photographs it repeatedly becomes terrain, threshold, structure, ecological system, and site of passage rather than simply an object to be evaluated. That shift has been personally significant after years of body shame and dysmorphia, although healing is a consequence of the practice rather than its primary subject.
          </p>
        </section>

        <section id="bio" className="archive-text archive-text--bio" aria-labelledby="bio-title">
          <p className="archive-text__eyebrow">Artist</p>
          <h2 id="bio-title">Abby Buchanan</h2>

          <p>
            Abby Buchanan is a Portland, Oregon–based photographic artist working primarily in self-portraiture. Her practice investigates embodiment, ecological identity, transformation, permeability, and agency within conditions that cannot be fully controlled. After two decades of professional work centered on the body and somatic practice, she began using photography as a form of embodied inquiry. Her images examine the body as landscape, threshold, archive, and site of encounter, drawing on motherhood, neurodivergence, myth, ecology, and lived processes of transformation.
          </p>
        </section>
      </div>

      <Link className="utility-return-to-narthex" href="/narthex?arrived=1">
        Return to Narthex
      </Link>
    </main>
  );
}
