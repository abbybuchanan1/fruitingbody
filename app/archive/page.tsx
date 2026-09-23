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
          <a href="#project-reflections">Project Reflections</a>
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

        <section id="project-reflections" className="archive-projects" aria-labelledby="project-reflections-title">
          <header className="archive-projects__header">
            <p className="archive-text__eyebrow">Works</p>
            <h2 id="project-reflections-title">Project Reflections</h2>
            <p>
              These notes record the questions and lived encounters that shaped individual bodies of work. They are not intended as instructions for reading the photographs.
            </p>
          </header>

          <article className="archive-project" id="reflection-relative">
            <h3>Relative</h3>
            <p>
              <em>Relative</em> began under the working title <em>My Body Is the Land I&apos;m From</em>, from the thought that the body may be the only land we ever fully inhabit and therefore something we are responsible for tending. I began the work while reckoning with years of body shame and dysmorphia. Looking closely at flesh as terrain—folded, weathered, marked, permeable—gave me another way to see it.
            </p>
            <p>
              The project eventually moved beyond metaphor. I became less interested in saying that the body resembles landscape than in noticing that bodies and landscapes are subject to many of the same forces: gravity, erosion, growth, weather, time, and decay. The paired images are attempts to recognize that kinship.
            </p>
          </article>

          <article className="archive-project" id="reflection-daffodils">
            <h3>This Morning I Was Gathering Daffodils</h3>
            <p>
              I came to Persephone less as a story to retell than as a way to think about power inside a cycle that cannot simply be escaped. Her movement between worlds is both imposed and inhabited; she is acted upon and still becomes someone within what has happened to her. That contradiction became more important to me than any clean story of victimhood or triumph.
            </p>
            <blockquote className="archive-project__quote">
              <p>
                “(Persephone) was winter, she was spring. When she ascended, the world awoke. When she descended, it lamented. She left; she returned. One year. Fifty. Five hundred. Forever. Powerful and powerless was she.”
              </p>
              <cite>— Pádraig Ó Tuama, <em>In a Garden by a Gate</em></cite>
            </blockquote>
            <p>
              The phrase “powerful and powerless” holds the tension I wanted the photographs to remain inside. The work asks what sovereignty can look like when freedom is partial, when return is required, and when becoming must happen within inherited conditions rather than outside them.
            </p>
          </article>

          <article className="archive-project" id="reflection-fear-not">
            <h3>Fear Not</h3>
            <p>
              <em>Fear Not</em> began with Eve and with the question of what changes when curiosity is not treated as a failure. I was interested in the inherited framing of appetite, knowledge, and disobedience as moral danger—especially when attached to a woman&apos;s body.
            </p>
            <p>
              The work does not try to reverse the story into a simple celebration of transgression. I am more interested in participation: the decision to reach, taste, know, and accept the consequences of knowing. The images ask what becomes visible when curiosity is understood as a form of agency rather than the beginning of a fall.
            </p>
          </article>

          <article className="archive-project" id="reflection-taste">
            <h3>Taste and See</h3>
            <p>
              <em>Taste and See</em> began with images of Venus and the long visual inheritance of the female body as an object arranged for looking. As I worked, the question shifted away from how beauty is presented and toward what beauty feels like from inside a body.
            </p>
            <p>
              Appetite became central. Fruit, mouth, touch, pleasure, and excess allowed the body to become an experiencing subject rather than an image performing desirability for a gaze. The work asks what happens when beauty is allowed to include hunger—when looking gives way to tasting, and the body is permitted not only to be seen but to want.
            </p>
          </article>

          <article className="archive-project" id="reflection-miscarriage">
            <h3>A Miscarriage</h3>
            <p>
              I do not think of this work primarily as a record of a single event. It is about interrupted becoming: the strange bodily fact of beginning to reorganize around a future and then continuing to inhabit the body after that future has disappeared.
            </p>
            <p>
              The images move through longing, absence, passage, and bodily transformation without trying to resolve them. Making the work changed my understanding of the recurring portal forms in my photographs. I had been looking for thresholds outside myself; here I began to understand that the body itself could become the passage.
            </p>
          </article>

          <article className="archive-project" id="reflection-phase">
            <h3>Winter / Phase</h3>
            <p>
              <em>Winter / Phase</em> is concerned with the unstable period after one state has ended and before another has fully appeared. I was interested in transition not as a dramatic event but as a condition: suspended, difficult to name, and often longer than expected.
            </p>
            <p>
              Winter gave me a structure for thinking about that interval. What appears dormant is still undergoing change. The work stays with that uncertainty rather than rushing it toward emergence.
            </p>
          </article>

          <article className="archive-project" id="reflection-threshold">
            <h3>Threshold</h3>
            <p>
              <em>Threshold</em> began with the experience of no longer being what I had been while not yet being able to see what I was becoming. I wanted to stay inside that in-between state without forcing it into clarity too quickly.
            </p>
            <p>
              As I worked, anatomy began to behave like architecture: folds became passages, openings became rooms, and the body became a spatial boundary that could be approached from either side. The photographs hold the threshold as a place in its own right rather than merely a route from one certainty to another.
            </p>
          </article>

          <article className="archive-project" id="reflection-red-thread">
            <h3>Red Thread</h3>
            <p>
              <em>Red Thread</em> investigates inheritance as an ongoing relationship rather than a problem that can be solved through separation. The thread can bind, connect, restrict, trace, or hold. I am interested in the difficulty of becoming an individual without pretending that we can ever become entirely independent of what formed us.
            </p>
            <p>
              The current installation grew from three earlier bodies of work concerned with inheritance, protection, and participation. Bringing those images together shifted the work toward a larger question: how do we become ourselves while remaining entangled with the people, histories, protections, and structures from which we emerged?
            </p>
          </article>

          <article className="archive-project" id="reflection-membrane">
            <h3>Membrane</h3>
            <p>
              <em>Membrane</em> was the first work I made in the river and the beginning of the process I now use most often: entering with a question and a material, interacting with them physically, and allowing the photographs to be discovered afterward rather than designed in advance.
            </p>
            <p>
              I remember the mist and river water coming through the fabric and the warmth of the sun on my body. I worked with video frames and fast capture, unable to see most of the images while I was making them. When I left the river, something in my relationship to the work had changed. I understood that the experience itself could be the site of the photograph, and that photography might be capable of carrying things I had not been able to communicate in another form.
            </p>
          </article>

          <article className="archive-project" id="reflection-body-of-water">
            <h3>Body of Water</h3>
            <p>
              The first images in <em>Body of Water</em> came from looking at the breast until it stopped reading primarily as anatomy and began to appear as terrain, center, and circular form. That shift opened the project toward a larger question about giving and receiving, pleasure, and where the boundary of the body actually resides.
            </p>
            <p>
              Water gave that question a physical condition. Immersed, reflected, distorted, and partially dissolved, the body begins to take on the logic of its environment rather than remain a separate figure placed within it. The work became less about a body beside water than about the possibility of the body becoming water: permeable, responsive, and difficult to locate at a single edge.
            </p>
          </article>
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
