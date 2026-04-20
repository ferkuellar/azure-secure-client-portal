import { useEffect, useState } from 'react'

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:8000'

export default function App() {
  const [profile, setProfile] = useState(null)
  const [incidents, setIncidents] = useState([])
  const [services, setServices] = useState([])
  const [health, setHealth] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/health`)
      .then(res => res.json())
      .then(setHealth)
      .catch(console.error)

    fetch(`${API_BASE}/api/profile`)
      .then(res => res.json())
      .then(setProfile)
      .catch(console.error)

    fetch(`${API_BASE}/api/incidents`)
      .then(res => res.json())
      .then(setIncidents)
      .catch(console.error)

    fetch(`${API_BASE}/api/services/status`)
      .then(res => res.json())
      .then(setServices)
      .catch(console.error)
  }, [])

  return (
    <div className="container">
      <header className="hero">
        <h1>Azure Secure Client Portal</h1>
        <p>
          Portfolio project for Azure Cloud Architect positioning
        </p>
      </header>

      <section className="grid">
        <div className="card">
          <h2>API Health</h2>
          {health ? (
            <>
              <p><strong>Status:</strong> {health.status}</p>
              <p><strong>Service:</strong> {health.service}</p>
              <p><strong>Version:</strong> {health.version}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="card">
          <h2>Profile</h2>
          {profile ? (
            <>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Role:</strong> {profile.role}</p>
              <p><strong>Location:</strong> {profile.location}</p>
              <p><strong>Skills:</strong> {profile.skills.join(', ')}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div className="card">
          <h2>Service Status</h2>
          <ul>
            {services.map(service => (
              <li key={service.name}>
                {service.name}: {service.status}
              </li>
            ))}
          </ul>
        </div>

        <div className="card wide">
          <h2>Incidents</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Severity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map(incident => (
                <tr key={incident.id}>
                  <td>{incident.id}</td>
                  <td>{incident.title}</td>
                  <td>{incident.severity}</td>
                  <td>{incident.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}