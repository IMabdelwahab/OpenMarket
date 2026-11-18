import { useEffect, useRef, useState } from 'react'
import RequestIcon from './RequestIcon'
import RequestSectionHeading from './RequestSectionHeading'

const MAX_FILES = 5
const MAX_FILE_SIZE = 15 * 1024 * 1024
const ACCEPTED_TYPES = new Set(['image/jpeg', 'image/png', 'image/heic', 'image/heif', 'video/mp4'])
const ACCEPTED_EXTENSIONS = /\.(jpe?g|png|heic|mp4)$/i

function RequestPhotos({ files, onFilesChange, onError }) {
  const inputRef = useRef(null)
  const previewUrls = useRef(new Set())
  const [previews, setPreviews] = useState([])
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    const nextPreviews = files.map((file) => {
      const url = URL.createObjectURL(file)
      previewUrls.current.add(url)
      return { file, url }
    })
    setPreviews(nextPreviews)
    return () => nextPreviews.forEach(({ url }) => {
      URL.revokeObjectURL(url)
      previewUrls.current.delete(url)
    })
  }, [files])

  useEffect(() => () => {
    previewUrls.current.forEach((url) => URL.revokeObjectURL(url))
  }, [])

  const addFiles = (selectedFiles) => {
    const accepted = []
    const errors = []
    for (const file of selectedFiles) {
      if (!ACCEPTED_TYPES.has(file.type) && !ACCEPTED_EXTENSIONS.test(file.name)) {
        errors.push(`${file.name} : format non accepté.`)
      } else if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name} dépasse la limite de 15 Mo.`)
      } else {
        accepted.push(file)
      }
    }

    const remainingSlots = MAX_FILES - files.length
    if (accepted.length > remainingSlots) {
      errors.push(`Vous pouvez joindre ${MAX_FILES} fichiers au maximum.`)
    }
    onFilesChange([...files, ...accepted.slice(0, remainingSlots)])
    onError(errors.join(' '))
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDragging(false)
    addFiles(Array.from(event.dataTransfer.files))
  }

  const removeFile = (index) => {
    onFilesChange(files.filter((_, fileIndex) => fileIndex !== index))
    onError('')
  }

  return (
    <section className="request-form-section">
      <div className="request-description-heading">
        <RequestSectionHeading number="3" title="Photos ou vidéos du problème" detail="Recommandé" />
        <span className="request-character-count">{files.length} / {MAX_FILES} fichiers</span>
      </div>
      <p className="request-section-copy">Une photo claire aide l’artisan à préparer un devis précis avant son déplacement.</p>
      <input
        ref={inputRef}
        className="sr-only"
        type="file"
        accept="image/jpeg,image/png,image/heic,video/mp4,.heic"
        multiple
        onChange={(event) => {
          addFiles(Array.from(event.target.files || []))
          event.target.value = ''
        }}
      />
      <button
        className={`request-upload-zone${dragging ? ' is-dragging' : ''}`}
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <span className="upload-icon"><RequestIcon>add_a_photo</RequestIcon></span>
        <strong>Glissez vos fichiers ici ou <u>parcourez vos fichiers</u></strong>
        <small>JPG, PNG, HEIC ou MP4 · 15 Mo maximum par fichier</small>
      </button>
      {!!previews.length && (
        <div className="request-upload-previews">
          {previews.map(({ file, url }, index) => (
            <article className="request-upload-preview" key={`${file.name}-${file.lastModified}`}>
              <div className="request-preview-image">
                {file.type.startsWith('video/')
                  ? <video src={url} aria-label={`Aperçu de ${file.name}`} />
                  : <img src={url} alt={`Aperçu de ${file.name}`} />}
                <button type="button" aria-label={`Retirer ${file.name}`} onClick={() => removeFile(index)}><RequestIcon>close</RequestIcon></button>
              </div>
              <span title={file.name}>{file.name}</span>
              <small>{(file.size / (1024 * 1024)).toFixed(1)} Mo</small>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default RequestPhotos
