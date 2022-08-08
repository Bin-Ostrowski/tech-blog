//This function does something asynchronous - from async/await
async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    //validate all fields have content with conditional statment before posting
    if ( email && password) {
        
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      //check the response status
      if(response.ok) {
        document.location.replace('/dashboard');
        console.log('sucessful login');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  //This function does something asynchronous - from async/await
  async function signupFormHandler(event) {
      event.preventDefault();
    
      const username = document.querySelector('#username-signup').value.trim();
      const email = document.querySelector('#email-signup').value.trim();
      const password = document.querySelector('#password-signup').value.trim();
    
      //validate all fields have content with conditional statment before posting
      if (username && email && password) {
        
        const response = await fetch('/api/users', {
          method: 'post',
          body: JSON.stringify({
            username,
            email,
            password
          }),
          headers: { 'Content-Type': 'application/json' }
        });
  
        //check the response status
        if(response.ok) {
            document.location.replace('/dashboard');
            console.log('successful signup');
        } else {
          alert(response.statusText);
        }
      }
    };
  
  
    document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
    document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);