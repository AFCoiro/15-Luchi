const DressCode = ({ dresscode }) => {
  return (
    <section className="dresscode">
      <h2 className="dresscode__title">{dresscode.title}</h2>
      <p className="dresscode__description">{dresscode.description}</p>
      <p className="dresscode__color-note">{dresscode.mainColorNote}</p>
      <p className="dresscode__note">{dresscode.note}</p>
    </section>
  )
}

export default DressCode
