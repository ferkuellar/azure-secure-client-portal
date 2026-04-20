import { useEffect, useState } from 'react'

const API_BASE = "https://ca-client-api-dev--cd4h1nf.graysmoke-2e9e3ee0.eastus2.azurecontainerapps.io"

export default function App() {
  const [profile, setProfile] = useState(null)
  const [incidents, setIncidents] = useState([])
  const [services, setServices] = useState([])
  const [health, setHealth] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadData() {
      try {
        const [healthRes, profileRes, incidentsRes, servicesRes] = await Promise.all([
          fetch(`${API_BASE}/health`),
          fetch(`${API_BASE}/api/profile`),
          fetch(`${API_BASE}/api/incidents`),
          fetch(`${API_BASE}/api/services/status`)
        ])

        if (!healthRes.ok || !profileRes.ok || !incidentsRes.ok || !servicesRes.ok) {
          throw new Error(`API request failed. Health: ${healthRes.status}, Profile: ${profileRes.status}, Incidents: ${incidentsRes.status}, Services: ${servicesRes.status}`)
        }

        const healthData = await healthRes.json()
        const profileData = await profileRes.json()
        const incidentsData = await incidentsRes.json()
        const servicesData = await servicesRes.json()

        setHealth(healthData)
        setProfile(profileData)
        setIncidents(incidentsData)
        setServices(servicesData)
      } catch (err) {
        console.error('Frontend API error:', err)
        setError(`Could not load backend data from ${API_BASE}`)
      }
    }

    loadData()
  }, [])

  return (
    <div className="container">
      <header className="hero">
        <h1>Azure Secure Client Portal</h1>
        <p>Portfolio project for Azure Cloud Architect positioning</p>
        <p><strong>API Base:</strong> {API_BASE}</p>
        {error && <p style={{ color: '#fca5a5' }}><strong>Error:</strong> {error}</p>}
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