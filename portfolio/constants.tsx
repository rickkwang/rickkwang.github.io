import { Project, Publication, ZenPost, Work } from './types';
import { parseMarkdown } from './lib/markdown';

import cvMarkdownRaw from './content/cv.md?raw';

import projectSocialNetworkRaw from './content/projects/01-social-network.md?raw';
import projectLampPostRaw from './content/projects/02-lamp-post.md?raw';
import projectFpgaClockRaw from './content/projects/03-fpga-clock.md?raw';

import publicationEfficiencyRaw from './content/publications/01-efficiency-optimization.md?raw';

import workNoaRaw from './content/work/01-noa.md?raw';
import workDesklingRaw from './content/work/02-deskling.md?raw';
import workNoaClaudeRaw from './content/work/03-noa-claude.md?raw';

import zenSynchronousDesignRaw from './content/zen/01-synchronous-design.md?raw';
import zenAnalogDecayRaw from './content/zen/02-analog-decay.md?raw';

export const PROFILE = {
  name: 'Myrick Wang',
  title: 'Electrical & Electronic Engineering / University of Bristol',
  // One is picked at random on each page load
  intros: [
    "Welcome in — I'm Zhenhao. Have a look around, and say hello if something catches your eye.",
    "You made it. I'm Zhenhao; wander through my work, then come tell me what you think.",
    "Good to see you. I'm Zhenhao — poke around, try things out, and let's swap notes.",
    "Come on in, I'm Zhenhao. Browse as long as you like; new friends are always welcome.",
    "Zhenhao here. Take a look at what I've been making — I'd love to hear about yours too.",
    "Pull up a chair — I'm Zhenhao. Explore a bit, and drop me a line anytime.",
    "Glad you wandered in. I'm Zhenhao, and good conversations are always welcome here.",
    "Make yourself at home; I'm Zhenhao. If you're building something too, let's talk.",
  ],
  about: [
    "Undergraduate in the UK by day. Between lectures, I make small things — toys, mostly — for an audience of one.",
    "A lot of software doesn't look the way I wish it did, so I build my own versions and live in them. If you end up liking one too, that's a very nice bonus.",
    "Otherwise: wandering new cities, rearranging my flat, headphones on at the gym, and writing things down before I forget them.",
  ],
  // Scrolling ticker on the home page — edit freely
  ticker: [
    'Currently building Noa',
    'Based between Bristol and Xiamen',
    'Headphones on, probably',
    'Rearranging the flat again',
    'Writing things down before I forget them',
    'Two time zones, one confused body clock',
    'Missing Xiamen\'s seafood noodles again',
    'Rain in Bristol, sun in Xiamen',
    'Third cup of tea, no regrets',
    'Walking home the long way',
    'Meant to sleep early, again',
    'Cooking something ambitious on a Sunday',
    'Phone full of photos of random skies',
    'One more song, then bed',
    'Supermarket run, forgot half the list',
    'Calling home at awkward hours',
    'Window seat, whenever possible',
    'Debugging in C, dreaming in TypeScript',
    'Ask me about the snail at the bottom of the page',
  ],
  stack: ['TypeScript', 'React', 'Vite', 'Electron', 'Python', 'C', 'VHDL'],
  email: 'myrickwan9@gmail.com',
  phone: '+86 15160733691',
  location: 'Bristol, UK / Xiamen, China',
  socials: {
    github: 'github.com/rickkwang',
    linkedin: 'linkedin.com/in/myrick-wang',
    twitter: 'twitter.com/rickMygod',
  },
};

// Home page shows all of these; the footer drops LinkedIn
export const SOCIAL_LINKS = [
  { label: 'GitHub', href: `https://${PROFILE.socials.github}` },
  { label: 'X', href: `https://${PROFILE.socials.twitter}` },
  { label: 'LinkedIn', href: `https://${PROFILE.socials.linkedin}` },
  { label: 'Email', href: `mailto:${PROFILE.email}` },
];

export const CV_MARKDOWN = parseMarkdown(cvMarkdownRaw).content;

const getMeta = (meta: Record<string, string>, key: string) => meta[key] ?? '';
const splitCsv = (value: string) => value.split(',').map((v) => v.trim()).filter(Boolean);

const toProject = (raw: string): Project => {
  const { meta, content } = parseMarkdown(raw);

  const figureId = getMeta(meta, 'figure_id');
  const figureLabel = getMeta(meta, 'figure_label');
  const figureSrc = getMeta(meta, 'figure_src');

  return {
    id: getMeta(meta, 'id'),
    title: getMeta(meta, 'title'),
    year: getMeta(meta, 'year'),
    tech: splitCsv(getMeta(meta, 'tech')),
    description: getMeta(meta, 'description'),
    content,
    links: {
      github: getMeta(meta, 'github') || undefined,
      pdf: getMeta(meta, 'pdf') || undefined,
      demo: getMeta(meta, 'demo') || undefined,
    },
    figure: figureId && figureLabel && figureSrc
      ? {
          id: figureId,
          label: figureLabel,
          src: figureSrc,
        }
      : undefined,
  };
};

const toPublication = (raw: string): Publication => {
  const { meta, content } = parseMarkdown(raw);
  const status = getMeta(meta, 'status') as Publication['status'];

  return {
    id: getMeta(meta, 'id'),
    title: getMeta(meta, 'title'),
    authors: getMeta(meta, 'authors'),
    venue: getMeta(meta, 'venue'),
    year: getMeta(meta, 'year'),
    status,
    content,
  };
};

const toZenPost = (raw: string): ZenPost => {
  const { meta, content } = parseMarkdown(raw);

  return {
    id: getMeta(meta, 'id'),
    title: getMeta(meta, 'title'),
    date: getMeta(meta, 'date'),
    tag: getMeta(meta, 'tag') || 'Thoughts',
    description: getMeta(meta, 'description'),
    content,
  };
};

const toWork = (raw: string): Work => {
  const { meta, content } = parseMarkdown(raw);

  return {
    id: getMeta(meta, 'id'),
    title: getMeta(meta, 'title'),
    year: getMeta(meta, 'year'),
    kind: getMeta(meta, 'kind'),
    tagline: getMeta(meta, 'tagline'),
    cover: getMeta(meta, 'cover') || undefined,
    url: getMeta(meta, 'url') || undefined,
    github: getMeta(meta, 'github') || undefined,
    content,
  };
};

export const WORKS: Work[] = [
  workNoaRaw,
  workDesklingRaw,
  workNoaClaudeRaw,
].map(toWork);

export const PROJECTS: Project[] = [
  projectSocialNetworkRaw,
  projectLampPostRaw,
  projectFpgaClockRaw,
].map(toProject);

export const PUBLICATIONS: Publication[] = [
  publicationEfficiencyRaw,
].map(toPublication);

export const ZEN_POSTS: ZenPost[] = [
  zenSynchronousDesignRaw,
  zenAnalogDecayRaw,
].map(toZenPost);
