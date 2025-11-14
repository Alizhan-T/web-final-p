const themeToggle = document.getElementById('theme-toggle');
if(themeToggle){
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  });
  if(localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-mode');
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
  });
});

// Destinations
function initDestinations() {
  const container = document.getElementById('destinations-list');
  if(!container) return;

  function render(list){
    container.innerHTML = '';
    list.forEach(c => {
      container.innerHTML +=
      <div class="col-md-4" data-aos="fade-up">
        <div class="card h-100">
          <img src="${c.image}" class="card-img-top" alt="${c.name}">
          <div class="card-body">
            <h5>${c.name}</h5>
            <p>${c.description}</p>
            <p>Rating: ${c.rating}/5</p>
          </div>
        </div>
      </div>;
    });
  }
  render(countries);

  document.getElementById('search')?.addEventListener('input', e=>{
    const q = e.target.value.toLowerCase();
    render(countries.filter(c=>c.name.toLowerCase().includes(q)));
  });
  document.getElementById('sort-name')?.addEventListener('click', ()=>render([...countries].sort((a,b)=>a.name.localeCompare(b.name))));
  document.getElementById('sort-rating')?.addEventListener('click', ()=>render([...countries].sort((a,b)=>b.rating-a.rating)));
}

// About counter
function initAbout(){
  const c = document.getElementById('counter');
  if(!c) return;
  let n=0; const total=countries.length;
  const i=setInterval(()=>{ if(n<total){n++; c.innerText=n;} else clearInterval(i); },100);
}

// Contact
function initContact(){
  const f=document.getElementById('contact-form');
  if(!f) return;
  f.addEventListener('submit',e=>{
    e.preventDefault();
    alert('Message sent!');
    f.reset();
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  initDestinations();
  initAbout();
  initContact();
});