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
 
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  