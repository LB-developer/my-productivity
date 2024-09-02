import { Technology } from '../models/technologies.type'
import React, { useState, useEffect } from 'react'
import { useGetTechnologies } from '../hooks/index' // Adjust path as needed

const TechnologySearch = () => {
  const { data, isLoading, isError, error } = useGetTechnologies()
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredTechnologies, setFilteredTechnologies] = useState<
    Technology[]
  >([])

  useEffect(() => {
    if (data) {
      const filtered = data.filter((tech: Technology) =>
        tech.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredTechnologies(filtered)
    }
  }, [data, searchQuery])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <>
      <input
        type="text"
        name="search-technologies"
        id="fav-tech-search"
        placeholder="Enter technology..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="edit-about-me-technologies">
        {isLoading && <p>Loading technologies...</p>}
        {isError && <p>Error loading technologies: {error?.message}</p>}

        {!isLoading && !isError ? (
          <>
            <div className="tech-container">
              <div className="tech-content">
                {filteredTechnologies.length > 0 ? (
                  filteredTechnologies.map((tech, idx) => (
                    <div
                      className="choose-tech-selector"
                      key={`choose tech div ${idx}`}
                    >
                      <p key={idx}>{tech.name}</p>
                    </div>
                  ))
                ) : (
                  <p>No technologies found.</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p>No data</p>
        )}
      </div>
    </>
  )
}

export default TechnologySearch
