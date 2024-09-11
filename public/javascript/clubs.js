// document.addEventListener('DOMContentLoaded', () => {
//     console.log('Fetch started');
//     fetch('/api/clubs')
//         .then(response => { 
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const contentType = response.headers.get('content-type');

//             if (contentType && contentType.includes('application/json')) {
//                 return response.json();
//             } else {
//                 throw new Error('Response was not JSON');
//             }
//         })
//         .then(clubs => {
//             console.log('Clubs data:', clubs);
//             const list = document.getElementById('clubsList');

//             clubs.forEach(club => {
//                 const card = document.createElement('div');

//                 card.className = 'col-md-4';
//                 card.innerHTML = `
//                     <div class='card mb-4'>
//                         <div class='card-body'>
//                             <h3 class='card-title'>${club.name}</h3>
//                             <p class='card-text'>${club.description}</p>
//                             <a href='/clubs/${club.id}' class='btn btn-primary'>View this Club</a>
//                         </div>
//                     </div>
//                 `;
//                 list.appendChild(card);
//             });
//         })
//         .catch(error => {
//             console.error('Error loading clubs:', error);
//             const errorElement = document.createElement('div');
//             errorElement.className = 'alert alert-danger';
//             errorElement.textContent = 'Failed to load clubs. Please try again later.';
//             document.body.prepend(errorElement);
//         });
// });