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
      <>
        <section className="about-me">
          <div className="about-me__container">
            {/* Text Content */}
            <div className="about-me__content">
              <header className="about-me__header">
                <p className="about-me__greeting">Hey there, I’m</p>
                <h1 className="about-me__name">{aboutMeData.Name}</h1>
                <h2 className="about-me__role">{aboutMeData.Role}</h2>
              </header>
              <p className="about-me__blurb">{aboutMeData.SimpleBlurb}</p>

              {/* Contact Information */}
              <div className="about-me__contacts">
                <a
                  href={`mailto:${aboutMeData.Email}`}
                  className="about-me__contact-link"
                >
                  Email
                </a>
                <a
                  href={aboutMeData.Github}
                  className="about-me__contact-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href={aboutMeData.Linkedin}
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
      </>
    )
}
