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
             headers: {
                 'Content-Type': 'application/json'
             }
         });

         //check the response status
         if (response.ok) {
             document.location.replace('/dashboard');
             console.log('successful signup');
         } else {
             alert(response.statusText);
         }
     }
 };

 document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);