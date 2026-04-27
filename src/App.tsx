import { useState } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function App() {
  const [firstName, setFirstName] = useState('')
  const [mobile, setMobile] = useState('')
  const [address, setAddress] = useState('')
  const [to, setTo] = useState('')
  const [description, setDescription] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  const generateContent = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/generate_rti`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: firstName,
          mobile_number: mobile,
          address: address,
          authority: to,
          description: description
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status} ${response.statusText}: ${errorText || 'No response body'}`);
      }

      const data = await response.json();
      const parsedOutput = typeof data === 'string'
        ? data
        : data.draft ?? data.rti_draft ?? data.content ?? JSON.stringify(data, null, 2);
      setOutput(parsedOutput);
    } catch (error) {
      console.error('Error generating RTI content:', error instanceof Error ? error.message : error);
      alert('Failed to generate RTI content. Please try again.');
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    alert('Copied to clipboard!')
  }

  return (
    <div className="app">
      <div className="card">
        <div className="card-header">
          <div>
            <h1>Right To Information - Content Builder</h1>
          </div>
        </div>
        <form className="rti-form">
          <p className="optional-note">All fields are optional; leave any blank if you prefer.</p>
          <div className="form-row">
            <div className="form-column">
              <h2>From Details</h2>
              <div className="form-group">
                <label htmlFor="firstName">Full Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  type="text"
                  id="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter your mobile number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  rows={3}
                />
              </div>
            </div>
            <div className="form-column">
              <h2>To Authority</h2>
              <div className="form-group">
                <label htmlFor="to">Authority</label>
                <input
                  type="text"
                  id="to"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="Enter authority name"
                />
              </div>
            </div>
          </div>
          <div className="form-bottom">
            <div className="form-group description-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter short content description"
                rows={5}
              />
            </div>
            <button type="button" onClick={generateContent} className="generate-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="loader" /> Generating...
                </>
              ) : 'Generate'}
            </button>
          </div>
        </form>
        {output && (
          <div className="output-section">
            <h2>Generated RTI Draft</h2>
            <textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              rows={10}
              className="output-textarea"
            />
            <button onClick={copyToClipboard} className="copy-btn">
              Copy to Clipboard
            </button>
          </div>
        )}
        <div className="note-section">
          <p>Please note that we do not store any personal information provided in this tool. This generates AI-based drafts for your convenience only. You may edit the generated content as needed.</p>
        </div>
      </div>
    </div>
  )
}

export default App
