import { NewsItem, Project, Publication, Experience, ZenPost } from './types';
import { parseMarkdown } from './lib/markdown';

import cvMarkdownRaw from './content/cv.md?raw';

import projectSocialNetworkRaw from './content/projects/01-social-network.md?raw';
import projectLampPostRaw from './content/projects/02-lamp-post.md?raw';
import projectFpgaClockRaw from './content/projects/03-fpga-clock.md?raw';

import publicationEfficiencyRaw from './content/publications/01-efficiency-optimization.md?raw';

import zenSynchronousDesignRaw from './content/zen/01-synchronous-design.md?raw';
import zenAnalogDecayRaw from './content/zen/02-analog-decay.md?raw';

export const PROFILE = {
  name: 'Myrick Wang',
  title: 'Electrical & Electronic Engineering / University of Bristol',
  bio: 'Specializing in semiconductor physics, analog & digital circuit design, communication systems, signal processing, and power conversion technologies. Currently pursuing a BEng in Electrical and Electronic Engineering (Class of 2027).',
  email: 'myrickwan9@gmail.com',
  phone: '+86 15160733691',
  location: 'Bristol, UK / Xiamen, China',
  avatar: '/avatar.jpg',
  socials: {
    github: 'github.com/rickkwang',
    linkedin: 'linkedin.com/in/myrick-wang',
    scholar: 'scholar.google.com/citations?user=PS_CX0AAAAAJ',
    twitter: 'twitter.com/rickMygod',
    bluesky: 'bsky.app/profile/myrwang.bsky.social',
  },
};

export const CV_MARKDOWN = parseMarkdown(cvMarkdownRaw).content;

export const NEWS: NewsItem[] = [
  { date: 'Sep 2024', content: 'Started Year 2 of BEng Electrical and Electronic Engineering at University of Bristol.' },
  { date: 'Jun 2024', content: "Completed 'Social Network Simulation' independent research project." },
  { date: 'May 2024', content: "Presented 'Optimizing Graph Traversal' at the Undergraduate Research Symposium." },
  { date: 'Sep 2023', content: 'Joined the Automatic Lamp Post design group as Lead Hardware Engineer.' },
];

export const FOCUS_AREAS = [
  'Signal Processing & Analysis',
  'Embedded Systems Design',
  'Machine Learning in Hardware',
  'Circuit Analysis & Simulation',
  'Network Topology Simulation',
];

export const PROFICIENCY = [
  {
    category: 'PROGRAMMING',
    skills: [
      { name: 'Python', desc: 'Data analysis, simulation, and automation (NumPy, Matplotlib, argparse)' },
      { name: 'C / C++', desc: 'Embedded firmware, microcontroller programming (ARM/RISC-V)' },
      { name: 'MATLAB', desc: 'Signal processing, numerical computation, and control system design' },
    ],
  },
  {
    category: 'ENGINEERING TOOLS',
    skills: [
      { name: 'Arduino / RP2040', desc: 'Hardware prototyping, sensor integration & control logic' },
      { name: 'Intel Quartus / FPGA', desc: 'Digital logic design, Verilog implementation & timing analysis' },
      { name: 'Fusion 360', desc: '3D modeling, enclosure design & mechanical simulation' },
    ],
  },
];

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
    description: getMeta(meta, 'description'),
    content,
  };
};

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

export const EDUCATION = [
  {
    institution: 'University of Bristol',
    degree: 'BEng Electrical & Electronic Engineering',
    period: '2023 – 2027',
    details: 'Year 2 Undergraduate. Studying Semiconductor Physics, Analog/Digital Circuits, and Embedded Systems.',
  },
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'University of Bristol',
    role: 'Lead Hardware Engineer (Project Group)',
    period: '2023 – Present',
    description: [
      'Coordinated hardware specifications for autonomous sensor networks and robotic platforms.',
      'Optimized power consumption in embedded units for municipal infrastructure applications.',
      'Documented technical specifications and managed sensor integration workflows.',
    ],
  },
];
