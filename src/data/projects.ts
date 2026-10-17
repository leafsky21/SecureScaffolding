export const projects = [
  { slug: 'paterson-creek-bridge', title: 'Paterson Creek Bridge', location: 'NSW', category: 'Infrastructure access', image: '/projects/paterson-creek.jpg', description: 'Reliable access support for bridge and infrastructure works, planned around demanding site conditions and active construction programs.', services: ['Scaffolding installation', 'Transport', 'Design support'] },
  { slug: 'barge-rozelle', title: 'Barge Rozelle', location: 'Rozelle, NSW', category: 'Marine and civil works', image: '/projects/barge-rozelle.jpg', description: 'Practical scaffold access for marine and civil works, helping crews work safely around complex structures and changing site conditions.', services: ['Scaffolding hire', 'Installation', 'Transport'] },
  { slug: 'prospect', title: 'Prospect', location: 'Western Sydney', category: 'Residential and commercial', image: '/projects/prospect.jpg', description: 'Flexible access solutions for construction teams working across residential and commercial projects in Western Sydney.', services: ['Scaffolding hire', 'Installation', 'Labour'] },
  { slug: 'hawkesbury-river-bridge', title: 'Hawkesbury River Bridge', location: 'Hawkesbury, NSW', category: 'Major infrastructure', image: '/projects/hawkesbury-bridge.jpg', description: 'Scaffolding support for major infrastructure work where safe access, coordination and dependable delivery are critical.', services: ['Scaffolding installation', 'Transport', 'Consulting engineering'] },
  { slug: 'scenic-world-katoomba', title: 'Scenic World Katoomba', location: 'Blue Mountains, NSW', category: 'Complex site access', image: '/projects/scenic-world.jpg', description: 'Carefully coordinated access for work in a complex, high-traffic Blue Mountains environment.', services: ['Scaffolding hire', 'Installation', 'Design support'] },
  { slug: 'royal-north-shore-hospital', title: 'Royal North Shore Hospital', location: 'St Leonards, NSW', category: 'Health infrastructure', image: '/projects/royal-north-shore.jpg', description: 'Professional access support for health infrastructure projects, with planning that respects active operational environments.', services: ['Scaffolding hire', 'Installation', 'Transport'] },
  {
    slug: 'mount-st-benedict-college-public-stair-access',
    title: 'Premium Public Access Stairs — Mount St Benedict College',
    location: 'Mount St Benedict College, NSW',
    category: 'Premium public access stairs',
    seoTitle: 'Public Access Stairs Sydney | Secure Scaffolding',
    seoDescription: 'Premium temporary public access stairs for schools and high-traffic sites in Sydney, with engineered landings, handrails, guardrails and slip-resistant surfaces.',
    image: '/projects/mount-st-benedict-college/IMG_4220.jpeg',
    images: [
      '/projects/mount-st-benedict-college/IMG_4220.jpeg',
      '/projects/mount-st-benedict-college/IMG_4243.jpeg',
      '/projects/mount-st-benedict-college/IMG_4224.jpeg',
      '/projects/mount-st-benedict-college/IMG_4223.jpeg',
      '/projects/mount-st-benedict-college/IMG_4222.jpeg',
      '/projects/mount-st-benedict-college/IMG_4226.jpeg'
    ],
    imageAlts: [
      'Premium temporary public access stairs installed on sloping grounds at Mount St Benedict College',
      'Wide school public access stairs with slip-resistant treads and high-visibility step nosings',
      'View down the temporary public access stair system towards the Mount St Benedict College buildings',
      'Guardrailed landings on the premium public access stair installation at Mount St Benedict College',
      'Temporary pedestrian access landing connecting the school grounds to the public access stairs',
      'Engineered scaffold support beneath the temporary public access stair system'
    ],
    galleryTitle: 'Premium temporary public access stairs for schools.',
    servicesTitle: 'Purpose-built public access—not ordinary site stairs.',
    description: 'Secure Scaffolding supplied and installed a premium-quality temporary public access stair system for teachers, students and visitors at Mount St Benedict College in Sydney. Purpose-built for public use and high pedestrian traffic in a school environment, the system incorporated generous landings, continuous handrails and guardrails, slip-resistant flooring and high-visibility step nosings. This engineered public access solution is aligned with the National Construction Code and applicable Australian Standards. It is substantially different from conventional construction-site or stretcher stairs intended primarily for tradespeople.',
    services: ['Premium public access stair system', 'NCC and Australian Standards compliance', 'High-traffic pedestrian access', 'Scaffold-supported installation']
  },
  { slug: 'prime-bluescope-erskine-park', title: 'Prime Constructions for BlueScope', location: '25–55 Templar Road, Erskine Park NSW', category: 'Steel manufacturing facility', image: '/projects/prime-bluescope-erskine-park/IMG_6327.jpg', images: ['/projects/prime-bluescope-erskine-park/IMG_6327.jpg','/projects/prime-bluescope-erskine-park/IMG_6592.jpg','/projects/prime-bluescope-erskine-park/IMG_6597.jpg','/projects/prime-bluescope-erskine-park/IMG_6598.jpg','/projects/prime-bluescope-erskine-park/IMG_6599.jpg','/projects/prime-bluescope-erskine-park/IMG_6610.jpg','/projects/prime-bluescope-erskine-park/IMG_6611.jpg','/projects/prime-bluescope-erskine-park/IMG_6612.jpg'], description: 'Engineer-certified scaffolding design and installation services for Prime Constructions at the BlueScope steel factory at 25–55 Templar Road, Erskine Park.', services: ['Scaffolding design', 'Engineer-certified installation', 'Scaffolding hire', 'Transport'] }
];

const uploadDates: Record<string, string> = {
  'paterson-creek-bridge': '2025-01-15',
  'barge-rozelle': '2025-02-10',
  prospect: '2025-03-05',
  'hawkesbury-river-bridge': '2025-04-20',
  'scenic-world-katoomba': '2025-05-12',
  'royal-north-shore-hospital': '2025-06-18',
  'mount-st-benedict-college-public-stair-access': '2026-10-12',
  'prime-bluescope-erskine-park': '2026-08-17'
};

export const sortedProjects = [...projects].sort((a, b) => new Date(uploadDates[b.slug]).getTime() - new Date(uploadDates[a.slug]).getTime());
