// eslint-disable-next-line no-undef
document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-undef
  const signupForm = document.querySelector('form');

  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = {
      // eslint-disable-next-line no-undef
      username: document.getElementById('username').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };

    fetch('api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.sucess) {
            window.location.href = '/login'
        } else {
            displayErrors(data.errors);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
  });

  function displayErrors(errors) {
    // Function to display error messages
    const errorElement = document.createElement('div');
    errorElement.className = 'alert alert-danger';
    errorElement.textContent = errors.join(', '); // Assuming errors is an array of messages
    signupForm.prepend(errorElement);
    }
    
});
