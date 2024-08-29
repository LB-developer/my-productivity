import { useGetAboutMe } from '../hooks/index'

export default function AboutMe() {
  const { data: aboutMeData, isLoading, isError, error: err } = useGetAboutMe()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    console.error(err)
    return <p>There was an error, please check the console for more info</p>
  }

  if (aboutMeData)
    return (
      <section className="about-me">
        <div className="about-me__container">
          {/* Profile Picture */}
          <div className="about-me__profile-picture">
            <img
              src={aboutMeData.picture_url}
              alt={`Profile Picture of ${aboutMeData.Name}`}
              className="about-me__profile-img"
            />
          </div>

          {/* Text Content */}
          <div className="about-me__content">
            <header className="about-me__header">
              <h1 className="about-me__name">{aboutMeData.Name}</h1>
              <h2 className="about-me__role">{aboutMeData.Role}</h2>
            </header>
            <p className="about-me__location">
              Location: {aboutMeData.Location}
            </p>

            {/* Contact Information */}
            <div className="about-me__contacts">
              <a
                href={`mailto:${aboutMeData.email_link}`}
                className="about-me__contact-link"
              >
                Email
              </a>
              <a
                href={aboutMeData.github_acc_link}
                className="about-me__contact-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href={aboutMeData.linkedin_link}
                className="about-me__contact-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    )
}
