import "./App.css";
import useCart from "./hooks/useCart";
import Header from "./components/Header";
import Guitar from "./components/Guitar";

function App() {
  const {
    data,
    cart,
    addToCart,
    removeFromCart,
    incrementarItems,
    decrementarItems,
    clearCart,
    isEmpty,
    cartTotal,
  } = useCart();

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        incrementarItems={incrementarItems}
        decrementarItems={decrementarItems}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      ></Header>

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitarra) => (
            <Guitar key={guitarra.id} guitar={guitarra} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
