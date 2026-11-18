import { useContext, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CategorySelector from '../components/create-request/CategorySelector'
import RequestDescription from '../components/create-request/RequestDescription'
import RequestHeader from '../components/create-request/RequestHeader'
import RequestLocation from '../components/create-request/RequestLocation'
import RequestPhotos from '../components/create-request/RequestPhotos'
import RequestPublished from '../components/create-request/RequestPublished'
import RequestSchedule from '../components/create-request/RequestSchedule'
import RequestSubmitPanel from '../components/create-request/RequestSubmitPanel'
import RequestTrustPanel from '../components/create-request/RequestTrustPanel'
import authContext from '../contexts/authContext'
import './create-request.css'

const initialForm = {
  category: 'Plomberie',
  subService: "Réparation de fuite d'eau",
  description: '',
  city: 'Casablanca',
  address: '',
  floor: '',
  elevator: true,
  parking: false,
  urgent: true,
  date: '',
  timeSlot: 'Après-midi (14h00 - 18h00)',
  acceptedTerms: false,
}

function getErrorMessage(error) {
  const responseData = error.response?.data
  if (!responseData) {
    return 'Impossible de joindre le serveur. Vérifiez votre connexion puis réessayez.'
  }
  if (typeof responseData.detail === 'string') return responseData.detail
  const firstError = Object.values(responseData).flat().find((value) => typeof value === 'string')
  return firstError || 'La demande n’a pas pu être publiée. Vérifiez les informations et réessayez.'
}

function CreateRequestForm({ onPublished }) {
  const { isauthenticated, accessToken, role } = useContext(authContext)
  const [values, setValues] = useState(initialForm)
  const [files, setFiles] = useState([])
  const [uploadError, setUploadError] = useState('')
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const updateValue = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }))
  }

  const handleCategoryChange = (category) => {
    setValues((current) => ({
      ...current,
      category: category.name,
      subService: category.services[0],
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setNotice('')

    if (!isauthenticated || !accessToken) {
      setError('Connectez-vous avec un compte client pour publier votre demande.')
      return
    }

    if (role && role.toLowerCase() !== 'client') {
      setError('La publication de demandes est réservée aux comptes clients.')
      return
    }

    if (uploadError) {
      setError('Corrigez les fichiers joints avant de publier votre demande.')
      return
    }

    setSubmitting(true)
    const body = new FormData()
    body.append('description', values.description)
    body.append('categorie', values.category)
    body.append('sous_service', values.subService)
    body.append('ville', values.city)
    body.append('localisation', `${values.address}, ${values.city}`)
    body.append('etage', values.floor)
    body.append('ascenseur', String(values.elevator))
    body.append('stationnement', String(values.parking))
    body.append('urgence', String(values.urgent))
    body.append('date_intervention', values.urgent ? '' : values.date)
    body.append('creneau', values.urgent ? '' : values.timeSlot)
    files.forEach((file) => body.append('attachments', file))

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/service-requests/', body, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      onPublished(response.data.id)
    } catch (requestError) {
      setError(getErrorMessage(requestError))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="create-request-form" onSubmit={handleSubmit}>
      <CategorySelector
        category={values.category}
        subService={values.subService}
        onCategoryChange={handleCategoryChange}
        onSubServiceChange={(subService) => updateValue('subService', subService)}
      />
      <RequestDescription value={values.description} onChange={(description) => updateValue('description', description)} />
      <RequestPhotos files={files} onFilesChange={setFiles} onError={setUploadError} />
      {uploadError && <p className="request-upload-error" role="alert">{uploadError}</p>}
      <RequestLocation
        values={{
          city: values.city,
          address: values.address,
          floor: values.floor,
          elevator: values.elevator,
          parking: values.parking,
        }}
        onChange={updateValue}
        onNotice={setNotice}
      />
      {notice && <p className="request-form-notice" role="status">{notice}</p>}
      <RequestSchedule
        urgent={values.urgent}
        date={values.date}
        timeSlot={values.timeSlot}
        onChange={(name, value) => updateValue(name, value)}
      />
      <RequestSubmitPanel
        acceptedTerms={values.acceptedTerms}
        onTermsChange={(acceptedTerms) => updateValue('acceptedTerms', acceptedTerms)}
        submitting={submitting}
        error={error}
      />
    </form>
  )
}

function CreateRequest() {
  const [requestId, setRequestId] = useState(null)

  return (
    <div className="create-request-page">
      <a className="create-request-skip-link" href="#create-request-main">Aller au formulaire</a>
      <Navbar />
      <main className="create-request-main" id="create-request-main">
        <RequestHeader submitted={requestId !== null} />
        {requestId !== null ? (
          <div className="create-request-success-layout">
            <RequestPublished requestId={requestId} onCreateAnother={() => setRequestId(null)} />
            <RequestTrustPanel />
          </div>
        ) : (
          <div className="create-request-layout">
            <section className="create-request-form-card" aria-label="Formulaire de demande">
              <CreateRequestForm key={requestId ?? 'new-request'} onPublished={setRequestId} />
            </section>
            <RequestTrustPanel />
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default CreateRequest
