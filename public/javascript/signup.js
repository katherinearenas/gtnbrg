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

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
          if (data.success) {
            window.location.href = '/login';
          } else {
              displayErrors(data.errors);
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
    });
    
});
