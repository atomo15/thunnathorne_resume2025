import Image from 'next/image';
import { useState, useEffect } from 'react';

import { personal, relevantExperience, leadershipExperience, otherExperience, technicalSkills, frontendSkills, backendSkills, toolsSkills, softSkills, projects, education, certificates, contact } from '../data';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

function getShortenedUrl(url, platform) {
  if (!url) return 'N/A';
  const cleanUrl = url.replace(/^mailto:/, '').replace(/^tel:/, '');
  if (platform === 'LinkedIn') {
    // แยกชื่อผู้ใช้จาก URL LinkedIn (เช่น "thunnathorne" จาก "https://www.linkedin.com/in/thunnathorne-1234567890abcdef")
    const match = cleanUrl.match(/\/in\/([^\/?]+)/);
    return match ? match[1] : cleanUrl;
  } else if (platform === 'GitHub') {
    // แยกชื่อผู้ใช้จาก URL GitHub (เช่น "atom015" จาก "https://github.com/atom015")
    const match = cleanUrl.match(/github\.com\/([^\/?]+)/)
    return match ? match[1] : cleanUrl;
  } else if (platform === 'Portfolio') {
    // แสดงเฉพาะโดเมนหลัก (เช่น "thunnathorne-portfolio.com" จาก "https://thunnathorne-portfolio.com/projects")
    return new URL(cleanUrl).hostname.replace('www.', '');
  }
  return cleanUrl; // สำหรับ Email และ Phone
}

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // ตรวจสอบ prefers-color-scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    // เพิ่ม/ลบคลาส 'dark' ใน <html> หรือ <body>
    document.documentElement.classList.toggle('dark', !isDark);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} font-sans`}>

      {/* <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 bg-gray-600 dark:bg-gray-800 text-white dark:text-gray-100 p-2 rounded-full shadow-md hover:bg-gray-500 dark:hover:bg-gray-700"
      >
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </button> */}

      <section id="about" className={`p-6 ${isDark ? 'bg-gray-800 dark:bg-dark-card' : 'bg-white'} flex flex-col items-center`}>
        <h2 className="text-2xl font-bold mb-6 text-gray-100 dark:text-dark-text">About Me</h2>
        <Image
          src={personal.Photo ? '/' + personal.Photo : '/fallback.jpg'}
          alt="Profile Picture"
          width={128}
          height={128}
          className="rounded-full border-2 border-gray-300 m-4"
        />
        <div className="text-center max-w-xxl mx-auto">
          <h3 className="text-xl font-semibold text-gray-100 dark:text-dark-text">{personal.Name}</h3>
          <p className="text-lg text-gray-100 dark:text-dark-text">{personal.Title}</p>
          <p className="text-gray-300 dark:text-dark-muted mt-2 leading-relaxed text-left">
            {personal.Bio
              ? personal.Bio.split('|').map((line, index) => (
                <span key={index} className="block"> {/* ใช้ <span> แทน <p> และเพิ่ม className="block" เพื่อให้เหมือน <p> */}
                  {line}
                  {index < personal.Bio.split('\n').length - 1 && <br />}
                </span>
              ))
              : 'No bio available'}
          </p>
          <p className="text-gray-100 dark:text-dark-muted mt-2 text-left">
            {personal.Address ? personal.Address.split('|').map((line, index) => (
              <span key={index} className="block"> {/* ใช้ <span> แทน <p> และเพิ่ม className="block" เพื่อให้เหมือน <p> */}
                {line}
                {index < personal.Address.split('|').length - 1 && <br />}
              </span>
            )) : 'Address not available'}
          </p>
          <p className="text-gray-100 dark:text-dark-muted mt-2 text-left">
            {personal.PhoneNumber ? personal.PhoneNumber.split('|').map((line, index) => (
              <span key={index} className="block"> {/* ใช้ <span> แทน <p> และเพิ่ม className="block" เพื่อให้เหมือน <p> */}
                {line}
                {index < personal.PhoneNumber.split('|').length - 1 && <br />}
              </span>
            )) : 'Phone number not available'}
          </p>
          <p className="text-gray-100 dark:text-dark-muted mt-2 text-left">
            Email:<br></br>
            <a href={`mailto:${personal.Email}`} className="hover:underline">
              {personal.Email || 'Email not available'}
            </a>
          </p>
        </div>
      </section>

      <section id="experience" className="p-6 bg-white">
        <section id="relevant-experience" className="p-6 bg-gray-300 dark:bg-dark-card">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-dark-text">Relevant Experience</h2>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
            {relevantExperience && Array.isArray(relevantExperience) && relevantExperience.length > 0 ? (
              relevantExperience.map((exp) => (
                <div
                  key={exp.company}
                  className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-400 dark:border-blue-300"
                >
                  <p className="text-sm text-gray-100 dark:text-dark-text">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <h3 className="text-xl font-semibold text-white dark:text-dark-text">{exp.jobTitle || 'N/A'}</h3>
                  <p className="text-gray-200 dark:text-dark-muted mt-1">{exp.company || 'N/A'}</p>
                  <p className="text-gray-300 dark:text-dark-muted mt-1">{exp.location || 'N/A'}</p>
                  <p
                    className="text-gray-100 dark:text-dark-text mt-2 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: exp.description || 'No description available' }}
                  ></p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 dark:text-dark-muted">No relevant experience available.</p>
            )}
          </div>
        </section>

        <section id="other-experience" className="p-6 bg-gray-300 dark:bg-dark-card">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-dark-text">Other Valuable Experience</h2>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
            {otherExperience && Array.isArray(otherExperience) && otherExperience.length > 0 ? (
              otherExperience.map((exp) => (
                <div
                  key={exp.company}
                  className="bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-700 dark:to-gray-900 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-gray-400 dark:border-gray-300"
                >
                  <p className="text-sm text-gray-100 dark:text-dark-text">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <h3 className="text-xl font-semibold text-white dark:text-dark-text">{exp.jobTitle || 'N/A'}</h3>
                  <p className="text-gray-200 dark:text-dark-muted mt-1">{exp.company || 'N/A'}</p>
                  <p className="text-gray-300 dark:text-dark-muted mt-1">{exp.location || 'N/A'}</p>
                  <p
                    className="text-gray-100 dark:text-dark-text mt-2 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: exp.description || 'No description available' }}
                  ></p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 dark:text-dark-muted">No other valuable experience available.</p>
            )}
          </div>
        </section>

        <section id="leadership-experience" className="p-6 bg-gray-300 dark:bg-dark-card">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-dark-text">Leadership Experience</h2>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
            {leadershipExperience && Array.isArray(leadershipExperience) && leadershipExperience.length > 0 ? (
              leadershipExperience.map((exp) => (
                <div
                  key={exp.company}
                  className="bg-gradient-to-r from-green-600 to-green-800 dark:from-green-700 dark:to-green-900 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-green-400 dark:border-green-300"
                >
                  <p className="text-sm text-gray-100 dark:text-dark-text">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <h3 className="text-xl font-semibold text-white dark:text-dark-text">{exp.jobTitle || 'N/A'}</h3>
                  <p className="text-gray-200 dark:text-dark-muted mt-1">{exp.company || 'N/A'}</p>
                  <p className="text-gray-300 dark:text-dark-muted mt-1">{exp.location || 'N/A'}</p>
                  <p
                    className="text-gray-100 dark:text-dark-text mt-2 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: exp.description || 'No description available' }}
                  ></p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 dark:text-dark-muted">No leadership experience available.</p>
            )}
          </div>
        </section>
      </section>

      <section id="technical-skills" className="p-6 bg-gray-100 dark:bg-dark-card mt-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-dark-text">Technical Skills</h2>
        <div className="flex flex-wrap gap-4">
          {technicalSkills && Array.isArray(technicalSkills) && technicalSkills.length > 0 ? (
            technicalSkills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-700 dark:bg-dark-card text-gray-100 dark:text-dark-text p-2 rounded-full text-sm font-medium border border-gray-500 dark:border-gray-400"
              >
                {skill || 'N/A'}
              </span>
            ))
          ) : (
            <p className="text-gray-400 dark:text-dark-muted">No technical skills available.</p>
          )}
        </div>
      </section>

      <section id="frontend-skills" className="p-6 bg-gray-100 dark:bg-dark-card">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-dark-text">Frontend Development</h2>
        <div className="flex flex-wrap gap-4">
          {frontendSkills && Array.isArray(frontendSkills) && frontendSkills.length > 0 ? (
            frontendSkills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-700 dark:bg-blue-800 text-white p-2 rounded-full text-sm font-medium border border-blue-500 dark:border-blue-400"
              >
                {skill || 'N/A'}
              </span>
            ))
          ) : (
            <p className="text-gray-400 dark:text-dark-muted">No frontend skills available.</p>
          )}
        </div>
      </section>

      <section id="backend-skills" className="p-6 bg-gray-100 dark:bg-dark-card">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-dark-text">Backend Development</h2>
        <div className="flex flex-wrap gap-4">
          {backendSkills && Array.isArray(backendSkills) && backendSkills.length > 0 ? (
            backendSkills.map((skill, index) => (
              <span
                key={index}
                className="bg-green-700 dark:bg-green-800 text-white p-2 rounded-full text-sm font-medium border border-green-500 dark:border-green-400"
              >
                {skill || 'N/A'}
              </span>
            ))
          ) : (
            <p className="text-gray-400 dark:text-dark-muted">No backend skills available.</p>
          )}
        </div>
      </section>

      <section id="tools-skills" className="p-6 bg-gray-100 dark:bg-dark-card">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-dark-text">Tools & Platforms</h2>
        <div className="flex flex-wrap gap-4">
          {toolsSkills && Array.isArray(toolsSkills) && toolsSkills.length > 0 ? (
            toolsSkills.map((skill, index) => (
              <span
                key={index}
                className="bg-purple-700 dark:bg-purple-800 text-white p-2 rounded-full text-sm font-medium border border-purple-500 dark:border-purple-400"
              >
                {skill || 'N/A'}
              </span>
            ))
          ) : (
            <p className="text-gray-400 dark:text-dark-muted">No tools available.</p>
          )}
        </div>
      </section>

      <section id="soft-skills" className="p-6 bg-gray-100 dark:bg-dark-card">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-dark-text">Soft Skills</h2>
        <div className="flex flex-wrap gap-4">
          {softSkills && Array.isArray(softSkills) && softSkills.length > 0 ? (
            softSkills.map((skill, index) => (
              <span
                key={index}
                className="bg-yellow-700 dark:bg-yellow-800 text-white p-2 rounded-full text-sm font-medium border border-yellow-500 dark:border-yellow-400"
              >
                {skill || 'N/A'}
              </span>
            ))
          ) : (
            <p className="text-gray-400 dark:text-dark-muted">No soft skills available.</p>
          )}
        </div>
      </section>

      <section id="projects" className="p-6 bg-white dark:bg-dark-card mt-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Projects</h2>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {projects.map((proj) => (
            <div
              key={proj.projectName}
              className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800">{proj.projectName}</h3>
              <p className="text-sm text-gray-400 dark:text-dark-muted mt-1">
                {proj.startDate} - {proj.endDate}
              </p>
              <p className="text-gray-700 dark:text-dark-text mt-2 leading-relaxed">
                {proj.description
                  ? proj.description
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // แปลง **Technologies:** เป็น <strong>Technologies:</strong>
                    .split('\n')
                    .map((line, index) => (
                      <span key={index}>
                        <span dangerouslySetInnerHTML={{ __html: line }} />
                        {index < proj.description.split('\n').length - 1 && <br />}
                      </span>
                    ))
                  : 'No description available'}
              </p>
              <h4 className="text-lg font-semibold text-gray-700 dark:text-dark-text mt-2">Technologies:</h4>
              <ul className="list-disc pl-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2 text-gray-700 dark:text-dark-muted">
                {proj.technologies && Array.isArray(proj.technologies) && proj.technologies.length > 0 ? (
                  proj.technologies.map((tech, index) => (
                    <li key={index} className="break-words">
                      {tech || 'N/A'}
                    </li>
                  ))
                ) : (
                  <li>N/A</li>
                )}
              </ul>


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

      <section id="education" className="p-6 bg-gray-100 mt-8">
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

      <section id="certificates" className="p-6 bg-white dark:bg-dark-card mt-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-dark-text">Certificates</h2>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {certificates && Array.isArray(certificates) && certificates.length > 0 ? (
            certificates.map((cert) => (
              <div
                key={cert.certificateName}
                className="bg-gray-700 dark:bg-dark-card p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-purple-400 dark:border-purple-300"
              >
                <h3 className="text-xl font-semibold text-gray-100 dark:text-dark-text">{cert.certificateName}</h3>
                <p className="text-sm text-gray-400 dark:text-dark-muted mt-1">
                  {cert.issueDate}
                </p>
                <p className="text-gray-300 dark:text-dark-muted mt-1">{cert.issuingOrganization || 'N/A'}</p>
                <p
                  className="text-gray-200 dark:text-dark-text mt-2 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: cert.description || '' }}
                ></p>
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-colors duration-300"
                  >
                    View Certificate
                  </a>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400 dark:text-dark-muted">No certificates available.</p>
          )}
        </div>
      </section>

      <section id="contact" className="p-6 bg-gray-900 dark:bg-dark-card">
        <h2 className="text-2xl font-bold mb-6 text-gray-100 dark:text-dark-text">Contact</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contact && Array.isArray(contact) && contact.length > 0 ? (
            contact.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 dark:bg-dark-card p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center gap-3 text-gray-100 dark:text-dark-text hover:text-blue-400 dark:hover:text-blue-300"
              >
                <span className="text-lg">
                  {item.platform === 'Email' && <FaEnvelope />}
                  {item.platform === 'Phone' && <FaPhone />}
                  {item.platform === 'LinkedIn' && <FaLinkedin />}
                  {item.platform === 'GitHub' && <FaGithub />}
                  {item.platform === 'Portfolio' && <FaGlobe />}
                </span>
                <span
                  className="truncate"
                  title={item.url} // Tooltip สำหรับ URL เต็ม
                >
                  {item.platform}: {getShortenedUrl(item.url, item.platform)}
                </span></a>
            ))
          ) : (
            <p className="text-gray-400 dark:text-dark-muted">No contact information available.</p>
          )}
        </div>
      </section>
    </div>
  );
}