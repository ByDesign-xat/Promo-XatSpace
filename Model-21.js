        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('.content-section');

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                navItems.forEach(nav => nav.classList.remove('active'));
                sections.forEach(sec => sec.classList.remove('active'));
                
                item.classList.add('active');
                const targetId = item.getAttribute('data-target');
                document.getElementById(targetId).classList.add('active');

                if (targetId === 'inicio') {
                    const signature = document.getElementById('nameText');
                    signature.style.animation = 'none';
                    void signature.offsetWidth;
                    signature.style.animation = 'appearText 1.5s ease-out forwards, pulseGlow 2s infinite alternate 1.5s';
                }
            });
        });

        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');

        function openLightbox(src) {
            lightboxImg.src = src;
            lightbox.classList.add('show');
        }

        function closeLightbox(e) {
            if (e.target !== lightboxImg) {
                lightbox.classList.remove('show');
            }
        }

        function addLike(event) {
            createBurst(event.clientX, event.clientY);
        }

        const canvas = document.getElementById('sparkleCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray = [];
        const colors = ['#00f0ff', '#ffffff', '#80d4ff', '#1a5b9c'];

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        const mouse = { x: null, y: null };

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
            for (let i = 0; i < 2; i++) {
                particlesArray.push(new Particle(mouse.x, mouse.y, false));
            }
        });

        class Particle {
            constructor(x, y, isBurst) {
                this.x = x;
                this.y = y;
                this.speedX = isBurst ? (Math.random() * 8 - 4) : (Math.random() * 2 - 1);
                this.speedY = isBurst ? (Math.random() * 8 - 4) : (Math.random() * 2 - 1) + 1; 
                this.size = Math.random() * 3 + 1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.life = 1; 
                this.decay = isBurst ? 0.015 : 0.03;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.life -= this.decay;
                this.size -= 0.05;
            }
            draw() {
                ctx.globalAlpha = Math.max(this.life, 0);
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, Math.max(this.size, 0), 0, Math.PI * 2);
                ctx.fill();
                
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
            }
        }

        function createBurst(x, y) {
            for (let i = 0; i < 40; i++) {
                particlesArray.push(new Particle(x, y, true));
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
                if (particlesArray[i].life <= 0 || particlesArray[i].size <= 0) {
                    particlesArray.splice(i, 1);
                    i--;
                }
            }
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
		
