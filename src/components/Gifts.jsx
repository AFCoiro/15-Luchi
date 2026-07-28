import { Gift } from 'lucide-react';

const Gifts = () => {


  return (
    <section className="gifts">
      <h2 className="u-title gifts__title">Regalos</h2>
      <Gift />
      {/* TODO: display temperature, condition icon, humidity */}
      <h3 className="gifts__subtitle u-script">
        ¿Querés hacerme un regalo?</h3>
    <p className="gifts__description" >Tu presencia es lo más importante. Pero si además querés regalarnos algo:</p>
            <a
        href="#"
        className="gifts__btn"
      >
        <Gift strokeWidth={1.2}/>
        Ver que regalar
      </a>
    </section>
  )
}

export default Gifts
