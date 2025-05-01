// src/ResourcesPage.js
import React from 'react'
import SidebarMenu from './SidebarMenu'
import './ResourcesPage.css'

const services = [
  {
    title: 'Training & Workshops',
    desc: 'On-demand webinars and live sessions on pitch preparation, business modeling, and more.',
    link: 'https://www.sandiego.edu/sbdc/services/training-workshops.php'
  },
  {
    title: 'Lean Essentials Sprint (LES)',
    desc: 'An intensive multi-week accelerator that guides early-stage founders through customer discovery and business model validation.',
    link: 'https://www.sandiego.edu/sbdc/services/les.php'
  },
  {
    title: 'Online Tools & Guides',
    desc: 'A library of digital resources covering business formation, entity selection, and funding preparation.',
    link: 'https://www.sandiego.edu/sbdc/services/online-resources.php'
  },
  {
    title: 'Free & Confidential Advising',
    desc: 'No-cost one-on-one business advising in a confidential setting, helping founders refine strategy and access capital.'
    // no dedicated page
  },
  {
    title: 'SBIR/STTR Support',
    desc: 'Guidance on preparing competitive SBIR/STTR federal grant proposals and navigating application processes.'
    // no dedicated page
  },
  {
    title: 'Market Research Assistance',
    desc: 'Access to national databases and expert help in crafting and analyzing market research proposals.'
    // no dedicated page
  },
  {
    title: 'Pitch Competition Preparation',
    desc: 'Coaching for competition readiness, including pitch deck refinement and presentation skills.'
    // no dedicated page
  },
  {
    title: 'Mentorship & Coaching',
    desc: 'Ongoing support from experienced advisors to navigate challenges and accelerate growth.'
    // no dedicated page
  },
  {
    title: 'Inclusive Innovation Hub',
    desc: 'Programs and outreach supporting diverse entrepreneurs, recognized as a CalOSBA iHub².'
    // no dedicated page
  },
  {
    title: 'Regional Innovation Cluster (RIC)',
    desc: 'Collaborative initiatives driving innovation in advanced manufacturing and biotechnology.'
    // no dedicated page
  },
  {
    title: 'Expert Advisory Team',
    desc: 'A bench of 16+ industry experts offering tailored guidance on complex challenges.'
    // no dedicated page
  }
]

export default function ResourcesPage() {
  return (
    <div className="resources-container">
      <SidebarMenu />
      <div className="resources-content">
        <h1>Resources</h1>
        <div className="services-grid">
          {services.map(({ title, desc, link }, i) => (
            <div key={i} className="service-card">
              <h2>{title}</h2>
              <p>{desc}</p>
              {link && (
                <a href={link} target="_blank" rel="noopener noreferrer">
                  Learn More &rarr;
                </a>
              )}
            </div>
          ))}
        </div>
        <div className="more-link">
          <a
            href="https://www.sandiego.edu/sbdc/services/"
            target="_blank"
            rel="noopener noreferrer"
          >
            View all services at The Brink SBDC &rarr;
          </a>
        </div>
      </div>
    </div>
  )
}

