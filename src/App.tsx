import { useState } from 'react'
import './App.css'

function App() {
  const [firstName, setFirstName] = useState('')
  const [mobile, setMobile] = useState('')
  const [address, setAddress] = useState('')
  const [to, setTo] = useState('')
  const [description, setDescription] = useState('')
  const [output, setOutput] = useState('')

  const generateContent = () => {
    // Mock RTI draft generation
    const mockRTI = `Subject: Request for Information under Right to Information Act, 2005

Dear ${to},

I, ${firstName}, residing at ${address}, hereby request the following information under the Right to Information Act, 2005:

${description}

Please provide the requested information within the stipulated time frame as per the RTI Act.

Contact: ${mobile}

Thank you.

Regards,
${firstName}
${address}`
    setOutput(mockRTI)
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
          <div className="form-row">
            <div className="form-column">
              <h2>From Details</h2>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
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
                <label htmlFor="to">Authority / Recipient</label>
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
            <button type="button" onClick={generateContent} className="generate-btn">
              Generate
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
