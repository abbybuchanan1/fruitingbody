export type Poem = {
  slug: string;
  title: string;
  year?: string;
  dedication?: string;
  preview: string[];
  body: string;
};

const allPoems: Poem[] = [
  {
    slug: "for-c",
    title: "For C",
    year: "2024",
    preview: ["Hi.", "Nice to meet you.", "Let’s be friends."],
    body: `Hi.
Nice to meet you.
Let’s be friends.

You remind me of someone
I’ve known before
but
can’t
quite
place
from
when.

I think it’s my best friend—
the little girl I played pretend with,
who was motherless like me,
whose lunch I packed
while she packed mine.
Then we taught ourselves to be pretty,
to wear makeup,
to buy bras,
and steeled ourselves
so we’d be ready
to help our real moms stop crying
if they ever got up off the floor.

Wait.
You do remind me of
the girl I hated in 5th grade.
The bossy one I could never compete with,
with better roller skates
and older friends.

Or maybe
it’s the girl I stood with
in a tiny church
outside Alamogordo
flanking our friend,
the teenage bride.
That entire wedding party was too young to vote.
And we all stood a little too close to the altar,
our hairspray-laden updos
starting to smoke
the closer we got to the
flames.

You remind me of
a roommate I had once.
The one
I held tight
as we hurled ourselves
into adulthood.

The one who was waiting up for me
when I came home in the middle of the night
drunk on oxytocin
and beer,
neck rubbed raw
from my new boyfriend’s stubble,
the one I’d marry 8 months later.

Nevermind.

You remind me of a woman
I knew when our boys were tiny.
We would talk for hours on the couch
about how to keep our babies alive,
how we couldn’t remember life
before them.
How we knew our lives were too small
but it was ok—
mostly because
it had to be.

Or maybe
it’s the woman in the restaurant.
The one who saved my life with
a dinner knife and
a swift cut to the trachea.
The words were stuck.
I was choking to death.
So she cut.
Decisive,
even though I know her hands were shaking.
And it hurt like hell
but I did not die.

You remind me of
the one who capsized the boat
first,
eyes fixed
on the churning horizon,
pulling herself forward.

The one
who strapped herself into a rocket
and flew
until all that remained
was a faint glow,
the soft outline of a space
she’d once inhabited.

Or maybe
you remind me
of the woman I knew last fall.
She made it look like
sorcery,
forming a new world
from nothing but dust
and the grit beneath her nails.
Assembling and animating it
with her breath.

But I heard her crying in the RV at night.
And I knew
she’d asked for her privacy,
and the pain was hers not mine,
so I cried
and cried
with her
standing just outside.

Wait.
I think it’s the orca I swam beside for years,
raised together in the icy water.
We shared currents,
borrowing each other’s momentum,
till we became the matriarchs,
the pod in our wake.

No.
It’s definitely Joan of Arc
who reminds me of you.
The one who liberated herself and showed me how.
The one who couldn’t wait for me
but never stopped leaving signs,
dropping feathers,
snapping twigs,
always hoping we would meet again
a little way down the road.`,
  },
  {
    slug: "may-2024",
    title: "May, 2024",
    year: "2024",
    preview: ["It is the month", "the thirteen-year and seventeen-year cycles synchronize.", "Cicada broods XIII and XIX", "co-emerge"],
    body: `It is the month
the thirteen-year and seventeen-year cycles synchronize.
Cicada broods XIII and XIX
co-emerge
from the ground
for the first time in
221 years.
Seven states
across the Midwest and Southeast
will reverberate with cicada song
until mid-June,
when the mothers lay their eggs
in the ends
of tree branches.
The newly minted nymphs hatch,
free-fall to the roots,
feast on sap,
then follow
their ancestral path
down
deep
into
the earth:
to burrow,
incubate,
wait.

It is the month
I sit in the back of a cab
and wonder
if I can write a poem
after thirty years.

Rafah is on fire.
I rage,
make calls,
watch the videos to the end
until my cheeks burn,
knowing it is both
the most
and the least
I can do.
She gets her first loose tooth.
He gets his first pimple.

It is the month
I see my mother
look genuinely happy
in a photo
for the first time.
When the largest solar storm
since 2003
erupts above us,
we wake the kids at midnight,
run down to the riverbank,
pajamas and bare feet,
to gawk at the aurora.
They are hard to see
with the naked eye,
but strangely brilliant
through my iPhone’s lens:
pink, green, gold.

We sit on a bench in front of Sue,
the world’s largest,
most complete
T-rex fossil.
We hold up photos
of chicken skeletons,
then human skeletons,
comparing them to Sue’s.
None are wildly different
from the other.
We wonder if apex predators
get a bad rap.

In a quiet corner
of the museum’s basement
we see a mummy
with our own eyes.
She is smaller than I anticipated,
not much bigger than a large child.
I fall in love
with the wide gold wings
gilding her chest.
I wonder
how her afterlife is going.
And whether it is disgust or fascination
rippling through my belly
when I see her
partially exposed
maxilla.

It is not
the month we finish construction
on our house.
But it is the month
my brother,
intrepid archaeologist,
hauls away
2,500 pounds
of trash and debris,
unearthing, presenting:
the yard.
The yard where my mother
plants flowers.
Where we gather on Mother’s Day
with old and new loves.

My Dear One
hears a story stir
deep underground,
a story buried with our friend
after the car accident in 2000.
She sings it
back to the surface
with the cicadas,
sings it with her whole chest
to the cameras.
Then sings him
back to sleep
so he can finally rest.

It is the month
I sit in the clinic
every week,
IV in my left arm,
as iron is pumped back
into my watery blood.
It is the month
I exhume
imprints
of both
abuser and abused
embedded in my body.
Gold
in my veins
when the light hits just right.
It is the month
I remember I love sex.
The month I bleed with the full moon.

He and I
see a prick of light
pierce our familiar dark.
Maybe we have been
in a swelling cocoon
all along,
not a tomb
as we feared.

May is the month
my nine-year-old,
blood of my blood,
takes my hand
unprompted
as we walk through the park.
The month
my five-year-old,
bone of my bone,
falls asleep on my chest,
her head heavy
on my sternum,
feet reaching
all the way
to the center
of my tibias.
(How?)

It is the month
I realize
human ashes,
viewed under a microscope,
resemble
nebulae
seen through a telescope.

The month
the nymph surrenders.
The mother emerges.
The month
I finally wade
out
into
the river,
offering my exhausted attempts
at control
to her swift current.
At least for today.`,
  },
  {
    slug: "that-it-was",
    title: "That It Was",
    year: "2026",
    preview: ["That it was —", "A raging headache", "Dark circles", "Shaky legs"],
    body: `That it was —
A raging headache
Dark circles
Shaky legs
Pillows, blankets on the floor
Eating ice cream
Watching The Sandlot
After the crying ran out

That it was —
A 12-inch phone cord
No shoelaces
Chicken and dumplings
Fluorescent lights
Forrest Gump in the rec room
A nineteen-year-old kid
There on her birthday
Screaming
for her fucking cigarettes

That it was not —
Stainless steel
Toe tag
Paper drape
Formaldehyde
That’s him.
Can’t breathe.
Slumping to the floor.

That it was not —
Finding your only suit
Buried
Behind your regular clothes
Reeling—
knees buckling because
everything still smells like you.

That it was not —
Stunned silence
Except when
the sobs punch through—
unexpected
violent
no warning
don’t see it coming

That it was not —
Trying to choose which photos to use
I can’t bear to look
Eyes refuse focus
Every time they see your image
blurring with fury
Pixels and ink—
all I have left.

That it was not —
Oak or cherry?
Open or closed?
What time on Saturday?
Are you serving lunch?

That it was not —
Blisters from the dress shoes I never wear
Dazed small talk with your coworkers
Sorry to be meeting under these circumstances
Thank you for coming
Drive safe
Here’s your coat

That it was —
Blackout drunk
Before you found your keys
or grabbed the gun

That it was —
Crying with you
In the truck
In the kitchen
When you told us the truth
Cracked open
Decided to stay

That it was —
Shrimp Diabolo quesadillas at lunch
Wait—wasn’t that what we used to call your ex?
Laughing for the first time since yesterday
Eyelids swollen, tear-brined like little
martini onions

That it was —
Going home
Running you a bath with
bergamot, salt, and rose
Making you tea
Walking the dog
Letting myself rest
For a few moments
Less afraid to leave you
alone

That it was —
Two days later
You scrubbed out the tub
And ran a bath
for me

That it was not —
You, in dead grass
Behind the firehouse
Like you’d planned
Your blazing aura now
inert
As blood pools around your head
A slow-spreading halo
Becomes a ring around your body:
You, at the center
Bullseye.

That it was —
The gun still in your bag
The last place she thought to look
Retrieved with bare hands
Warm
Shaking
Given to a friend
Locked away
Resolute

That it was not —
Zipped into plastic
By a stranger’s gloved hands
Steady—
just doing his job
Going on break soon

That it was —
Her voice
Strange on the phone
He was on the floor
He was breathing
Bottle empty
Notes everywhere
Didn’t know what to do,
so I called the cops
They took him in the ambulance
I’ll know more soon

That it was —
On the plane the next day
Hadn’t cried
Couldn’t flinch
Just wanted to be with you
You didn’t have to cook for me
It’s okay. It helps me feel normal
Talked to the nurse
We can pick him up tomorrow

That it was —
We shared a womb
And a childhood
And are still
middle-aged together

That it was —
You were the tallest tree
In an open field
The lightning struck
And you let it
It split you in two
There were green shoots
Inside the dead wood
You chose to stay
To see what it might become

That it was —
A walk on the trail
Bursting with pollen
Texas January
Afternoon slanted sun
We laughed while you sneezed
Cedar season still kicks my ass
You’re allergic
Because you’re still breathing
You needed an antihistamine
And I had one

I give thanks
to anyone
anywhere
who is listening`,
  },
  {
    slug: "two-days",
    title: "Two Days",
    year: "2025",
    preview: ["If I knew", "it was two days", "I’d take your hand", "and we’d run to the water."],
    body: `
If I knew
it was two days
I’d take your hand
and we’d run to the water.

Your buttons
my zipper
clothes slumped in the sand
like we’d been raptured.
But we’d wade in
face the current.

We’d turn our backs on it
to face each other,
your breath
beading on my throat.

We’d stand
still
feet sinking deeper
let the waves come for us.

Salt in my mouth.

•

I’d heat oil between my palms
and let it drip into your bath,

then we’d climb in
sit
knee to knee.

I’d memorize the lines
around the corners of your eyes
my map
to the place where
the water gathers.

You’d ask me to draw it
on your palm,
prove I’d remember.

I’d feed you
an olive
then
crush the rest
in my fist.

A rivulet of brine
runs down my forearm,
burning`,
  },
  {
    slug: "evidence",
    title: "Evidence",
    year: "2026",
    preview: ["We were all lined up in a row", "along the side of the highway:"],
    body: `We were all lined up in a row
along the side of the highway:

RV
leaning hard over the edge of the shoulder
passenger-side wheel torn to shreds
wires and gas lines tangled in rubber
totaled

Flatbed tow truck
dwarfing our little camper
driver vaping, yelling into his phone

A newly dead cedar waxwing
pressed into the asphalt
soft brown head intact, beak open
looking up to the left
wings spread out and down
no blood
just red-tipped feathers,
tiny tangled feet

My feet in flipflops
dirty from hours on the roadside
almost touching the bird
squatting down to look closer
left knee burning when I put my full weight on it
axle grease on my hands from trying to change the tire.

I touch a yellow tailfeather.
It yields to me immediately.

The family car
shuddering in the heat
listless kids, wrappers on the floor
husband on the phone with insurance
wife in the passenger seat
stray wires caught up in her pant leg
a ziplock bag of feathers in her hand`,
  },
  {
    slug: "rosary",
    title: "Rosary",
    year: "2025",
    preview: ["Earth rotating like a bead", "The bead orbiting a silk cord", "Who is the mantra for—", "Lakshmi or me?"],
    body: `Earth rotating like a bead
The bead orbiting a silk cord
Who is the mantra for—
Lakshmi or me?

My feet have worn grooves
around the house
Where I orbit
Up for school
Out the door
7:05
Pick you up
2:30
Snack time

Your bedtime songs have
morphed
I know this because I haven’t sung them in years
But I’m sure I never stopped
Like stepping outside at night
then realizing the sun is up
and you barely noticed it rise

Nose against Monet’s pond
The underside of a tapestry
The Grand Canyon through a telescope
Made from an empty paper towel roll

Smooth in my hand
Over and over
Dense little foot
Fitting my palm
Eyelashes grazing
your round cheeks
while you sleep
Asking me why
108 times
Hug, kiss
Cut the grapes in half

Strange to be spinning
and never feel it
Strange how still we are
With matched velocity
Mirrored parabolas
Hurling through space

I’ve looked at the same maple
Every day for ten years
Never seen it grow
Yet it towers now
Dropping its leaves
Extravagantly

You were a baby when we moved in
Now my chin barely rests on your head

Who turns the Earth
Absently in her palm?
Devoted, distracted—
Is she keeping count?
108?
324?

Repetition is a form of change
Nothing lasts forever
If I hold the peach too long
It bruises
So I bite
Juice down my chin

Small, fuzzy planet
Your duckling head
I kiss you mid-orbit
Once
More
Than before`,
  },
  {
    slug: "joy",
    title: "Joy",
    year: "2026",
    dedication: "for my body",
    preview: ["Her name is Joy.", "Never a moment", "my fingers couldn’t find her", "in the dark."],
    body: `Her name is Joy.

Never a moment
my fingers couldn’t find her
in the dark.

She is pigment,
paper,
eyes and hands.

And maybe I am the artist.

But maybe I’m not.

Her ovaries flash like opals.

She will always attempt
one more heartbeat.
She will always attempt
one more breath.

Of all the forms
that populate the earth,

what if she’s the only one
who knows she won’t live forever?

That no amount of pleading,
new tech,
or face cream
can make this form immortal?

She knows that she’s made
of the bones and feathers and apples
of her comrades on earth.

She knows that she will return to them
and be reformed
again and again.

And this time
she said yes to me.

First becoming two:

unbothered orb,
master of the tide,

frantic swimmer
determined to survive,

gathering speed
until they collide—

merging again
with herself

and with me.

She’s definitely been a glacier
or a redwood before.

Her ability to be walked like a dog
and not lose her dignity.

Her welcome
of this form where

infinite rivers,
carbon,
chlorophyll

become eyelids, organs, bone.

Where her canyons and bark and ivory
are now singular
swirls and grooves
on the pads of her fingertips,

formed by pressing her hands
against the walls
of my mother’s uterus.

My fingerprints.

To think that I’m deciding
to give her a say in things now,

now that I’m halfway through.

That she’s waited this long,
indulged my heat and recklessness,
borne with my ignorance.

I have the strange honor
of being the place
where she meets a soul

and these ancient ones
add one more shape
to the universe.

And the hell of it is
I was so underprepared.

The hell of it is
we are all underprepared.

And the only way to learn
is to put them both through the wringer.

Which I do.

Good thing they know
how intoxicating it is
to think you are invincible.

Good thing they know
when enough is enough.

I like the power
I think I have.

I don’t like
that she’s submitted to me
all these years.

And then I do.

But they are teaching me.

They are allowing me
every drop of power
I imagine that I have.

They tell me it’s time
for my turn.

And in the moments
I forget I exist—
when I soften
and stretch open,

becoming more

bridge,
channel,
sacred grove,
meeting place,

less gatekeeper,
guard,
or a tyrannical toddler king—

the real fun begins.

Sometimes I pretend
I don’t care

so I don’t implode
or incinerate.

I am not the teacher
or the student.

I am the classroom.

I will never be impervious.

Or really
even durable.

I am wildly at the mercy
of my environment.

I am so easily afraid.

I am stunned
by the way I transcend
the skull that holds me,

by the way gravity and time
can’t touch me
the way they touch her,

by the way I feel infinite
and the way that’s almost true.

But then
I am afraid again.

And I feel the need
to protect her from

disapproving glances,
bad weather,
mice,
loud noises,
late bills,
minor inconveniences,
newness,
boredom,
freedom,
exile,
and unfamiliar foods.

She will go on
with or without me.

They both will.

But this fragile meeting—

where a soul
with all its fire
and the ancient earth

rendezvous
within the paper-thin membranes
of a consciousness

and give themselves to me
with all the trust
I have not yet earned—

is the stupidest
and most extravagant thing
I can imagine.

That they chose this—

chose me,
made me,
and need me—

the fertile void,

becoming something
temporarily singular,

temporarily alive,

with hazel eyes,
big feet,

who is learning
not to be so hard on herself,

who is splitting the difference
between nothing and everything,

who sometimes remembers

who
and what

she is.`,
  },

];

// Temporarily withheld from the Reading Room (October 2026). They stay here,
// unchanged; take a slug out of this list to show the poem again.
// Hidden: That It Was (awaiting consent); Rosary (being reworked, October 19).
const HIDDEN_POEMS = ["that-it-was", "rosary"];

// Shelf order: For C opens the room ("Hi."); the poems then run by year,
// and Evidence's feathers lead into Joy. (Rosary sits before Evidence when it returns.)
const SHELF_ORDER = ["for-c", "may-2024", "that-it-was", "two-days", "rosary", "evidence", "joy"];
const shelfIndex = (slug: string) => {
  const i = SHELF_ORDER.indexOf(slug);
  return i === -1 ? SHELF_ORDER.length : i;
};

export const poems: Poem[] = allPoems
  .filter((poem) => !HIDDEN_POEMS.includes(poem.slug))
  .sort((a, b) => shelfIndex(a.slug) - shelfIndex(b.slug));

export function getPoem(slug: string) {
  return poems.find((poem) => poem.slug === slug);
}
