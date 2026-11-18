function RequestSectionHeading({ number, title, detail }) {
  return (
    <div className="request-section-heading">
      <h2>
        <span>{number}</span>
        {title}
      </h2>
      {detail && <span className="request-section-detail">{detail}</span>}
    </div>
  )
}

export default RequestSectionHeading
