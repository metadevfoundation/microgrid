import { element } from 'segmentio/deku';


function login(e, component, setState) {
  e.preventDefault();
  component.props.onLogin(component.data(), setState);
}

function register(e, component, setState) {
  e.preventDefault();
  component.props.onRegister(component.data(), setState);
}

export default {
  initialState() {
    return {
      authed: false,
      text: '',
      open: true,
    }
  },

  render(component, setState) {
    let { props, state } = component;

    function checkwin(e) {
      if (e.target.value.toLowerCase() == "loud") {
        document.body.style.transform = "rotate(9deg)";
      } else {
        document.body.style.transform = "";
      }
    }

    function open() {
      setState({ open: true });
    }

    function close() {
      setState({ open: false });
    }

    if (state.authed) {
      return (<div class="welcome">
        Humbly Presenting...
        K<input onKeyUp={checkwin} style="padding: none; border-top: none; border-left: none; border-right: none; width:4em" type='text' / >s.io!
      </div>)
    }

    if (!state.open) {
      return (<div class="welcome"><button onClick={open}>Login</button></div>);
    }
    return (

      <form class="login step">
        <div class="row middle-xs">
          <div class="col-xs-2 center-xs">
            <i class="num">1</i>
          </div>
          <div class="col-xs-10">
            <h1>Create Your Login</h1>
            <label>Email</label>
          	<input name="email" type="email" placeholder="email" />
      			<label>Password</label>
            <input name="password" type="password" placeholder="password" />
            <div>
        			<button onClick={login}>Login</button>
              <button onClick={register}>Register</button>
              { state.authed ? "You are Logged In" : "" }
              { state.text }
            </div>
          </div>
        </div>
      </form>
    );
  },

  afterRender(component, el) {
    let { props, state } = component;


    component.data = function() {
      let email = el.querySelector('input[type=email]');
      let password = el.querySelector('input[type=password]');

      return {
        email: email.value,
        password: password.value
      };
    }
  }
}
