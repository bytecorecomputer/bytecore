// Sidebar toggle & overlay
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active'); overlay.classList.toggle('active');
    });
    overlay.addEventListener('click', () => { sidebar.classList.remove('active'); overlay.classList.remove('active'); });

    // Typewriter effect
    class TypeWriter {
      constructor(el, words, wait=2000) { this.el=el; this.words=words; this.txt=''; this.wordIndex=0; this.wait=wait; this.isDeleting=false; this.type(); }
      type() {
        const full=this.words[this.wordIndex%this.words.length];
        this.txt=this.isDeleting ? full.substring(0,this.txt.length-1) : full.substring(0,this.txt.length+1);
        this.el.innerHTML=`<span>${this.txt}</span>`;
        let speed=100;
        if(this.isDeleting) speed/=2;
        if(!this.isDeleting && this.txt===full){ speed=this.wait; this.isDeleting=true; }
        else if(this.isDeleting && this.txt===''){ this.isDeleting=false; this.wordIndex++; speed=500; }
        setTimeout(()=>this.type(), speed);
      }
    }
    document.addEventListener('DOMContentLoaded', ()=> new TypeWriter(document.getElementById('typewriter'), ['Innovate Your Future','Master Technology','Transform Your Career'],2000));

    // Scroll reveal & nav highlighting
    const sections=document.querySelectorAll('section');
    const navLinks=document.querySelectorAll('header nav a, .sidebar ul li a');
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){ entry.target.classList.add('reveal');
          navLinks.forEach(link=>{ link.classList.toggle('active', link.getAttribute('href')===`#${entry.target.id}`); });
        }
      });
    },{threshold:0.3});
    sections.forEach(sec=>observer.observe(sec));

    // Back to top
    const backBtn=document.getElementById('backToTop');
    window.addEventListener('scroll', ()=> backBtn.style.display = window.scrollY>500 ? 'block' : 'none');
    backBtn.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));
    
    