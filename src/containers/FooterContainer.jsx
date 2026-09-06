import CartBar from '../components/CartBar.jsx'
import Footer from '../components/Footer.jsx'

function FooterContainer({ cart, onViewCart }) {
  const itemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0)

  return (
    <>
      <CartBar itemCount={itemCount} onViewCart={onViewCart} />
      <Footer />
    </>
  )
}

export default FooterContainer
