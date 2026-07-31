
const DressCode = ({ dresscode }) => {
  return (
    <section className="dresscode">
      <h2 className="u-title dresscode__title">{dresscode.title}</h2>
        <div className="dresscode__title__icon-container">

      </div>
      <p className="u-script dresscode__description">{dresscode.description}</p>
      <p className=" dresscode__color-note">{dresscode.mainColorNote}</p>
      <p className="dresscode__note">{dresscode.note}</p>
    </section>
  )
}

export default DressCode
 