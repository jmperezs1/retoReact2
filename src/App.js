import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function App() {

  const [formValues, setFormValues] = useState({email:"", password:"", favClass:"1"})

  const [validationStates, setValidationStates] =  useState({emailState:true, passwordState:true, contadorEmail:0, contadorPassword:0})
  
  const handleFocusEmail = (()=>{
    if(validationStates.emailState === true)
    setValidationStates({...validationStates, emailState:false, contadorEmail:1});
  });

  const handleBlurEmail = ((e) => {
    if (validationStates.contadorEmail > 0) {
      const isValidEmail = /\S+@\S+\.\S+/.test(formValues.email);      
      if (!isValidEmail) {
        setValidationStates({ ...validationStates, emailState: "error" })
        e.target.style.borderColor = "red";
      } else {
        e.target.style.borderColor = "green"; 
        setValidationStates({ ...validationStates, emailState: "ok" })
      }
    }
  });

  const handleBlurPassword = ((e) => {
    if (validationStates.contadorPassword > 0) {
      const isValidPassword = /^(?=.*[a-zA-Z])(?=.*\d).{9,}$/.test(formValues.password);      
      if (!isValidPassword) {
        setValidationStates({ ...validationStates, passwordState: "error" });
        e.target.style.borderColor = "red";
      } else {
        setValidationStates({ ...validationStates, passwordState: true });
        e.target.style.borderColor = "green"; 
        setValidationStates({ ...validationStates, passwordState: "ok" });
      }
    }
  });

  const handleFocusPassword = (()=>{
    if(validationStates.passwordState===true){
    setValidationStates({...validationStates, passwordState:false, contadorPassword:1});
    }
  });

  const handleEmailChange = ((e) => {
    setFormValues({...formValues, email: e.target.value})
  });
 
  const handlePasswordChange = ((e) => {
    setFormValues({...formValues, password: e.target.value})
  });
 
  const handleSelectChange = ((e) => {
    setFormValues({...formValues, favClass: e.target.value})
  });

  const clickSubmit = (() => {
    //Call fetch
    alert(JSON.stringify(formValues))
  })

  return (
    <div>
      <h1>Ejemplo de formularios!</h1>
     
      <Form>
      <Form.Group className="mb-6" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} onFocus={handleFocusEmail} onBlur={handleBlurEmail} value={formValues.email}/>
        {validationStates.emailState === "error" && <Form.Text className="text-muted">Please enter a valid email address.</Form.Text>}
        {validationStates.emailState === false && <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>}
        {validationStates.emailState === "ok" && <Form.Text className="text-muted">Formato correcto</Form.Text>}
      </Form.Group>
 
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} onFocus={handleFocusPassword} onBlur={handleBlurPassword} value={formValues.password} />
        { validationStates.passwordState === "error" && <Form.Text className="text-muted">Your password should be have numbers and letters and should be at least 9 char long</Form.Text>}
        { validationStates.passwordState === "ok" && <Form.Text className="text-muted">Formato correcto</Form.Text>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Favorite Class</Form.Label>
        <Form.Select onChange={handleSelectChange}>
          <option value="1">ISIS3710</option>
          <option value="2">Programación con tecnologias web</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" onClick={clickSubmit}>
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default App;