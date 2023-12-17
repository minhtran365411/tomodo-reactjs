import App from "../App";


function Home() {
  return (
    <div>
    <App></App>
    <div className="homeContainer">
      <h1>Welcome To The TOMODO Productive Web App</h1>
      <p>Please navigate to either <b>In-progress Tasks</b> or <b>Paramodo</b> in the nav bar to use our service.
      </p>

            <img
              alt=""
              src={require("../assets/imgs/Tomodo.gif")}
              width={400}
            />{' '}

    </div>
    
    </div>
  );
}

export default Home;
