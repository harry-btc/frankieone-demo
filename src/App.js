import { useState } from 'react'
import axios from 'axios'
import FrankieSmartUI from './FrankieSmartUi'

const FRANKIE_URL = 'https://backend.demo.frankiefinancial.io'
const FRANKIE_CONFIG = {
  // mode: 'demo', // remove the mode when you are testing with the API, demo mode wont make API calls to the service
  frankieBackendUrl: FRANKIE_URL,
  documentTypes: ['PASSPORT', 'DRIVERS_LICENCE'],
  idScanVerification: true,
  checkProfile: 'auto',
  maxAttemptCount: 5,
  googleAPIKey: 'AIzaSyDVUiuZsJ2ihkKhwqafkK9gLkXq2t7msMQ',
  acceptedCountries: ['AUS'],
  requestAddress: true,
  consentText: "I agree with the terms described in the Consent section of the Company's webpage"
}
const ENCODED_CREDENTIALS =
  'ZWVmY2NmMzgtOTIxOS03ZjQ4LWFmNDUtMDA4ZTk0ZjNlNzRjOmNhZjUxNDkxZjZkOTIyNzMwYTZjNDg5YmExMWEyNTAyNjJlMWI0ZWYyODE0NTA5Y2VjMjFkZjIxNzZlMjVkMjk=' // use your base64 encoded credentials!
const FRANKIE_HEADERS = { authorization: `machine ${ENCODED_CREDENTIALS}` }

function App() {
  const [reference, setReference] = useState('')
  const [open, setOpen] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const initialiseWidget = async () => {
    const options = { headers: FRANKIE_HEADERS }
    const body = {
      permissions: {
        preset: 'smart-ui',
        reference: reference || 'test'
      }
    }
    const data = await axios.post(`${FRANKIE_URL}/auth/v2/machine-session`, body, options)

    const {
      headers: { token: ffToken }
    } = data

    window.frankieFinancial.initialiseOnboardingWidget({
      applicantReference: reference || 'test', // This will be your applicants reference code
      config: FRANKIE_CONFIG,
      ffToken,
      // width: `${window.innerWidth * 0.8}px`,
      // height: `${window.innerHeight / 1.5}px`,
      width: 'AUTO',
      height: 'AUTO'
    })
  }

  const start = async () => {
    if (window.frankieFinancial && !hasStarted) {
      await initialiseWidget()
      setHasStarted(true)
      setOpen(true)
    } else if (hasStarted) {
      setOpen(true)
    } else {
      alert('Something went wrong!')
    }
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      <p style={{ color: 'white' }}>Refresh the page to start a new session or a new applicant reference.</p>
      <a
        href="https://docs.google.com/spreadsheets/d/1_sKDBqOtw_4HEth8KLg9EktSFz7ZP4Cq/edit#gid=177907373"
        target="_blank"
        rel="noreferrer"
        style={{ color: 'aquamarine', marginBottom: '10px' }}
      >
        Test data link
      </a>
      <input type="text" placeholder="Enter reference" value={reference} onChange={e => setReference(e.target.value)} />
      <button
        style={{
          width: '300px',
          marginTop: '20px'
        }}
        onClick={start}
      >
        {hasStarted ? `Continue!` : `Start Frankie Smart UI!`}
      </button>
      <div>
        <FrankieSmartUI show={open} onClose={() => setOpen(false)} />
      </div>
    </div>
  )
}

export default App
