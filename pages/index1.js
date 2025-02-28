import Image from 'next/image';
import { personal, experience, skills, projects, education, contact } from '../data';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <section id="about" className="p-6 bg-white flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">About Me</h2>
        <Image
          src={personal.Photo ? '/'+personal.Photo : '/fallback.jpg'}
          alt="Profile Picture"
          width={128}
          height={128}
          className="rounded-full border-2 border-gray-300 m-4"
        />
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800">{personal.Name}</h3>
          <p className="text-lg text-gray-800">{personal.Title}</p>
          <p className="text-gray-700 mt-2">{personal.Bio}</p>
        </div>
      </section>

      <section id="experience" className="p-6 bg-white">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Experience</h2>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
          {experience.map((exp) => (
            <div
              key={exp.company}
              className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-sm text-gray-500">
                {exp.startDate} - {exp.endDate}
              </p>
              <h3 className="text-xl font-semibold text-gray-800">{exp.jobTitle || 'N/A'}</h3>
              <p className="text-gray-600 mt-1">{exp.company || 'N/A'}</p>
              <p className="text-gray-500 mt-1">{exp.location || 'N/A'}</p>
              <p className="text-gray-700 mt-2 line-clamp-3">{exp.description || 'No description available'}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Skills</h2>
        <div className="flex flex-wrap gap-4">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 p-2 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section id="projects" className="p-6 bg-white">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Projects</h2>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {projects.map((proj) => (
            <div
              key={proj.projectName}
              className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800">{proj.projectName}</h3>
              <p className="text-gray-700 mt-2 line-clamp-3">{proj.description}</p>
              <p className="text-gray-600 mt-1">{proj.technologies}</p>
              {proj.links && (
                <a
                  href={proj.links}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 mt-1 inline-block"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="education" className="p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Education</h2>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
          {education.map((edu) => (
            <div
              key={edu.institution}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-800">{edu.institution}</h3>
              <p className="text-gray-600 mt-1">{edu.degree}</p>
              <p className="text-gray-500 mt-1">{edu.dates}</p>
              <p className="text-gray-700 mt-2 line-clamp-3">{edu.description || 'No description available'}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="p-6 bg-white">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Contact</h2>
        <div className="flex flex-col gap-4">
          {contact.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 text-lg"
            >
              {item.platform}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}